import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Img from './img';
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Img} />
      </Switch>
    </Router>
  );
};
export default App;
