import Vue from 'vue'
import Vuex from 'vuex'
import theme from './modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: '',
  },
  getters: {
    account: state => {
      return state.account
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    theme
  }
})
