const Router = require('koa-router');
const config = require('../config');
const { commonBiz, groupBiz } = require('../bizs');

const router = new Router({
  prefix: `${config.apiPrefix}/groups`
});

router.use(commonBiz.mustLogin);

router.get('/:groupId', groupBiz.getGroupInfo);

module.exports = router;
