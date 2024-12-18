"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getComicsById } from "../../../../../api/api";

const Comics = (props) => {
  const { id } = useParams();
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    setLoading(true);
    getComicsById(id)
      .then((res) => {
        setComics(res.data.results);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

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

  return (
    <>
      {loading ? (
        <div className="w-1/2 mx-auto h-full">
          <img
            className="w-full mt-20 md:w-1/2 mx-auto h-full"
            src="/images/animationloading.gif"
            alt="loading animation"
          />
        </div>
      ) : (
        <>
          <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {comics.map((comic) => {
              const image = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
              const isFavorite = favorites.some((fav) => fav.id === comic.id);
              return (
                <motion.div
                  key={comic.id}
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
          <h1 className="text-blue-200 font-normal md:text-xl text-center m-5">
            {comics.length === 0 && "Oops, No comics on this character"}
            {comics.length !== 0 &&
              "Note: You can buy these comics on their official website!"}
          </h1>
        </>
      )}
    </>
  );
};

export default Comics;
