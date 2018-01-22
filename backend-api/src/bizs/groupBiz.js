const { util } = require('../common');
const { groupDal, userDal } = require('./dal');
const userBiz = require('./userBiz');

const _checkGroupId = async (groupId, userId) => {
  const prefix = 'user';
  const userIdStr = userId.toString();
  const idArr = (groupId || '').split('_');
  // 不是三段，第一个不是user，不包含userIdStr，都不通过
  if (idArr[0] !== prefix || idArr.length !== 3 || idArr.indexOf(userIdStr) < 0) {
    return false;
  }
  const otherUserId = idArr.find(x => x !== prefix && x !== userIdStr);
  // 除了user前缀和当前userId之外，还能找到一个userId
  if (otherUserId) {
    const findUser = await userDal.findUser({ userId, 'friends.userId': +otherUserId }, { userId: true });
    // 其他人必须是当前用户的好友
    if (findUser) {
      return otherUserId;
    }
  }
  return false;
};

const getGroupInfo = async ctx => {
  const { groupId } = ctx.params;
  const { userId } = ctx.state.user;
  let otherUserId;
  if (groupId.startsWith('user_')) {
    otherUserId = await _checkGroupId(groupId, userId);
    if (!otherUserId) {
      util.throwError('非法请求');
    }
  }
  let findGroup = await groupDal.findGroupByGroupIdAndUserId(groupId, userId);
  if (!findGroup) {
    // create group
    const group = {
      groupId,
      groupName: groupId,
      groupDescription: '',
      avatarUrl: '',
      isPrivate: true,
      members: [+userId, +otherUserId]
    };
    await groupDal.createGroup(group, userId);
    findGroup = await groupDal.findGroupByGroupIdAndUserId(groupId, userId);
  }
  await userBiz._createSession(userId, groupId);
  ctx.body = findGroup;
};

module.exports = {
  getGroupInfo
};
