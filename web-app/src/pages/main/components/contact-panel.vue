<style lang="stylus">
  .contact-panel {}
</style>
<template>
  <div class="contact-panel">
    <fc-tabset :selected.sync="contactShowType">
      <fc-tab-item name='users' header="好友">
        <panel-item v-for="friend in friends" :key="friend.userId" :model="getUserModel(friend)"></panel-item>
      </fc-tab-item>
      <fc-tab-item name="groups" header="群">
        <panel-item v-for="group in groups" :key="group.groupId" :model="getGroupModel(group)"></panel-item>
      </fc-tab-item>
    </fc-tabset>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import panelItem from './panel-item.vue';
export default {
  name: 'contact-panel',
  components: {
    panelItem
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
    ...mapActions(['updateContactShowType']),
    getUserModel(item) {
      return {
        imgUrl: item.avatarUrl,
        title: item.nickName,
        subtitle: ''
      };
    },
    getGroupModel(item) {
      return {
        imgUrl: item.avatarUrl,
        title: item.groupName,
        subtitle: ''
      };
    }
  }
};
</script>
