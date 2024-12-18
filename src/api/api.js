import axios from 'axios';
import CryptoJS from 'crypto-js';

const publicKey = 'b92b07b0de3924c9d431617df447c169';
const privateKey = 'acb48b2c7bfec26cc6b706d4ff4ed7843bc3c714';
const ts = Date.now().toString(); // timestamp

const generateHash = () => {
  return CryptoJS.MD5(ts + privateKey + publicKey).toString();
};

export const search = async (name) => {
  const hash = generateHash();
  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  return response.data;
};

export const info = async (id) => {
  const hash = generateHash();
  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  return response.data;
};

export const getComicsById = async (id) => {
  const hash = generateHash();
  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  return response.data;
};

export const getComicsList = async (limit = 10, offset = 0) => {
  const hash = generateHash();
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar comics:', error);
    return null;
  }
};
