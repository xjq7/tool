import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';
const Layout = ({ children }) => {
  return (
    <div className={styles.root}>
      {children}
      <div className={styles.footer_padding}></div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
