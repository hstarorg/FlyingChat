const router = require('express').Router();
const auth = require('./../common/auth');
const appBiz = require('./../bizs/appBiz');

// Page router
router.get('/', auth.needLogin, appBiz.getHomePage);
router.get('/user/login', appBiz.getLoginPage);

// API router
router.post('/api/v1/login', appBiz.doLogin);

module.exports = router;
