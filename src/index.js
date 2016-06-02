'use strict';

let http = require('http');
let path = require('path');

let express = require('express');
let bodyParser = require('body-parser');

let logger = require('./common/logger');
let config = require('./config');
let ioBiz = require('./bizs/ioBiz');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 配置路由
let apiRouter = require('./routes/api');
app.use('/api/v1', apiRouter);

// Error 404
app.use((req, res, next) => {
  let err = new Error('Api not found.');
  err.status = 404;
  next(err);
});

// Error 500
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

let httpServer = http.Server(app);
let io = require('socket.io')(httpServer);
ioBiz.init(io);

// 启动服务器
let serverInstance = httpServer.listen(config.port, _ => {
  logger.info('Express server listening on port ' + serverInstance.address().port + '...');
  logger.info('FlyingChat start successfully.');
});