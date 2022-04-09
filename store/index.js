import Vue from 'vue'
import VueX from 'vuex'
import auth from './modules/auth'
import tasks from './modules/task'

Vue.use(VueX);

export default () => new VueX.Store({
  state: () => ({
    user: null,
    token: null,
  }),
  mutations: {
    SET_TOKEN(state, idToken) {
      state.token = idToken
    },
    CLEAR_TOKEN(state) {
      state.token = null
    },
    SET_USER(state, user) {
      state.user = user
    },
    CLEAR_USER(state) {
      state.user = null
    }
  },
  getters: {
    isAuthenticated: state => {
      return state.token != null
    },
    user: state => state.user,
  },
  modules: {
    auth,
    tasks,
  }
});