#(c) Copyright 2015 jh3r. All Rights Reserved. 
Datastore = require('nedb')

config = require('./../config')

db = {}
dbPath = config.dbFilePath

# 用户数据库
db.users = new Datastore(dbPath + 'users.db')
db.users.loadDatabase()

# 问题库
db.messages = new Datastore(dbPath + 'messages.db')
db.messages.loadDatabase()

# 导出
module.exports = db