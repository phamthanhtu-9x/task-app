<template>
  <li v-if="task.enable" class="item-task">
    <div class="task-inner">
      <div class="task-heading" v-click-outside="onSave">
        <div class="heading-title">
          <input
            ref="title"
            type="text"
            v-model="task.taskName"
            :readonly="readyonly"
          />
        </div>
        <div
          class="heading-action"
          @click="isActive = !isActive"
          :class="{'is-active': isActive}"
          v-click-outside="actionStatus">
          <img src="~/assets/img/common/ico_more.png" alt="more" width="26" height="26">
          <ul class="action-list">
            <li @click="editting"><span>Edit</span></li>
            <li @click="onDelete"><span>Delete</span></li>
          </ul>
        </div>
      </div>
      <ul class="sub-task">
        <li class="item-add">
          <form @submit.prevent="onSubmit">
            <div class="form-input" ref="container">
              <TextareaAutosize v-model="subTask.subTaskName" name="name sub task" :min-height="50" placeholder="Add some task"/>
            </div>
            <div class="form-submit">
              <button class="button-add trans" :class="{'is-block': subTask.subTaskName == ''}"><span>Add task</span></button>
            </div>
          </form>
        </li>
        <SubTask v-for="subTask in subTasks" :key="subTask.idSubTask" :subTaskProp="subTask" :idTaskProp="taskProp.idTask" />
      </ul>
    </div>
  </li>
</template>
<script>
import SubTask from './SubTask'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TaskComponent',
  components: { SubTask },
  props: ['taskProp'],
  created() {
    this.getSubTasks();
  },
  data() {
    return {
      subTask: {
        idTask: this.taskProp.idTask,
        subTaskName: '',
        complited: false,
        enable: true,
      },
      task: {
        idTask: this.taskProp.idTask,
        taskName: this.taskProp.taskName,
        enable: this.taskProp.enable
      },
      defaultTaskName: this.taskProp.taskName,
      isActive: false,
      readyonly: true,
    }
  },
  computed: {
    ...mapGetters(['subTasks']),
  },
  methods: {
    ...mapActions(['addSubTask','getSubTasks','editTask','deleteTask']),
    actionStatus() {this.isActive ? this.isActive = false : this.isActive},
    onFocus(el) {
      const leng = el.value.length;
        if(el.setSelectionRange) {
          el.focus();
          el.setSelectionRange(leng, leng);
        }
    },
    onSubmit() {
      this.addSubTask(this.subTask);
    },
    editting() {
      if(this.readyonly == true) {
        this.readyonly = false;
        this.onFocus(this.$refs.title);
      }
    },
    onSave() {
      if(this.readyonly == false) {
        this.readyonly = true;
        if(this.defaultTaskName != this.task.taskName) this.editTask(this.task);
      }
    },
    onDelete() {
      this.task.enable = false;
      this.deleteTask(this.task);
    }
  }
}
</script>
<style src="@/assets/css/task.css"/>