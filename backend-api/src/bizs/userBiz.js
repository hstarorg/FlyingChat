const { util, crypto, db, DbCollections, UserStatus } = require('../common');
const { UserSchemas } = require('./schemas');
const { userDal } = require('./dal');
const config = require('../config');

/**
 * 通过查询组成员包含userId的组，来查出用户加入的组
 * @param {*} ctx
 */
const getUserGroupList = async ctx => {
  const userId = +ctx.params.userId;
  const groups = await userDal.getUserGroupList(userId);
  ctx.body = groups;
};

/**
 * 通过两次查询，获取用户的好友列表
 * @param {*} ctx
 */
const getUserFriendList = async ctx => {
  const userId = +ctx.params.userId;
  const friendList = await userDal.getUserFriendList(userId);
  ctx.body = friendList;
};

/**
 * 获取用户的会话列表
 * @param {*} ctx
 */
const getUserSessionList = async ctx => {
  const userId = +ctx.params.userId;
  const sessionList = await userDal.getUserSessionList(userId);
  ctx.body = sessionList;
};

const getMainUIData = async ctx => {
  const userId = ctx.state.user.userId;
  const resBody = {
    friends: await userDal.getUserFriendList(userId),
    groups: await userDal.getUserGroupList(userId),
    sessions: await userDal.getUserSessionList(userId)
  };
  ctx.body = resBody;
};

module.exports = {
  getUserGroupList,
  getUserFriendList,
  getUserSessionList,
  getMainUIData
};
