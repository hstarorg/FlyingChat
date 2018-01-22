<style lang="stylus">
  .session-panel {

  }
</style>
<template>
  <div class="session-panel">
    <panel-item v-for="(session, idx) in sessions" :key="idx" :model="getModel(session)" :selected="session.groupId === activedSessionId"></panel-item>
  </div>
</template>
<script>
import panelItem from './panel-item.vue';
export default {
  name: 'session-panel',
  components: {
    panelItem
  },
  props: {
    sessions: { type: Array, default: () => [] }
  },
  data() {
    return {};
  },
  computed: {
    activedSessionId() {
      return this.$store.state.activedSessionId;
    }
  },
  methods: {
    getModel(item) {
      return {
        imgUrl: item.avatarUrl,
        title: item.groupName,
        subtitle: ''
      };
    }
  }
};
</script>
