var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'react-dom', 'react'
];

module.exports = {
  watch: true,
  cache: true,
  entry: {
      bundle: ['babel-polyfill', './src/index.jsx'],
      vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: [".jsx", ".json", ".js"]
  },
  module: {
      rules: [
          {
              use: 'babel-loader',
              test: /\.jsx$/,
              exclude: /node_modules/
          },
          {
            test: /\.scss$/,
            use: [
                {
                    loader: "style-loader" // creates style nodes from JS strings
                },
                {
                    loader: "css-loader" // translates CSS into CommonJS
                },
                {
                    loader: "sass-loader" // compiles Sass to CSS
                }
            ]
          },
          {
              use: ['style-loader', 'css-loader'],
              test: /\.css$/
          }
      ]
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          names: ['vendor', 'manifest']
      }),
      new HtmlWebpackPlugin({
          template: 'src/index.html'
      }),
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
  ]
};
