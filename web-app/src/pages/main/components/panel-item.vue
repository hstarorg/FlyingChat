<style lang="stylus">
  .panel-item {
    height: 60px;
    display: flex;
    .panel-item-avatar {
      flex: 0;
      padding: 10px 8px 10px 12px;
      img {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .panel-item-content {
      flex: 1;
      padding: 10px 10px 10px 0;
      p {
        margin: 0;
      }
      .panel-item-title {
        font-size: 16px;
        color: #000;
      }
      .panel-item-subtitle {
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
  <div class="panel-item" :class="{active: selected}">
    <div class="panel-item-avatar">
      <img :src="model.imgUrl" alt="">
    </div>
    <div class="panel-item-content">
      <p class="panel-item-title">{{model.title}}</p>
      <p class="panel-item-subtitle">{{model.subtitle}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'panel-item',
  props: {
    model: { type: Object }, // {imgUrl, title, subtitle}
    selected: { type: Boolean, default: false }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
