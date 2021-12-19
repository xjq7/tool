/* eslint-disable prefer-promise-reject-errors */
import { useState, useEffect, useCallback } from 'react';
import AliyunOss from 'ali-oss';
import { getUploadToken } from '@/api';

const EXPIRES = 1000 * 60 * 10;

function useAliyunOss() {
  const [ossToken, setOssToken] = useState();
  const [instance, setInstance] = useState();

  const fetchToken = useCallback(() => {
    return getUploadToken().then((res) => {
      setOssToken(res);
      return res;
    });
  }, []);

  const initAliOss = useCallback(() => {
    if (!ossToken) return;
    const { AccessKeyId, AccessKeySecret, SecurityToken } = ossToken || {};
    const store = new AliyunOss({
      ...ossToken,
      stsToken: SecurityToken,
      accessKeyId: AccessKeyId,
      accessKeySecret: AccessKeySecret,
      refreshSTSTokenInterval: EXPIRES,
      refreshSTSToken: () => fetchToken(),
    });
    setInstance(store);
  }, [ossToken, fetchToken]);

  useEffect(() => {
    initAliOss();
  }, [initAliOss]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return { ossStore: instance, ossToken, fetchToken };
}

export default useAliyunOss;
