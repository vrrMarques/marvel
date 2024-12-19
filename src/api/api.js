import axios from 'axios';
import CryptoJS from 'crypto-js';

const publicKey = 'b92b07b0de3924c9d431617df447c169';
const privateKey = 'acb48b2c7bfec26cc6b706d4ff4ed7843bc3c714';
const ts = Date.now().toString();

const generateHash = () => {
  return CryptoJS.MD5(ts + privateKey + publicKey).toString();
};

export const search = async (name) => {
  const hash = generateHash();
  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`
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

export const getComicsById = async (id, offset, limit) => {
  const hash = generateHash();
  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`
  );
  return response.data;
};

export const getComicsList = async (limit = 10, offset = 0, search = '') => {
  const hash = generateHash();
  try {
    let url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
    
    if (search.trim()) {
      url += `&titleStartsWith=${encodeURIComponent(search)}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar comics:', error);
    return { error: 'Não foi possível buscar os quadrinhos.' };
  }
};
