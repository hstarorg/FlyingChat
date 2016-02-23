'use strict';

var globalIo;

var init = (io) => {
  globalIo = io;
  io.use(function (socket, next) {
    if (socket.request.headers.cookie) {
      return next();
    }
    next(new Error('Authentication error'));
  });
  globalIo.on('connection', (socket) => {
    //socket.
  });
};

module.exports = {
  init: init
};