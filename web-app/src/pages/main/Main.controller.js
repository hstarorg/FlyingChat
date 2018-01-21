import io from 'socket.io-client';
import { mapActions } from 'vuex';
import { storage } from '@/common';
import { types } from '../../store';
import { chatPanel, contactPanel, sessionPanel } from './components';
import { getMainUIData } from './main.service';

export default {
  components: {
    chatPanel,
    contactPanel,
    sessionPanel
  },
  data() {
    return {
      conn: null
    };
  },
  created() {
    const user = storage.session.get('user');
    if (!user) {
      return this.$router.push('/login');
    }
    this._loadInitData();
    this.conn = io('http://localhost:7410', {
      transportOptions: {
        polling: {
          extraHeaders: {
            'x-fc-token': user.token
          }
        }
      }
    });
    this.conn.on('connect', this.onConnect.bind(this));
    this.conn.on('error', msg => {
      console.log('errer', msg);
      if (msg === '未授权的连接，请先登录') {
        this.$router.push('/login');
      }
    });
    this.conn.on('connect_error', err => console.log('connect_error', err.message));
    this.conn.on('test', msg => {
      console.log(msg);
    });
  },
  mounted() {},
  computed: {
    topLevel() {
      return this.$store.state.topLevel;
    },
    friends() {
      return this.$store.state.friends;
    },
    groups() {
      return this.$store.state.groups;
    },
    sessions() {
      return this.$store.state.sessions;
    }
  },
  methods: {
    ...mapActions(['updateTopLevel']),
    async _loadInitData() {
      const uiData = await getMainUIData();
      this.$store.commit(types.UPDATE_FRIENDS, uiData.friends);
      this.$store.commit(types.UPDATE_GROUPS, uiData.groups);
      this.$store.commit(types.UPDATE_SESSIONS, uiData.sessions);
    },
    selectPanel(panelName) {
      this.updateTopLevel(panelName);
    },
    onConnect() {}
  }
};
