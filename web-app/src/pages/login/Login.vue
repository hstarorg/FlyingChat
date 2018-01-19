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
          <img src="https://avatars0.githubusercontent.com/u/4043284?s=460&v=4" alt="logo"> &nbsp;
        </div>
        <form @submit.prevent="handleLogin">
          <div class="pull-left center-section">
            <div class="login-input-group username-group">
              <input type="text" class="name-input" placeholder="账号" v-model="user.userName">
            </div>
            <div class="login-input-group password-group">
              <input type="password" class="pwd-input" placeholder="密码" v-model="user.password">
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="rememberMe"> 记住账户
              </label>
            </div>
            <div class="">
              <button class="btn btn-primary btn-block">登录</button>
            </div>
          </div>
        </form>
        <div class="pull-left right-cection">
          <router-link to="/register">注册账号</router-link>
          <br>
          <router-link to="/reset_pwd">找回密码</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./Login.controller.js">
</script>
