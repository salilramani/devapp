'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const id = params[':id'];
  const [markupUrl, setMarkupUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('browse');
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
          setMarkupUrl(`https://app.rubick.io/api/proxy?url=${encodeURIComponent(result.markup_url)}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkupUrl();
  }, [id]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'browse' ? 'comment' : 'browse'));
  };

  const handleOverlayClick = (e) => {
    if (mode === 'comment') {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setAnnotations([...annotations, { x, y }]);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Markup for ID: {id}</h1>
      <button onClick={toggleMode} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        {mode === 'browse' ? 'Switch to Comment Mode' : 'Switch to Browse Mode'}
      </button>
      <div style={{ position: 'relative', width: '100%', height: '600px' }}>
        <iframe
          ref={iframeRef}
          src={markupUrl}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
        {mode === 'comment' && (
          <div
            onClick={handleOverlayClick}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'crosshair',
              background: 'transparent',
              zIndex: 1,
            }}
          />
        )}
        {annotations.map((annotation, index) => (
          <img
            key={index}
            src="/pin-icon.png"
            alt="Pin"
            style={{
              position: 'absolute',
              left: annotation.x,
              top: annotation.y,
              width: '20px',
              height: '20px',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;