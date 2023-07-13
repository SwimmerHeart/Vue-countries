import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // state: {
    //     users: [],
    //     user: undefined
    // },
    // getters: {
    //     userNameByLogin: (state) => (login) =>
    //             state.users.find((user) => user.login === login)?.login,
    //
    //     GET_USER(state) {
    //         return state.user
    //     },
    //     GET_USER_NAME(state) {
    //         return state.user?.login
    //     }
    // },
    // mutations: {
    //     REGISTRY(state, user) {
    //         if (!state.users.some(item => item.login === user.login)) {
    //             state.users.push(user);
    //             const userList = state.users.map(item=>{
    //                 return {
    //                     name: item.login,
    //                     country: ''
    //                 }
    //             })
    //             localStorage.setItem('user', JSON.stringify(userList))
    //             state.user = user
    //         }
    //     },
    //     LOGIN(state, user) {
    //         //загружаем пользователей из localStorage
    //         const usersStorage = JSON.parse(localStorage.getItem('user')) || []
    //         //находим нужную запись при авторизации
    //         const userStorage = usersStorage.find(item=>item.name === user.login)
    //         if(userStorage) {
    //             //если запись есть проверяем совпадают ли данные в store
    //             const currentUser = state.users
    //                 .find(item => item.name === user.login && item.password === user.password)
    //             currentUser ? state.user = user : state.user = undefined
    //             return true
    //         }
    //         else return false
    //     },
    //     LOGOUT(state) {
    //         state.user = undefined
    //     },
    // },
    // actions: {
    //     ADD_USER_TO_VUEX({commit}, user) {
    //         commit('REGISTRY', user)
    //     },
    //     GET_USER_TO_VUEX ({commit}, user) {
    //         commit('LOGIN', user)
    //     },
    //     DELETE_USER_TO_VUEX ({commit}) {
    //         commit('LOGOUT')
    //     },
    // }
    state: {
        users: JSON.parse(localStorage.getItem('users')) || [],
        user: JSON.parse(localStorage.getItem('user')),
        countriesName: []
    },
    getters: {
        getUser (state) {
            return state.user
        },
        getUserName (state) {
            return state.user ? state.user.name : ''
        },
        getCountriesSelectName (state) {
            return state.countriesName
        },
        getCountryUser (state){
            return state.user.country
        }
    },
    mutations: {
        register(state, user) {
            if (!state.users.some(item => item.login === user.login)) {
                state.users.push(user)
                localStorage.setItem('users', JSON.stringify(state.users))
                state.user = {
                    name: user.login,
                    country: undefined
                };
                localStorage.setItem('user', JSON.stringify(state.user))
            }
        },
        login(state, user) {
            const userStorage = state.users.find(item => item.login === user.login && item.password === user.password);
            if (userStorage) {
                state.user = {
                    name: userStorage.login,
                    country: userStorage.country
                };
                localStorage.setItem('user', JSON.stringify(state.user))
                return true;
            }
            return false;
        },
        logout(state) {
            state.user = undefined;
            localStorage.removeItem('user');
        },
        setCountry(state, country) {
            state.user.country = country
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        setCountriesSelectName(state, countries){
            state.countriesName = countries
        }
    },
    actions: {
        registerUser({commit}, user) {
            commit('register', user)
        },
        loginUser({commit}, user) {
          commit('login', user)
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