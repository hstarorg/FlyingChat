import Vue from 'vue';
import Vuex from 'vuex';
import { actions } from './actions';
import { types } from './mutation-types';
import { mutations } from './mutations';

Vue.use(Vuex);

const isDebug = process.env.NODE_ENV !== 'production';

const state = {
  user: {
    // 用户信息
    userId: 0,
    userName: '',
    nickName: '',
    avatarUrl: '',
    token: ''
  },
  topLevel: 'session', // 顶级的菜单选中项
  contactShowType: 'users', // 左侧联系人面板的选中项,
  selectedSession: '', // 当前选中的会话
  friends: [], // 好友列表
  groups: [], // 群列表
  sessions: [], // 会话列表,
  activedSessionId: '' // 激活的聊天ID（实际是groupID）
};

export const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
  strict: isDebug,
  plugins: []
});

export { types };
