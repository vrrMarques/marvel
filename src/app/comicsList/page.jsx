"use client";
import React, { useEffect, useState } from "react";
import { getComicsList } from "../../api/api";
import { useHero } from "../../context/HeroContext";
import ComicCard from "../../components/CardComic";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setFavorites, favorites } = useHero();
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [initialComics, setInitialComics] = useState([]);

  const comicsPerPage = 5;

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const allComicsList = (search = "") => {
    setLoading(true);
    getComicsList(comicsPerPage, offset, search)
      .then((response) => {
        const newComics = response.data.results;
        if (offset === 0) {
          setComics(newComics);
          if (search === "") {
            setInitialComics(newComics);
          }
        } else {
          setComics((prevComics) => [...prevComics, ...newComics]);
        }
        setHasMore(newComics.length === comicsPerPage);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    allComicsList(searchTerm); 
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      setOffset(0);
      setComics([]);
      allComicsList(searchTerm);
    }
  };

  const handleSearchClick = () => {
    setOffset(0);
    setComics([]);
    allComicsList(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setOffset(0);
    setHasMore(true);
    setComics(initialComics);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setComics(initialComics);
    }
  }, [searchTerm, initialComics]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading]);

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
          value={searchTerm}
          className="w-full text-gray-900 py-3 -ml-6 lg:-ml-0 pl-11 lg:pl-14 z-0 border font-bold rounded-full border-gray-600  focus:border-primary focus:outline-none focus:ring placeholder-gray-900 bg-blue-200"
          placeholder="Pesquisar"
          onChange={handleSearchChange}
          onKeyDown={handleSearchEnter}
        />
        <button
          className="absolute p-3 ml-2 rounded-lg bg-primary focus:outline-none"
          onClick={handleSearchClick}
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

      {loading && comics.length === 0 ? (
        <div className="w-1/3 mx-auto h-full">
          <img
            className="w-3/4 mt-20 md:w-1/2 mx-auto h-full"
            src="/images/animationloading.gif"
            alt="loading animation"
          />
        </div>
      ) : (
        <>
          <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {comics.map((comic, i) => {
              const image = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
              const isFavorite = favorites.some((fav) => fav.id === comic.id);
              return (
                <ComicCard
                  key={`${comic.id}-${i}`}
                  comic={comic}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                />
              );
            })}
          </div>
          {loading && comics.length > 0 && (
            <div className="w-full flex justify-center mt-4">
              <div className="w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}
          <h1 className="text-blue-200 font-normal md:text-xl text-center m-5">
            {comics.length === 0 && "Oops, no momento não há quadrinhos disponíveis"}
            {comics.length !== 0 &&
              "Nota: Você pode comprar os quadrinhos no site oficial!"}
          </h1>
        </>
      )}
    </>
  );
};

export default Comics;
