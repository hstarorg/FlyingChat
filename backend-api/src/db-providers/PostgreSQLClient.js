class PostgreSQLClient {
  constructor(pool) {
    this.pool = pool;
  }

  /**
   * Begin database transaction
   */
  async beginTransaction() {
    const client = await this._getClient();
    await client.query('BEGIN');
    return client;
  }

  /**
   * Commit transaction
   * @param {any} client
   */
  commitTransaction(client) {
    return client.query('COMMIT');
  }

  /**
   * Rollback transaction
   * @param {any} client
   */
  rollbackTransaction(client) {
    return client.query('ROLLBACK');
  }

  /**
   * Get a database connection
   */
  getConnection() {
    return this._getClient();
  }

  /**
   * Execute sql, return query result(array)
   * @param {string} sqlString
   * @param {object | array} values
   * @param {any} client
   */
  executeQuery(sqlString, values, client = null) {
    return this._execute(sqlString, values, client).then(res => {
      return res.rows;
    });
  }

  /**
   * Execute sql, return single result(the first one)
   * @param {string} sqlString
   * @param {object | array} values
   * @param {any} client
   */
  executeScalar(sqlString, values, client = null) {
    return this._execute(sqlString, values, client).then(res => {
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0];
    });
  }

  /**
   * Execute sql, return affected rows
   * @param {string} sqlString
   * @param {object | array} values
   * @param {any} client
   */
  executeNonQuery(sqlString, values, client = null) {
    return this._execute(sqlString, values, client).then(res => {
      return res.rowCount;
    });
  }

  /**
   * private function, get db connection
   */
  _getClient() {
    return this.pool.connect();
  }

  /**
   * Release connection
   * @param {any} conn
   * @param {boolean} closeTran
   */
  _releaseClient(conn, closeTran = false) {
    if (closeTran) {
      conn.inTransaction = false;
    }
    conn.release();
  }

  /**
   * Execute sql, return resuluts;
   * @param {string} sqlString
   * @param {object|array} values
   * @param {any} client
   */
  _execute(sqlString, values, client) {
    const { sql, params } = this._processSqlAndParameter(sqlString, values);
    const p = client ? Promise.resolve(client) : this._getClient();
    return p.then(client => {
      return client
        .query(sql, params)
        .then(res => {
          this._releaseClient(client);
          return res;
        })
        .catch(err => {
          this._releaseClient(client);
          return Promise.reject(err);
        });
    });
  }

  // Format params
  _processSqlAndParameter(sqlString, params) {
    let result;
    // If is an array, direct return.
    if (Array.isArray(params)) {
      result = {
        sql: sqlString,
        params: params.slice()
      };
    } else {
      // Replace object to array, and use ? replace @Property
      const paramArr = [];
      if (params) {
        const paramKeys = Object.keys(params);
        let index = 0;
        sqlString = sqlString.replace(/@[a-zA-Z0-9_]+/g, (match, offset, str) => {
          const matchKey = match.replace('@', '');
          if (paramKeys.indexOf(matchKey) >= 0) {
            paramArr.push(params[matchKey]);
            index++;
            return `$${index}`;
          }
          return match;
        });
      }
      result = {
        sql: sqlString,
        params: paramArr
      };
    }
    return result;
  }
}

module.exports = PostgreSQLClient;
