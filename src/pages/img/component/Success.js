import React from 'react';
import PropTypes from 'prop-types';
import styles from './Success.scss';
import { Button, message } from 'antd';
import copy from 'copy-to-clipboard';

function isImg(name) {
  for (const v of ['.png', '.gif', '.jpg', 'jpeg']) {
    if (name.endsWith(v)) return true;
  }
  return false;
}

const Success = ({ url, uploadNext }) => {
  return (
    <div className={styles.box}>
      {url === '' ? (
        <>
          <span>您还没上传任何图片哦</span>
          <Button
            style={{ marginTop: 20 }}
            type="primary"
            onClick={() => {
              uploadNext();
            }}
          >
            继续上传
          </Button>
        </>
      ) : (
        <>
          <h1 style={{ color: '#40a9ff' }}>上传成功!</h1>
          {isImg(url) && <img src={url} className={styles.img}></img>}
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
            <Button type="primary" onClick={uploadNext}>
              继续上传
            </Button>
          </div>
        </>
      )}
      {/* <img src={url} width={180}></img> */}
    </div>
  );
};

Success.propTypes = {
  url: PropTypes.string.isRequired,
  uploadNext: PropTypes.func.isRequired
};

export default Success;
