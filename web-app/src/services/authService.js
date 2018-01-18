import { ajax, storage } from '../common';

export const authService = {
  autologin: false,
  async doLogin(user) {
    const { data } = await ajax.post('/account/login', user);
    storage.session.set('user', data);
    return data;
  },
  async doAutoLogin() {
    try {
      await ajax.post('/account/autologin');
      storage.session.set('user', data);
    } catch (e) {
      storage.session.remove('user');
    }
  },
  async checkUserAuth(to, from, next) {
    const needLogin = to.matched.some(x => x.meta.login);
    let user = storage.session.get('user');
    if (needLogin && !user) {
      if (!this.autologin) {
        this.autologin = true;
        await this.doAutoLogin();
      }
      user = storage.session.get('user');
      if (!user) {
        return next('/login');
      }
    }
    next();
  }
};
