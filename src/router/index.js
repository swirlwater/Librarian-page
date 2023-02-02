import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView'
import MainView from '@/views/MainView'
import RegisterView from '@/views/RegisterView'

const routes = [
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    alias: ['/']
  },
  {
    path: '/main',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
