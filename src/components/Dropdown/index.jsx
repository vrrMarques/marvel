import Link from 'next/link';
import useAuth from '../../lib/useAuth';
import React, { useState } from 'react';
import { logout } from '../../lib/auth';
import FavoritesModal from '../FavoritesModal';

const Dropdown = () => {
  const user = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const handleFavoritesClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

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
          Sobre
        </Link>

        {user && (
          <>
            <button
              onClick={handleFavoritesClick}
              className='px-2 py-1 text-sm font-thin text-gray-100 cursor-pointer transition duration-500 ease-in-out hover:text-blue-400 md:text-xl md:mx-2'
            >
              Favoritos
            </button>

            <button
              onClick={handleLogout}
              className='px-2 py-1 text-sm font-thin text-gray-100 cursor-pointer transition duration-500 ease-in-out hover:text-red-400 md:text-xl md:mx-2'
            >
              Logout
            </button>
          </>
        )}
      </div>
      
      <FavoritesModal isOpen={modalOpen} onClose={handleFavoritesClick} />
    </div>
  );
};

export default Dropdown;
