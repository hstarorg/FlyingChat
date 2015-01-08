exports.authorize = (req, res, next) ->
  if !req.session.user_id
    res.redirect('/user/login')
  else
    next()