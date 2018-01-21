<style lang="stylus">
  @import './main.styl';
</style>
<template>
  <div class="page-main">
    <div class="chat-main">
      <div class="chat-main-header">
        <div class="user-avatar">
          <img src="https://avatars0.githubusercontent.com/u/4043284?s=460&v=4" alt="">
          <span>幻☆精灵</span>
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
          <chat-panel></chat-panel>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./Main.controller.js">
</script>
