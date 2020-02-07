const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.gql', '.graphql'],
    modules: [path.resolve(__dirname), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin({
      alwaysNotify: true,
      title: 'Akita'
    })
  ]
};
