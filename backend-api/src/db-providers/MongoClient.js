// const Collection = require('mongodb/lib/collection');
class MongoClient {
  constructor(clientPromise, dbName) {
    this.clientPromise = clientPromise;
    this.dbName = dbName;
  }

  async _getDatabase() {
    const client = await this.clientPromise;
    return client.db(this.dbName);
  }

  /**
   *
   * @param {string} collectionName
   * @returns {Collection}
   */
  async _getCollection(collectionName) {
    const db = await this._getDatabase();
    return db.collection(collectionName);
  }

  /**
   * Insert single document
   * @param {string} collectionName
   * @param {object} doc
   * @param {*} options
   */
  async insertOne(collectionName, doc, options) {
    const collection = await this._getCollection(collectionName);
    return await collection.insertOne(doc, options || {});
  }

  /**
   * Insert many documents
   * @param {string} collectionName
   * @param {object[]} docs
   * @param {*} options
   */
  async insertMany(collectionName, docs, options) {
    const collection = await this._getCollection(collectionName);
    return await collection.insertMany(docs, options || {});
  }
}

module.exports = MongoClient;
