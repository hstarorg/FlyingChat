# require 需要的路由
index = require('./index')
user = require('./user')

# 在这里配置路由
routeConfig = {
  registerRoutes: (app) ->
    app.use('/', index)
    app.use('/user', user)
}

module.exports = routeConfig