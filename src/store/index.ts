import Vue from 'vue'
import Vuex from 'vuex'
import theme from './modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: '',
    presale: {},
  },
  getters: {
    account: state => {
      return state.account
    },
    presale: state => {
      return state.presale
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    theme
  }
})
