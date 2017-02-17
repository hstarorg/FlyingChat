const passport = require('passport');

const getHomePage = (req, res, next) => {
  res.render('home/index');
};

const getLoginPage = (req, res, next) => {
  res.render('user/login', { title: 'Welcome' });
};

const doLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // 登录成功后，会产生user对象
    console.log(err, user, info);
    if (err) { return next(err); }
    if (!user) { return res.redirect('/user/login'); }
    req.logIn(user, (err, b) => {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
};

module.exports = {
  getHomePage,
  getLoginPage,
  doLogin
};
