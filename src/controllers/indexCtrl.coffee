exports.index = (req, res, next) ->
  res.render('index', {
    title: 'FlyingChat --最懂你的聊天工具'
    pretty: true
  })
