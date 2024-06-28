"use client";  // Mark this component as a client component

import { useEffect, useState } from 'react';
import Markupcard from './Markupcard';

const MarkupList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getAllMarkups');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="markup-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((item) => (
        <Markupcard 
          key={item.id} 
          id={item.id} 
          user_name={item.user_name} 
          user_email={item.user_email} 
          markup_url={item.markup_url} 
        />
      ))}
    </div>
  );
};

export default MarkupList;