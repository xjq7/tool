/* eslint-disable no-undef */
import dev from './dev.config';
import pro from './pro.config';

const env = process.env.NODE_ENV;

const config = {
  development: dev,
  production: pro
};

export default config[env];
