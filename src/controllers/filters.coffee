exports.authorize = (req, res, next) ->
  console.log(req.session)
  if !req.session.user_id
    res.redirect('/user/login')
  else
    next()