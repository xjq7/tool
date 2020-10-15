import request from '@/utils/request';
export function getFolderList() {
  return request.get('/ossInfo/getFolderList');
}
