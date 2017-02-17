const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const config = require('./../config');

const userLogin = (username, password) => {
  return Promise.resolve()
    .then(() => {
      return db.findOne('users', { password, $or: [{ username: username }, { userId: +username }] });
    })
    .then(user => {
      if (user) {
        return {
          _id: user._id,
          userId: user.userId,
          nickname: user.nickname,
          username: user.username,
          emailAddress: user.emailAddress
        };
      }
      return Promise.reject('账户名密码不正确！');
    });
};

const init = passport => {
  let opt = {
    usernameField: 'username',
    passwordField: 'password'
  };
  passport.use(new LocalStrategy(opt, (username, password, done) => {
    userLogin(username, password)
      .then(user => {
        done(null, user);
      })
      .catch(reason => done(null, false, {
        message: reason
      }));
  }));

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (user, cb) {
    cb(null, user);
  });
};

const needLogin = (req, res, next) => {
  if (req.isAuthenticated !== null && req.isAuthenticated()) {
    next();
  } else {
    if (req.originalUrl.includes('/api/v1')) {
      res.status(401).send('need login');
    }
    else {
      res.redirect('/user/login');
    }
  }
};

module.exports = {
  init,
  needLogin
};
