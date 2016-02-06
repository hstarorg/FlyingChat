'use strict';

var http = require('http');

var app = require('./common/app');
var httpServer = http.Server(app);
var io = require('socket.io')(httpServer);

var config = require('./config');
var socketHelper = require('./common/socketHelper');

socketHelper.init(io);

// 启动服务器
var serverInstance = httpServer.listen(config.port, () => {
   console.log('Express server listening on port ' + serverInstance.address().port + '...');
   console.log('FlyingChat start successfully.');
});