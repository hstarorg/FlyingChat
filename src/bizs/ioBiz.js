const cookie = require('cookie');
const session = require('express-session');
const config = require('./../config');
const memoryStore = require('./../common/memoryStore');
const db = require('./../common/db');
const types = require('./event-types');
const USER_COLLECTION = 'users';
let io;
const init = _io => {
  io = _io;
  initSocketIO();
};

const userMap = new Map();

const buildMsg = (user, data = {}) => {
  return Object.assign({}, user, { date: Date.now() }, data);
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
    let user = socket.handshake.user;
    userMap.set(user.userId, socket);
    socket.user = user;
    socket.emit(types.CLIENT_SET_USER, buildMsg(socket.user));
    socket.join('default', err => {
      io.to('default').emit(types.CLIENT_USER_ONLINE, buildMsg(socket.user));
    });
    socket.on('disconnecting', reason => {
      io.to('default').emit(types.CLIENT_USER_OFFLINE, buildMsg(socket.user));
    });
    socket.on(types.SERVER_ON_MESSAGE, msg => {
      io.to('default').emit(types.CLIENT_USER_MESSAGE, buildMsg(socket.user, { content: msg }));
    })
  });
};

module.exports = {
  init,
  getIO: () => io
};
