import Vue from 'vue'
import Vuex from 'vuex'
import Cart from './modules/cart'
import User from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 设备是否为iPhoneX
    isIphoneX: false
  },
  mutations: {
    /**
     * 修改iPhoneX
     * @param {*} state
     * @param {*} isIphoneX
     */
    setIsIphoneX(state, isIphoneX) {
      state.isIphoneX = isIphoneX
    }
  },
  actions: {},
  modules: {
    Cart,
    User
  }
})
