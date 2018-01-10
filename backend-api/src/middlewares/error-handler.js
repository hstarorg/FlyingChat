const http = require('http');

module.exports = options => {
  if (!options) {
    options = { env: 'development' };
  }
  return async function error(ctx, next) {
    try {
      await next();
      if (ctx.response.status === 404 && !ctx.response.body) {
        ctx.throw(404);
      }
    } catch (err) {
      ctx.status = typeof err.status === 'number' ? err.status : 500;
      // Send error
      const errObj = {};
      if (err.isJoi || err.isBiz) {
        ctx.status = 400;
        errObj.error = err.message;
      } else {
        errObj.error = http.STATUS_CODES[ctx.status];
      }
      if (typeof err.status === 'number') {
        ctx.status = err.status;
      }
      if (options.env === 'development') {
        errObj.stack = err.stack;
      }
      ctx.body = errObj;
    }
  };
};
