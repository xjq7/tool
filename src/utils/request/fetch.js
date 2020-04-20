import axios from 'axios';

const fetch = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export default fetch;
