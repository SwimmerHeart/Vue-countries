import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import HomePage from "@/views/CountriesPage"
import SignUp from "@/views/RegistryPage"
import AuthPage from "@/views/AuthPage";
import AuthLayout from "@/layouts/AuthLayout"


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        meta: {layout: 'auth'},
        component: () => import('../views/AuthPage')
    },
    {
        path: '/login',
        name: 'login',
        meta: {layout: 'auth'},
        component: () => import('../views/AuthPage')
    },
    {
        path: '/registry',
        name: 'registry',
        meta: {layout: 'auth'},
        component: () => import('../views/RegistryPage')
    },
    {
        path: '/countries',
        name: 'countries',
        meta: {layout: 'main', auth: true},
        props: true,
        component: () => import('../views/CountriesPage')
    },
    {
        path: '/country/:codeCountry',
        name: 'countriesDetails',
        meta: {layout: 'main', auth: true},
        props: true,
        component: () => import('../views/CountryDetailsPage')
    },
    {
        path: '/country/:codeCountry/university/:nameUniversity',
        name: 'university',
        meta: {layout: 'main', auth: true},
        props: true,
        component: () => import('../views/UniversityPage')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
//метод выполняется перед каждой сменой роутера
router.beforeEach((to, from, next) => {
    //Рабочий вариант
    // const currentUser = store.getters.getUser
    // const isLoginPage = from.name === 'login'
    // const RegistryPage = from.name === 'registry'
    // const requiredAuth = to.matched.some(record => record.meta.auth)
    // if (requiredAuth && !currentUser) {
    //     next({
    //         path: '/login',
    //         redirect: {name: 'login'}
    //     })
    // }
    // else {
    //     next()
    // }
    //=============================================
    const currentUser = store.getters.getUser
    console.log(1, currentUser)
    const requiredAuth = to.matched.some(record => record.meta.auth)
    console.log(2, requiredAuth)
    if(requiredAuth && !currentUser){
        next({
            path: '/login',
            redirect: {name: 'login'}
        })
    }
    else next()
    // if (requiredAuth && !currentUser && isLoginPage) {
    //     // Если пользователь не зарегистрирован, перенаправляем его на страницу регистрации
    //     next({
    //         path: '/registry',
    //         redirect: { name: 'registry' }
    //     })
    // } else if (requiredAuth && !currentUser && RegistryPage) {
    //     // Если неаутентифицированный пользователь пытается получить доступ к защищенному маршруту,
    //     // перенаправляем его на страницу входа в систему
    //     next({
    //         path: '/login',
    //         redirect: { name: 'login' }
    //     });
    // } else {
    //     next();
    // }
})

export default router
