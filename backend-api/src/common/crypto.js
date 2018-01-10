const crypto = require('crypto');

const hmac = (algorithm, text, secret) => {
  const hmac = crypto.createHmac(algorithm, secret);
  hmac.update(text);
  return hmac.digest('hex');
};

module.exports = {
  hmac_sha256(text, secret = '') {
    return hmac('sha256', text, secret);
  }
};
