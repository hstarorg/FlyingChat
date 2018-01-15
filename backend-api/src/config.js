const path = require('path');

module.exports = {
  debug: true,
  port: 7410,
  apiPrefix: '/api/v1',
  routesPath: path.join(__dirname, 'routes'),
  dbConfig: {
    uri: 'mongodb://192.168.1.200:27017',
    dbName: 'flyingchat'
  },
  tokenName: 'x-fc-token',
  sha256Secret: 'flyingchatForSiPangZi7410!!',
  socketOpt: {
    serveClient: false, // 不提供socket.io-client
    origins: '*:*',
    pingTimeout: 10 * 1000, // 多少毫秒没有响应，认为连接关闭，默认60000
    pingInterval: 5 * 1000, // 间隔多少毫秒发送ping，默认25000
    cookie: false
  }
};
