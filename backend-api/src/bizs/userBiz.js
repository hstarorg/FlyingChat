const { userDal } = require('./dal');

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
  const sessions = await userDal.getUserSessionList(userId);
  const userIdStr = userId.toString();
  // Nosql的苦果，需要关联查询好友的昵称
  const friendIdList = sessions.filter(x => x.groupId.startsWith('user_')).map(x => {
    const friendId = x.groupId.split('_').find(x => x !== 'user' && x !== userIdStr);
    return +friendId;
  });
  const friendList = await userDal.findUserList(
    { userId: { $in: friendIdList } },
    { userId: true, userName: true, nickName: true, avatarUrl: true }
  );
  const friendMap = new global.Map();
  friendList.forEach(x => {
    friendMap.set(x.userId.toString(), x);
  });
  sessions.forEach(item => {
    if (item.groupId.startsWith('user_')) {
      const friendId = item.groupId.split('_').find(x => x !== 'user' && x !== userIdStr);
      const friend = friendMap.get(friendId);
      item.groupName = friend.nickName;
      item.avatarUrl = friend.avatarUrl;
    }
  });
  const resBody = {
    friends: await userDal.getUserFriendList(userId),
    groups: await userDal.getUserGroupList(userId),
    sessions
  };
  ctx.body = resBody;
};

const _createSession = async (userId, groupId) => {
  const findUser = await userDal.findUser({ userId }, { sessions: true });
  // sessions中找不到groupID
  if (findUser) {
    const newSessions = findUser.sessions || [];
    if (newSessions.filter(x => x.groupId === groupId).length === 0) {
      newSessions.push({ groupId });
    }
    // 写入DB
    await userDal.updateUserSession(userId, newSessions);
  }
};

module.exports = {
  getUserGroupList,
  getUserFriendList,
  getUserSessionList,
  getMainUIData,
  _createSession
};
