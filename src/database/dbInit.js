var fs = require('fs');

var Datastore = require('nedb');
var db = {};

//------------------------------初始化用户列表-------------------------------
db.users = new Datastore('users.db');
db.users.loadDatabase();

// User list
var users = [{
  userId: 1,
  userName: 'humin',
  password: 'jay',
  nickName: '神仙哥哥',
  photoUrl: '',
  createdTime: Date.now(),
  isEnable: true,
}];
db.users.insert(users, (err, newDocs) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`初始化用户列表成功，影响数据：${newDocs.length}`);
});