const fs = require('fs');
const path = require('path');
const winston = require('winston');
const config = require('./../config');

if (!fs.existsSync(config.logFilePath)) {
  fs.mkdirSync(config.logFilePath);
}

const logger = new (winston.Logger)({
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
