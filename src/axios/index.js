//导入axios
import axios from 'axios'

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const API = axios.create({
  baseURL: '/api', //请求后端数据的基本地址
  timeout: 3000,
  headers: {
    "Conten-Type": `appplication/x-www-form-urlencoded;charset=utf-8`
  }
})

API.interceptors.request.use(//axios请求拦截器
  config => {
    //设置token
    let token = localStorage.token
    if (token && token !== ' ') {
      config.headers.token = token
    }
    return config
  },
  error => Promise.reject(error)
)
API.interceptors.response.use(//axios响应拦截器
  response => {
    //设置token
    let token = response.headers.token
    if (token && token !== '') {
      localStorage.setItem('token', token)
    }
    if (response.data.code == 500) {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
      return Promise.reject(response.data)
    }
    return response
  }, error => {
    return Promise.reject(error)
  }
)

//导出我们建立的axios实例模块，ES6 export用法
export default API