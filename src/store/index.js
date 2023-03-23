import { createStore } from 'vuex'

const store = createStore({
  state: {
    user:{}
  },
  getters: {
    getUser:function(state){
      return state.user;
    }
  },
  mutations: {
    dateformat(args) {
      let dt = new Date()
      let y = dt.getFullYear()
      let m = dt.getMonth() + 1
      let d = dt.getDate()
      if (args.toLowerCase() === 'yyyy-MM-dd') {
        return `${y}-${m}-${d}`
      } else {
        let hh = dt.getHours()
        let mm = dt.getMinutes()
        let ss = dt.getSeconds()
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      }
    },
    setUser: function(state,user){
      state.user=user
    }
  },
  actions: {
    setUser({commit},user){
      commit('setUser',user)
    }
  },
  modules: {
  }
})
export default store
