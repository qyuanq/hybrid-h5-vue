const getters = {
  userToken: state => state.User.userToken,
  cartDataCount: state => state.Cart.cartData.length
}
export default getters
