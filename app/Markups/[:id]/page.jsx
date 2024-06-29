'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const id = params[':id'];
  const [markupUrl, setMarkupUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchMarkupUrl = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/getMarkupById?id=${id}`);
          if (!response.ok) {
            throw new Error('Error fetching markup URL');
          }
          const result = await response.json();
          setMarkupUrl(`/proxy?url=${encodeURIComponent(result.markup_url)}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkupUrl();
  }, [id]);

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

      iframeDocument.addEventListener('mouseover', (e) => {
        e.target.style.outline = '2px dashed grey';
      });

      iframeDocument.addEventListener('mouseout', (e) => {
        e.target.style.outline = '';
      });

      iframeDocument.addEventListener('click', (e) => {
        const icon = iframeDocument.createElement('img');
        icon.src = '/pin-icon.png';
        icon.alt = 'Pin';
        icon.style.position = 'absolute';
        icon.style.left = `${e.pageX}px`;
        icon.style.top = `${e.pageY}px`;
        icon.style.width = '20px';
        icon.style.height = '20px';
        icon.style.transform = 'translate(-50%, -50%)';
        icon.style.zIndex = '2';
        iframeDocument.body.appendChild(icon);
        setAnnotations([...annotations, { x: e.pageX, y: e.pageY }]);
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px' }}>
      <iframe
        ref={iframeRef}
        src={markupUrl}
        onLoad={handleIframeLoad}
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default Page;