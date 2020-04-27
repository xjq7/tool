import React from 'react';
import App from './pages';
import Layout from './pages/layout';
class RouterApp extends React.Component {
  render() {
    return (
      <Layout>
        <App />
      </Layout>
    );
  }
}

export default RouterApp;
