import React from 'react';
import PropTypes from 'prop-types';
import { Upload, message, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styles from './UploadAliyun.scss';
const { Dragger } = Upload;
import { api } from '@/config/server';

const UploadAliyun = ({ onChange, viewSuccess }) => {
  const uploadParams = {
    name: 'file',
    multiple: false,
    action: `${api}/api/oss/upload`,
    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 > 5;
      if (isLt5M) {
        message.error('请选择小于5 mb 的图片');
        return false;
      }
    },
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
      <Button style={{ marginTop: 30 }} type="primary" onClick={viewSuccess}>
        查看已上传图片
      </Button>
    </>
  );
};

UploadAliyun.propTypes = {
  onChange: PropTypes.func.isRequired,
  viewSuccess: PropTypes.func.isRequired
};

export default UploadAliyun;
