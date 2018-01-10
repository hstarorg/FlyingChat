const path = require('path');

module.exports = {
  debug: true,
  port: 7410,
  apiPrefix: '/api/v1',
  routesPath: path.join(__dirname, 'routes'),
  dbConfig: {
    uri: 'mongodb://192.168.1.200:27017',
    dbName: 'flyingchat'
  }
};
