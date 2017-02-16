const router = require('express').Router();
const auth = require('./../common/auth');
var appBiz = require('./../bizs/appBiz');

router.get('/', auth.needLogin, appBiz.getHomePage);
router.get('/user/login', appBiz.getLoginPage);
router.post('/user/login', appBiz.doLogin);

module.exports = router;
