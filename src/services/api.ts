import axios from 'axios';

const api = axios.create({
  baseURL: 'https://61f920a5783c1d0017c4497d.mockapi.io'
})

export { api };