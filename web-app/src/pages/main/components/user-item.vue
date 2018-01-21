<style lang="stylus">
  .user-item {
    height: 60px;
    display: flex;
    .user-item-avatar {
      flex: 0;
      padding: 10px 8px 10px 12px;
      img {
        width: 40px;
        height: 40px;
        display:inline-block;
        border-radius: 50%;
      }
    }
    .user-item-content {
      flex: 1;
      padding: 10px 10px 10px 0;
      p {
        margin: 0;
      }
      .user-item-title {
        font-size: 16px;
        color: #000;
      }
      .user-item-subtitle {
        line-height: 18px;
        color: #767676;
      }
    }
    &:hover {
      cursor: pointer;
      background-color: #ebebec;
    }
    &.active {
      background-color: #ebebec;
    }
  }
</style>
<template>
  <div class="user-item" :class="{active: selected}">
    <div class="user-item-avatar">
      <img :src="user.avatarUrl" alt="">
    </div>
    <div class="user-item-content">
      <p class="user-item-title">{{user.nickName}}</p>
      <p class="user-item-subtitle"></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'user-item',
  props: {
    user: { type: Object },
    selected: { type: Boolean, default: false }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
