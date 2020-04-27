import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';
const Header = () => {
  return (
    <div className={styles.root}>
      <div>
        <Link to="/" style={{ marginRight: 20, marginLeft: 20 }}>
          上传
        </Link>
        <Link to="/feature">使用须知</Link>
      </div>
    </div>
  );
};

export default Header;
