const { db, DbCollections } = require('../../common');
const config = require('../../config');

const getUserGroupList = async userId => {
  return await db.find(
    DbCollections.GROUPS,
    { members: userId },
    { groupId: true, groupName: true, avatarUrl: true, ownerId: true }
  );
};

const getUserFriendList = async userId => {
  const findUser = await db.findOne(DbCollections.USERS, { userId }, { friends: true });
  let friends = [];
  if (findUser) {
    friends = findUser.friends || [];
  }
  const friendIds = friends.map(x => x.userId);
  return await db.find(
    DbCollections.USERS,
    { userId: { $in: friendIds } },
    { userId: true, userName: true, nickName: true }
  );
};

const getUserSessionList = async userId => {
  const findUser = await db.findOne(DbCollections.USERS, { userId }, { sessions: true });
  let userSessions = [];
  if (findUser) {
    userSessions = findUser.sessions || [];
  }
  const groupIdList = userSessions.map(x => x.groupId);
  return await db.find(
    DbCollections.GROUPS,
    { groupId: { $in: groupIdList } },
    { groupId: true, groupName: true, avatarUrl: true }
  );
};

module.exports = {
  getUserGroupList,
  getUserFriendList,
  getUserSessionList
};
