<style lang="stylus">
  .fc-tree-item {
  }
</style>
<template>
  <li class="fc-tree-item">
    <span>{{text}}</span>
    <div class="fc-tree-item-content">
      <slot></slot>
    </div>
  </li>
</template>
<script>
export default {
  name: 'fc-tree-item',
  props: {
    text: { type: String }
  },
  data() {
    return {};
  },
  mounted() {
    if (this.$parent.$options.name !== 'fc-tree') {
      return console.error('<fc-tree-item /> must in <fc-tree />');
    }
  },
  methods: {}
};
</script>
