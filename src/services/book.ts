import request from '@utils/request';
import { PageInfo } from '@utils/types';

export function upload2Bucket(params: any) {
  return request.post('/book/bucket/upload', params, { timeout: 3 * 60 * 1000 });
}

export function getCategoryList() {
  return request.get('/book/category/list');
}

export interface Book {
  name?: string;
  desc?: string;
  category1?: number;
  category2?: number;
  author?: string;
  files?: any[];
}

export function createBook(data: Book) {
  return request.post('/book', data);
}

interface BookListParams extends PageInfo, Book {}

export function getBookList(params: BookListParams) {
  return request.get('/book', params);
}
