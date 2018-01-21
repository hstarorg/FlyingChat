const Router = require('koa-router');
const config = require('../config');
const { userBiz } = require('../bizs');

const router = new Router({
  prefix: `${config.apiPrefix}/ui`
});

router.get('/main', userBiz.getMainUIData);

module.exports = router;
