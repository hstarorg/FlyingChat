import Vue from 'vue';
import Router from 'vue-router';
import * as pages from './pages';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: pages.Login },
    { path: '/register', component: pages.Register },
    { path: '/', component: pages.Main },
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

export { router };
