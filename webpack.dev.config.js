/* eslint-disable no-undef */
const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dev'),
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
  plugins: [
    new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './dev/index.html'
    })
  ],
  devtool: '',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:10088',
        // changeOrigin: true, // target是域名的话，需要这个参数，
        secure: false // 设置支持https协议的代理
      }
    },
    contentBase: path.join(__dirname, './dev'),
    hot: true
  }
};
