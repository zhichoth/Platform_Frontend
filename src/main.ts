import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Hotjar from 'vue-hotjar'

Vue.use(Hotjar, {
  id: process.env.VUE_APP_HOTJAR_ID,
  snippetVersion: 6,
  isProduction: true
})

import './assets/css/style.min.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
