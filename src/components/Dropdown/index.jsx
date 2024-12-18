import React from 'react';
import Link from 'next/link';

const Dropdown = () => {
  return (
    <div className=' text-gray-900 font-bold'>
      <div className='w-full text-center mt-3'>
        <Link
          href='/'
          className='block px-2 py-1 text-2xl font-thin text-gray-100 text-center'
        >
          Home
        </Link>
        <Link
          href='/about'
          className='block px-2 py-1 text-2xl font-thin text-gray-100 text-center'
        >
          About
        </Link>
        <Link
          href='/feed'
          className='block px-2 py-1 text-2xl font-thin text-gray-100 text-center'
        >
          Search
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
