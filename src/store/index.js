import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        users: []
    },
    getters: {
        USERS(state) {
            return state.users
        }
    },
    mutations: {
        SET_USERS(state, user) {
            state.users.push(user)
        }
    },
    actions: {
        GET_USERS({commit}, user) {
            commit('SET_USERS', user)
        }
    }
})

export default store