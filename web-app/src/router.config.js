import Vue from 'vue';
import Router from 'vue-router';
import * as pages from './pages';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{ path: '/login', component: pages.Login }, { path: '/', component: pages.Main }]
});

router.beforeEach((to, from, next) => {
  next();
});

export { router };
