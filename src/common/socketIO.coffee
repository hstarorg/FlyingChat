dbKit = require('./dbKit')

module.exports = {
  initSocketIO: (io) ->

#    io.configure( ->
#      io.set('authorization', (handshakeData, callback) ->
#        callback(null, true)
#      )
#    )
    getUserNum = ->
      num = 0
      for p of usernames
        num++
      num

    usernames = {}
    io.on('connection', (socket) ->
      addedUser = false
      # when the client emits 'new message', this listens and executes
      socket.on('new message', (data) ->
        # 想消息存入数据库
        dbKit.executeSql('INSERT INTO [ChatMessage]([UserId],[UserNick],[MsgContent],[CreationDate]) VALUES(?,?,?,?)', [
            0
            socket.username
            data
            (new Date()).valueOf()
          ], (err)->
          console.log(err) if err
        )
        # we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
          username: socket.username
          message: data
          color: socket.color
        })
      )

      # 更新在线用户列表
      socket.on('client-refreshOnlineUser', ->
        socket.emit('server-refreshOnlineUser', usernames)
      )

      # when the client emits 'add user', this listens and executes
      socket.on('add user', (userObj) ->
        username = userObj.username
        # 处理同时在线问题，如果发现有另外的同名用户在线，那么踢下线
        hasUser = false
        if usernames[username]
          for userSocket in io.sockets.sockets
            if userSocket.username is username
              # 踢下线
              hasUser = true
              userSocket.emit('forced logout')
              userSocket.disconnect()


        # we store the username in the socket session for this client
        socket.username = username
        socket.color = userObj.color
        # add the client's username to the global list
        usernames[username] = username
        addedUser = true
        socket.emit('login', {
          numUsers: getUserNum()
        })
        # echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
          username: socket.username
          numUsers: getUserNum()
        })
      )

      # when the client emits 'typing', we broadcast it to others
      socket.on('typing', () ->
        socket.broadcast.emit('typing', {
          username: socket.username
        })
      )

      # when the client emits 'stop typing', we broadcast it to others
      socket.on('stop typing', () ->
        socket.broadcast.emit('stop typing', {
          username: socket.username
        })
      )

      # when the user disconnects.. perform this
      socket.on('disconnect', () ->
        # remove the username from global usernames list
        if addedUser
          delete usernames[socket.username]
        if socket.username is undefined
          return
        # echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: getUserNum()
        })
      )
    )
}