#!/usr/bin/env node
app = require('./utils/app')
socketIO = require('./utils/socketIOHelper')

http = require('http').Server(app)

io = require('socket.io')(http)
socketIO.initSocketIO(io)

server = http.listen(1234, () ->
  console.log('Express server listening on port ' + server.address().port)
)
