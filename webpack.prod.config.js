const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const Dotenv = require('dotenv-webpack')

require('babel-polyfill')

const ENV_DIR = './config/'
let envPath
switch (process.env.NODE_ENV) {
  case 'local':
  case 'dev':
  case 'qa':
  case 'real':
  case 'docker':
    envPath = ENV_DIR + `${process.env.NODE_ENV}`.toLowerCase() + '.env'
    break
}

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
        })
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
      contracts: path.resolve(__dirname, 'contracts'),
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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: 'body',
    }),
    extractCSS,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'DEV': false,
      'DEPLOYED_ADDRESS': JSON.stringify(fs.readFileSync('deployedAddress', 'utf8')),
      'METAMASK': process.env.METAMASK,
    }),
    new CompressionPlugin(),
    new CopyWebpackPlugin([{
      from: 'static',
      to: 'static',
      toType: 'dir',
    }]),
    new Dotenv({
      path: envPath,
      systemvars: true,
    })
  ],
}
