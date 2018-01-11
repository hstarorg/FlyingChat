<style lang="stylus">
@import './login.styl';
</style>
<template>
  <div class="page-login">
    <div class="login-box">
      <div class="login-box-header">
        <p class="text-center">Flying Chat</p>
      </div>
      <div class="login-box-body">
        <div class="pull-left left-section">
          <img src="https://avatars0.githubusercontent.com/u/4043284?s=460&v=4" alt="logo">
          &nbsp;
        </div>
        <div class="pull-left center-section">
          <div class="login-input-group username-group">
            <input type="text" class="name-input" placeholder="飞聊号码/账户">
          </div>
          <div class="login-input-group password-group">
            <input type="password" class="pwd-input" placeholder="密码">
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox"> 记住账户
            </label>
          </div>
          <div class="">
            <button class="btn btn-primary btn-block">登录</button>
          </div>
        </div>
        <div class="pull-left right-cection">
          <a href="">注册账号</a>
          <br>
          <a href="">找回密码</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
