import styles from './index.module.less';

const Layout = ({ children }: any) => {
  return <div className={styles.root}>{children}</div>;
};

export default Layout;
