import Vue from 'vue';
import Router from 'vue-router';
import * as pages from './pages';
import { authService } from './services';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: pages.Login },
    { path: '/register', component: pages.Register },
    { path: '/', component: pages.Main, meta: { login: true } },
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  authService.checkUserAuth(to, from, next);
});

export { router };
