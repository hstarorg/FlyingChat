'use strict';

var path = require('path')
var fs = require('fs')
var winston = require('winston')

var config = require('./../config')

if (!fs.existsSync(config.logFilePath)) {
  fs.mkdirSync(config.logFilePath);
}

var logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({
      name: 'info-file',
      filename: path.join(config.logFilePath, 'info.log'),
      level: 'info'
    }),
    new winston.transports.File({
      name: 'error-file',
      filename: path.join(config.logFilePath, 'error.log'),
      level: 'error'
    }),
    new winston.transports.Console()
  ]
});

module.exports = logger;
