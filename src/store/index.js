import { createStore } from 'vuex'

const store = createStore({
  state: {

  },
  getters: {
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
    }
  },
  actions: {

  },
  modules: {
  }
})
export default store
