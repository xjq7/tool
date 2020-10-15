/* eslint-disable no-undef */
const env = process.env.NODE_ENV;

const config = {
  development: {
    api: 'http://127.0.0.1:10088'
  },
  production: {
    api: 'https://api.xjq.icu'
  }
};

export default config[env];
