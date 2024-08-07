const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV?.trim() === 'development';
const webpackPublicPath = process.env.WEBPACK_PUBLIC_PATH?.trim();

module.exports = {
  entry: './src/index.ts',
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
  resolve: {
    extensions: ['.ts', '.tsx', '...'],
    alias: {
      component: path.resolve(__dirname, 'src/component'),
      route: path.resolve(__dirname, 'src/route'),
      share: path.resolve(__dirname, 'src/share'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  ...(isDevelopment
    ? {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
          // allowedHosts: 'all',
          historyApiFallback: true,
        },
      }
    : {
        mode: 'production',
        output: {
          filename: '[name].[contenthash].js',
          path: path.resolve(__dirname, 'dist'),
          publicPath: webpackPublicPath ?? '/',
          clean: true,
        },
      }),
};
