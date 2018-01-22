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
   * Get collection
   * @param {string} collectionName
   * @returns {Collection}
   */
  async _getCollection(collectionName) {
    const db = await this._getDatabase();
    return db.collection(collectionName);
  }

  /**
   * Get the positive integer, if n is not positive integer, return defaultVal
   * @param {any} n The param n
   * @param {number} defaultVal The defaultVal will be return when n is not positive integer
   */
  _getPositiveInteger(n, defaultVal) {
    n = +n;
    if (n === n && n % 1 === 0 && n > 0) {
      return n;
    }
    return defaultVal;
  }

  /**
   * Get paging info by pageObj
   * @param {object} pageObj The paging object
   * @param {number} pageObj.index The page
   * @param {number} pageObj.size Size of page
   */
  _getPagingInfo(pageObj) {
    pageObj = pageObj || {};
    const index = this._getPositiveInteger(pageObj.index, 1);
    const size = this._getPositiveInteger(pageObj.size, 20);
    const skip = size * (index - 1);
    return { skip, limit: size };
  }

  /**
   * Insert single document
   * @param {string} collectionName
   * @param {object} doc
   * @param {*} options
   */
  async insertOne(collectionName, doc, options = {}) {
    const collection = await this._getCollection(collectionName);
    const commandResult = await collection.insertOne(doc, options);
    return {
      ops: commandResult.ops,
      insertedCount: commandResult.insertedCount,
      insertedId: commandResult.insertedId
    };
  }

  /**
   * Insert many documents
   * @param {string} collectionName
   * @param {object[]} docs
   * @param {*} options
   */
  async insertMany(collectionName, docs, options = {}) {
    const collection = await this._getCollection(collectionName);
    return await collection.insertMany(docs, options);
  }

  /**
   * Query the data list
   * @param {string} collectionName The collection name
   * @param {object} query The query object
   * @param {object} fields The fields to return in the query. Object of fields to include or exclude (not both), {'a':1}
   * @param {(array|object)} sortObj Set to sort the documents coming back from the query. Array of indexes, [['a', 1]] etc.
   * @param {object} pageObj The paging object
   * @param {number} [pageObj.index=1] The page index will be return
   * @param {number} [pageObj.size=20] The size of every page
   * @param {object} options
   */
  async find(collectionName, query, fields, sortObj, pageObj, options = {}) {
    const collection = await this._getCollection(collectionName);
    const { skip, limit } = this._getPagingInfo(pageObj);
    options = Object.assign({}, options, { sort: sortObj, projection: fields, skip, limit });
    return await collection.find(query, options).toArray();
  }

  /**
   * Query the single object
   * @param {string} collectionName The collection name
   * @param {object} query The query object
   * @param {object} fields The fields to return in the query. Object of fields to include or exclude (not both), {'a':1}
   * @param {object} options
   */
  async findOne(collectionName, query, fields = {}, options = {}) {
    const collection = await this._getCollection(collectionName);
    options = Object.assign({}, options, { projection: fields });
    return await collection.findOne(query, options);
  }

  /**
   * Find a document and delete it in one atomic operation, requires a write lock for the duration of the operation.
   * @param {string} collectionName The collection name
   * @param {*} filter Document selection filter.
   * @param {*} options
   */
  async findOneAndDelete(collectionName, filter, options = {}) {
    const collection = await this._getCollection(collectionName);
    return await collection.findOneAndDelete(filter, options);
  }

  /**
   * Find a document and replace it in one atomic operation, requires a write lock for the duration of the operation.
   * @param {string} collectionName
   * @param {object} filter Document selection filter.
   * @param {object} replacement Document replacing the matching document.
   * @param {object} options
   */
  async findOneAndReplace(collectionName, filter, replacement, options = {}) {
    const collection = await this._getCollection(collectionName);
    return await collection.findOneAndReplace(filter, replacement, options);
  }

  /**
   * Find a document and update it in one atomic operation, requires a write lock for the duration of the operation.
   * @param {string} collectionName The collection name
   * @param {object} filter The filter object
   * @param {object} update Update operations to be performed on the document
   * @param {object} options
   */
  async findOneAndUpdate(collectionName, filter, update, options = {}) {
    const collection = await this._getCollection(collectionName);
    return await collection.findOneAndUpdate(filter, update, options);
  }

  /**
   * Update multiple documents on MongoDB
   * @param {string} collectionName The collection name
   * @param {object} filter The Filter used to select the document to update
   * @param {object} update The update operations to be applied to the document
   * @param {object} options
   * @param {boolean} [options.upsert=false] Update operation is an upsert.
   */
  async updateMany(collectionName, filter, update, options = {}) {
    const collection = await this._getCollection(collectionName);
    return await collection.updateMany(filter, update, options);
  }

  /**
   * Update a single document on MongoDB
   * @param {string} collectionName The collection name
   * @param {object} filter The Filter used to select the document to update
   * @param {object} update The update operations to be applied to the document
   * @param {*} options
   * @param {boolean} [options.upsert=false] Update operation is an upsert.
   */
  async updateOne(collectionName, filter, update, options = {}) {
    const collection = await this._getCollection(collectionName);
    return await collection.updateOne(filter, update, options);
  }

  /**
   * Delete a document on MongoDB
   * @param {string} collectionName The collection name
   * @param {object} filter The Filter used to select the document to update
   * @param {object} options
   */
  async deleteOne(collectionName, filter, options = {}) {
    const collection = await this._getCollection(collectionName);
    return await collection.deleteOne(filter, options);
  }

  /**
   * Delete multiple documents on MongoDB
   * @param {string} collectionName The collection name
   * @param {object} filter The Filter used to select the document to update
   * @param {object} options
   */
  async deleteMany(collectionName, filter, options = {}) {
    const collection = await this._getCollection(collectionName);
    return await collection.deleteMany(filter, options);
  }

  /**
   * Count number of matching documents in the db to a query.
   * @param {string} collectionName The collection name
   * @param {object} query he Filter used to select the document to update
   * @param {object} options
   */
  async count(collectionName, query, options = {}) {
    const collection = await this._getCollection(collectionName);
    return await collection.count(query, options);
  }
}

module.exports = MongoClient;
