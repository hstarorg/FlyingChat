<style lang="stylus">
  .fc-tabset {
    .fa-tabset-title {
      padding: 0;
      margin: 0;
      border-bottom: 1px solid #e8e9ea;
      li {
        position: relative;
        list-style: none;
        float: left;
        width: 80px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        &.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          width: 100%;
          left: 0;
          display: block;
          border-bottom: 2px solid #4598ff;
        }
      }
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }
  }
</style>
<template>
  <div class="fc-tabset">
    <ul class="fa-tabset-title">
      <li v-for="tab of tabs" :class="{active: tab.name === selected}" @click="selectTabItem(tab)">{{tab.header}}</li>
    </ul>
    <div class="fa-tabset-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'fc-tabset',
    props: {
      selected: { type: String }
    },
    data() {
      return {
        tabs: []
      };
    },
    methods: {
      addTabItem(tabItem) {
        this.tabs.push(tabItem);
      },
      selectTabItem(tab) {
        this.$emit('update:selected', tab.name);
      }
    }
  };
</script>
