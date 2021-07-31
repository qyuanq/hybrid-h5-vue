import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/main'
  // },
  // {
  //   path: '/main',
  //   redirect: '/main/home',
  //   name: 'Main',
  //   component: Main,
  //   meta: { keepAlive: true },
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'Home',
  //       component: () => import('@/views/Home'),
  //       meta: { keepAlive: true }
  //     },
  //     {
  //       path: 'cart',
  //       name: 'Cart',
  //       component: () => import('@/views/Cart'),
  //       meta: { keepAlive: true }
  //     }
  //   ]
  // },
  {
    path: '/',
    name: 'Main',
    component: Main
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
  }
]

const router = new VueRouter({
  // base: process.env.BASE_URL,
  routes
  // scrollBehavior(to, from, savedPosition) {
  //   // 解决路由跳转页面没有置顶
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return {
  //       x: 0,
  //       y: 0
  //     }
  //   }
  // }
})

export default router
