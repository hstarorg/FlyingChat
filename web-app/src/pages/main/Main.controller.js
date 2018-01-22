import io from 'socket.io-client';
import { mapActions } from 'vuex';
import { messageBox } from '@/common';
import { types } from '../../store';
import { chatPanel, contactPanel, sessionPanel } from './components';
import { SocketStatus } from './enums/SocketStatus';
import { getMainUIData } from './main.service';

export default {
  components: {
    chatPanel,
    contactPanel,
    sessionPanel
  },
  data() {
    return {
      conn: null,
      status: SocketStatus.WAITING_CONNECT
    };
  },
  created() {
    if (!this.userToken) {
      return this.$router.push('/login');
    }
    this._loadInitData();
    this._connectSocketIO();
  },
  mounted() {},
  computed: {
    user(){
      return this.$store.state.user;
    },
    userToken() {
      return this.$store.state.user.token;
    },
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
    async _connectSocketIO() {
      window.io = io;
      this.conn = io(AppConf.socketHost, {
        transportOptions: { polling: { extraHeaders: { 'x-fc-token': this.userToken } } }
      });
      window.conn = this.conn;

      this.conn.on('connect', this.onConnect.bind(this));
      this.conn.on('connect_error', this.onConnectError.bind(this));
      this.conn.on('connect_timeout', this.onConnectTimeout.bind(this));
      this.conn.on('error', this.onError.bind(this));
      this.conn.on('disconnect', this.onDisconnect.bind(this));
      this.conn.on('reconnect', this.onReconnect.bind(this));
      this.conn.on('reconnect_attempt', this.onReconnectAttempt.bind(this));
      this.conn.on('reconnecting', this.onReconnecting.bind(this));
      this.conn.on('reconnect_error', this.onReconnectError.bind(this));
      this.conn.on('reconnect_failed', this.onReconnectFailed.bind(this));
    },
    selectPanel(panelName) {
      this.updateTopLevel(panelName);
    },
    // Socket事件
    onConnect() {
      this.status = SocketStatus.CONNECTED;
      console.log('onConnect');
    },
    onConnectError(error) {
      console.log('onConnectError', error);
    },
    onConnectTimeout() {
      console.log('onConnectTimeout');
    },
    onError(error) {
      if (error === '401') {
        this.conn.close();
        messageBox.alert('授权失败，请登录后再试', () => {
          this.$router.push('/login');
        });
      }
      console.log('onError', error);
    },
    onDisconnect(reason) {
      this.status = SocketStatus.DISCONNECTED;
      console.log('onDisconnect', reason);
    },
    onReconnect(attempt) {
      console.log('onReconnect', attempt);
    },
    onReconnectAttempt(attempt) {
      console.log('onReconnectAttempt', attempt);
    },
    onReconnecting(attempt) {
      this.status = SocketStatus.RECONNECTING;
      console.log('onReconnecting', attempt);
    },
    onReconnectError(error) {
      console.log('onReconnectError', error);
    },
    onReconnectFailed() {
      console.log('onReconnectFailed');
    }
  }
};
