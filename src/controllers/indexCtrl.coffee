exports.index = (req, res, next) ->
  model = {
    title: 'FlyingChat --最懂你的聊天工具'
    pretty: true
    nick: '神仙姐姐'#req.session.user.UserNick
  }
  res.render('index', model)
