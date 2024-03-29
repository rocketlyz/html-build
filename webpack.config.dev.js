'use strict';

const path = require('path');
const webpack = require('webpack');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const buildrc = require('./buildrc');

const {
  ENTRY,
  SOURCE_DIR,
  DEV_HOST,
  DEV_PORT,
  TARGET_DIR,
  PUBLIC_PATH,
} = require('./config');

module.exports = {
  mode: 'development',
  entry: ENTRY,
  output: {
    filename: '[name]-stamp4hash.js',
    publicPath: 'http://' + DEV_HOST + ':' + DEV_PORT  + '/',
  },
  module: {
    rules: [{
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'eslint-loader',
          options: {
            emitError: true,
          }
        }]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: buildrc['development']['css-modules'],
              importLoaders: 1,
            }
          },
          'postcss-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5120,
          }
        }]
      }
    ]
  },
  plugins: [
    new StylelintWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: [path.resolve(__dirname, SOURCE_DIR, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  devServer: {
    hot: true,
    host: DEV_HOST,
    port: DEV_PORT,
    contentBase: PUBLIC_PATH
  },
  devtool: 'cheap-module-eval-source-map',
};
