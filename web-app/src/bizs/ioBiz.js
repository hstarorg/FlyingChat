const cookie = require('cookie');
const session = require('express-session');
const config = require('./../config');
const memoryStore = require('./../common/memoryStore');
const groupBiz = require('./groupBiz');
const logger = require('./../common/logger');
const types = require('./event-types');
const USER_COLLECTION = 'users';
let io;
const init = _io => {
  io = _io;
  io.serveClient(false);
  initSocketIO();
};

const userMap = new Map();

const buildMsg = (user, data = {}) => {
  return Object.assign({}, user, { date: Date.now() }, data);
};

const getSocketByUserId = userId => {
  for (let socket of userMap.values()) {
    if (socket.user.userId === userId) {
      return socket;
    }
  }
  return null;
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
    let tmpSocket = getSocketByUserId(user.userId);
    if (tmpSocket) {
      tmpSocket.forceDisconnect = true;
      tmpSocket.emit(types.CLIENT_FORCE_DISCONNECT);
      tmpSocket.disconnect(true);
      userMap.delete(socket.tmpSocket);
    }
    userMap.set(socket.id, socket);
    socket.user = user;
    socket.emit(types.CLIENT_SET_USER, buildMsg(socket.user));
    socket.join('default', err => {
      io.to('default').emit(types.CLIENT_USER_ONLINE, buildMsg(socket.user));
    });
    socket.on('disconnect', reason => {
      if (socket.forceDisconnect) {
        return;
      }
      io.to('default').emit(types.CLIENT_USER_OFFLINE, buildMsg(socket.user));
    });
    socket.on(types.SERVER_ON_MESSAGE, msg => {
      groupBiz.pushMessage(socket.user.userId, msg)
        .then(() => {
          io.to('default').emit(types.CLIENT_USER_MESSAGE, buildMsg(socket.user, { content: msg }));
        });
    });
    socket.on(types.SERVER_GET_USERLIST, () => {
      io.of('/').clients((err, clients) => {
        if (err) { logger.error(err); }
        let users = [];
        clients.forEach(c => {
          let s = userMap.get(c);
          if (s) {
            users.push(s.user);
          }
        });
        io.to('default').emit(types.CLIENT_SET_USERLIST, buildMsg({}, { users }));
      });
    });
  });
};

module.exports = {
  init,
  getIO: () => io
};
