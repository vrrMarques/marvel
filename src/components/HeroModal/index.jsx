import React from 'react';
import { useHero } from '../../context/HeroContext';
import Link from 'next/link';
import useFavoriteHeros from '../../lib/useFavoriteHeros';

const HeroModal = ({ isOpen, onClose }) => {
  const { setHero } = useHero();
  const { favoriteHeros, removeFavoriteHero } = useFavoriteHeros();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#001f3d] p-5 rounded-md w-[80vw] max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#FF3395]">Meus Heróis Favoritos</h2>
        <ul>
          {favoriteHeros.length === 0 ? (
            <li className="py-1 text-[#FF3395]">Nenhum herói favorito encontrado.</li>
          ) : (
            favoriteHeros.map((hero, index) => (
              <li key={index} className="py-1 text-[#FF3395] flex justify-between items-center">
                <Link 
                  href={`/feed/${hero.name}/${hero.id}`}
                  onClick={() => { setHero(hero); onClose(); }} 
                  className="text-[#FF3395] hover:underline"
                >
                  {hero.name || "Sem nome"}
                </Link>
                <button
                  onClick={() => removeFavoriteHero(index)}
                  className="text-[#FF3395] bg-transparent border-none cursor-pointer"
                >
                  Remover
                </button>
              </li>
            ))
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default HeroModal;
