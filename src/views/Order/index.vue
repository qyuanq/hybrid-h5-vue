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
    <contact class="order-fill-contact" :current-contact="currentContact" />
    <!-- 商品信息 -->
    <goods-info class="order-fill-goods" />
    <!-- 支付方式 -->
    <pay class="order-fill-pay" />
    <!-- 提交订单栏 -->
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
import Contact from '@c/Contact'
import GoodsInfo from './components/GoodsInfo'
import Pay from '@c/Pay'
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
      selectPayment: ''
    }
  },

  created() {
    this.loadGoodsData()
  },

  methods: {
    /**
     * @params good id
     * 根据商品id请求商品数据
     */
    loadGoodsData() {
      // 发起请求
    },

    /**
     * 返回
     */
    onClickLeft() {
      this.$router.go(-1)
    },
    /**
     * 提交订单
     */
    onSubmit() {

    }
  }
}

</script>
<style lang='less' scoped>
.order-fill{
  &-contact{
    margin-top: 92px;
  }
  &-goods{
    margin-top: @marginSize;
  }
  &-pay{
    margin-top: @marginSize;
  }
}
</style>
