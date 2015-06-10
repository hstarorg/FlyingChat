getIndex = (req, res, next) ->
  model = {
    title: 'FlyingChat --最懂你的聊天工具'
    pretty: true
    nick: req.session.user.UserNick
  }
  res.render('index', model)

module.exports = {
  index: getIndex
}
