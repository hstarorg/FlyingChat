<style lang="stylus">
  .session-item {
    height: 60px;
    display: flex;
    .session-item-avatar {
      flex: 0;
      padding: 10px 8px 10px 12px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .session-item-content {
      flex: 1;
      padding: 10px 10px 10px 0;
      p {
        margin: 0;
      }
      .session-item-title {
        font-size: 16px;
        color: #000;
      }
      .session-item-subtitle {
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
  <div class="session-item" :class="{active: selected}">
    <div class="session-item-avatar">
      <img src="https://avatars0.githubusercontent.com/u/4043284?s=460&v=4" alt="">
    </div>
    <div class="session-item-content">
      <p class="session-item-title">死胖子</p>
      <p class="session-item-subtitle">哈哈哈哈</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'session-item',
    props: {
      selected: { type: Boolean, default: false }
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>
