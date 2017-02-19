(() => {
  const event_types = {
    CLIENT_USER_ONLINE: 'CLIENT_USER_ONLINE', // 用户上线
    CLIENT_USER_OFFLINE: 'CLIENT_USER_OFFLINE', // 用户下线
    CLIENT_USER_MESSAGE: 'CLIENT_USER_MESSAGE', // 用户发消息
    CLIENT_SET_USER: 'CLIENT_SET_USER', // 设置用户信息

    SERVER_ON_MESSAGE: 'SERVER_ON_MESSAGE', // 服务端收到消息
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
    vm.msgList.push(msgObj);
  };

  const initIO = () => {
    client = io();

    client.on(event_types.CLIENT_USER_ONLINE, data => {
      showMessage('system', data, `系统消息：${data.nickname} 加入聊天`);
    });
    client.on(event_types.CLIENT_USER_ONLINE, data => {
      showMessage('system', data, `系统消息：${data.nickname} 离开聊天`);
    });
    client.on(event_types.CLIENT_USER_MESSAGE, data => {
      showMessage(vm.chatMain.user.userId === data.userId ? 'mine' : '', data);
    });
    client.on(event_types.CLIENT_SET_USER, user => {
      vm.chatMain.user = user;
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
        msgList: []
      },
      methods: {
        sendMessage() {
          if (this.inputMessage.trim()) {
            client.emit(event_types.SERVER_ON_MESSAGE, this.inputMessage);
            this.inputMessage = '';
          }
        }
      }
    });
  };
  initBackstretch();
  initIO();
  initVue();
})();
