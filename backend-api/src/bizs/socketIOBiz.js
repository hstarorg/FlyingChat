// const io = require('socket.io')();
const { tokenStore } = require('../common');
const config = require('../config');

const handlePreflightRequest = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Headers', `Content-Type, ${config.tokenName}`);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.end();
};

const userMap = new global.Map();

function handleMessage(io, socket, msg) {
  if (!msg || !msg.type) {
    return;
  }
  switch (msg.type) {
    case 'SEND_MESSAGE':
      console.log(msg.message);
      socket.to('user_10000_10001').broadcast.emit('message', {
        type: 'NEW_MESSAGE',
        message: {
          message: msg.message.message
        }
      });
      break;
  }
}

const initSocketIOBiz = () => {
  global.io.use(async (socket, next) => {
    const token = socket.handshake.headers[config.tokenName];
    if (token) {
      const userInfo = await tokenStore.get(token);
      if (userInfo) {
        socket.handshake.user = userInfo;
        return next();
      }
    }
    return next(new Error('401'));
  });
  global.io.on('connection', socket => {
    const user = socket.handshake.user;
    socket.join('user_10000_10001');
    // 如果存在，先踢掉
    if (userMap.has(user.userId)) {
      const oldSocket = userMap.get(user.userId);
      oldSocket.emit('message', { type: 'FORCED_DISCONNECT', message: '您的账号在其他设备登录，您已被强制下线。' });
      oldSocket.disconnect();
    }
    userMap.set(user.userId, socket);
    socket.on('message', msg => {
      handleMessage(global.io, socket, msg);
    });
    socket.on('disconnect', function() {
      userMap.delete(user.userId);
    });
  });
};

module.exports = {
  initSocketIOBiz,
  handlePreflightRequest
};
