const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const template = require('art-template-plus');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const compression = require('compression');

const logger = require('./common/logger');
const config = require('./config');
const auth = require('./common/auth');
const ioBiz = require('./bizs/ioBiz');
const memoryStore = require('./common/memoryStore');

template.config('base', '');
template.config('extname', '.html');
template.config('openTag', '[[');
template.config('closeTag', ']]');
template.config('escape', true);

const app = express();
app.disable('x-powered-by');

// config view engine
app.engine('html', template.__express);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Load middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: memoryStore,
  name: config.sessionName,
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));
if (config.enableGzip) {
  let gzipOptions = config.gzipOptions || {};
  app.use(compression(gzipOptions));
}
app.use(passport.initialize());
app.use(passport.session());
auth.init(passport);
// config routes
const appRouter = require('./routes/app');
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/', appRouter);

// Error 404
app.use((req, res, next) => {
  let err = new Error('Api not found.');
  err.status = 404;
  next(err);
});

// Error 500
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

let httpServer = http.Server(app);
let io = require('socket.io')(httpServer);
ioBiz.init(io);

// 启动服务器
let server = httpServer.listen(config.port, _ => {
  logger.info('Express server listening on port ' + server.address().port + '...');
  logger.info('FlyingChat start successfully.');
});
