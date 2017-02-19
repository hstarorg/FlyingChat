const Datastore = require('nedb');
const db = {};

//------------------------------初始化用户列表-------------------------------
db.users = new Datastore({ filename: 'users.db', autoload: true });
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
  groups: [] // 所在的Group, groupId
}, {
  userId: 1001, // 用户编号，从1000开始
  nickname: '胖胖', // 昵称
  username: 'deng', // 用户名
  password: 'deng', // 密码
  emailAddress: '', // 邮箱
  createDate: Date.now(), // 注册时间
  isEnable: true, // 是否启用
  avatorUrl: 'http://tva4.sinaimg.cn/crop.0.0.170.170.180/8084ef6cjw8ejgw167r61j204q04qwea.jpg', // 头像地址
  groups: [] // 所在的Group, groupId
}];


db.users.insert(users, (err, newDocs) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`初始化用户列表成功，影响数据：${newDocs.length}`);
});
