dbHelper = require('./../common/dbHelper')

getLogin = (req, res, next) ->
  model = {
    title: 'FlyingChat -- Login'
    pretty: true
  }
  res.render('user/login', model)

postLogin = (req, res, next) ->
  username = req.body.account
  password = req.body.password
  dbHelper.executeScalar('SELECT * FROM User  WHERE LoginName=? AND LoginPassword=?',[
      username, password], (err, row) ->
    if err
      next(err)
    else
      if row is undefined
        model = {
          loginName: username
          title: 'FlyingChat -- Login'
          pretty: true
          errmsg: 'Invalid account or password!'
        }
        res.render('user/login', model)
        # 登录成功！
      else
        req.session.user_id = row.UserId
        req.session.user = {
          LoginName: row.LoginName
          UserNick: row.UserNick
        }
        res.redirect('/')
  )

# 导出
module.exports = {
  login: getLogin
  postLogin: postLogin
}

