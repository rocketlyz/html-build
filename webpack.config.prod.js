'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ENTRY, PROJECT_PATH, SOURCE_DIR, TARGET_DIR, PUBLIC_PATH } = require('./config.js');
const buildrc = require('./buildrc');


module.exports = {
  mode: 'production',
  entry: ENTRY,
  output: {
    filename: '[name]-[chunkhash:8].js',
    path: path.resolve(PROJECT_PATH, TARGET_DIR),
    publicPath: PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: buildrc['production']['css-modules'],
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    new AssetsWebpackPlugin({
      processOutput: assets => JSON.stringify(assets).replace(new RegExp(PUBLIC_PATH, 'ig'), ''),
    }),
  ],
  resolve: {
    modules: [ path.resolve(__dirname, SOURCE_DIR, 'src'), 'node_modules' ],
    extensions: [ '.js', '.jsx', '.css', '.scss' ],
  },
};
