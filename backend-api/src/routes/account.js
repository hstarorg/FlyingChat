const Router = require('koa-router');
const config = require('../config');
const { accountBiz } = require('../bizs');

const router = new Router({
  prefix: `${config.apiPrefix}/account`
});

router.post('/register', accountBiz.doRegister);
router.post('/login', accountBiz.doLogin);
router.get('/logout', accountBiz.doLogout);

module.exports = router;
