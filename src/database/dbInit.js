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
  avatorUrl: '', // 头像地址
  groups: [] // 所在的Group, groupId
}];

db.users.insert(users, (err, newDocs) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`初始化用户列表成功，影响数据：${newDocs.length}`);
});