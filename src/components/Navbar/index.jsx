'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Dropdown from '../Dropdown';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const updateLocalStorage = (updatedFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
    updateLocalStorage(updatedFavorites);
  };

  const handleFavoritesClick = () => {
    setModalOpen(!modalOpen);
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
          <div>
            <Link
              href='/'
              className='text-2xl font-bold text-primary md:text-4xl cursor-pointer transition duration-500 ease-in-out hover:text-white'
              style={{ fontFamily: '' }}
            >
              MARVELOP
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
        <div className='md:hidden'>{open && <Dropdown className='' />}</div>

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
            <Link
              href='/feed'
              className='px-2 py-1 text-sm font-thin text-gray-100 cursor-pointer transition duration-500 ease-in-out hover:text-blue-400 md:text-xl md:mx-2'
            >
              Pesquisar
            </Link>

            <button
              onClick={handleFavoritesClick}
              className='px-2 py-1 text-sm font-thin text-gray-100 cursor-pointer transition duration-500 ease-in-out hover:text-blue-400 md:text-xl md:mx-2'
            >
              Favoritos
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-[#001f3d] p-5 rounded-md w-[80vw] max-h-[80vh] overflow-y-auto'>
            <h2 className='text-2xl font-bold mb-4 text-[#FF3395]'>Meus Favoritos</h2>
            <ul>
              {favorites.length === 0 ? (
                <li className='py-1 text-[#FF3395]'>Nenhum favorito encontrado.</li>
              ) : (
                favorites.map((favorite, index) => (
                  <li key={index} className='py-1 text-[#FF3395] flex justify-between items-center'>
                    {favorite.title ? favorite.title : "Sem título"} 
                    <button
                      onClick={() => removeFavorite(index)}
                      className='text-[#FF3395] bg-transparent border-none cursor-pointer'
                    >
                      Remover
                    </button>
                  </li>
                ))
              )}
            </ul>
            <button
              onClick={handleFavoritesClick}
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
