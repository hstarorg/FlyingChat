import { ajax, messageBox } from '@/common';

export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    async handleSubmit() {
      await ajax.post(`${AppConf.apiHost}/account/register`, this.user);
      messageBox.alert('注册成功，确定后跳转到登录界面', () => {
        this.$router.push('/login');
      });
    }
  }
};
