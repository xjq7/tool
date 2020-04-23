import axios from 'axios';

const fetch = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
});

export default fetch;
