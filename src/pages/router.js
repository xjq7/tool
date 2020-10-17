import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header, Footer, Layout } from '@/components';
import Img from './img';
import Feature from './feature';
import Announcement from './announcement';
import Hash from './hash';
import DetectImg from './detectImg';

const App = () => {
  return (
    <Router>
      <Header />
      <Layout>
        <Switch>
          <Route path="/" component={Img} exact />
          <Route path="/feature" component={Feature} />
          <Route path="/detectImg" component={DetectImg} />
          <Route path="/hash" component={Hash} />
        </Switch>
      </Layout>
      <Footer />
    </Router>
  );
};
export default App;
