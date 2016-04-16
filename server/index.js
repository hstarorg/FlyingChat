'use strict';

var http = require('http');
var expressApp = require('./expressApp');
var httpServer = http.Server(expressApp);
var io = require('socket.io')(httpServer);

var config = require('./config');
var logger = require('./common/logger');
var ioBiz = require('./bizs/ioBiz');

ioBiz.init(io);

// 启动服务器
var serverInstance = httpServer.listen(config.port, _ => {
  logger.info('Express server listening on port ' + serverInstance.address().port + '...');
  logger.info('FlyingChat start successfully.');
});