/* eslint-disable no-undef */
const env = process.env.NODE_ENV;

const config = {
  development: {
    api: 'https://api.xjq.icu'
  },
  production: {
    api: 'https://api.xjq.icu'
  }
};

export default config[env];
