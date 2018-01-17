<style lang="stylus">
  .session-panel {

  }
</style>
<template>
  <div class="session-panel">
    <session-item v-for="(se, idx) in sessions" :key="idx"></session-item>
  </div>
</template>
<script>
import sessionItem from './session-item.vue';
export default {
  name: 'session-panel',
  components: {
    sessionItem
  },
  props: {
    sessions: { type: Array, default: () => [] }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
