import 'normalize.css';

import './styl/all.styl';
import './config';

import { ajax } from '@/common';
import Vue from 'vue';

import App from './App';
import { router } from './router.config';

ajax.setBaseURL(AppConf.apiHost);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
