//导入axios
import axios from 'axios'
import ViewUIPlus from 'view-ui-plus'

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const API = axios.create({
  baseURL: '/api', //请求后端数据的基本地址
  timeout: 3000
})

API.interceptors.request.use(//axios请求拦截器
  config => {
    ViewUIPlus.LoadingBar.start()
    if (config.url.includes('/login') || config.url.includes('/register')|| config.url.includes('/captcha')) {
      sessionStorage.removeItem('token')
    }
    //设置token
    let token = sessionStorage.token
    if (token && token !== ' ') {
      config.headers.token = token
    }
    return config
  },
  error => {
    ViewUIPlus.LoadingBar.error()
    return Promise.reject(error)
  }
)

API.interceptors.response.use(//axios响应拦截器
  response => {
    ViewUIPlus.LoadingBar.finish()
    //设置token
    // let token = response.headers.token
    // if (token && token !== '') {
    //   localStorage.setItem('token', token)
    // }
    // if (response.response.status == 500) {
    //   this.$router.push({
    //     path: '/login',
    //     query: {
    //       redirect: this.$route.fullPath
    //     }
    //   })
    //   return Promise.reject(response.data)
    // }
    return response
  }, error => {
    console.log(error);
    ViewUIPlus.LoadingBar.error()
    return Promise.reject(error)
  }
)

//导出我们建立的axios实例模块，ES6 export用法
export default API