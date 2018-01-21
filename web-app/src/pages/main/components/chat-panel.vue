<style lang="stylus">
  .chat-panel {
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    .chat-panel-header {
      height: 41px;
      margin-left: 3px;
      padding-left 12px;
      border-bottom: 1px solid #eaeaea;
      line-height 40px;
      font-size: 18px;
    }
    .chat-panel-footer {
      position: absolute;
      height: 160px;
      bottom 0;
      left: 0;
      right: 0;
      margin-left: 3px;
      border-top: 1px solid #eaeaea;
      .footer-toolbar{
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        border-bottom: 1px solid #eaeaea;
      }
      textarea {
        height: 93px;
        width: 100%;
        border: none;
        outline: none;
        resize: none;
        padding: 5px;
      }
      .btn-send {
        line-height: 12px;
        margin-right: 8px;
      }
    }
    .status-text {
      font-size: 12px;
      color: red;
    }
  }
</style>

<template>
  <div class="chat-panel">
    <div class="chat-panel-header">
      死胖子
      <span class="status-text">{{statusText}}</span>
    </div>
    <div class="chat-panel-body">

    </div>
    <div class="chat-panel-footer">
      <div class="footer-toolbar">
        <span>表情</span>
        <span>截图</span>
        <span>上传图片</span>
      </div>
      <textarea placeholder=""></textarea>
      <button class="btn btn-primary btn-send pull-right"> 发送 </button>
    </div>
  </div>
</template>
<script>
import { SocketStatus } from '../enums/SocketStatus';
export default {
  props: {
    status: { type: String, default: '' }
  },
  data() {
    return {};
  },
  computed: {
    statusText() {
      switch (this.status) {
        case SocketStatus.WAITING_CONNECT:
          return '正在准备连接...';
        case SocketStatus.CONNECTED:
          return '';
        case SocketStatus.DISCONNECTED:
          return '连接已断开';
        case SocketStatus.RECONNECTING:
          return '网络异常，正在重新连接...';
      }
      return '';
    }
  }
};
</script>
