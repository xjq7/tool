import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';
const Header = () => {
  return (
    <div>
      <div>
        <Link to="/">上传</Link>
        <Link to="/feature">功能介绍</Link>
      </div>
    </div>
  );
};

export default Header;
