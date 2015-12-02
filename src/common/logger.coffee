path = require('path')
fs = require('fs')
winston = require('winston')
config = require('./../config')

if not fs.existsSync(config.logFilePath)
  fs.mkdirSync(config.logFilePath)

logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({
      name: 'info-file'
      filename: path.join(config.logFilePath, 'info.log')
      level: 'info'
    })
    new winston.transports.File({
      name: 'error-file'
      filename: path.join(config.logFilePath, 'error.log')
      level: 'error'
    })
    new winston.transports.Console()
  ]
})

module.exports = logger
