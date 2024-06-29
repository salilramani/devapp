"use client";

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/deleteMarkup?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setData(data.filter(item => item.id !== id));
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to delete markup'}`);
      }
    } catch (error) {
      console.error('Error deleting markup:', error);
      alert('Failed to delete markup');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="markup-list flex flex-wrap justify-center">
      {data.map((item) => (
        <Markupcard 
          key={item.id} 
          id={item.id} 
          user_name={item.user_name} 
          user_email={item.user_email} 
          markup_url={item.markup_url} 
          onDelete={handleDelete} // Passing handleDelete as onDelete prop
        />
      ))}
    </div>
  );
};

export default MarkupList;