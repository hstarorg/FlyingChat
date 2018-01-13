import axios from 'axios';

const defaultOptions = {};

class AxiosHelper {
  get(url, options) {
    return this._request('get', url, null, options);
  }

  delete(url, options) {
    return this._request('delete', url, null, options);
  }

  post(url, data, options) {
    return this._request('post', url, data, options);
  }

  put(url, data, options) {
    return this._request('put', url, data, options);
  }

  setBaseURL(baseURL) {
    defaultOptions.baseURL = baseURL;
  }
  setToken(token) {
    defaultOptions.token = token;
  }

  _request(method, url, data, options = {}) {
    const opt = Object.assign({}, options, {
      method,
      url,
      data
    });
    opt.headers = options.headers || {};
    if (defaultOptions.token) {
      opt.headers['x-fc-token'] = defaultOptions.token;
    }
    if (defaultOptions.baseURL) {
      opt.baseURL = defaultOptions.baseURL;
    }
    return axios
      .request(opt)
      .then(res => {
        return res;
      })
      .catch(this._processError);
  }

  _processError(res) {
    console.error(res.message);
    return Promise.reject(res);
  }
}

export const ajax = new AxiosHelper();
