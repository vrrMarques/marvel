'use client';
import { createContext, useContext, useState } from 'react';

const HeroContext = createContext();

export const HeroProvider = ({ children }) => {
  const [hero, setHero] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoriteHeros, setFavoriteHeros] = useState([]);

  return (
    <HeroContext.Provider value={{ hero, setHero,setFavorites,favorites, setFavoriteHeros, favoriteHeros }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => useContext(HeroContext);
