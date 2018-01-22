import { ajax } from '@/common';
import { types } from './mutation-types';

const getGroupInfo = async groupId => {
  const { data } = await ajax.get(`${AppConf.apiHost}/groups/${groupId}`);
  return data;
};

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
  async setActivedSession({ commit, state }, payload) {
    const isGroup = !!payload.groupId;
    const userId = state.user.userId;
    const newSession = state.sessions.slice();
    let groupId;
    if (!isGroup) {
      // 好友聊天（私聊）
      const userIds = [userId, payload.userId];
      userIds.sort();
      groupId = `user_${userIds.join('_')}`;
    } else {
      // 群聊天
      groupId = payload.groupId;
    }
    // 如果找不到该Session
    if (newSession.filter(x => x.groupId === groupId).length === 0) {
      // 获取到，并塞入Session
      const groupInfo = await getGroupInfo(groupId);
      newSession.push(groupInfo);
    }
    commit(types.SET_ACTIVED_SESSION_ID, groupId);
    commit(types.UPDATE_SESSIONS, newSession);
    commit(types.UPDATE_TOP_LEVEL, 'session');
  }
};
