dbKit = require('./../common/dbKit')

exports.login = (req, res, next) ->
  res.render('user/login', {
    title: 'FlyingChat -- Login'
    pretty: true
  })
# 登录控制
exports.postLogin = (req, res, next) ->
  username = req.body.account
  password = req.body.password
  dbKit.executeScalar('SELECT * FROM User  WHERE LoginName=? AND LoginPassword=?',[
      username, password], (err, row) ->
    if err
      next(err)
    else
      if row is undefined
        res.send('登录失败，账户/密码不匹配!')
      # 登录成功！
      else
        req.session.user_id = row.UserId
        req.session.user = {
          LoginName: row.LoginName
        }
        res.redirect('/')
  )
