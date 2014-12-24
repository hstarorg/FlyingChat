$(() ->
  FADE_TIME = 150 # ms
  TYPING_TIMER_LENGTH = 400 # ms
  COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ]
  # Initialize varibles
  $window = $(window)
  $usernameInput = $('.usernameInput') # Input for username
  $messages = $('.messages'); # Messages area
  $inputMessage = $('.inputMessage'); # Input message input box

  $loginPage = $('.login.page'); # The login page
  $chatPage = $('.chat.page'); # The chatroom page

  # Prompt for setting a username
  username = ''
  connected = false
  typing = false
  lastTypingTime = undefined
  $currentInput = $usernameInput.focus()

  socket = io();

  addParticipantsMessage = (data) ->
    message = ''
    if data.numUsers is 1
      message += "there's 1 participant"
    else
      message += "there are " + data.numUsers + " participants"
    log(message)

  # Sets the client's username
  setUsername = () ->
    username = cleanInput($usernameInput.val().trim())
    # If the username is valid
    if username
      $loginPage.fadeOut()
      $chatPage.show()
      $loginPage.off('click')
      $currentInput = $inputMessage.focus()
      # Tell the server your username
      socket.emit('add user', username)

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
      });

    # tell server to execute 'new message' and send along one parameter
    socket.emit('new message', message)

  # Log a message
  log = -(message, options) ->
    $el = $('<li>').addClass('log').text(message)
    addMessageElement($el, options)

  # Adds the visual chat message to the message list
  addChatMessage (data, options) ->
    # Don't fade the message in if there is an 'X was typing'
    $typingMessages = getTypingMessages(data)
    options = options || {}
    if $typingMessages.length isnt 0
      options.fade = false
      $typingMessages.remove()

    $usernameDiv = $('<span class="username"/>')
    .text(data.username)
    .css('color', getUsernameColor(data.username))
    $messageBodyDiv = $('<span class="messageBody">')
    .text(data.message)
    typingClass = data.typing ? 'typing' : ''
    $messageDiv = $('<li class="message"/>')
    .data('username', data.username)
    .addClass(typingClass)
    .append($usernameDiv, $messageBodyDiv)
    addMessageElement($messageDiv, options)

  # Adds the visual chat typing message
  addChatTyping (data) ->
    data.typing = true
    data.message = 'is typing'
    addChatMessage(data)

  # Removes the visual chat typing message
  removeChatTyping (data) ->
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

  # Gets the color of a username through our hash function
  getUsernameColor = (username) ->
    # Compute hash code
    hash = 7;
    for i in username
      hash = username.charCodeAt(i) + (hash << 5) - hash
    # Calculate color
    index = Math.abs(hash % COLORS.length)
    return COLORS[index]

  # Keyboard events

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

  $inputMessage.on('input', () ->
    updateTyping()
  )

  # Click events
  # Focus input when clicking anywhere on login page
  $loginPage.click(() ->
    $currentInput.focus()
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
    message = "Welcome to Socket.IO Chat – "
    log(message, {
      prepend: true
    })
    addParticipantsMessage(data)
  )

  # Whenever the server emits 'new message', update the chat body
  socket.on('new message', (data) ->
    addChatMessage(data)
  )

  # Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', (data) ->
    log(data.username + ' joined')
    addParticipantsMessage(data)
  )

  # Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', (data) ->
    log(data.username + ' left')
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
)