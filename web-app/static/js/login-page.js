(() => {
  const initBackstretch = () => {
    $.backstretch([
      'static/images/bg0.jpg',
      'static/images/bg1.jpg',
      'static/images/bg2.jpg'
    ], { fade: 2000, duration: 5000 });
  };

  const initVue = () => {
    const vm = new Vue({
      el: document.querySelector('.page-container'),
      data: {
        user: {
          username: '',
          password: ''
        },
        rememberMe: false,
        registerUser: {
          username: '',
          password: '',
          password2: '',
          nickname: '',
          email: ''
        }
      },
      mounted() {
        let username = window.localStorage.getItem('remember-username');
        if (username) {
          this.rememberMe = true;
          this.user.username = username;
        }
      },
      methods: {
        doLogin() {
          if (!this.user.username || !this.user.password) {
            return layer.msg('请输入用户名/密码');
          }
          ajax.post('api/v1/login', this.user)
            .then(({data}) => {
              if (this.rememberMe) {
                window.localStorage.setItem('remember-username', this.user.username);
              }
              window.location.href = '';
            });
        },
        doRegister() {
          alert('register');
        }
      }
    });
  };

  // init
  initBackstretch();
  initVue();
})();
