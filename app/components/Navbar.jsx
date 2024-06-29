"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-black text-white'>
      <div className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
        <div className='flex items-center justify-between w-full lg:w-auto'>
          <Link href='/'>
            <span className='text-2xl font-bold cursor-pointer'>Rubick</span>
          </Link>
          <button
            className='lg:hidden text-white focus:outline-none'
            onClick={toggleMenu}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
        <div
          className={`lg:flex flex-grow items-center justify-between lg:ml-6 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <div className='flex flex-col lg:flex-row'>
            <Link href='/'>
              <span className='block mt-4 lg:inline-block lg:mt-0 lg:mr-6 cursor-pointer'>Home</span>
            </Link>
            <Link href='/Markups'>
              <span className='block mt-4 lg:inline-block lg:mt-0 lg:mr-6 cursor-pointer'>Markups</span>
            </Link>
            <Link href='/createMarkup'>
              <span className='block mt-4 lg:inline-block lg:mt-0 cursor-pointer'>Add Markups</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;