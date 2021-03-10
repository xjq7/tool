import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';
const Header = () => {
  return (
    <div className={styles.root}>
      <div>
        <Link to="/" style={{ marginRight: 20, marginLeft: 20 }}>
          图床
        </Link>
        <Link to="/hash" style={{ marginRight: 20, marginLeft: 20 }}>
          文件md5计算
        </Link>
        {/* <Link to="/pac" style={{ marginRight: 20, marginLeft: 20 }}>
          pac配置文件
        </Link> */}
        <Link to="/feature" style={{ marginRight: 20, marginLeft: 20 }}>
          使用须知
        </Link>
      </div>
    </div>
  );
};

export default Header;
