'use strict';

var doLogin = (req, res, next) => {
  res.json('Login succeed.');
};

module.exports = {
  doLogin: doLogin
};