import PropTypes from 'prop-types';
import styles from './index.module.less';

const Layout = ({ children }: any) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
