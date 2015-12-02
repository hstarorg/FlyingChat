# define
express = require('express')
path = require('path')
favicon = require('serve-favicon')
cookieParser = require('cookie-parser')
bodyParser = require('body-parser')
session = require('express-session')

memoryStore = require('./memoryStore')
logFactory = require('./../lib/logFactory')
routeConfig = require('./../routes/routeConfig')
config = require('./../config')

errorLogger = logFactory.errLogger
# 初始化app
setViewEngine = (app) ->
  app.set('views', path.join(__dirname, '../views'))
  app.set('view engine', 'vash')
  app.set('env', config.env)

setMiddleware = (app) ->
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(session({
    name: config.cookieName
    resave: false # don't save session if unmodified
    saveUninitialized: false # don't create session until something stored
    secret: config.cookieSecret
    store: memoryStore
  }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, './../assets/')))

setErrorHandle = (app) ->
  # 404 Error
  app.use((req, res, next) ->
    err = new Error('Page not found.' + req.url)
    err.status = 404
    next(err)
  )
  # 获取环境
  isPrd = app.get('env') is 'prd'
  app.use((err, req, res, next) ->
    res.status(err.status || 500)
    errorLogger.info(err.message)
    res.render('error', {
      isPrd: isPrd
      message: err.message
      error: if isPrd then {} else err
    })
  )

  # 处理进程异常
  process.on('uncaughtException', (err) ->
    errorLogger.error(err.message)
  )

# 导出模块
module.exports = {
  init: (app) ->
    setViewEngine(app)
    setMiddleware(app)
    routeConfig.registerRoutes(app)
    setErrorHandle(app)
}