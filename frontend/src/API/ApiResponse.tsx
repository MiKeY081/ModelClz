import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5002', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});



