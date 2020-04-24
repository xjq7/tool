import React from 'react';
import PropTypes from 'prop-types';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styles from './UploadAliyun.scss';
const { Dragger } = Upload;
import { dev, pro } from '@/config/server';
const UploadAliyun = ({ onChange }) => {
  const uploadParams = {
    name: 'file',
    accept: 'image/*',
    multiple: false,
    action: `${dev.api}ossUpload`,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        const {
          response: { url },
          name
        } = info.file;
        message.success(`${name}上传成功!`);
        onChange(url.replace('http', 'https'));
      } else if (status === 'error') {
        const { name } = info.file;
        message.error(`${name}上传失败`);
      }
    }
  };
  return (
    <>
      <Dragger {...uploadParams} className={styles.draggerBox}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">选择图片(5 mb 以下)</p>
      </Dragger>
    </>
  );
};

UploadAliyun.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default UploadAliyun;
