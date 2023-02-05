import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import axios from '@/axios/index'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(ViewUIPlus)

app.config.globalProperties.$axios = axios //配置axios的全局引用
axios.interceptors.response.use(//axios拦截器
  response => {
    if (response.data.code == 500) {
      router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
      return Promise.reject(response.data)
    }
    return response
  }, error => {
    return Promise.reject(error.response.data)
  }
)
router.beforeEach((to, from, next) => {
  let user = store.state.user
  if (to.matched.some(recond => recond.meta.requireLogin)) {
    if (JSON.stringify(user) === '{}') {
      next()
      router.push({ path: '/login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

app.mount('#app')