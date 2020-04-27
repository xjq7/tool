import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header, Footer } from './components';
import Img from './img';
import Feature from './feature';
import Layout from './layout';
import Announcement from './announcement';
const App = () => {
  return (
    <Router>
      <Header />
      <Layout>
        <Switch>
          <Route path="/" component={Img} exact />
          <Route path="/feature" component={Feature} />
          <Route path="/announcement" component={Announcement} />
        </Switch>
      </Layout>
      <Footer />
    </Router>
  );
};
export default App;
