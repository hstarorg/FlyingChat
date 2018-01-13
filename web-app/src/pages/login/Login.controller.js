import { ajax, storage } from '@/common';
export default {
  data() {
    return {
      rememberMe: false,
      user: {
        userName: '',
        password: ''
      }
    };
  },
  mounted() {
    const userName = storage.local.get('$$userName');
    if (userName) {
      this.rememberMe = true;
      this.user.userName = userName;
    }
  },
  methods: {
    handleLogin() {
      ajax
        .post('/account/login', { ...this.user })
        .then(() => {
          this._setStorage();
          this.$router.push('/');
        })
        .catch(res => {
          alert(res.message);
        });
    },
    _setStorage() {
      if (this.rememberMe) {
        storage.local.set('$$userName', this.user.userName);
      } else {
        storage.local.remove('$$userName');
      }
    }
  }
};
