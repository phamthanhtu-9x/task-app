<template>
  <li v-if="subTask.enable && subTask.idTask == idTaskProp" class="item-sub-task" :class="{'is-completed': subTask.completed, 'is-active': isActive}" v-click-outside="onSave">
    <ul class="sub-task-action">
      <li class="trans action is-checked" @click="onCompleted" :class="{'is-active': subTask.completed}">
        <img src="~/assets/img/common/ico_check.png" alt="checked" width="16" height="16">
      </li>
      <li class="action is-edit" @click="editting" :class="{'is-active': isActive}">
        <img src="~/assets/img/common/ico_edit.png" alt="edit" width="16" height="16">
      </li>
      <li class="action is-delete" @click="onDelete">
        <img src="~/assets/img/common/ico_delete.png" alt="delete" width="16" height="16">
      </li>
    </ul>
    <div class="sub-task-content" :class="{'is-active': isActive}">
      <TextareaAutosize
        ref="textarea"
        v-model="subTask.subTaskName"
        name="text"
        :min-height="40"
        :readonly="readyonly"
      />
    </div>
  </li>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'SubTaskComponent',
  props: ['subTaskProp','idTaskProp'],
  data() {
    return {
      subTask: {
        idSubTask: this.subTaskProp.idSubTask,
        idTask: this.subTaskProp.idTask,
        subTaskName: this.subTaskProp.subTaskName,
        completed: this.subTaskProp.completed,
        enable: this.subTaskProp.enable,
      },
      readyonly: true,
      isActive: false,
    }
  },
  methods: {
    ...mapActions(['editSubTask','deleteSubTask','makeCompliedSubTask']),
    onFocus(el) {
      const leng = el._value.length;
        if(el.setSelectionRange) {
          el.focus();
          el.setSelectionRange(leng, leng);
        }
    },
    editting() {
      if(this.isActive == false) {
        this.isActive = true;
        this.readyonly = false;
        this.onFocus(this.$refs.textarea.$el);
      }
    },
    onSave() {
      if(this.isActive) {
        this.isActive = false;
        this.readyonly = true;
        this.editSubTask(this.subTask);
      }
    },
    onDelete() {
      this.subTask.enable = false;
      this.deleteSubTask(this.subTask);
    },
    onCompleted() {
      this.subTask.completed = !this.subTask.completed;
      this.makeCompliedSubTask(this.subTask);
    }
  }
}
</script>