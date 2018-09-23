const webpackMerge = require('webpack-merge');

const baseConf = require('./webpack.base.conf');
const buildConfig = require('./build-config');

module.exports = webpackMerge(baseConf, {
  mode: 'production',
  target: 'electron-main'
});
