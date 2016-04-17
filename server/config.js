'use strict';

var path = require('path');

module.exports = {
  port: 7410,
  dbFilePath: path.join(__dirname, './database/'),
  logFilePath: path.join(__dirname, './logs/')
};