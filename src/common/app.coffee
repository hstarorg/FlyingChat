express = require('express')
path = require('path')
favicon = require('serve-favicon')
morganLogger = require('morgan')
cookieParser = require('cookie-parser')
bodyParser = require('body-parser')
session = require('express-session')
# Log
log4js = require('log4js')
log4js.configure(path.join(__dirname, '../config/log4jsConfig.json'), {
      reloadSecs: 60
      cwd: path.join(__dirname, '../')
  }
)
logger = log4js.getLogger()

routeConfig = require('./../routes/routeConfig')
app = express()

# view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'vash')

# uncomment after placing your favicon in /public
# app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morganLogger('dev'))
app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    resave: false # don't save session if unmodified
    saveUninitialized: false # don't create session until something stored
    secret: 'jay.m.hu, very secret'
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

# register routes
routeConfig.registerRoutes(app)

# catch 404 and forward to error handler
app.use((req, res, next) ->
    err = new Error('Not Found')
    err.status = 404
    next(err)
)

# error handlers

# development error handler
# will print stacktrace
if app.get('env') is 'development'
    app.use((err, req, res, next) ->
        res.status(err.status || 500)
        logger.warn(err.message)
        res.render('error', {
            message: err.message + ' --Debug!!!'
            error: err
        })
    )

# production error handler
# no stacktraces leaked to user
app.use((err, req, res, next) ->
    res.status(err.status || 500)
    res.render('error', {
        message: err.message
        error: {}
    })
)
process.on('uncaughtException', (err) ->
    logger.error(err.message)
)

module.exports = app
