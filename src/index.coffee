#! Define
app = require('express')()
http = require('http').Server(app)
io = require('socket.io')(http)

config = require('./config')
appInit = require('./common/appInit')
socketIO = require('./common/socketIO')

#! Init
appInit.init(app)
socketIO.initSocketIO(io)

# 启动服务器
server = http.listen(config.port, ->
  console.log('Express server listening on port ' + server.address().port + '...')
  console.log('FlyingChat start successfully.')
)
