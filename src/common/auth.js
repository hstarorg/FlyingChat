const LocalStrategy = require('passport-local').Strategy;
const config = require('./../config');

const userLogin = (username, password) => {
  return Promise.resolve()
    .then(() => {
      if (username === 'admin') {
        return { userId: 1, username: 'Jay' };
      }
      return Promise.reject('err');
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
