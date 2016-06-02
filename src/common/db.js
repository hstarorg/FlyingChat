var Datastore = require('nedb');
var config = require('./../config');

var db = {};
var dbPath = config.dbFilePath;

//用户数据库
db.users = new Datastore({filename: dbPath + 'users.db', autoload: true});

//消息库
db.messages = new Datastore({filename: dbPath + 'messages.db', autoload: true});

module.exports = db;