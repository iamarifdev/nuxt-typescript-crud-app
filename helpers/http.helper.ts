import axios from 'axios-observable';

export const http = axios.create({
  baseURL: 'http://localhost:3000/api'
});
