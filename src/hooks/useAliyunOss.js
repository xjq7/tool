/* eslint-disable prefer-promise-reject-errors */
import { useState, useEffect, useCallback } from 'react';
import AliyunOss from 'ali-oss';
import request from '@/utils/request';

function getUploadToken() {
  return request.get('/oss/ststoken');
}

function useAliyunOss() {
  const [ossToken, setOssToken] = useState();
  const [instance, setInstance] = useState();

  const fetchToken = () => {
    return getUploadToken().then(res => {
      setOssToken(res);
      return res;
    });
  };

  const initAliOss = useCallback(() => {
    const { AccessKeyId, AccessKeySecret, SecurityToken } = ossToken || {};
    const store = new AliyunOss({
      ...ossToken,
      stsToken: SecurityToken,
      accessKeyId: AccessKeyId,
      accessKeySecret: AccessKeySecret
    });
    setInstance(store);
  }, [ossToken]);

  useEffect(() => {
    if (ossToken) {
      initAliOss();
    }
  }, [ossToken, initAliOss]);
  useEffect(() => {
    fetchToken();
  }, []);

  return { ossStore: instance, ossToken, fetchToken };
}

export default useAliyunOss;
