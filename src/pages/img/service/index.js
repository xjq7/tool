import { fetch } from '@/utils';
export function getFolderList() {
  return fetch.get('/ossInfo/getFolderList');
}
