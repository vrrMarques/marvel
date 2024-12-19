"use client";
import React from "react";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import useAuth from "../../lib/useAuth";

const HomeComponent = () => {
  const user = useAuth();

  if (!user) {
    return <div>Carregando...</div>;
  }
  return (
    <div className="grid lg:grid-cols-2 m-8 mx-auto text-left">
      <div className="ml-8 font-semibold text-2xl text-white tracking-widest " style={{fontFamily:'Rowdies'}}>
        <motion.h4
          initial={{ x: -200, opacity: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          animate={{ x: 0, opacity: 100 }}
          className="md:mt-24"
        >
          Conheça os quadrinhos de todos
        </motion.h4>

        <p className="mt-6 text-secondary font-bold text-2xl md:text-3xl">
          Super {" "}
          <Typewriter
            words={["Herois", "Vilões", "Humanos"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>
        <div>
          <Link href="/feed">
            <button className="pl-2 text-sm bg-primary rounded-full p-3 md:w-1/3 mt-10 mr-4 transition duration-500 ease-in-out hover:bg-secondary transform hover:scale-110 text-white font-thin">
              Pesquisar por personagem
            </button>
          </Link>
          <Link href="/comicsList">
            <button className="text-sm bg-primary rounded-full p-3 md:w-1/3 mt-10 transition duration-500 ease-in-out hover:bg-secondary transform hover:scale-110 text-white font-thin">
              Todos os quadrinhos
            </button>
          </Link>
        </div>
      </div>
      <motion.div className="hidden h-1/2  lg:block md:grid-cols-6 text-white">
        <img className="absolute w-1/3  " src="/images/Vector.svg" alt="" />
        <motion.img
          initial={{ x: 200, opacity: 0 }}
          transition={{ duration: 1.5 }}
          animate={{ x: 0, opacity: 100 }}
          className="relative z-10 w-4/5"
          src="/images/deadpool.png"
          alt=""
        />
      </motion.div>
    </div>
  );
};

export default HomeComponent;
