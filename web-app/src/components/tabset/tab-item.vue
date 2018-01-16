<style lang="stylus">
  .fc-tab-item {
    display: none;
    &.fc-tab-item-show {
      display: block;
    }
  }
</style>
<template>
  <div class="fc-tab-item" :class="{'fc-tab-item-show': selected}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'fc-tab-item',
    props: {
      name: { type: String },
      header: { type: String }
    },
    data() {
      return {};
    },
    computed: {
      selected() {
        return this.$parent.selected === this.name;
      }
    },
    mounted() {
      if (this.$parent.$options.name !== 'fc-tabset') {
        return console.error('<fc-tab-item /> must in <fc-tabset />');
      }
      this.$parent.addTabItem(this);
    },
    methods: {}
  };
</script>
