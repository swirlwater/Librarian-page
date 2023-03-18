import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView'
import MainView from '@/views/MainView'
import RegisterView from '@/views/RegisterView'
import HomeVue from '@/components/HomeVue'
import BookSearchVue from '@/components/BookSearchVue'
import BookManageVue from '@/components/BookManageVue'
import OrderAddVue from '@/components/OrderAddVue'
import BorrowSearchVue from '@/components/BorrowSearchVue'
import BorrowManageVue from '@/components/BorrowManageVue'
import OrderManageVue from '@/components/OrderManageVue'
import RoleManageVue from '@/components/RoleManageVue'
import UserManageVue from '@/components/UserManageVue'
import UserSearchVue from '@/components/UserSearchVue'
import ViewUIPlus from 'view-ui-plus'

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
      },
      {
        path: 'orderAdd',
        component: OrderAddVue
      },
      {
        path: 'borrowSearch',
        component: BorrowSearchVue
      },
      {
        path: 'borrowManage',
        component: BorrowManageVue
      },
      {
        path: 'orderManage',
        component: OrderManageVue
      },
      {
        path: 'roleManage',
        component: RoleManageVue
      },
      {
        path: 'userManage',
        component: UserManageVue
      },
      {
        path: 'userSearch',
        component: UserSearchVue
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

router.beforeEach((to, from, next) => {//路由前置守卫
  ViewUIPlus.LoadingBar.start()
  if (to.matched.some(recond => recond.meta.requireLogin)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

router.afterEach( () => {
  ViewUIPlus.LoadingBar.finish()
})

export default router
