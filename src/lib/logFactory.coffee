log4js = require('log4js')

log4js.loadAppender('file')
log4js.addAppender(log4js.appenders.file(__dirname + './../logs/error.log'), 'errorLog')
log4js.addAppender(log4js.appenders.file(__dirname + './../logs/normal.log'), 'normalLog')

errLogger = log4js.getLogger('errorLog')
logger = log4js.getLogger('normalLog')

module.exports = {
  errLogger: errLogger
  logger: logger
}
