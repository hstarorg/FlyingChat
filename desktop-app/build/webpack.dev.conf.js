const webpackMerge = require('webpack-merge');

const baseConf = require('./webpack.base.conf');
const buildConfig = require('./build-config');

module.exports = webpackMerge(baseConf, {
  mode: 'development',
  output: {
    publicPath: `http://localhost:${buildConfig.devPort}/`
  },
  target: 'electron-renderer'
});
