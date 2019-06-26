const { envPath, defaultEnvPath } = require('./config')
const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const Dotenv = require('dotenv-webpack')

require('babel-polyfill')

const extractCSS = new ExtractTextPlugin('bundle-[hash:6].css')


module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle-[hash:6].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true },
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'src/styles')],
              },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      klaytn: path.resolve(__dirname, 'src/klaytn/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
      actions: path.resolve(__dirname, 'src/actions'),
      images: path.resolve(__dirname, 'static/images/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      enhancers: path.resolve(__dirname, 'src/enhancers/'),
    },
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: 'body',
    }),
    extractCSS,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      DEV: false,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CompressionPlugin(),
    new CopyWebpackPlugin([{
      from: 'static',
      to: 'static',
      toType: 'dir',
    }]),
    new Dotenv({
      path: envPath,
      defaults: defaultEnvPath,
      systemvars: true,
    }),
  ],
}
