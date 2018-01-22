const { db, DbCollections, UserStatus } = require('../../common');

const createGroup = async (group, ownerId) => {
  const newGroup = {
    groupId: group.groupId,
    groupName: group.groupName,
    groupDescription: group.groupDescription,
    avatarUrl: group.avatarUrl,
    createDate: Date.now(),
    groupStatus: UserStatus.Active,
    ownerId, // 群主ID
    maxCount: 200, // 群规模（成员人数）
    joinMode: 'Public', // 加群方式（Public, NeedApprove, Private->允许所有人，需要认证，不允许加群）
    members: [ownerId], // 群成员
    isPrivate: group.isPrivate,
    chatRecords: []
  };
  return await db.insertOne(DbCollections.GROUPS, newGroup);
};

const findGroupByGroupIdAndUserId = async (groupId, userId) => {
  return await db.findOne(DbCollections.GROUPS, { groupId, members: userId });
};

module.exports = {
  createGroup,
  findGroupByGroupIdAndUserId
};
