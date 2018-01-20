const { util, crypto, db, DbCollections, UserStatus } = require('../common');
const { UserSchemas } = require('./schemas');
const config = require('../config');

/**
 * 通过查询组成员包含userId的组，来查出用户加入的组
 * @param {*} ctx
 */
const getUserGroupList = async ctx => {
  const userId = +ctx.params.userId;
  const groups = await db.find(
    DbCollections.GROUPS,
    { members: userId },
    { groupId: true, groupName: true, avatarUrl: true, ownerId: true }
  );
  ctx.body = groups;
};

/**
 * 通过两次查询，获取用户的好友列表
 * @param {*} ctx
 */
const getUserFriendList = async ctx => {
  const userId = +ctx.params.userId;
  const findUser = await db.findOne(DbCollections.USERS, { userId }, { friends: true });
  let friends = [];
  if (findUser) {
    friends = findUser.friends || [];
  }
  const friendIds = friends.map(x => x.userId);
  const friendList = await db.find(
    DbCollections.USERS,
    { userId: { $in: friendIds } },
    { userId: true, userName: true, nickName: true }
  );
  ctx.body = friendList;
};

/**
 * 获取用户的会话列表
 * @param {*} ctx
 */
const getUserSessionList = async ctx => {
  const userId = +ctx.params.userId;
  const findUser = await db.findOne(DbCollections.USERS, { userId }, { friends: true });
  let userSessions = [];
  if (findUser) {
    userSessions = findUser.sessions || [];
  }
  const groupIdList = userSessions.map(x => x.groupId);
  const sessionList = await db.find(
    DbCollections.GROUPS,
    { groupId: { $in: groupIdList } },
    { groupId: true, groupName: true, avatarUrl: true }
  );
  ctx.body = sessionList;
};

module.exports = {
  getUserGroupList,
  getUserFriendList,
  getUserSessionList
};
