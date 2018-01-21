import { types } from './mutation-types';

export const actions = {
  updateTopLevel({ commit }, topLevel) {
    commit(types.UPDATE_TOP_LEVEL, topLevel);
  },
  updateContactShowType({ commit }, contactShowType) {
    commit(types.UPDATE_CONTACT_SHOW_TYPE, contactShowType);
  },
  setUserInfo({ commit }, user) {
    commit(types.SET_USER_INFO, user);
  },
  setActivedSession({ commit, state }, payload) {
    const isGroup = !!payload.groupId;
    const sessions = state.sessions;
    console.log(payload, sessions);
  }
};
