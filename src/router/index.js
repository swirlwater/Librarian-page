import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView'
import MainView from '@/views/MainView'
import RegisterView from '@/views/RegisterView'
import HomeVue from '@/components/HomeVue'
import BookSearchVue from '@/components/BookSearchVue'
import BookManageVue from '@/components/BookManageVue'

const routes = [
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    alias: '/',
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/main',
    name: 'MainView',
    component: MainView,
    meta: {
      requireLogin: true
    },
    children: [
      {
        path: 'home',
        component: HomeVue
      },
      {
        path: 'bookSearch',
        component: BookSearchVue
      },
      {
        path: 'bookManage',
        component: BookManageVue
      }
    ]
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView,
    meta: {
      requireLogin: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
