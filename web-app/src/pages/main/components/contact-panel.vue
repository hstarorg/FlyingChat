<style lang="stylus">
  .contact-panel {}
</style>
<template>
  <div class="contact-panel">
    <fc-tabset :selected.sync="contactShowType">
      <fc-tab-item name='users' header="好友">
        <session-item></session-item>
        <session-item :selected="true"></session-item>
      </fc-tab-item>
      <fc-tab-item name="groups" header="群">
        这是群
      </fc-tab-item>
    </fc-tabset>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import sessionItem from './session-item.vue';
export default {
  name: 'contact-panel',
  components: {
    sessionItem
  },
  props: {
    sessions: { type: Array, default: () => [] }
  },
  computed: {
    contactShowType: {
      get() {
        return this.$store.state.contactShowType;
      },
      set(value) {
        this.updateContactShowType(value);
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['updateContactShowType'])
  }
};
</script>
