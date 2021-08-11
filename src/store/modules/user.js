export default {
  namespaced: true,
  state: {
    // 用户标识
    userToken: ''
  },
  mutations: {
    /**
     * 指定用户标识
     * @param {*} state
     * @param {*} userToken
     */
    setUserToken(state, userToken) {
      state.userToken = userToken
    },
    /**
     * 退出登录，清空标识
     */
    clearUserToken(state, userToken) {
      state.userToken = undefined
    }
  },
  getters: {

  },
  actions: {

  }
}
