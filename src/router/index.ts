import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Dashboard from '../views/cp/Dashboard.vue'
import Yield from '../views/cp/Yield.vue'
import Presale from '../views/cp/Presale.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/yield-dashboard',
    name: 'yield.dashboard',
    component: Yield
  },
  {
    path: '/presale/create',
    name: 'presale.create',
    component: Presale
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
