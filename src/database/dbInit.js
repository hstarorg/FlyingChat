const Datastore = require('nedb');
const util = require('./../common/util');
const db = {};

//------------------------------初始化用户列表-------------------------------
db.users = new Datastore({ filename: 'users.db', autoload: true });
db.groups = new Datastore({ filename: 'groups.db', autoload: true });

const group = {
  groupId: util.getShortId(), // 聊天组ID
  groupName: 'default', // 组名
  groupDescription: 'default group', // 组介绍
  groupAvatorUrl: '', // 组logo
  ownerId: 1000, // 创建人
  createDate: Date.now(), // 创建时间
  isEnable: true, // 是否启用
  members: [1000, 1001], // 组成员，userId,
  messages: [] // 聊天信息
};

// User list
const users = [{
  userId: 1000, // 用户编号，从1000开始
  nickname: '幻', // 昵称
  username: 'jay', // 用户名
  password: 'jay', // 密码
  emailAddress: 'hm910705@163.com', // 邮箱
  createDate: Date.now(), // 注册时间
  isEnable: true, // 是否启用
  avatorUrl: 'http://tva3.sinaimg.cn/crop.61.15.269.269.180/005DomB3gw1elc70qswv0j30aw08jmxx.jpg', // 头像地址
  groups: [group.groupId] // 所在的Group, groupId
}, {
  userId: 1001, // 用户编号，从1000开始
  nickname: '胖胖', // 昵称
  username: 'fei', // 用户名
  password: 'fei', // 密码
  emailAddress: '', // 邮箱
  createDate: Date.now(), // 注册时间
  isEnable: true, // 是否启用
  avatorUrl: 'http://tva4.sinaimg.cn/crop.0.0.170.170.180/8084ef6cjw8ejgw167r61j204q04qwea.jpg', // 头像地址
  groups: [group.groupId] // 所在的Group, groupId
}];


db.groups.insert(group);

db.users.insert(users, (err, newDocs) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`初始化用户列表成功，影响数据：${newDocs.length}`);
});
