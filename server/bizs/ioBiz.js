'use strict';

var _io;

var initIoBiz = () => {
  //客户端连接时
  _io.on('connection', (socket) => {
    console.log(socket.request.headers)
  });
};

var init = (io) => {
  _io = io;
  initIoBiz();
};

module.exports = {
  init: init,
  getIo: () => _io
};