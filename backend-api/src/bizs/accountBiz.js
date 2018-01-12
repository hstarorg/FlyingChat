const io = require('socket.io')(); // for code hints
const { util, crypto, db, collections } = require('../common');
const { AccountSchemas } = require('./schemas');
const config = require('../config');

const _findUser = async username => {};

const doRegister = async ctx => {
  const { body } = ctx;
  await util.validate(body, AccountSchemas.LOGIN_SCHEMA);

};

const doLogin = async ctx => {};

const doLogout = async ctx => {
  const res = await db.insertOne(collections.TEST2, { a: 1 });
  console.log(res);
  ctx.body = res;
};

module.exports = {
  doRegister,
  doLogin,
  doLogout
};
