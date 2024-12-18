"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { getComicsList } from "../../api/api";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const comicsPerPage = 5;

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const allComicsList = () => {
    setLoading(true);
    getComicsList(comicsPerPage, offset)
      .then((response) => {
        const newComics = response.data.results;
        setComics((prevComics) => [...prevComics, ...newComics]);
        setHasMore(newComics.length === comicsPerPage);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    allComicsList();
  }, [offset]);

  const toggleFavorite = (comic) => {
    let updatedFavorites = [...favorites];
    const comicIndex = updatedFavorites.findIndex((fav) => fav.id === comic.id);

    if (comicIndex !== -1) {
      updatedFavorites.splice(comicIndex, 1);
    } else {
      updatedFavorites.push(comic);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleScroll = () => {
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom && hasMore && !loading) {
      setOffset((prevOffset) => prevOffset + comicsPerPage);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading]);

  return (
    <>
      {loading && comics.length === 0 ? (
        <div className="w-1/2 mx-auto h-full flex justify-center items-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {comics.map((comic, i) => {
              const image = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
              const isFavorite = favorites.some((fav) => fav.id === comic.id);
              return (
                <motion.div
                    key={`${comic.id}-${i}`}
                  className="px-5 mb-10"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 100, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <img
                    className="mb-3 object-cover rounded-lg"
                    src={image}
                    alt={comic.title}
                  />
                  <h1 className="text-2xl text-primary">{comic.title}</h1>
                  <h1 className="text-md text-green-400">
                    ${comic.prices[0].price}
                  </h1>
                  <button
                    onClick={() => toggleFavorite(comic)}
                    className={`mt-3 px-4 py-2 rounded-lg text-white ${isFavorite ? "bg-red-500" : "bg-blue-500"}`}
                  >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </button>
                </motion.div>
              );
            })}
          </div>
          {loading && comics.length > 0 && (
            <div className="w-full flex justify-center mt-4">
              <div className="w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}
          <h1 className="text-blue-200 font-normal md:text-xl text-center m-5">
            {comics.length === 0 && "Oops, No comics available"}
            {comics.length !== 0 &&
              "Note: You can buy these comics on their official website!"}
          </h1>
        </>
      )}
    </>
  );
};

export default Comics;
