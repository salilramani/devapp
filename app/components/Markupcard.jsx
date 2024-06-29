"use client"

import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Markupcard = ({ id, user_name, user_email, markup_url, onDelete }) => {
  return (
    <div className="max-w-sm w-full rounded overflow-hidden shadow-lg relative p-4 bg-white">
      <Link href={`/Markups/${id}`}>
        <div className="px-6 py-4 cursor-pointer">
          <div className="font-bold text-xl mb-2">Name: {user_name} Markup</div>
          <h2>{user_email}</h2>
          <h2>{markup_url}</h2>
          <p className="text-gray-700 text-base">Click here to open the markup file.</p>
        </div>
      </Link>
      <button 
        onClick={() => onDelete(id)} // Calling onDelete with the card's id
        className="absolute top-2 right-2 text-black-300 font-bold py-1 px-2 rounded"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default Markupcard;