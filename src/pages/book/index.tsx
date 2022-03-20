import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Home from './home';
import styles from './index.module.less';

export default function Book() {
  let { path, url } = useRouteMatch();
  console.log('Book path:', path);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={path} style={{ marginRight: 20, marginLeft: 20 }}>
          主页
        </Link>
      </div>

      <Switch>
        <Route exact path={path}>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
