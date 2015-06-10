path = require('path')
module.exports = {
  port: 3000
  dbFilePath: path.join(__dirname, './database/FlyingChat.db')
  env: 'prd' # 环境，prd表示正式环境，dev表示开发环境
  cookieSecret: 'jay.m.hu, very secret'
  cookieName: 'fc.sid'
  log4jsConfig: {
    appenders: [
      {
        type: 'dateFile'
        filename: './logs/log_file.log'
        category: 'normalLogger'
      }
      {
        type: 'dateFile'
        filename: './logs/error_file.log'
        category: 'errorLogger'
      }
      {
        type: 'console'
      }
    ]
  }
}