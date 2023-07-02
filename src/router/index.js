import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/views/HomePage"
import SignUp from "@/views/SignUpPage"
import AuthPage from "@/views/AuthPage";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/AuthPage')
  },
  {
    path: '/countries',
    name: 'countries',
    component: () => import('../views/CountryDetailsPage')
  },
  {
    path: '/countries/university',
    name: 'university',
    component: () => import('../views/UniversityPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((from, to, next)=>{
//
// })

export default router
