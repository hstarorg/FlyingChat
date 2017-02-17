const cookie = require('cookie');
const session = require('express-session');
const config = require('./../config');
const memoryStore = require('./../common/memoryStore');
let io;
const init = _io => {
  io = _io;
  initSocketIO();
};

const initSocketIO = () => {
  io.use((socket, next) => {
    let cookieObj = cookie.parse(socket.handshake.headers.cookie);
    const sid = ((cookieObj[config.sessionName] || '').split('.')[0] || '').replace('s:', '');
    memoryStore.getSession(sid)
      .then(user => {
        if (!user) {
          return next(new Error('not authorized'));
        }
        socket.handshake.user = user;
        next();
      });
  });

  io.on('connection', socket => {
    console.log(socket.handshake.user);
  });
};

module.exports = {
  init,
  getIO: () => io
};