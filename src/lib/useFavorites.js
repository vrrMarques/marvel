import { useState, useEffect } from 'react';
import { useHero } from "../context/HeroContext";

const useFavorites = () => {
  const { setFavorites, favorites } = useHero();
  
  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  };

  useEffect(() => {
    loadFavorites();
    const interval = setInterval(loadFavorites, 500);

    return () => clearInterval(interval);
  }, []);

  const updateLocalStorage = (updatedFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const removeFavorite = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    updateLocalStorage(updatedFavorites);
  };

  return { favorites, removeFavorite };
};

export default useFavorites;
