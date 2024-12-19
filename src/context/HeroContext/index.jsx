'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const HeroContext = createContext();

export const HeroProvider = ({ children }) => {
  const [hero, setHero] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoriteHeros, setFavoriteHeros] = useState([]);

  useEffect(() => {
    const storedHero = localStorage.getItem('hero');
    if (storedHero) {
      setHero(JSON.parse(storedHero));
    }
  }, []);

  const setHeroInStorage = (newHero) => {
    setHero(newHero);
    localStorage.setItem('hero', JSON.stringify(newHero));
  };

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    if (favoriteHeros.length > 0) {
      localStorage.setItem('favoriteHeros', JSON.stringify(favoriteHeros));
    }
  }, [favoriteHeros]);

  return (
    <HeroContext.Provider value={{ 
      hero, 
      setHero: setHeroInStorage, 
      favorites, 
      setFavorites, 
      favoriteHeros, 
      setFavoriteHeros 
    }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => useContext(HeroContext);
