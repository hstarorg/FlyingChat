// const io = require('socket.io')();
const { tokenStore } = require('../common');
const config = require('../config');

const handlePreflightRequest = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Headers', `Content-Type, ${config.tokenName}`);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.end();
};

const initSocketIOBiz = () => {
  io.use(async (socket, next) => {
    const token = socket.handshake.headers[config.tokenName];
    if (token) {
      const userInfo = await tokenStore.get(token);
      if (userInfo) {
        socket.handshake.user = userInfo;
        return next();
      }
    }
    return next(new Error('未授权的连接，请先登录'));
  });
  io.on('connection', socket => {
    socket.emit('test', 'hello');
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });
};

module.exports = {
  initSocketIOBiz,
  handlePreflightRequest
};
