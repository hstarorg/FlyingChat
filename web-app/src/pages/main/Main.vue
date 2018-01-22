<style lang="stylus">
  @import './main.styl';
</style>
<template>
  <div class="page-main">
    <div class="chat-main">
      <div class="chat-main-header">
        <div class="user-avatar">
          <img :src="user.avatarUrl" alt="">
          <span>{{user.nickName}}</span>
        </div>
        <ul class="center-ul">
          <li :class="{active: topLevel === 'session'}" @click="selectPanel('session')">消息</li>
          <li :class="{active: topLevel === 'contact'}" @click="selectPanel('contact')">联系人</li>
        </ul>
      </div>
      <div class="chat-main-body">
        <div class="left-panel pull-left">
          <session-panel v-if="topLevel === 'session'" :sessions="sessions"></session-panel>
          <contact-panel v-if="topLevel === 'contact'" :friends="friends" :groups="groups"></contact-panel>
        </div>
        <div class="right-panel">
          <div class="chat-panel">
            <div class="chat-panel-header">
              死胖子
              <span class="status-text">{{statusText}}</span>
            </div>
            <div class="chat-panel-body" ref="chatPanelBody">
              <div class="chat-panel-body-item" v-for="(message, idx) in messageList" :key="idx" :class="{'chat-body-item-right': message.isMine}">
                <div class="chat-item-user">
                  <img class="avatar" src="https://avatars0.githubusercontent.com/u/4043284?s=460&v=4">
                  <cite>
                    <template v-if="!message.isMine">
                      {{message.user.nickName}} &nbsp;&nbsp;
                    </template>
                    <i>{{new Date(message.date).toLocaleString()}}</i>
                    <template v-if="message.isMine">
                      &nbsp;&nbsp; {{message.user.nickName}}
                    </template>
                  </cite>
                </div>
                <div class="chat-item-content">{{message.content}}</div>
              </div>
            </div>
            <div class="chat-panel-footer">
              <div class="footer-toolbar">
                <span>表情</span>
                <span>截图</span>
                <span>上传图片</span>
              </div>
              <textarea placeholder="" v-model="inputMessage" @keypress.enter="handleSendMessage"></textarea>
              <button class="btn btn-primary btn-send pull-right" @click="handleSendMessage"> 发送 </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./Main.controller.js">
</script>
