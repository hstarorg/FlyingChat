const Router = require('koa-router');
const config = require('../config');
const { userBiz } = require('../bizs');

const router = new Router({
  prefix: `${config.apiPrefix}/users`
});

router.get('/:userId/groups', userBiz.getUserGroupList);

module.exports = router;
