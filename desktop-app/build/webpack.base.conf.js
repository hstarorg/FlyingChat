const util = require('./util');
module.exports = {
  entry: {
    vendor: './src/index.js'
  },
  module: {
    rules: [
      // {
      //   test: /.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/react'],
      //       plugins: []
      //     }
      //   }
      // }
    ]
  },
  plugins: [],
  output: {
    filename: 'bundle.js',
    path: util.root('dist')
  }
};
