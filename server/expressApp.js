'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');

var logger = require('./common/logger');
var config = require('./config');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(history());
// 配置静态服务器
app.use(express.static(path.join(__dirname, './client/')));
app.use('/bower_components', express.static(path.join(__dirname, './../bower_components/')));

// 配置路由
var apiRouter = require('./routes/api');
app.use('/api/v1', apiRouter);

// Error 404
app.use((req, res, next) => {
  var err = new Error('Api not found.');
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

module.exports = app;