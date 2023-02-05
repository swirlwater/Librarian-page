import axios from '@/axios'
import router from '@/router'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: JSON.parse(localStorage.user || '{}')
  },
  getters: {
  },
  mutations: {
    changeUser(state, msg) {
      state.user = msg
    }
  },
  actions: {
    getUser({ commit }) {
      axios.post('/user/login', { username: localStorage.username, password: localStorage.password })
        .then(data => {
          commit('changeUser', data.data.object);
          localStorage.user = JSON.stringify(data.data.object)
        }).catch(() => {
          commit('changeUser', {})
          if (router.matched(record => record.meta.requireLogin)) {
            router.push({
              path: '/login',
              query: { redirect: this.$route.fullPath }
            })
          }
        })
    }
  },
  modules: {
  }
})
export default store
