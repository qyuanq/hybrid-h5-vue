import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
// css初始化
import 'normalize.css/normalize.css'
import 'amfe-flexible'

import '@/styles/index.less'
import '@utils/filters.js'
import '@utils/isIphoneX.js'

// axios
import request from '@/utils/request'
Vue.prototype.$axios = request

import '@/icons' // icons

import _ from 'lodash'
Vue.prototype._ = _

// ui库
import { Button, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, Grid, GridItem, NavBar, Search, DropdownMenu, DropdownItem, Overlay, Tag, GoodsAction, GoodsActionIcon, GoodsActionButton, Divider, Stepper, SubmitBar, RadioGroup, Radio, Cell, CellGroup, Badge, Checkbox, CheckboxGroup, Form, Field, Dialog, Icon, Toast, PullRefresh, Skeleton, List, Loading } from 'vant'
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
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Overlay)
Vue.use(Tag)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(Divider)
Vue.use(Stepper)
Vue.use(SubmitBar)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Badge)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Form)
Vue.use(Field)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(Toast)
Vue.use(PullRefresh)
Vue.use(Skeleton)
Vue.use(List)
Vue.use(Loading)

Vue.prototype.$dialog = Dialog
Vue.prototype.$toast = Toast

// 解决移动端click点击延迟300ms问题
FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
