import 'normalize.css';
import './styl/all.styl';
import './config';

import { ajax } from '@/common';
import Vue from 'vue';
import App from './App';
import { COMPONENTS } from './components';
import { router } from './router.config';

COMPONENTS.forEach(comp => Vue.component(comp.name, comp));

ajax.setBaseURL(AppConf.apiHost);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
