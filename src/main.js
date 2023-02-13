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

//获取当前时间
app.config.globalProperties.dateformat = function (args) {
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

app.mount('#app')