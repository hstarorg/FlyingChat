#!/usr/bin/env node
app = require('./common/app')
appConfig = require('./config/appConfig')
socketIO = require('./common/socketIO')

http = require('http').Server(app)

# 初始化Socket.io
io = require('socket.io')(http)
socketIO.initSocketIO(io)

# 启动服务器
server = http.listen(appConfig.port, () ->
  console.log('Express server listening on port ' + server.address().port)
)
