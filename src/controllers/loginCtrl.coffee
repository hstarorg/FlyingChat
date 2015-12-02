db = require('./../common/db')

getLogin = (req, res, next) ->
  model = {
    title: 'FlyingChat -- Login'
    pretty: true
  }
  res.render('user/login', model)

postLogin = (req, res, next) ->
  username = req.body.account
  password = req.body.password
  db.users.findOne({
      LoginName: username,
      LoginPassword: password
    }, (err, user) ->
      if err
        next(err)
        return
      if user is undefined
        model = {
          loginName: username
          title: 'FlyingChat -- Login'
          pretty: true
          errmsg: 'Invalid account or password!'
        }
        res.render('user/login', model)
      else
        req.session.user_id = user.UserId
        req.session.user = {
          LoginName: user.LoginName
          UserNick: user.UserNick
        }
        console.log(req.session)
        res.redirect('/')
  )

# 导出
module.exports = {
  login: getLogin
  postLogin: postLogin
}

