import { useEffect } from 'react';
import { useHero } from '../context/HeroContext';

const useFavoriteHeros = () => {
  const { favoriteHeros, setFavoriteHeros } = useHero();

  const loadFavoriteHeros = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteHeros')) || [];
    setFavoriteHeros(storedFavorites);
  };

  useEffect(() => {
    loadFavoriteHeros();
  }, [setFavoriteHeros]);

  const updateLocalStorage = (updatedFavorites) => {
    localStorage.setItem('favoriteHeros', JSON.stringify(updatedFavorites));
    setFavoriteHeros(updatedFavorites);
  };

  const addFavoriteHero = (hero) => {
    const updatedFavorites = [...favoriteHeros, hero];
    updateLocalStorage(updatedFavorites);
  };

  const removeFavoriteHero = (index) => {
    const updatedFavorites = favoriteHeros.filter((_, i) => i !== index);
    updateLocalStorage(updatedFavorites);
  };

  return { favoriteHeros, addFavoriteHero, removeFavoriteHero };
};

export default useFavoriteHeros;
