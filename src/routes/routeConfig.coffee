# require 需要的路由
index = require('./index')
users = require('./users')

# 在这里配置路由
routeConfig = {
  registerRoutes: (app) ->
    app.use('/', index)
    app.use('/users', users)
}

module.exports = routeConfig