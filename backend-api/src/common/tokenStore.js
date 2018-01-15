const LRU = require('lru-cache');
const lruCache = LRU({
  max: 10000,
  maxAge: 1000 * 60 * 60 * 60 * 24,
  dispose: function(key, n) {
    n.close();
  }
});

const cacheStore = {
  set(key, value) {
    return Promise.resolve(lruCache.set(key, value));
  },
  get(key) {
    return Promise.resolve(lruCache.get(key));
  },

  delete(key) {
    return Promise.resolve(lruCache.del(key));
  }
};

const redisStore = {
  set(key, value) {
    return Promise.resolve(lruCache.set(key, value));
  },
  get(key) {
    return Promise.resolve(lruCache.get(key));
  },

  delete(key) {
    return Promise.resolve(lruCache.del(key));
  }
};

module.exports = cacheStore;
