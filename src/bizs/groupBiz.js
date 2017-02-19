const db = require('./../common/db');

const GROUP_COLLECTION = 'groups';

const pushMessage = (userId, message) => {
  return db.update(GROUP_COLLECTION, { groupName: 'default' }, {
    $push: {
      messages: {
        userId, // 发送者
        createDate: Date.now(), // 发送时间,
        message // 消息内容
      }
    }
  });
};

module.exports = {
  pushMessage
};
