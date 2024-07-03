import axios from 'axios';

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing target URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await axios.get(targetUrl, { responseType: 'text' });
    const modifiedContent = response.data.replace(
      '</body>',
      `
      <style>
        .click-marker {
          width: 20px;
          height: 20px;
          background-color: blue;
          border-radius: 50%;
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 10000;
        }
      </style>
      <script>
        window.clickBlockingEnabled = false;

        function addClickMarker(event) {
          if (!window.clickBlockingEnabled) return;

          event.preventDefault();
          event.stopPropagation();

          const circle = document.createElement('div');
          circle.className = 'click-marker';
          circle.style.left = event.pageX + 'px';
          circle.style.top = event.pageY + 'px';
          document.body.appendChild(circle);
          console.log('Circle added at:', event.pageX, event.pageY);
        }

        function interceptLinks() {
          document.querySelectorAll('a').forEach(anchor => {
            anchor.addEventListener('click', function(event) {
              if (window.clickBlockingEnabled) {
                // When click blocking is enabled, show the marker and prevent navigation
                addClickMarker(event);
              } else {
                // When click blocking is disabled, proxy the navigation
                event.preventDefault();
                event.stopPropagation();
                const targetUrl = event.currentTarget.href;
                const proxiedUrl = '/api/proxy?url=' + encodeURIComponent(targetUrl);
                window.location.href = proxiedUrl;
              }
            });
          });

          document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(event) {
              if (window.clickBlockingEnabled) {
                // When click blocking is enabled, show the marker and prevent form submission
                addClickMarker(event);
              } else {
                // When click blocking is disabled, proxy the form submission
                event.preventDefault();
                event.stopPropagation();
                const formAction = event.currentTarget.action;
                const formMethod = event.currentTarget.method.toUpperCase();
                const formData = new FormData(event.currentTarget);

                const proxiedUrl = '/api/proxy?url=' + encodeURIComponent(formAction);

                fetch(proxiedUrl, {
                  method: formMethod,
                  body: formData
                }).then(response => response.text()).then(html => {
                  document.open();
                  document.write(html);
                  document.close();
                  interceptLinks(); // Reapply interception after new content is loaded
                });
              }
            });
          });
        }

        function toggleClickBlocking(enabled) {
          if (enabled) {
            document.body.addEventListener('click', addClickMarker, true);
            document.documentElement.addEventListener('click', addClickMarker, true);
            window.addEventListener('click', addClickMarker, true);
          } else {
            document.body.removeEventListener('click', addClickMarker, true);
            document.documentElement.removeEventListener('click', addClickMarker, true);
            window.removeEventListener('click', addClickMarker, true);
          }
        }

        document.addEventListener('DOMContentLoaded', function() {
          Object.defineProperty(window, 'clickBlockingEnabled', {
            set: function(value) {
              this._clickBlockingEnabled = value;
              toggleClickBlocking(value);
            },
            get: function() {
              return this._clickBlockingEnabled;
            }
          });

          interceptLinks(); // Initial call to intercept links
        });

        window.addEventListener('popstate', interceptLinks); // Intercept links on history navigation
      </script>
      </body>`
    );
    return new Response(modifiedContent, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch the external website' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};