import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white shadow-md'>
      <div className='mx-auto max-w-7xl p-4 flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <Link href='/'>
            <span className='text-2xl font-bold hover:text-gray-300'>Rubick</span>
          </Link>
        </div>
        <div className='hidden md:flex space-x-4'>
          <Link href='/'>
            <span className='hover:text-gray-300'>Home</span>
          </Link>
          <Link href='/Markups'>
            <span className='hover:text-gray-300'>Markups</span>
          </Link>
          <Link href='/createMarkup'>
            <span className='hover:text-gray-300'>Add Markups</span>
          </Link>
        </div>
        <div className='md:hidden'>
          <button className='text-gray-400 hover:text-white focus:outline-none focus:text-white'>
            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;