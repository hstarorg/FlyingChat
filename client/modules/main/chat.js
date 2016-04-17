((angular) => {
  'use strict';
  class ChatCtrl {
    constructor() {
      this.userId = 0; //记录当前聊天对象
      this.layerId = 0; //记录当前弹出层
      this.sendType = 'enter'; //可选ctrl&enter
      this.message = '';
    }
    closeChat() {
      layer.close(this.layerId);
    }
    sendMessage() {
      console.log(this.message);
    }
    changeSendType(sendType) {
      this.sendType = sendType;
    }
    onTextareaKeydown(e) {
      if (e.keyCode === 13) {
        if (this.sendType === 'enter') {
          //按了shift,但没有按ctrl
          if (e.shiftKey && !e.ctrlKey) {
            return;
          }
          if (!e.ctrlKey) {
            e.preventDefault();
            this.sendMessage();
          }
        } else {
          if (e.ctrlKey) {
            e.preventDefault();
            this.sendMessage();
          }
        }
      }
    }
  }

  angular.module('flayingchat-app').controller('ChatCtrl', ChatCtrl);
})(window.angular);
