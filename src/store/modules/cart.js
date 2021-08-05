import $axios from '@/utils/request'
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    cartData: []		// 购物车信息
  },
  mutations: {
    // 获取购物车
    getCartData(state, cartData) {
      state.cartData = cartData
    },
    // 添加购物车:利用some
    addCartData(state, cartData) {
      const isExist = state.cartData.some(item => {
        if (item.id === cartData.id) {
          item.number += 1
          return true
        }
      })
      if (!isExist) {
        Vue.set(cartData, 'number', 1)
        state.cartData.unshift(cartData)
      }
    },
    // 删除某一项
    deleteCart(state, cartId) {
      for (let i = 0; i < state.cartData.length; i++) {
        if (state.cartData[i].id === cartId) {
          state.cartData.splice(i, 1)
          break
        }
      }
    },
    // 删除部分选中
    deleteCartMore(state) {
      for (let i = 0; i < state.cartData.length; i++) {
        if (state.cartData[i].checked) {
          state.cartData.splice(i, 1)
          i--
        }
      }
    },
    // 清空购物车
    deleteCartAll(state) {
      state.cartData = []
    },
    // 选中某一项
    checkCart(state, cartId) {
      // 返回第一个符合条件的没有则返回undefind
      const cart = state.cartData.find(cart => {
        return cart.id === cartId
      })
      if (cart !== 'undefind') {
        cart.checked = !cart.checked
      }
    },
    // 全选 or 取消全选
    // 全选：isChecked=== true  取消全选：isChecked=== false
    checkCartAll(state, isChecked) {
      state.cartData.forEach(cart => {
        if (cart.checked !== isChecked) {
          cart.checked = isChecked
        }
      })
    },
    // 修改数量
    setCartNumber(state, { cartId, num }) {
      const cart = state.cartData.find(cart => {
        return cart.id === cartId
      })
      if (cart !== 'undefind') {
        cart.number = num
      }
    }
  },
  getters: {
    // 是否全选 利用every
    isSelectAll(state) {
      if (state.cartData.length === 0) return false
      return state.cartData.every(cart => {
        return cart.checked
      })
    },
    // 选中总价 利用 reduce
    totalPrice(state) {
      const sum = state.cartData.reduce((pre, cart) => {
        if (cart.checked) {
          return pre + cart.price * cart.number
        }
        return pre
      }, 0)
      return sum * 100
    },
    // 选中商品数量 利用reduce
    totalCount(state) {
      return state.cartData.reduce((pre, cart) => {
        if (cart.checked) {
          return pre + cart.number
        }
        return pre
      }, 0)
    },
    // 选中商品种类数量
    totalSpecies(state) {
      return state.cartData.reduce((pre, cart) => {
        if (cart.checked) {
          console.log(pre)
          return pre + 1
        }
        return pre
      }, 0)
    },
    // 返回选中的商品
    checkCart(state) {
      return state.cartData.filter(cart => {
        return cart.checked
      })
    }
  },
  actions: {
    // 获取购物车
    async getCartData({ commit }) {
      // @todo 请求数据获取购物车
      const res = await $axios.get('api/cart')
      if (res.code === 0) {
        commit('getCartData', res.data)
      }
      return
    },
    // 添加购物车
    addCartData({ commit }, cartData) {
      // @todo 请求添加购物车api
      commit('addCartData', cartData)
    },
    // 删除某一项
    deleteCart({ commit }, cartId) {
      // @todo 请求删除购物某一项api
      commit('deleteCart', cartId)
    },
    // 删除选中or全部
    deleteCartAll({ commit, getters }) {
      // 请求删除选中的购物车商品信息
      // 成功后修改state
      if (getters.isSelectAll) {
        // @todo 请求清空购物车api
        commit('deleteCartAll')
        return
      }
      // @todo 请求部分删除api
      commit('deleteCartMore')
    },
    // 选中某一项
    checkCart({ commit }, cartId) {
      // @todo 发起请求修改选中状态
      commit('checkCart', cartId)
    },
    // 选中部分 or 全选
    checkCartAll({ commit }, isChecked) {
      // @todo 发起请求
      console.log('store', isChecked)
      commit('checkCartAll', isChecked)
    },
    // 修改数量:传参应该是个对象
    setCartNumber({ commit }, { cartId, num }) {
      // @todo 发起请求修改数量
      commit('setCartNumber', { cartId, num })
    }
  }
}
