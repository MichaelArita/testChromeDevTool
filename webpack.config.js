const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, './extension/bundles'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              ['@babel/preset-react', { targets: "defaults" }]
                // '@babel/preset-env', 
                // '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.s?css/,
        exclude: /node_modules/,
        // npm i -D style-loader
        // npm i -D css-loader
        // npm i -D sass-loader
        //  - Have to also install Dart Sass or node-sass
        //  npm i sass
        //      - This installs Dart sass
        use: [
          'style-loader',
          'css-loader',
        ],
      }, 
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './app/index.html',
      filename: './index.html'
    }),
    new CopyPlugin({
      patterns: [{ from: './app/styles/style.css' }],
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './dist')
    },
  }
}