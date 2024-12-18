"use client";

import { motion } from 'framer-motion';
import useAuth from "../../lib/useAuth";


const About = () => {
  const user = useAuth();

  if (!user) {
    return <div>Carregando...</div>;
  }
  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', duration: 1 }}
      className='mx-4'
    >
      <h1 className='text-4xl font-bold text-secondary text-center pt-12 pb-2'>
        Sobre o site
      </h1>
      <hr />
      <p className='text-2xl font-semibold text-white text-center p-10'>
      Este é um site onde podemos pesquisar os quadrinhos da Marvel, seja pelo personagem ou diretamente pela lista de quadrinhos. <br />
      </p>
      <p className='text-sm mt-10 mb-5 text-primary text-center'>
        Feito por Felipe Paulino com dados obtidos da api © 2024 MARVEL
      </p>
    </motion.div>
  );
};

export default About;
