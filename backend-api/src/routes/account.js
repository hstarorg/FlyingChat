const Router = require('koa-router');
const config = require('../config');
const { accountBiz, commonBiz } = require('../bizs');

const router = new Router({
  prefix: `${config.apiPrefix}/account`
});

router.post('/register', accountBiz.doRegister);
router.post('/login', accountBiz.doLogin);
router.post('/autologin', commonBiz.mustLogin, accountBiz.doAutoLogin);
router.get('/logout', commonBiz.mustLogin, accountBiz.doLogout);

module.exports = router;
