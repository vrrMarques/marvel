'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Link from 'next/link';
import Dropdown from '../Dropdown';
import { logout } from '../../lib/auth';
import useAuth from '../../lib/useAuth';
import HeroModal from '../../components/HeroModal';
import FavoritesModal from '../FavoritesModal';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalOpenComic, setModalOpenComic] = useState(false);
  const [modalOpenHero, setModalOpenHero] = useState(false);
  const user = useAuth();

  const handleHeroModalClick = () => {
    setModalOpenHero(!modalOpenHero);
  };

  const handleFavoritesClick = () => {
    setModalOpenComic(!modalOpenComic);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <motion.nav
      initial={{ y: -400 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring' }}
      className='shadow pt-5'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
    >
      <div className='container px-3 py-3 mx-auto md:flex'>
        <div className='flex items-center justify-between'>
          <div style={{ fontFamily: 'Rowdies' }}>
            <Link
              href='/'
              className='text-2xl font-bold text-primary md:text-4xl cursor-pointer transition duration-500 ease-in-out hover:text-white'
            >
              MARVEL
            </Link>
          </div>
          <button
            className='border border-primary p-2 rounded-md md:hidden'
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='white'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button>
        </div>
        <div className='md:hidden'>{open && <Dropdown />}</div>

        <div className='w-full hidden md:ml-14 md:flex md:items-center md:justify-between'>
          <div className=''></div>
          <div className='flex flex-col px-2 py-3 -mx-4 md:flex-row md:mx-0 md:py-0'>
            <Link
              href='/'
              className='px-2 py-1 text-sm font-thin text-gray-100 cursor-pointer transition duration-500 ease-in-out hover:text-blue-400 md:text-xl md:mx-2'
            >
              Home
            </Link>
            <Link
              href='/about'
              className='px-2 py-1 text-sm font-thin text-gray-100 cursor-pointer transition duration-500 ease-in-out hover:text-blue-400 md:text-xl md:mx-2'
            >
              Sobre
            </Link>

            {user && (
              <>
                <button
                  onClick={handleHeroModalClick}
                  className='px-2 py-1 text-sm font-thin text-gray-100 cursor-pointer transition duration-500 ease-in-out hover:text-blue-400 md:text-xl md:mx-2'
                >
                  Meus Heróis
                </button>
                <>
                <button
                  onClick={handleFavoritesClick}
                  className='px-2 py-1 text-sm font-thin text-gray-100 cursor-pointer transition duration-500 ease-in-out hover:text-blue-400 md:text-xl md:mx-2'
                >
                  Quadrinhos Favoritos
                </button>

                <button
                  onClick={handleLogout}
                  className='px-2 py-1 text-sm font-thin text-gray-100 cursor-pointer transition duration-500 ease-in-out hover:text-red-400 md:text-xl md:mx-2'
                >
                  Logout
                </button>
              </>
              </>
            )}
          </div>
        </div>
      </div>

      <HeroModal isOpen={modalOpenHero} onClose={handleHeroModalClick} /> 
      <FavoritesModal isOpen={modalOpenComic} onClose={handleFavoritesClick} />
    </motion.nav>
  );
};

export default Navbar;
