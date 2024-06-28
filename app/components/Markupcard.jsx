import Link from 'next/link';
import React from 'react';

const Markupcard = ({ id, user_name, user_email, markup_url }) => {
  return (
    <Link href={`/Markups/${id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-2xl cursor-pointer bg-white m-2">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-900">{user_name}'s Markup</div>
          <p className="text-gray-600 text-base mb-2">{user_email}</p>
          <p className="text-gray-600 text-base mb-2">{markup_url}</p>
          <p className="text-blue-500 text-base">Click here to open the markup file.</p>
        </div>
      </div>
    </Link>
  );
};

export default Markupcard;