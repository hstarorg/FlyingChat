import { ajax, storage } from '../common';
import { store, types } from '../store';

const LOCAL_TOKEN_KEY = 'fc-token';

export const authService = {
  autologin: false,
  async doLogin(user) {
    const { data } = await ajax.post('/account/login', user);
    this._setUserInfo(data);
    return data;
  },
  async doAutoLogin(token) {
    try {
      ajax.setToken(token);
      const { data } = await ajax.post('/account/autologin');
      this._setUserInfo(data);
    } catch (e) {}
  },
  _setUserInfo(user) {
    store.commit(types.SET_USER_INFO, user);
    ajax.setToken(user.token);
    storage.local.set(LOCAL_TOKEN_KEY, user.token);
  },
  async checkUserAuth(to, from, next) {
    const needLogin = to.matched.some(x => x.meta.login);
    let token = store.state.user.token;
    // 在需要登录的页面中，又没有找到登录信息
    if (needLogin && !token) {
      // 如果没有自动登录过，就自动登录
      const localToken = storage.local.get(LOCAL_TOKEN_KEY);
      if (!this.autologin && localToken) {
        this.autologin = true;
        await this.doAutoLogin(localToken);
      }
      // 自动登录完毕后（不管成功还是失败），在获取一次token
      token = store.state.user.token;
      // 如果还是没有token，则跳转到登录页面
      if (!token) {
        return next('/login');
      }
    }
    next();
  }
};
