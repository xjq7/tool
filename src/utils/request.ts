import axios from 'axios';
import { message } from 'antd';

// @ts-ignore
const { VITE_API: API } = import.meta.env;

const instance = axios.create({
  baseURL: `${API}/v1`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

const errorFetch = (error: any) => {
  return Promise.reject(error);
};

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, errorFetch);

// 添加响应拦截器
instance.interceptors.response.use(function ({ data: responseData }) {
  // 对响应数据做点什么
  const { code, message: msg, data } = responseData;
  if (code === 0) {
    return data;
  } else {
    message.error(msg);
  }
}, errorFetch);

// const methods = [
//   { name: 'get', paramsKey: 'params' },
//   { name: 'post', paramsKey: 'data' },
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

export const get = function (url: string, data?: any): any {
  return instance.get(url, { params: data });
};
export const post = function (url: string, data?: any): any {
  return instance.post(url, data);
};

export default { get, post };
