const io = require('socket.io')(); // for code hints
const { util, crypto, db, DbCollections, UserStatus } = require('../common');
const { AccountSchemas } = require('./schemas');
const config = require('../config');

const _findUser = async userName => {
  return await db.findOne(DbCollections.USERS, { userName });
};

const _getUserId = async () => {
  const key = 'userId';
  const defaultVal = 10000;
  const { value } = await db.findOneAndUpdate(DbCollections.SEQUENCES, { key }, { $inc: { value: 1 } });
  if (!value) {
    await db.insertOne(DbCollections.SEQUENCES, { key, value: defaultVal });
  }
  return value || defaultVal;
};

const doRegister = async ctx => {
  const { body } = ctx.request;
  await util.validate(body, AccountSchemas.REGISTER_SCHEMA);
  const findUser = await _findUser(body.userName);
  if (findUser) {
    util.throwError('用户已存在，请更换账号后重试');
  }
  const userId = await _getUserId();
  const newUser = {
    userId,
    userName: body.userName,
    nickName: body.nickName,
    password: crypto.hmac_sha256(body.password, config.sha256Secret),
    email: '',
    phone: '',
    avatarUrl: '',
    createDate: Date.now(),
    userStatus: UserStatus.Active
  };
  await db.insertOne(DbCollections.USERS, newUser);
  ctx.status = 201;
  ctx.body = '';
};

const doLogin = async ctx => {
  const { body } = ctx.request;
  await util.validate(body, AccountSchemas.LOGIN_SCHEMA);
  const findUser = await _findUser(body.userName);
  if (findUser.password !== crypto.hmac_sha256(body.password, config.sha256Secret)) {
    util.throwError('登录失败，账号密码不匹配');
  }
  if (findUser.userStatus !== UserStatus.Active) {
    util.throwError('登录失败，账号已被禁用。如需帮助，请联系管理员');
  }
  ctx.body = {
    userName: findUser.userName,
    nickName: findUser.nickName,
    avatarUrl: findUser.avatarUrl
  };
};

const doLogout = async ctx => {
  ctx.status = 202;
  ctx.body = '';
};

module.exports = {
  doRegister,
  doLogin,
  doLogout
};
