import Vue from 'vue';
import Vuex from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';

Vue.use(Vuex);

const isDebug = process.env.NODE_ENV !== 'production';

const state = {
  topLevel: 'session', // 顶级的菜单选中项
  contactShowType: 'users', // 左侧联系人面板的选中项,
  selectedSession: '', // 当前选中的会话
};

export const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
  strict: isDebug,
  plugins: []
});
