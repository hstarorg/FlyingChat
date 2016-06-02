'use strict';

var crypto = require('crypto');
var NodeRSA = require('node-rsa');
var key = new NodeRSA({b: 512});

var processDesCrypto = (cipher, encoding, data) => {
  var buffer1 = cipher.update(data, encoding);
  var buffer2 = cipher.final();
  var bufferMerge = new Buffer(buffer1.length + buffer2.length);
  buffer1.copy(bufferMerge); buffer2.copy(bufferMerge, buffer1.length);
  return bufferMerge;
};

var desEncrypt = (data, key, vi) => {
  return processDesCrypto(crypto.createCipheriv('des', key, vi), 'utf8', data).toString('base64');
};

var desDecrypt = (data, key, vi) => {
  return processDesCrypto(crypto.createDecipheriv('des', key, vi), 'base64', data).toString('utf8');
};

var rsaPrivateEncrypt = (data, privateKey) => {
  //return crypto.privateEncrypt()
  var encrypted = key.encrypt(data, 'base64');
  return encrypted;
};

var rsaPublicDecrypt = (data, publicKey) => {
  //return crypto.publicDecrypt()
  var decrypted = key.decrypt(data, 'utf8');
  return decrypted;
};

var buildKeyPair = () => {
  return {
    publicKey: '',
    privateKey: ''
  };
}

module.exports = {
  desEncrypt: desEncrypt,
  desDecrypt: desDecrypt,
  buildKeyPair: buildKeyPair,
  rsaPrivateEncrypt: rsaPrivateEncrypt,
  rsaPublicDecrypt: rsaPublicDecrypt
};