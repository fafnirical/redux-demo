'use strict';

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const targetDir = path.resolve(__dirname, 'public');

// We always use these plugins
const plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development',
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
  }),
];

module.exports = {
  devtool: 'source-map',

  entry: [
    path.resolve(__dirname, 'src/index.tsx'),
  ],

  output: {
    path: targetDir,
    publicPath: '',
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  devServer: {
    host: '0.0.0.0',
    port: 8000,

    // Show errors in the browser
    overlay: true,

    // Don't fall back to the filesystem during development
    contentBase: false,
  },

  plugins,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
      },
    ],
  },
};
