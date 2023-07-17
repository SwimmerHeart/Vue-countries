import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        users: JSON.parse(localStorage.getItem('users')) || [],
        user: JSON.parse(localStorage.getItem('user')),
        countriesName: []
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getUsers(state) {
            return state.users
        },
        getUserName(state) {
            return state.user ? state.user.name : ''
        },
        getCountriesSelectName(state) {
            return state.countriesName.map(item=>item.name).sort()
        },
        getInfoCodeCurrency(state) {
            const selectCountry = state.countriesName.find(item => item.name === state.user?.country)
            if (selectCountry) {
                const selectCurrency = Object.values(selectCountry)[2]
                return Object.keys(selectCurrency)[0]
            } else return ''
        },
        getCountryUser(state) {
            return state.user.country
        },
    },
    mutations: {
        register(state, user) {
            state.users.push(user)
            localStorage.setItem('users', JSON.stringify(state.users))
            state.user = {
                name: user.login,
                country: undefined
            }
            localStorage.setItem('user', JSON.stringify(state.user))

        },
        setCurrentUser(state, user) {
            // const findUser = JSON.parse(localStorage.getItem('users')).find(item=>i.name===user.login)
            // if(findUser.name === user.login) {
            //     state.user = {
            //         name: user.login,
            //         country: JSON.parse(localStorage.getItem('user')).country
            //     }
            // }
            // else
                state.user = {
                name: user.login,
                country: user.country
            }

            localStorage.setItem('user', JSON.stringify(state.user))
        },
        logout(state) {
            state.user = undefined
        },
        setCountry(state, country) {
            state.user.country = country
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        setCountriesSelectName(state, countries) {
            state.countriesName = countries
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
        },
        setCountriesName({commit}, countries) {
            commit('setCountriesSelectName', countries)
        }
    }
})

export default store