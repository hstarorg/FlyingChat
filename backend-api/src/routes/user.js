const Router = require('koa-router');
const config = require('../config');
const { accountBiz } = require('../bizs');

const router = new Router({
  prefix: `${config.apiPrefix}/user`
});

module.exports = router;
