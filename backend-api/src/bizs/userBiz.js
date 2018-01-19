const { util, crypto, db, DbCollections, UserStatus } = require('../common');
const { UserSchemas } = require('./schemas');
const config = require('../config');

const getUserGroupList = async ctx => {
  const userId = +ctx.params.userId;
  console.log(userId);
  const groups = await db.find(DbCollections.GROUPS, { members: userId }, { groupId: true, groupName: true, avatarUrl: true, ownerId: true });
  ctx.body = groups;
};

module.exports = {
  getUserGroupList
};
