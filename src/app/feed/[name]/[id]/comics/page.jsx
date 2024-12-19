"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getComicsById } from "../../../../../api/api";
import { useHero } from "../../../../../context/HeroContext";
import ComicCard from "../../../../../components/CardComic";

const Comics = () => {
  const { id } = useParams();
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setFavorites, favorites } = useHero();
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const comicsPerPage = 5;

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [setFavorites]);

  const loadComics = () => {
    setLoading(true);
    getComicsById(id, offset, comicsPerPage)
      .then((res) => {
        const newComics = res.data.results;
        setComics((prevComics) => {
          const comicsSet = new Set(prevComics.map((comic) => comic.id));
          const uniqueComics = newComics.filter((comic) => !comicsSet.has(comic.id));
          return [...prevComics, ...uniqueComics];
        });
        setHasMore(newComics.length === comicsPerPage);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadComics();
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
            {comics.length !== 0 && "Nota: Você pode comprar os quadrinhos no site oficial!"}
          </h1>
        </>
      )}
    </>
  );
};

export default Comics;
