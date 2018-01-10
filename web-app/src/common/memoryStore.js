const session = require('express-session');
const store = new session.MemoryStore();
const logger = require('./logger');

store.getSession = sid => {
  return new Promise(resolve => {
    store.get(sid, (err, session) => {
      if (err) {
        logger.error(err);
        return resolve(null);
      }
      if (session) {
        session = session.passport.user;
      }
      resolve(session);
    });
  });
};

module.exports = store;
