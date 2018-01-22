// const io = require('socket.io')(); // for code hints
const { util, crypto, UserStatus, tokenStore } = require('../common');
const { AccountSchemas } = require('./schemas');
const { userDal, sequenceDal } = require('./dal');
const config = require('../config');

const _buildLoginUser = (token, user) => {
  return {
    userId: user.userId,
    userName: user.userName,
    nickName: user.nickName,
    avatarUrl: user.avatarUrl,
    token
  };
};

const doRegister = async ctx => {
  const { body } = ctx.request;
  await util.validate(body, AccountSchemas.REGISTER_SCHEMA);
  const findUser = await userDal.findUserByUserName(body.userName);
  if (findUser) {
    util.throwError('用户已存在，请更换账号后重试');
  }
  const userId = await sequenceDal.getSequence('userId', 10000);
  await userDal.createUser(Object.assign({}, body, { userId }));
  ctx.status = 201;
  ctx.body = '';
};

const doLogin = async ctx => {
  const { body } = ctx.request;
  await util.validate(body, AccountSchemas.LOGIN_SCHEMA);
  const findUser = await userDal.findUserByUserName(body.userName);
  if (findUser.password !== crypto.hmac_sha256(body.password, config.sha256Secret)) {
    util.throwError('登录失败，账号密码不匹配');
  }
  if (findUser.userStatus !== UserStatus.Active) {
    util.throwError('登录失败，账号已被禁用。如需帮助，请联系管理员');
  }
  const token = util.generateUuidV4();
  tokenStore.set(token, findUser);
  ctx.body = _buildLoginUser(token, findUser);
};

const doAutoLogin = async ctx => {
  const user = ctx.state.user;
  if (!user) {
    util.throwError('token已失效，请重新登录');
  }
  const token = ctx.request.headers[config.tokenName];
  ctx.body = _buildLoginUser(token, user);
};

const doLogout = async ctx => {
  ctx.status = 202;
  ctx.body = '';
};

module.exports = {
  doRegister,
  doLogin,
  doLogout,
  doAutoLogin
};
