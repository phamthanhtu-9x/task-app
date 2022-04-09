<template>
  <header>
    <div class="header-logo">
      <img src="~/assets/img/common/logo.svg" alt="logo" width="50" height="50">
    </div>
    <div class="header-information">
      <div v-if="user!=null" class="information-name">{{ user.email }}</div>
      <div class="information-action">
        <a @click="onLogout" class="trans action-login" href="">Logout</a>
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderComponent',
  computed: {...mapGetters(['user'])},
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
}
</script>