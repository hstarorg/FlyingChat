<style lang="stylus">
  .group-item {
    height: 60px;
    display: flex;
    .group-item-avatar {
      flex: 0;
      padding: 10px 8px 10px 12px;
      img {
        width: 40px;
        height: 40px;
        display:inline-block;
        border-radius: 50%;
      }
    }
    .group-item-content {
      flex: 1;
      padding: 10px 10px 10px 0;
      p {
        margin: 0;
      }
      .group-item-title {
        font-size: 16px;
        color: #000;
      }
      .group-item-subtitle {
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
  <div class="group-item" :class="{active: selected}">
    <div class="group-item-avatar">
      <img :src="group.avatarUrl" alt="">
    </div>
    <div class="group-item-content">
      <p class="group-item-title">{{group.groupName}}</p>
      <p class="group-item-subtitle"></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'group-item',
  props: {
    group: { type: Object },
    selected: { type: Boolean, default: false }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
