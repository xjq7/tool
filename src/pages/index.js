import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from './components';
import Img from './img';
import Feature from './feature';
const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Img} exact />
        <Route path="/feature" component={Feature} />
      </Switch>
    </Router>
  );
};
export default App;
