'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var logger = require('./logger');
var config = require('./../config');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './../web/')));

//404
app.use((req, res, next) => {
  var err = new Error('Not Foundfda');
  err.status = 404;
  next(err);
});

//500
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;