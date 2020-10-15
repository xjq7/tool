import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, message, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styles from './UploadAliyun.scss';
const { Dragger } = Upload;
import config from '@/config/api';

const UploadAliyun = ({ onChange, currentTotal, addCurrentTotal }) => {
  const [loading, setLoading] = useState(false);
  const uploadParams = {
    name: 'file',
    multiple: true,
    action: `${config.api}/api/oss/upload`,
    showUploadList: false,
    beforeUpload(files) {
      setLoading(true);
      addCurrentTotal();
      const isLt5M = files.size / 1024 / 1024 > 10;
      if (isLt5M) {
        message.error('请选择小于10 mb 的文件');
        setLoading(false);
        return false;
      }
    },
    onChange(info) {
      const {
        file: { status },
        fileList
      } = info;
      if (status === 'done') {
        if (fileList.length <= currentTotal + 1) setLoading(false);
        addCurrentTotal();
        const {
          response: { url },
          name
        } = info.file;
        message.success(`${name}上传成功!`);
        onChange({ name, url: url.replace('http', 'https') });
      } else if (status === 'error') {
        setLoading(false);
        addCurrentTotal();
        const { name } = info.file;
        message.error(`${name}上传失败`);
      }
    }
  };
  return (
    <Spin spinning={loading} tip="上传中...">
      <Dragger {...uploadParams} className={styles.draggerBox}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">选择文件(10 mb 以下,一次最多5个)</p>
      </Dragger>
    </Spin>
  );
};

UploadAliyun.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentTotal: PropTypes.number.isRequired,
  addCurrentTotal: PropTypes.func.isRequired
};

export default UploadAliyun;
