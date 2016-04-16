#! Define
session = require('express-session')
cookie = require('cookie')
cookieParser = require('cookie-parser')
memoryStore = require('./memoryStore')
config = require('./../config')

dbHelper = require('./dbHelper')
onlineUsers = {}

#! helpers
getUserCount = (users) ->
  count = 0
  for p in users when users.hasOwnProperty(p)
    count++
  count

initSocketIO = (io) ->
  # 授权
  io.use((socket, next) ->
    data = socket.handshake or socket.request
    if not data.headers.cookie
      return next('Missing cookie headers')
    cookies = cookie.parse(data.headers.cookie)
    sid = cookieParser.signedCookie(cookies[config.cookieName], config.cookieSecret)
    memoryStore.get(sid, (err, session) ->
      next(err) if err
      socket.handshake = session
      next()
    )
    next(new Error('authorization error.'), false)
  )

  io.on('connection', (client) ->
    console.log(client.handshake)
    # 上线
    client.on('client.online', (data) ->
      1
    )
    # 下线
    client.on('disconnect', ->
      1
    )
  )

# 导出
module.exports = {
  init: (io) ->
    initSocketIO(io)
}