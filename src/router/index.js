import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main'
    // meta: { keepAlive: true }
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    redirect: '/main/home',
    // meta: { keepAlive: true },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: { keepAlive: true }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/Category'),
        meta: { keepAlive: true }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/Cart'),
        meta: { keepAlive: true, requireAuth: true }
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/My'),
        meta: { keepAlive: true, requireAuth: true }
      }
    ]
  },
  {
    path: '/goodList',
    name: 'GoodList',
    component: () => import('@/views/GoodList')
  },
  {
    path: '/goodDetail',
    name: 'GoodDetail',
    component: () => import('@/views/GoodDetail')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register')
  },
  {
    path: '/userSet',
    name: 'UserSet',
    component: () => import('@/views/My/UserSet'),
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  // base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 解决路由跳转页面没有置顶
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return {
    //     x: 0,
    //     y: 0
    //   }
    // }
  }
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // 需要验证登录的路由
  if (to.meta.requireAuth) {
    if (store.getters.userToken) {
      next()
    } else {
      next(
        {
          name: 'Login',
          params: {
            routerType: 'push'
          }
        }
      )
    }
  } else {
    next()
  }
})

export default router
