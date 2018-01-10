const fs = require('fs');
const path = require('path');
const util = require('util');
const Joi = require('joi');
const uuid = require('uuid');
const config = require('../config');

module.exports = {
  /**
   * 批量加载路由
   * @param {*} app
   * @param {string} routesPath
   */

  /**
   * 动态加载路由，只加载单层
   */
  loadRoutes(app, routesPath) {
    fs.readdirSync(routesPath).forEach(filename => {
      let routeFilePath = path.join(routesPath, filename);
      if (fs.statSync(routeFilePath).isFile()) {
        let router = require(routeFilePath);
        app.use(router.routes());
      }
    });
  },

  generateUuidV4() {
    return uuid.v4();
  },

  generateUuidV5() {
    return uuid.v5();
  },

  /**
   * 数据验证
   * @param {*} data 要验证的数据
   * @param {*} schema 数据Schema
   * @param {*} options 默认验证所有属性，允许多余属性
   */
  validate(data, schema, options = { abortEarly: false, allowUnknown: true }) {
    return new Promise((resolve, reject) => {
      Joi.validate(data, schema, options, (err, value) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },
  /**
   * 扔错误
   * @param {string} message
   * @param {number} status
   */
  throwError(message, status = 400) {
    const err = new Error(message);
    err.status = status;
    err.isBiz = true;
    err.expose = true;
    throw err;
  },

  _isNotNaN(n) {
    return n === n;
  },

  // 分页处理插件，根据前端URL参数拼接出一个分页对象
  getPageObj(query, defaults = { page: 1, size: 20, maxSize: 500 }) {
    let page = +query.page;
    let size = +query.size;
    page = this._isNotNaN(page) ? page : defaults.page;
    size = this._isNotNaN(size) ? size : defaults.size;
    size = Math.min(size, defaults.maxSize); // 最大不能超过maxSize
    return {
      BeginIndex: (page - 1) * size,
      EndIndex: page * size,
      PageIndex: page,
      PageSize: size
    };
  },

  /**
   * 构造分页数据
   * @param {*} total
   * @param {*} data
   *  @param {*} pageObj
   */
  buildPageData(total, data, pageObj) {
    return {
      Total: total,
      DataList: data,
      PageIndex: pageObj.PageIndex,
      PageSize: pageObj.PageSize
    };
  },

  getNumberParam(query, key) {
    const v = +(query || {})[key];
    return this._isNotNaN(v) ? v : 0;
  },

  /**
   * 保存文件
   * @param {string} filepath
   * @param {File} file
   */
  // 通过promisify将node fs库 promise化
  async saveFile(filepath, file) {
    await util.promisify(fs.writeFile)(filepath, file);
  },

  /**
   * 移动文件
   * @param {string} oldPath 要移动的文件
   * @param {string} newPath 要移动到的路径
   */
  async moveFile(oldPath, newPath) {
    await util.promisify(fs.rename)(oldPath, newPath);
  },

  // 取得路径的绝对路径
  root(...args) {
    return path.join(__dirname, '..', ...args);
  }
};
