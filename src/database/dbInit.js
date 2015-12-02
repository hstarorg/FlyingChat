var fs = require('fs');

var Datastore = require('nedb');
var db = {};

//------------------------------初始化用户列表-------------------------------
db.users = new Datastore('users.db');
db.users.loadDatabase();

// User list
var users = [{
  UserId: 1,
  LoginName: 'humin',
  LoginPassword: 'jay',
  UserNick: '神仙哥哥',
  CreationDate: new Date().valueOf(),
  CreationUser: 1,
  ModifiedDate: new Date().valueOf(),
  ModifiedUser: 1
}, {
  UserId: 2,
  LoginName: 'fei',
  LoginPassword: 'fei',
  UserNick: '神仙姐姐',
  CreationDate: new Date().valueOf(),
  CreationUser: 1,
  ModifiedDate: new Date().valueOf(),
  ModifiedUser: 1
}];
db.users.insert(users, (err, newDocs) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`初始化用户列表成功，影响数据：${newDocs.length}`);
});