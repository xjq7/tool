import axios from 'axios';
import config from '@/config';
import { message } from 'antd';

const instance = axios.create({
  baseURL: `${config.api}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

const errorFetch = error => {
  return Promise.reject(error);
};

// 添加请求拦截器
instance.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  return config;
}, errorFetch);

// 添加响应拦截器
instance.interceptors.response.use(function({ data: responseData }) {
  // 对响应数据做点什么
  const { code, msg, data } = responseData;
  if (code === 1) {
    return data;
  } else {
    message.success(msg);
  }
}, errorFetch);

// const methods = [
//   { name: 'get', paramsKey: 'params' },
//   { name: 'post', paramsKey: 'data' }
// ];
// const fetch = methods.reduce((acc, cur) => {
//   const { name, paramsKey } = cur;
//   acc[name] = (path, data = {}) => {
//     const params = {};
//     params[paramsKey] = data;
//     instance({ url: path, method: name, ...params });
//   };
//   return acc;
// }, {});

export default instance;
