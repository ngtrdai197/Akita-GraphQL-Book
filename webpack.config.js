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
      title: 'Akita Project',
      contentImage:
        __dirname +
        './src/assets/83841501_194177878448201_3470588421347475456_o.jpg'
    })
  ]
};
