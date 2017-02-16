const crypto = require('crypto');
const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 512 });

const processDesCrypto = (cipher, encoding, data) => {
  var buffer1 = cipher.update(data, encoding);
  var buffer2 = cipher.final();
  var bufferMerge = new Buffer(buffer1.length + buffer2.length);
  buffer1.copy(bufferMerge); buffer2.copy(bufferMerge, buffer1.length);
  return bufferMerge;
};

const desEncrypt = (data, key, vi) => {
  return processDesCrypto(crypto.createCipheriv('des', key, vi), 'utf8', data).toString('base64');
};

const desDecrypt = (data, key, vi) => {
  return processDesCrypto(crypto.createDecipheriv('des', key, vi), 'base64', data).toString('utf8');
};

const rsaPrivateEncrypt = (data, privateKey) => {
  //return crypto.privateEncrypt()
  let encrypted = key.encrypt(data, 'base64');
  return encrypted;
};

const rsaPublicDecrypt = (data, publicKey) => {
  //return crypto.publicDecrypt()
  var decrypted = key.decrypt(data, 'utf8');
  return decrypted;
};

const buildKeyPair = () => {
  return {
    publicKey: '',
    privateKey: ''
  };
};

module.exports = {
  desEncrypt,
  desDecrypt,
  buildKeyPair,
  rsaPrivateEncrypt,
  rsaPublicDecrypt
};
