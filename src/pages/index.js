import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header, Footer } from './components';
import Img from './img';
import Feature from './feature';
import Layout from './layout';
const App = () => {
  return (
    <Router>
      <Header />
      <Layout>
        <Switch>
          <Route path="/" component={Img} exact />
          <Route path="/feature" component={Feature} />
        </Switch>
      </Layout>
      <Footer />
    </Router>
  );
};
export default App;
