import Link from 'next/link';
import React from 'react';

const Markupcard = ({ id, user_name, user_email, markup_url }) => {
  return (
    <Link href={`/Markups/${id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Name: {user_name} Markup</div>
          <h2>{user_email}</h2>
          <h2>{markup_url}</h2>
          <p className="text-gray-700 text-base">Click here to open the markup file.</p>
        </div>
      </div>
    </Link>
  );
};

export default Markupcard;