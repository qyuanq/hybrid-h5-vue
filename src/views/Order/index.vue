<template>
  <div class="order-fill">
    <!-- navbar -->
    <nav-bar
      :fixed="true"
      title="填写订单"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 收货地址 -->
    <contact
      class="order-fill-contact"
      :current-contact="currentContact"
    />
    <!-- 商品信息 -->
    <div v-if="isType === 'cart' && checkCart.length > 0">
      <goods-info
        v-for="item in checkCart"
        :key="item.id"
        :goods="item"
        is-type="cart"
        class="order-fill-goods"
      />
    </div>
    <goods-info
      v-else
      :goods="goods"
      is-type="now"
      class="order-fill-goods"
      @change="changeNum"
    />
    <!-- 支付方式 -->
    <pay class="order-fill-pay" @change="changePay" />
    <!-- 提交订单栏 -->
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
import Contact from '@c/Contact'
import GoodsInfo from './components/GoodsInfo'
import Pay from '@c/Pay'
import { mapGetters } from 'vuex'
export default {
  name: 'Order',
  components: {
    NavBar,
    Contact,
    GoodsInfo,
    Pay
  },
  data() {
    return {
      // 商品数据
      goods: {},
      // 地址信息
      currentContact: {
        name: '张三',
        tel: '13000000000',
        city: '天津市南开区',
        adress: 'xxxxxxxxx'
      },
      // 用户选中的支付方式
      selectPayment: '',
      // 立即购买还是购物车订单 now / cart 默认now
      isType: 'now',
      // 立即购买商品数量，默认为1
      num: 1
    }
  },

  computed: {
    ...mapGetters('Cart', ['checkCart']),
    totalPrice() {
      if (this.isType === 'now') {
        return this.goods.price * this.num * 100
      } else {
        return this.checkCart.reduce((pre, item) => {
          return pre + item.price * item.number * 100
        }, 0)
      }
    }
  },

  created() {
    const isType = this.$route.params.isType
    if (isType) {
      this.isType = this.$route.params.isType
    }
    this.loadGoodsData()
  },

  methods: {
    /**
     * @params good id
     * 根据商品id请求商品数据
     */
    async loadGoodsData() {
      // 发起请求
      const goodId = this.$route.params.goodId
      const res = await this.$axios.get(`api/goods/${goodId}`)
      if (res.code === 0) {
        this.goods = res.data
      }
    },
    /**
     * 立即购买改变数量
     */
    changeNum(num) {
      this.num = num
    },
    /**
     * 返回
     */
    onClickLeft() {
      this.$router.go(-1)
    },
    /**
     * 改变支付方式
     */
    changePay(type) {
      // 1是微信；2是支付宝
      console.log(type)
      this.selectPayment = type
    },
    /**
     * 提交订单
     */
    onSubmit() {
      if (this.selectPayment === 1) {
        // 跳微信支付

      } else {
        // 跳支付宝支付
      }
    },
    /**
     * 支付宝支付
     */
    aliPay() {
      if (window.androidJSBridge) { // android
        const goodsData = JSON.stringify({
          name: this.goods.name,
          price: this.totalPrice
        })
        window.androidJSBridge.aliPay(goodsData)
      } else if (window.webkit) { // ios

      }
    },
    /**
     * 微信支付
     */
    wxPay() {
      if (window.androidJSBridge) { // android
        const goodsData = JSON.stringify({
          name: this.goods.name,
          price: this.totalPrice
        })
        window.androidJSBridge.wxPay(goodsData)
      } else if (window.webkit) { // ios

      }
    }
  }
}

</script>
<style lang='less' scoped>
.order-fill{
  position: absolute;
  width: 100%;
  height: 100vh;
  padding-bottom: calc(100px + constant(safe-area-inset-bottom));
  padding-bottom: calc(100px + env(safe-area-inset-bottom));
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  &-contact{
    margin-top: @statusBarHeight + 92px;
  }
  &-goods{
    margin-top: @marginSize;
  }
  &-pay{
    margin-top: @marginSize;
  }
}
</style>
