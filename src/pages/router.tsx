import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header, Footer, Layout } from '@components';
import Img from './img';
import Feature from './feature';
import Hash from './hash';
import Bucket from './bucket';

const App = () => {
  return (
    <Router>
      <Header />
      <Layout>
        <Switch>
          <Route path="/" component={Img} exact />
          <Route path="/feature" component={Feature} />
          <Route path="/hash" component={Hash} />
          <Route path="/bucket" component={Bucket} />
        </Switch>
      </Layout>
      <Footer />
    </Router>
  );
};
export default App;
