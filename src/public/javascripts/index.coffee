$(() ->

  COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ]

  # 未读消息数
  unreadMsgCount = 0
  originalTitle = document.title
  notifyTitle = ''
  notifyInterval = undefined
  allowNotify = false

  FADE_TIME = 150 # ms
  TYPING_TIMER_LENGTH = 400 # ms

  # Initialize varibles
  $window = $(window)
  $messages = $('.messages'); # Messages area
  $inputMessage = $('.inputMessage'); # Input message input box


  # Prompt for setting a username
  username = $('#username').val()
  connected = false
  typing = false
  myColor  = COLORS[Math.floor(Math.random() * COLORS.length)]
  lastTypingTime = undefined
  $currentInput = $inputMessage.focus()

  socket = io()
  # 设置心跳检测时间
  socket.heartbeatTimeout = 20000
  dateFormat = (n) ->
    ns = '000' + n
    ns.substr(ns.length-2)

  getNow = ->
    d = new Date()
    dateFormat(d.getHours())+ ':' + dateFormat(d.getMinutes()) + ':' + dateFormat(d.getSeconds());

  addParticipantsMessage = (data) ->
    message = ''
    if data.numUsers is 1
      message += "there's 1 participant"
    else
      message += "there are " + data.numUsers + " participants"
    log(message)

  # Sends a chat message
  sendMessage = () ->
    message = $inputMessage.val()
    # Prevent markup from being injected into the message
    message = cleanInput(message)
    # if there is a non-empty message and a socket connection
    if message and connected
      $inputMessage.val('')
      addChatMessage({
        username: username
        message: message
        color: myColor
        mySelf: true
      });

    # tell server to execute 'new message' and send along one parameter
    socket.emit('new message', message)

  # Log a message
  log = (message, options) ->
    $el = $('<li>').addClass('log').text(message)
    addMessageElement($el, options)

  # Adds the visual chat message to the message list
  addChatMessage = (data, options) ->
    # Don't fade the message in if there is an 'X was typing'
    $typingMessages = getTypingMessages(data)
    options = options || {}
    if $typingMessages.length isnt 0
      options.fade = false
      $typingMessages.remove()

    $usernameDiv = $('<span class="username"/>')
    .text('(' + getNow() + ')' + data.username)
    .css('color', data.color)
    $messageBodyDiv = $('<span class="messageBody">')
    .text(data.message)
    typingClass = if data.typing then 'typing' else ''
    $messageDiv = $('<li class="message"/>')
    .data('username', data.username)
    .addClass(typingClass)
    .append($usernameDiv, $messageBodyDiv)
    if data.mySelf
      $messageDiv.addClass('myself')
      $messageDiv.append('<div class="clearfix"></div>')
    addMessageElement($messageDiv, options)

  # Adds the visual chat typing message
  addChatTyping = (data) ->
    data.typing = true
    data.message = 'is typing'
    addChatMessage(data)

  # Removes the visual chat typing message
  removeChatTyping = (data) ->
    getTypingMessages(data).fadeOut(->
      $(this).remove()
    )

  # Adds a message element to the messages and scrolls to the bottom
  # el - The element to add as a message
  # options.fade - If the element should fade-in (default = true)
  # options.prepend - If the element should prepend
  #   all other messages (default = false)
  addMessageElement = (el, options) ->
    $el = $(el)
    # Setup default options
    if !options
      options = {}
    if typeof options.fade is 'undefined'
      options.fade = true
    if typeof options.prepend is 'undefined'
      options.prepend = false
    # Apply options
    if options.fade
      $el.hide().fadeIn(FADE_TIME)
    if options.prepend
      $messages.prepend($el)
    else
      $messages.append($el)
    $messages[0].scrollTop = $messages[0].scrollHeight

  # Prevents input from having injected markup
  cleanInput = (input) ->
    return $('<div/>').text(input).text()

  # Updates the typing event
  updateTyping = () ->
    if connected
      if !typing
        typing = true
        socket.emit('typing')
      lastTypingTime = (new Date()).getTime()
      setTimeout(() ->
        typingTimer = (new Date()).getTime()
        timeDiff = typingTimer - lastTypingTime
        if timeDiff >= TYPING_TIMER_LENGTH && typing
          socket.emit('stop typing')
          typing = false
      , TYPING_TIMER_LENGTH)


  # Gets the 'X is typing' messages of a user
  getTypingMessages = (data) ->
    $('.typing.message').filter((i) ->
      $(this).data('username') is data.username
    )


  # Keyboard events
  registerKeyEvent = ->
    $window.keydown((event) ->
      # Auto-focus the current input when a key is typed
      if (!(event.ctrlKey || event.metaKey || event.altKey))
        $currentInput.focus()
      # When the client hits ENTER on their keyboard
      if (event.which is 13)
        if username
          sendMessage();
          socket.emit('stop typing');
          typing = false;
        else
          setUsername()
    )
  unRegisterKeyEvent = ->
    $window.off('keydown')

  $inputMessage.on('input', () ->
    updateTyping()
  )

  # Focus input when clicking on the message input's border
  $inputMessage.click(() ->
    $inputMessage.focus()
  )

  # Socket events

  # Whenever the server emits 'login', log the login message
  socket.on('login', (data) ->
    connected = true
    # Display the welcome message
    message = "Welcome to Flying Chat – "
    log(message, {
      prepend: true
    })
    addParticipantsMessage(data)
  )

  socket.on('forced logout', ->
    socket.disconnect()
    alert('你已被强制下线！')
  )

  # Whenever the server emits 'new message', update the chat body
  socket.on('new message', (data) ->
    regNotify('message')
    addChatMessage(data)
  )

  # Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', (data) ->
    regNotify('joined', data.username)
    log(data.username + ' joined at ' + getNow())
    addParticipantsMessage(data)
  )

  # Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', (data) ->
    regNotify('left', data.username)
    log(data.username + ' left at ' + getNow())
    addParticipantsMessage(data)
    removeChatTyping(data)
  )

  # Whenever the server emits 'typing', show the typing message
  socket.on('typing', (data) ->
    addChatTyping(data)
  )

  # Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', (data) ->
    removeChatTyping(data)
  )

  socket.emit('add user', {
    username: username,
    color: myColor
  });

  # -更新在线人员信息--------------------------------------------------------------
  socket.on('server-refreshOnlineUser', (data) ->
    $users = []
    for p of data when data.hasOwnProperty(p)
      $users.push('<li>' + p + '</li>')
    $('#ul_userList').html($users.join(''))
  )

  refreshOnLineUser = ->
    socket.emit('client-refreshOnlineUser')

  setInterval(->
    refreshOnLineUser()
  , 5000)
  refreshOnLineUser()

  regNotify = (type, username) ->
    if !window.pageIsActive
      allowNotify = true
      if type is 'left'
        notifyTitle = "【#{username} 离开聊天！】"
      else if type is 'joined'
        notifyTitle = "【#{username} 加入聊天！】"
      else if type is 'message'
        unreadMsgCount++
        notifyTitle = "【您有#{unreadMsgCount}条未读消息！】"
      browserNotify()

  # 浏览器标题通知
  browserNotify = ->
    if !notifyInterval and allowNotify
      isNotify = true
      notifyInterval = setInterval(->
        document.title = if isNotify then notifyTitle else originalTitle
        isNotify = !isNotify
      , 100)

  window.pageActiveChanged = ->
    if window.pageIsActive
      document.title = originalTitle
      clearInterval(notifyInterval) if notifyInterval
      allowNotify = false
      notifyInterval = undefined
      unreadMsgCount = 0
    else
      browserNotify()
  # 注册按键事件
  registerKeyEvent()
  # 防止页面误关闭
  document.body.onload = window.on_page_loaded;

  # 锁屏
  window.isLocked = false
  Mousetrap.bindGlobal('ctrl+x', ->
    if !window.isLocked
      window.isLocked = true
      # 遮罩
      $('#bg').show()
      $('#lock_password').focus()
      unRegisterKeyEvent()
  )
  window.unlock = ->
    password = $('#lock_password').val()
    if password is 'love'
      $('#lock_password').val('')
      window.isLocked = false
      $('#bg').hide()
      registerKeyEvent()
    else
      alert('Error：非法访问！')
  Mousetrap.bindGlobal('h m', ->
    $('#lock_password').val('')
    window.isLocked = false
    $('#bg').hide()
    registerKeyEvent()
  )

  # 页面初始化事件
  $(->
    $('#clear_screen').on('click', ->
      # 清屏
      $('.messages').empty()
    )
  )

)