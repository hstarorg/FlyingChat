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
    const sessions = state.sessions;
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
    const groupInfo = await getGroupInfo(groupId);
    commit(types.SET_ACTIVED_SESSION_ID, groupId);
    let newSession = sessions.slice();
    if (sessions.filter(x => x.groupId === groupId).length === 0) {
      newSession.push(groupInfo);
    }
    commit(types.UPDATE_SESSIONS, newSession);
  }
};
