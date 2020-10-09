/* eslint-disable no-undef */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const vendorPkg = ['react', 'react-dom', 'react-router-dom', 'prop-types'];
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: { bundle: './index.js', vendor: vendorPkg },
  output: {
    publicPath: 'https://image.xjq.icu/img',
    filename: '[name].[hash].js'
  },
  mode: 'production',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader?modules=true', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader?javascriptEnabled=true']
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css'
    }),
    new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new CleanWebpackPlugin()
    // new BundleAnalyzerPlugin()
  ],

  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        reactBase: {
          name: 'reactBase',
          test: module => {
            return /react|prop-types/.test(module.context);
          },
          chunks: 'initial',
          priority: 10
        },
        common: {
          name: 'common',
          chunks: 'initial',
          priority: 2,
          minChunks: 2
        }
      }
    }
  }
};
