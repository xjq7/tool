import request from '@/utils/request';

export function getUploadToken() {
  return request.get('/public/sts-token');
}
