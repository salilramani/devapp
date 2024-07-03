// app/api/proxy.js
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
        .click-blocker {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0);
          z-index: 9999;
        }
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
        function addClickMarker(event) {
          event.preventDefault();
          event.stopPropagation();

          const circle = document.createElement('div');
          circle.className = 'click-marker';
          circle.style.left = event.pageX + 'px';
          circle.style.top = event.pageY + 'px';
          document.body.appendChild(circle);
          console.log('Circle added at:', event.pageX, event.pageY);
        }

        document.addEventListener('DOMContentLoaded', function() {
          const blocker = document.createElement('div');
          blocker.className = 'click-blocker';
          document.body.appendChild(blocker);

          blocker.addEventListener('click', addClickMarker);

          document.body.addEventListener('click', addClickMarker, true);
          document.documentElement.addEventListener('click', addClickMarker, true);
          window.addEventListener('click', addClickMarker, true);
        });
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