
"use client";

import { useEffect, useState } from 'react';
import Markupiframe from '@/app/components/Markupiframe';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams(); // Use useParams to get the dynamic segments
  const id = params[":id"]; // Destructure 'id' from params
  const [markupUrl, setMarkupUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('browse');
  console.log(params);
  console.log(id);

  useEffect(() => {
    const fetchMarkupUrl = async () => {
      try {
        if (id) {
          console.log(`Fetching markup URL for ID: ${id}`); // Log the ID for debugging
          const response = await fetch(`/api/getMarkupById?id=${id}`);
          if (!response.ok) {
            throw new Error('Error fetching markup URL');
          }
          const result = await response.json();
          console.log(`Fetched Markup URL: ${result.markup_url}`); // Log the fetched URL for debugging
          setMarkupUrl(`/api/proxy?url=${encodeURIComponent(result.markup_url)}`);
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Markup for ID: {id}</h1>
      <button onClick={toggleMode} className="bg-blue-500 text-white px-4 py-2 rounded">
          {mode === 'browse' ? 'Switch to Comment Mode' : 'Switch to Browse Mode'}
        </button>
        
          <Markupiframe markupUrl={markupUrl} />
    </div>
  );
};

export default Page;
