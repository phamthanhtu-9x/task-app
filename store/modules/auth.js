import axios from 'axios';
import Cookies from 'js-cookie'

const state = {
  auth: '',
}

const getters = {}

const actions = {
  async login({ commit, dispatch }, data) {
    try {
      const result = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.apiKey}`, data)
      commit('SET_TOKEN', result.data.idToken);
      commit('SET_USER', result.data);

      localStorage.setItem('token', result.data.idToken);
      localStorage.setItem('tokenExpiration', new Date().getTime() + Date.parse(result.headers.expires) / 1000);

      Cookies.set('token', result.data.idToken)
      Cookies.set('tokenExpiration', new Date().getTime() + Date.parse(result.headers.expires) / 1000);
      Cookies.set('user', JSON.stringify(result.data));

      dispatch('setLogoutTimer', Date.parse(result.headers.expires) / 1000);
      this.$router.push('/');
      this.$toast.success("Login success");
    } catch(error) {
      this.$toast.error("Your email or password is wrong");
    }
  },
  async register({ commit }, data) {
    try {
      await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.apiKey}`, data);
      this.$router.push('/login');
      this.$toast.success('Sign up success');
    } catch(error) {
      this.$toast.error('Email existed');
    }
  },
  setLogoutTimer({ commit }, duration) {
    setTimeout(() => {
      commit('CLEAR_TOKEN');
    }, duration)
  },
  initAuth({ commit, dispatch }, req) {
    let token, tokenExpiration, user = null;
    console.log(user);
    if(req) {
      if(!req.headers.cookie) {
        dispatch('logout');
        return false;
      }
      const tokenKey = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='));
      const tokenExpirationKey = req.headers.cookie.split(';').find(c => c.trim().startsWith('tokenExpiration='));
      const userKey = req.headers.cookie.split(';').find(c => c.trim().startsWith('user='));

      if(!tokenKey || !tokenExpirationKey) {
        dispatch('logout');
        return false;
      }

      token = tokenKey.split('=')[1];
      tokenExpiration = tokenExpirationKey.split('=')[1]
      user = JSON.parse(decodeURIComponent(userKey.split('=')[1]));
      commit('SET_USER', user);
    } else {
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
        tokenExpiration = localStorage.getItem('tokenExpiration')

        if(new Date().getTime() > tokenExpiration || !token) {
          dispatch('logout');
          return false;
        }
      }
    }
    dispatch('setLogoutTimer', tokenExpiration - new Date().getTime());
    commit('SET_TOKEN', token);
  },
  logout({ commit }) {
    commit('CLEAR_TOKEN');
    commit('CLEAR_USER');
    Cookies.remove('token');
    Cookies.remove('tokenExpiration');
    Cookies.remove('user');
    if(process.client) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    }
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}