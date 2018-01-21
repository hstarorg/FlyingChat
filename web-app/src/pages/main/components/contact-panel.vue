<style lang="stylus">
  .contact-panel {}
</style>
<template>
  <div class="contact-panel">
    <fc-tabset :selected.sync="contactShowType">
      <fc-tab-item name='users' header="好友">
        <user-item v-for="friend in friends" :key="friend.userId" :user="friend"></user-item>
      </fc-tab-item>
      <fc-tab-item name="groups" header="群">
        <group-item v-for="group in groups" :key="group.groupId" :group="group"></group-item>
      </fc-tab-item>
    </fc-tabset>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import userItem from './user-item.vue';
import groupItem from './group-item.vue';
export default {
  name: 'contact-panel',
  components: {
    groupItem,
    userItem
  },
  props: {
    friends: { type: Array, default: () => [] },
    groups: { type: Array, default: () => [] }
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
