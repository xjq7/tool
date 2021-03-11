import axios from 'axios';
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
  baseURL: '',
  timeout: 60000
  // headers: { 'Content-Type': 'application/json' }
});
export function detectHost(params) {
  // return instance.get('http://pac.xjq.icu/parsingHost', { params }).then(res => res.data);
  return instance.get('http://127.0.0.1:10087/parsingHost', { params }).then(res => res.data);
}
export function getUrls(params) {
  return instance.get('http://154.209.87.138:10087/parsingUrl', { params }).then(res => res.data);
}
