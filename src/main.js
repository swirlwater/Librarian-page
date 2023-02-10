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

app.mount('#app')