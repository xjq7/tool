import request from '@utils/request';

export function upload2Bucket(params: any) {
  return request.post('/book/bucket/upload', params);
}

export function getCategoryList() {
  return request.get('/book/category/list');
}

export function createBook(data: any) {
  return request.post('/book', data);
}
