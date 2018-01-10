const config = require('../config');
const { MongoClient } = require('../db-providers');
const mongodb = require('mongodb');

const dbConfig = config.dbConfig;
const clientPromise = mongodb.MongoClient.connect(dbConfig.uri);

module.exports = new MongoClient(clientPromise, dbConfig.dbName);
