"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useHero } from "../../../../context/HeroContext";

const Details = () => {
  const { hero } = useHero();

  if (!hero) {
    return <div>Loading...</div>;
  }

  const image = `${hero.thumbnail?.path}.${hero.thumbnail?.extension}`;

  return (
    <>
      <motion.img
        initial={{ top: -400 }}
        animate={{ top: 0 }}
        transition={{ type: "spring" }}
        className="opacity-70 absolute top-0 left-0 z-0 w-full h-3/4 md:h-2/4 object-cover"
        style={{ zIndex: "-1" }}
        src={image}
        alt={hero.name}
      />
      <motion.div
        className="relative w-full mt-10 pl-5 mb-10"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
        transition={{ type: "spring", delay: 1, duration: 1.5 }}
      >
        <motion.h1 className="text-white font-black text-2xl md:text-4xl">
          {hero.name}
        </motion.h1>
        <p className="text-white text-md font-semibold text-md md:text-lg mt-5">
          {hero.description || "Não há descrição disponível"}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-col items-center justify-center h-full mt-10"
      >
        <h1 className="text-white font-black text-2xl md:text-4xl mb-5 text-center">
          Coleção de quadrinhos
        </h1>
        <Link href={`/feed/${hero.name}/${hero.id}/comics`}>
          <img
            className="w-1/3 mx-auto"
            src="/images/marvelcomics.png"
            alt="Imagem de quadrinhos"
          />
        </Link>
      </motion.div>
    </>
  );
};

export default Details;
