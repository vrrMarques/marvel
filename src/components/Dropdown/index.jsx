import Link from "next/link";
import useAuth from "../../lib/useAuth";
import React, { useState } from "react";
import { logout } from "../../lib/auth";
import FavoritesModal from "../FavoritesModal";
import HeroModal from "../HeroModal";

const Dropdown = () => {
  const user = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenHero, setModalOpenHero] = useState(false);

  const handleFavoritesClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleHeroModalClick = () => {
    setModalOpenHero(!modalOpenHero);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="text-gray-900 font-bold">
      <div className="w-full text-center mt-3 space-y-4">
        <Link
          href="/"
          className="block px-2 py-1 text-2xl font-thin text-gray-100 hover:text-blue-400"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="block px-2 py-1 text-2xl font-thin text-gray-100 hover:text-blue-400"
        >
          Sobre
        </Link>

        {user && (
          <>
            <button
              onClick={handleHeroModalClick}
              className="block w-full px-2 py-1 text-2xl font-thin text-gray-100 hover:text-blue-400 transition duration-500 ease-in-out"
            >
              Meus Heróis
            </button>

            <button
              onClick={handleFavoritesClick}
              className="block w-full px-2 py-1 text-2xl font-thin text-gray-100 hover:text-blue-400 transition duration-500 ease-in-out"
            >
              Quadrinhos favoritos
            </button>

            <button
              onClick={handleLogout}
              className="block w-full px-2 py-1 text-2xl font-thin text-gray-100 hover:text-red-400 transition duration-500 ease-in-out"
            >
              Logout
            </button>
          </>
        )}
      </div>

      <HeroModal isOpen={modalOpenHero} onClose={handleHeroModalClick} />
      <FavoritesModal isOpen={modalOpen} onClose={handleFavoritesClick} />
    </div>
  );
};

export default Dropdown;
