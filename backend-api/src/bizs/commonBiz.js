const { util, crypto, db, DbCollections, UserStatus, tokenStore } = require('../common');
const { AccountSchemas } = require('./schemas');
const config = require('../config');

const setUser = async (ctx, next) => {
  const token = ctx.request.headers[config.tokenName];
  if (token) {
    const userInfo = await tokenStore.get(token);
    if (userInfo) {
      ctx.state.user = userInfo;
    }
  }
  await next();
};

const mustLogin = async (ctx, next) => {
  const user = ctx.state.user;
  if (!user) {
    ctx.status = 401;
    ctx.body = '';
    return;
  }
  await next();
};

module.exports = {
  setUser,
  mustLogin
};
