import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, message, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useAliyunOss } from '@/hooks';
import styles from './UploadAliyun.scss';
const { Dragger } = Upload;

const UploadAliyun = ({ onChange }) => {
  const [loading, setLoading] = useState(false);

  const { ossStore } = useAliyunOss();

  const upload = ({ file }) => {
    const { name } = file;
    const date = new Date();
    const YY = date.getFullYear();
    const MM = date.getMonth() + 1;
    const DD = date.getDate();
    let folder = `/${YY}/${MM}/${DD}/`;
    let reNameAsDate = `${YY}.${MM}.${DD}-`;
    setLoading(true);
    ossStore
      .put(`${folder}${reNameAsDate}${name}`, file)
      .then(res => {
        console.log(res);
        const { url } = res;
        message.success(`${name}上传成功!`);
        onChange({ name, url });
      })
      .catch(err => {
        message.error(`${name}上传失败`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const uploadParams = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    customRequest: upload,
    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 > 10;
      if (isLt5M) {
        message.error('请选择小于10 mb 的文件');
        return false;
      }
    }
  };
  return (
    <Spin spinning={loading} tip="上传中...">
      <Dragger {...uploadParams} className={styles.draggerBox}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">选择文件(10 mb 以下)</p>
      </Dragger>
    </Spin>
  );
};

UploadAliyun.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default UploadAliyun;
