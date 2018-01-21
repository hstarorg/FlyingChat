import { types } from './mutation-types';

export const mutations = {
  [types.UPDATE_TOP_LEVEL](state, topLevel) {
    state.topLevel = topLevel;
  },
  [types.UPDATE_CONTACT_SHOW_TYPE](state, contactShowType) {
    state.contactShowType = contactShowType;
  },
  [types.UPDATE_FRIENDS](state, friends) {
    state.friends = friends;
  },
  [types.UPDATE_GROUPS](state, groups) {
    state.groups = groups;
  },
  [types.UPDATE_SESSIONS](state, sessions) {
    state.sessions = sessions;
  },
  [types.SET_ACTIVED_SESSION_ID](state, sessionId) {
    state.activedSessionId = sessionId;
  },
  [types.SET_USER_INFO](state, user) {
    state.user = user;
  }
};
