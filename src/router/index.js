import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  routes
})

export default router
