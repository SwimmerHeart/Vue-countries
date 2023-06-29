import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/views/HomePage"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/exchange',
    name: 'exchange',

    component: () => import('../views/AuthPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
