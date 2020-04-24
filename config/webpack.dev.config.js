/* eslint-disable no-undef */
const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  cache: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(sc|c)ss$/,
        use: ['style-loader', 'css-loader?modules=true', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader?javascriptEnabled=true']
      }
    ]
  },
  plugins: [new HardSourceWebpackPlugin()],
  devtool: '',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    hot: true
  }
};
