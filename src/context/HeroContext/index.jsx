'use client';
import { createContext, useContext, useState } from 'react';

const HeroContext = createContext();

export const HeroProvider = ({ children }) => {
  const [hero, setHero] = useState(null);
  const [favorites, setFavorites] = useState([]);

  return (
    <HeroContext.Provider value={{ hero, setHero,setFavorites,favorites }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => useContext(HeroContext);
