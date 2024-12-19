import React from 'react';
import useFavorites from '../../lib/useFavorites';

const FavoritesModal = ({ isOpen, onClose }) => {
  const { favorites, removeFavorite } = useFavorites();

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-[#001f3d] p-5 rounded-md w-[80vw] max-h-[80vh] overflow-y-auto'>
        <h2 className='text-2xl font-bold mb-4 text-[#FF3395]'>Meus quadrinhos Favoritos</h2>
        <ul>
          {favorites.length === 0 ? (
            <li className='py-1 text-[#FF3395]'>Nenhum favorito encontrado.</li>
          ) : (
            favorites.map((favorite, index) => (
              <li key={index} className='py-1 text-[#FF3395] flex justify-between items-center'>
                {favorite.title || "Sem título"}
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
          onClick={onClose}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default FavoritesModal;
