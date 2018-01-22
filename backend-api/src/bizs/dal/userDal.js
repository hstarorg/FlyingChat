const { db, DbCollections, crypto, UserStatus } = require('../../common');
const config = require('../../config');

const createUser = async user => {
  const newUser = {
    userId: user.userId,
    userName: user.userName,
    nickName: user.nickName,
    password: crypto.hmac_sha256(user.password, config.sha256Secret),
    email: '',
    phone: '',
    avatarUrl: '',
    createDate: Date.now(),
    userStatus: UserStatus.Active,
    groups: [],
    friends: [],
    sessions: []
  };
  await db.insertOne(DbCollections.USERS, newUser);
};

const getUserGroupList = async userId => {
  return await db.find(
    DbCollections.GROUPS,
    { members: userId, isPrivate: false },
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
    { userId: true, userName: true, nickName: true, avatarUrl: true }
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

const findUser = async (query, fields) => {
  return await db.findOne(DbCollections.USERS, query, fields);
};

const findUserList = async (query, fields) => {
  return await db.find(DbCollections.USERS, query, fields);
};

const updateUserSession = async (userId, sessions) => {
  return await db.updateOne(DbCollections.USERS, { userId }, { $set: { sessions } });
};

module.exports = {
  createUser,
  getUserGroupList,
  getUserFriendList,
  getUserSessionList,
  findUser,
  findUserList,
  updateUserSession
};
