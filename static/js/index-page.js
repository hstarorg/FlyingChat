(() => {
  const event_types = {
    CLIENT_USER_ONLINE: 'CLIENT_USER_ONLINE', // 用户上线
    CLIENT_USER_OFFLINE: 'CLIENT_USER_OFFLINE', // 用户下线
    CLIENT_USER_MESSAGE: 'CLIENT_USER_MESSAGE', // 用户发消息
    CLIENT_SET_USER: 'CLIENT_SET_USER', // 设置用户信息
    CLIENT_SET_USERLIST: 'CLIENT_SET_USERLIST', // 设置在线用户列表
    CLIENT_FORCE_DISCONNECT: 'CLIENT_FORCE_DISCONNECT', // 强制下线

    SERVER_ON_MESSAGE: 'SERVER_ON_MESSAGE', // 服务端收到消息
    SERVER_GET_USERLIST: 'SERVER_GET_USERLIST', // 服务端返回用户列表
  };

  let client;
  let vm;

  const initBackstretch = () => {
    $.backstretch([
      'static/images/bg4.jpg'
    ], { fade: 2000, duration: 5000 });
  };

  const formatDate = d => {
    let date = new Date(d);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const showMessage = (type, data, msg) => {
    let msgObj = {
      type,
      user: { avatorUrl: data.avatorUrl, nickname: data.nickname },
      date: formatDate(data.date),
      content: data.content
    };
    if (msg) {
      msgObj.content = msg;
    }
    if (type === 'system') {
      client.emit(event_types.SERVER_GET_USERLIST);
    }
    vm.msgList.push(msgObj);
    if (!vm.tabActive) {
      vm.unreadMsgCount += 1;
      if (!vm.intervalId) {
        vm.startNotify();
      }
    }
  };

  const initIO = () => {
    client = io();

    client.on(event_types.CLIENT_USER_ONLINE, data => {
      showMessage('system', data, `系统消息：${data.nickname} 加入聊天`);
    });
    client.on(event_types.CLIENT_USER_OFFLINE, data => {
      showMessage('system', data, `系统消息：${data.nickname} 离开聊天`);
    });
    client.on(event_types.CLIENT_USER_MESSAGE, data => {
      showMessage(vm.chatMain.user.userId === data.userId ? 'mine' : '', data);
    });
    client.on(event_types.CLIENT_SET_USER, user => {
      vm.chatMain.user = user;
    });
    client.on(event_types.CLIENT_SET_USERLIST, data => {
      vm.onlineUserList = data.users;
    });
    client.on(event_types.CLIENT_FORCE_DISCONNECT, () => {
      showMessage('system', {}, `系统消息：您的账号在其他地方登录，请检查！`);
    });
    const events = ['connect', 'connect_error', 'connect_timeout', 'error', 'disconnect', 'reconnect', 'reconnect_attempt',
      'reconnecting', 'reconnect_error', 'reconnect_failed', 'msg'];

    events.forEach(e => {
      client.on(e, evt => {
        console.log(e, evt);
      });
    });
  };

  const initVue = () => {
    vm = new Vue({
      el: document.querySelector('.page-main'),
      data: {
        chatMain: {
          user: {
            nickname: '幻',
            remark: 'Love wife, love coding...'
          },
          tabName: 'friend'
        },
        inputMessage: '',
        msgList: [],
        onlineUserList: [],
        tabActive: true,
        unreadMsgCount: 0,
        intervalId: null
      },
      mounted() {
        this.initBrowserTab();
      },
      watch: {
        msgList() {
          this.$nextTick(() => {
            let msgContainer = document.querySelector('.layim-chat-main');
            msgContainer.scrollTop = msgContainer.scrollHeight;
          });
        }
      },
      methods: {
        initBrowserTab() {
          window.jBrowserTab.on('visibilitychange', isActive => {
            this.tabActive = isActive;
            if (this.tabActive) {
              window.clearInterval(this.intervalId);
              this.intervalId = null;
              this.unreadMsgCount = 0;
              document.title = 'Home :: Flying Chat';
            }
          });
        },
        startNotify() {
          this.toggleTitle();
          this.intervalId = window.setInterval(() => {
            this.toggleTitle();
          }, 200);
        },
        toggleTitle() {
          console.log('togg');
          if (document.title === '新提醒') {
            document.title = `您有 ${this.unreadMsgCount} 条未读消息`;
          } else {
            document.title = '新提醒';
          }
        },
        sendMessage() {
          if (this.inputMessage.trim()) {
            client.emit(event_types.SERVER_ON_MESSAGE, this.inputMessage);
            this.inputMessage = '';
          }
        },
        clearMsgList() {
          this.msgList = [];
        }
      }
    });
  };
  initBackstretch();
  initIO();
  initVue();
})();
