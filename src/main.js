import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// css初始化
import 'normalize.css/normalize.css'
import 'amfe-flexible'

import '@/styles/index.less'
import '@utils/filters.js'

// axios
import request from '@/utils/request'
Vue.prototype.$axios = request

import '@/icons' // icons

// ui库
import { Button, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, Grid, GridItem, NavBar, Search } from 'vant'
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(NavBar)
Vue.use(Search)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
