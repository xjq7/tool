import axios from 'axios';
import config from '@/config/api';
import { message } from 'antd';

const errorFetch = error => {
  return Promise.reject(error);
};

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  return config;
}, errorFetch);

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  const { code, message: resMsg, data } = response;
  if (code === 1) {
    return data;
  } else {
    message.success(resMsg);
  }
}, errorFetch);

const instance = axios.create({
  baseURL: `${config.api}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

const methods = [
  { name: 'get', paramsKey: 'params' },
  { name: 'post', paramsKey: 'data' }
];
const fetch = methods.reduce((acc, cur) => {
  const { name, paramsKey } = cur;
  console.log(acc);
  acc[name] = (path, data = {}) => {
    const params = {};
    params[paramsKey] = data;
    instance({ url: path, method: name, ...params });
  };
  return acc;
}, {});

export default fetch;
