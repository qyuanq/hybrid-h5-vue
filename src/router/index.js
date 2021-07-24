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
    name: 'goodList',
    component: () =>
      import('@/views/GoodList')
  }
]

const router = new VueRouter({
  routes
})

export default router
