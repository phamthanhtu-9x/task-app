import axios from 'axios';

const state = {
  tasks: [],
  subTasks: [],
}

const getters = {
  tasks: state => state.tasks,
  subTasks: state => state.subTasks
}

const actions = {
  async getTasks({ commit, getters }) {
    try {
      const result = await axios.get(process.env.baseApiUrl + `task-${getters.user.localId}.json`);
      const tasksArr = [];
      for(const key in result.data) {
        tasksArr.push({...result.data[key], idTask: key});
      }
      commit('SET_TASK', tasksArr);
    } catch(error) {
      this.$toast.error("Something went wrong :(");
    }
  },

  async addTask({ getters,commit }, data) {
    try {
      const result = await axios.post(process.env.baseApiUrl + `task-${getters.user.localId}.json`, data)
      this.$router.push('/');
      data.idTask = result.data.name;
      commit('ADD_TASK', data);
      this.$toast.success("Created!");
    } catch(error) {
      this.$toast.error("Something went wrong :(");
    }
  },

  async editTask({ getters }, data) {
    console.log(data.idTask);
    const idTask = data.idTask;
    delete data.idTask;
    try {
      await axios.put(process.env.baseApiUrl + `task-${getters.user.localId}/${idTask}.json`, data)
      data.idTask = idTask
      this.$toast.success("Edited!");
    } catch(error) {
      this.$toast.error("Something went wrong :(");
    }
  },

  async deleteTask({ commit, getters }, data) {
    const idTask = data.idTask;
    delete data.idTask;
    try {
      await axios.put(process.env.baseApiUrl + `task-${getters.user.localId}/${idTask}.json`, data).then(result => console.log(result))
      commit('DELETE_TASK', idTask);
      this.$toast.success("Deleted!");
    } catch(error) {
      this.$toast.error("Something went wrong :(");
    }
  },

  async getSubTasks({ commit, getters }) {
    try {
      const result = await axios.get(process.env.baseApiUrl + `subTasks-${getters.user.localId}.json`);
      const subTasksArr = [];
      for(const key in result.data) {
        subTasksArr.push({...result.data[key], idSubTask: key});
      }
      commit('SET_SUBTASKS', subTasksArr)
    } catch(error) {
      this.$toast.error("Something went wrong :(");
    }
  },

  async addSubTask({ dispatch, getters }, data) {
    try {
      await axios.post(process.env.baseApiUrl + `subTasks-${getters.user.localId}.json`, data);
      dispatch('getSubTasks');
      this.$toast.success("Created!");
    } catch(error) {
      this.$toast.error("Something went wrong :(");
    }
  },

  async editSubTask({ getters }, data) {
    const idSubTask = data.idSubTask;
    delete data.idSubTask;
    try {
      await axios.put(process.env.baseApiUrl + `subTasks-${getters.user.localId}/${idSubTask}.json`, data)
      data.idSubTask = idSubTask;
      this.$toast.success("Edited!");
    } catch(error) {
      this.$toast.error("Something went wrong :(");
    }
  },

  async deleteSubTask({ commit, getters }, data) {
    const idSubTask = data.idSubTask;
    delete data.idSubTask;
    if(idSubTask == undefined) return;
    try {
      await axios.put(process.env.baseApiUrl + `subTasks-${getters.user.localId}/${idSubTask}.json`, data)
      commit('DELETE_SUBTASK', idSubTask);
      this.$toast.success("Delete!");
    } catch(error) {
      this.$toast.error("Something went wrong :(");
    }
  },

  async makeCompliedSubTask({ commit, getters }, data) {
    const idSubTask = data.idSubTask;
    delete data.idSubTask;
    try {
      await axios.put(process.env.baseApiUrl + `subTasks-${getters.user.localId}/${idSubTask}.json`, data)
      data.idSubTask = idSubTask;
      commit('MARK_COMPLETED', idSubTask);
      data.completed ? this.$toast.success("Compeled!") : this.$toast.success("Unfinished!");
    } catch(error) {
      this.$toast.error("Something went wrong :(");
    }
  },
}

const mutations = {
  SET_TASK(state, tasks) {
    state.tasks = tasks
  },

  ADD_TASK(state, task) {
    state.tasks.push(task)
  },

  DELETE_TASK(state, idTask) {
    state.tasks = state.tasks.filter(task => task.id !== idTask)
  },

  SET_SUBTASKS(state, subTasks) {
    state.subTasks = subTasks
  },

  ADD_SUBTASK(state, subTask) {
    state.subTasks.push(subTask)
  },

  DELETE_SUBTASK(state, idSubTask) {
    state.subTasks = state.subTasks.filter(subTask => subTask.idSubTask !== idSubTask)
  },

  MARK_COMPLETED(state, idSubTask) {
    state.subTasks.map(subTask => {
      if(subTask.idSubTask === idSubTask) subTask.completed = !subTask.completed
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}