import axios from 'axios';
import { api } from '@/config/server';

const fetch = axios.create({
  baseURL: `${api}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export default fetch;
