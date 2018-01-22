<style lang="stylus">
@import './register.styl';
</style>
<template>
  <div class="page-register">
    <div class="register-box panel panel-info">
      <div class="panel-heading">
        注册 · 飞聊
      </div>
      <form class="register-form" @submit.prevent="handleSubmit">
        <div class="input-group">
          <span class="input-group-addon reg-label">账号</span>
          <input type="text" class="form-control" v-model="user.userName">
        </div>
        <br>
        <div class="input-group">
          <span class="input-group-addon reg-label">昵称</span>
          <input type="text" class="form-control" v-model="user.nickName">
        </div>
        <br>
        <div class="input-group">
          <span class="input-group-addon reg-label">密码</span>
          <input type="password" class="form-control" v-model="user.password">
        </div>
        <br>
        <div class="input-group">
          <span class="input-group-addon reg-label">确认密码</span>
          <input type="password" class="form-control" v-model="user.password2">
        </div>
        <br>
        <div>
          <button class="btn btn-primary btn-block">立即注册</button>
          <br>
          <span>已有账号
            <router-link to="/login">登录</router-link>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
<script src="./Register.controller.js">
</script>
