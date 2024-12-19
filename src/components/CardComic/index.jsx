import React from "react";
import { motion } from "framer-motion";

const ComicCard = ({ comic, isFavorite, toggleFavorite }) => {
  const image = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

  return (
    <motion.div
      className="px-5 mb-10"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 100, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="h-64 bg-gray-200 mb-3 object-cover rounded-lg">
        <img className="w-full h-full object-cover rounded-lg" src={image} alt={comic.title} />
      </div>
      <h1 className="text-2xl text-primary">{comic.title}</h1>
      <h1 className="text-md text-green-400">${comic.prices[0].price}</h1>
      <button
        onClick={() => toggleFavorite(comic)}
        className={`mt-3 px-4 py-2 rounded-lg text-white ${isFavorite ? "bg-red-500" : "bg-blue-500"}`}
      >
        {isFavorite ? "Remover dos favoritos" : "Add aos favoritos"}
      </button>
    </motion.div>
  );
};

export default ComicCard;
