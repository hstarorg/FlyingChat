const passport = require('passport');

const getHomePage = (req, res, next) => {
  res.render('home/index', { title: 'Home' });
};

const getLoginPage = (req, res, next) => {
  res.render('user/login', { title: 'Welcome' });
};

const doLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // 登录成功后，会产生user对象
    if (err) { return next(err); }
    if (!user) { return next(info); }
    req.logIn(user, err => {
      if (err) { return next(err); }
      return res.end();
    });
  })(req, res, next);
};

module.exports = {
  getHomePage,
  getLoginPage,
  doLogin
};
