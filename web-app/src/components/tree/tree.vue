<style lang="stylus">
  .fc-tree {
  }
</style>
<template>
  <div class="fc-tab-item" :class="{'fc-tab-item-show': selected}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'fc-tree',
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
