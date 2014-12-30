module.exports = {
  initSocketIO: (io) ->
    usernames = {}
    numUsers = 0
    io.on('connection', (socket) ->
      addedUser = false
      # when the client emits 'new message', this listens and executes
      socket.on('new message', (data) ->
        # we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
          username: socket.username
          message: data
        })
      )

      # when the client emits 'add user', this listens and executes
      socket.on('add user', (username) ->
        # we store the username in the socket session for this client
        socket.username = username
        # add the client's username to the global list
        usernames[username] = username
        ++numUsers
        addedUser = true
        console.log(numUsers)
        socket.emit('login', {
          numUsers: numUsers
        })
        # echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
          username: socket.username
          numUsers: numUsers
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
        --numUsers
        numUsers = 0 if numUsers < 0
        # echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        })
      )
    )
}