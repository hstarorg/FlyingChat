const webpackMerge = require('webpack-merge');

const baseConf = require('./webpack.base.conf');
const buildConfig = require('./build-config');

module.exports = webpackMerge(baseConf, {
  mode: 'development',
  target: 'electron-renderer',
  output: {
    publicPath: `http://localhost:${buildConfig.devPort}/`
  },
  devServer: {
    port: buildConfig.devPort,
    hot: true
  }
});
