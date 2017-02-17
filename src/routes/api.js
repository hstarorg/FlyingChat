const router = require('express').Router();
const userBiz = require('./../bizs/userBiz');

router.post('/login', userBiz.doLogin);

module.exports = router;
