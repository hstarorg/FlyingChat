'use strict';

var db = require('./../common/db');
var cryptoHelper = require('./../common/cryptoHelper');

var doLogin = (req, res, next) => {
  var user = req.body;
  if (!user.username || !user.password) {
    return next(new Error('Must provider username and password.'));
  }
  db.users.findOne({ isEnable: true, userName: user.username, password: user.password }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('Username or password invalid.'));
    }
    //写入token和过期时间
    var expirationTime = Date.now() + 1000 * 60 * 60 * 12; //12小时后过期
    var token = cryptoHelper.rsaPrivateEncrypt(`${user.userName}_${expirationTime}`);
    db.users.update({ _id: user._id }, { $set: { token: token, expirationTime: expirationTime } }, {}, (err, numReplaced) => {
      if (err) {
        return next(err);
      }
      res.set('x-token', token);
      res.json(true);
    });
  });
};

module.exports = {
  doLogin: doLogin
};