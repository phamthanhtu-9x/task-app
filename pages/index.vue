<template>
  <div class="main">
    <div class="wrapper">
      <div class="section-task">
        <ul class="list-task">
          <Task v-for="task in tasks" :key="task.idTask" :taskProp="task"/>
        </ul>
      </div>
      <div class="add-task">
        <nuxt-link to="/create/" class="trans">
          <img src="~/assets/img/common/ico_plus.png" alt="add" width="64" height="64">
        </nuxt-link>
      </div>
      <div v-if="showModal" class="modal-route">
        <div class="modal-content">
          <NuxtChild />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  name: 'IndexPage',
  middleware: ['check-auth', 'auth'],
  created() {
    this.getTasks();
  },
  computed: {
    ...mapGetters(['tasks']),
    showModal() {
      return this.$route.matched.length;
    }
  },
  methods: {
    ...mapActions(['getTasks'])
  }
}
</script>

