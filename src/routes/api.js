'use strict';

var router = require('express').Router();
var userBiz = require('./../bizs/userBiz');

router.post('/login', userBiz.doLogin);

module.exports = router;