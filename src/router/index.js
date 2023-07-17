import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        meta: {layout: 'auth'},
        redirect: '/countries'
    },
    {
        path: '/login',
        name: 'login',
        meta: {layout: 'auth', auth: false},
        component: () => import('../views/AuthPage')
    },
    {
        path: '/registry',
        name: 'registry',
        meta: {layout: 'auth', auth: false},
        component: () => import('../views/RegistryPage')
    },
    {
        path: '/countries',
        name: 'countries',
        meta: {layout: 'main'},
        props: true,
        component: () => import('../views/CountriesPage')
    },
    {
        path: '/country/:codeCountry',
        name: 'countriesDetails',
        meta: {layout: 'main'},
        props: true,
        component: () => import('../views/CountryDetailsPage')
    },
    {
        path: '/country/:codeCountry/university/:nameUniversity',
        name: 'university',
        meta: {layout: 'main'},
        props: true,
        component: () => import('../views/UniversityPage')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = store.getters.getUser
    const requiredAuth = to.matched.some(record => record.meta.auth !== false)
    if(requiredAuth && !currentUser){
        next({
            path: '/login',
            redirect: {name: 'login'}
        })
    }
    else next()
})

export default router
