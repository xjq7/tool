import React from 'react';
import PropTypes from 'prop-types';
import styles from './Success.scss';
import { Button, message } from 'antd';
import copy from 'copy-to-clipboard';
const Success = ({ url, uploadNext }) => {
  return (
    <div className={styles.box}>
      <h1 style={{ color: '#40a9ff' }}>上传成功!</h1>
      <img src={url} width={250}></img>
      <span className={styles.url}>{url}</span>
      <div>
        <Button
          style={{ marginRight: 20 }}
          type="primary"
          onClick={() => {
            copy(url);
            message.success('复制链接成功');
          }}
        >
          复制链接
        </Button>
        <Button
          type="primary"
          onClick={() => {
            uploadNext();
          }}
        >
          继续上传
        </Button>
      </div>
    </div>
  );
};

Success.propTypes = {
  url: PropTypes.string.isRequired,
  uploadNext: PropTypes.func.isRequired
};

export default Success;
