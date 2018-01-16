<style lang="stylus">
  @import './main.styl';
</style>
<template>
  <div class="page-main">
    <div class="chat-main">
      <div class="chat-main-header">
        <div class="user-avatar">Content</div>
        <ul class="center-ul">
          <li :class="{active: selectedPanelName === 'message'}" @click="selectPanel('message')">消息</li>
          <li :class="{active: selectedPanelName === 'contact'}" @click="selectPanel('contact')">联系人</li>
        </ul>
      </div>
      <div class="chat-main-body">
        <div class="left-panel pull-left">
          <div class="contact-panel">
            <fc-tabset :selected.sync="xxx">
              <fc-tab-item name='users' header="好友">
                这是好友
              </fc-tab-item>
              <fc-tab-item name="groups" header="群">
                这是群
              </fc-tab-item>
            </fc-tabset>
          </div>
        </div>
        <div class="right-panel">主界面</div>
      </div>
    </div>
  </div>
</template>
<script src="./Main.controller.js">
</script>
