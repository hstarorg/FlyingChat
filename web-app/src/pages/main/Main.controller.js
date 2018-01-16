import { storage } from '@/common';
import io from 'socket.io-client';

export default {
  data() {
    return {
      conn: null,
      selectedPanelName: 'message',
      xxx: 'users'
    };
  },
  created() {
    const user = storage.session.get('user');
    if (!user) {
      return this.$router.push('/login');
    }
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
      alert(msg);
    });
  },
  mounted() {},
  methods: {
    selectPanel(panelName) {
      this.selectedPanelName = panelName;
    },
    onConnect() {
      console.log(this);
    }
  }
};
