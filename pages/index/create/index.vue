<template>
  <transition name="create">
    <div class="section-create">
      <div class="create-background" @click.stop="closeModal"></div>
      <div class="form-create">
        <div class="form-label">New task</div>
        <form @submit.prevent="onSubmit">
          <div class="form-body">
            <div class="form-input">
              <input v-model="task.taskName" type="text" placeholder="Please enter task name ...">
            </div>
            <div class="form-submit">
              <button class="button-add button-submit" :class="{'is-block': task.taskName == ''}">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  transition: 'create',
  data() {
    return {
      task: {
        taskName: '',
        enable: true,
      }
    }
  },
  methods: {
    ...mapActions(['addTask']),
    onSubmit() {
      this.addTask(this.task);
    },
    closeModal() {
      this.$router.replace('/')
    },
  }
}
</script>
<style scoped src="@/assets/css/create.css"/>