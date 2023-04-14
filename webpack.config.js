const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV?.trim() === 'development';
const webpackPublicPath = process.env.WEBPACK_PUBLIC_PATH?.trim();

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: webpackPublicPath ?? '/',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Fusor Tutorial',
    }),
    new webpack.DefinePlugin({
      'process.env.SOURCE_FILE_ROOT': JSON.stringify(
        process.env.SOURCE_FILE_ROOT?.trim(),
      ),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '...'],
    alias: {
      component: path.resolve(__dirname, 'src/component'),
      share: path.resolve(__dirname, 'src/share'),
    },
  },

  ...(isDevelopment
    ? {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
          historyApiFallback: true,
        },
      }
    : {
        mode: 'production',
      }),
};
