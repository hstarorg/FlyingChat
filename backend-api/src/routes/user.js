const Router = require('koa-router');
const config = require('../config');
const { userBiz, commonBiz } = require('../bizs');

const router = new Router({
  prefix: `${config.apiPrefix}/users`
});

router.use(commonBiz.mustLogin);

router.get('/:userId/groups', userBiz.getUserGroupList);
router.get('/:userId/friends', userBiz.getUserFriendList);
router.get('/:userId/sessions', userBiz.getUserSessionList);

module.exports = router;
