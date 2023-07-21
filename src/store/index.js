import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')),
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getUserName(state) {
            return state.user ? state.user.name : ''
        },
        getCountriesSelectName(state) {
            return state.countriesName.map(item=>item.name).sort()
        },
        getCountryUser(state) {
            return state.user.country
        },
    },
    mutations: {
        register(state, user) {
            const users = JSON.parse(localStorage.getItem('users')) || []
            users.push({
                name: user.login,
                password: user.password,
                country: undefined
            })
            localStorage.setItem('users', JSON.stringify(users))
            state.user = {
                name: user.login,
                country: undefined
            }
            localStorage.setItem('user', JSON.stringify(state.user))

        },
        setCurrentUser(state, user) {
            const findUser = JSON.parse(localStorage.getItem('users')).find(item=>item.name===user.login)
                state.user = {
                name: findUser.name,
                country: findUser.country
            }

            localStorage.setItem('user', JSON.stringify(state.user))
        },
        logout(state) {
            state.user = undefined
            localStorage.removeItem('user')

        },
        setCountry(state, country) {
            state.user.country = country
            localStorage.setItem('user', JSON.stringify(state.user))

            const users = JSON.parse(localStorage.getItem('users'))
            const findUser = users.find(item=>item.name === state.user.name)
            findUser.country = country

            localStorage.setItem('users', JSON.stringify(users))

        }
    },
    actions: {
        registerUser({commit}, user) {
            commit('register', user)
        },
        loginUser({commit}, user) {
            commit('setCurrentUser', user)
        },
        logoutUser({commit}) {
            commit('logout')
        },
        setCountryUser({commit}, country) {
            commit('setCountry', country)
        }
    }
})

export default store