"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";
import { search } from "../../api/api";
import Card from "../../components/Card";
import { useHero } from "../../context/HeroContext";
import useAuth from "../../lib/useAuth";
import useFavoriteHeros from "../../lib/useFavoriteHeros";
import { FiHeart } from "react-icons/fi";

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

const Feed = () => {
  const user = useAuth();
  const { setHero } = useHero();
  const { favoriteHeros, addFavoriteHero, removeFavoriteHero } =
    useFavoriteHeros();
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <div>Carregando...</div>;
  }

  const searchHeros = (name) => {
    setLoading(true);
    search(name)
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    searchHeros(value);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      searchHeros(value);
    }
  };

  const handleFavoriteHero = (hero) => {
    const isFavorite = favoriteHeros.some((fav) => fav.id === hero.id);
    if (!isFavorite) {
      addFavoriteHero(hero);
    } else {
      const index = favoriteHeros.findIndex((fav) => fav.id === hero.id);
      removeFavoriteHero(index);
    }
  };

  return (
    <>
      <div className="mt-5 w-3/4 mx-auto">
        <span className="absolute mt-3.5 -ml-4 lg:ml-2 items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-900"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>

        <input
          type="text"
          value={value}
          className="w-full text-gray-900 py-3 -ml-6 lg:-ml-0 pl-11 lg:pl-14 z-0 border font-bold rounded-full border-gray-600  focus:border-primary focus:outline-none focus:ring placeholder-gray-900 bg-blue-200"
          placeholder="Pesquisar "
          onChange={handleChange}
          onKeyDown={handleSearchEnter}
        />
        <button
          className="absolute p-3 ml-2 rounded-lg  bg-primary  focus:outline-none"
          onClick={handleClick}
        >
          <svg className="w-5 h-6 text-white" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>

      <div>
        {loading ? (
          <div className="w-1/3 mx-auto h-full">
            <img
              className="w-3/4 mt-20 md:w-1/2 mx-auto h-full"
              src="/images/animationloading.gif"
              alt="loading animation"
            />
          </div>
        ) : data.length > 0 ? (
          <div className="m-10 w-full ml-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pr-9 ">
            {data.map((hero) => (
              <motion.div
                key={hero.id}
                whileHover={{ scale: 1.1 }}
                transition={transition}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <Link
                  href={`/feed/${hero.name}/${hero.id}`}
                  onClick={() => setHero(hero)}
                >
                  <Card
                    thumbnail={hero.thumbnail}
                    name={hero.name}
                    description={hero.description}
                  />
                </Link>

                <motion.button
                  onClick={() => handleFavoriteHero(hero)}
                  className="absolute top-3 right-3 p-2 bg-transparent text-white border-2 border-white rounded-full focus:outline-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 1,
                    duration: 1,
                    ease: "easeOut",
                  }}
                >
                  {favoriteHeros.some((fav) => fav.id === hero.id) ? (
                    <FiHeart className="text-red-500 animate-pulse" size={24} />
                  ) : (
                    <FiHeart className="text-gray-300 hover:text-red-500" size={24} />
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>
        ) : (
          <h1 className="text-white text-center mt-10 p-10">
            Se você não obtiver resultados
            <br />
            pesquise palavras relevantes. Por ex: Para Spiderman pesquise
            'spider'
          </h1>
        )}
      </div>
    </>
  );
};

export default Feed;
