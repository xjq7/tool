import axios from 'axios';
import { api } from '@/config/server';
const fetch = axios.create({
  baseURL: `${api}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
});

export default fetch;
