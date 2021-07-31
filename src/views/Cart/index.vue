<template>
  <div class="cart">
    <!--
      添加购物车 动画
      购物车存在该商品，则数量 + 1否则新添商品
      默认状态下商品未选中，数量为1
      购物车会展示已选商品价格和已选商品总数量
      可以在购物车中修改数量，展示的总价格和总数量也会发生对应的变化
     -->
    <nav-bar title="购物车">
      <template v-slot:right>
        <!-- <svg-icon icon-class="" />  -->
        编辑
      </template>
    </nav-bar>

    <!-- 购物车没内容 -->
    <div class="cart-no">
      <!-- 购物车没登录 -->
      <div class="cart-no-login" />
    </div>

    <!-- 购物车有内容 -->
    <div class="cart-have">
      <!-- 商品列表 -->
      <div class="cart-have-list">
        <div class="cart-have-list-item">
          <!-- 这里使用复选框或者svg -->
          <van-checkbox v-model="checked" checked-color="#ee0a24" />
          <goods-info class="cart-have-list-item-goods" />
        </div>
      </div>

      <!-- 底部结算框 -->
      <van-submit-bar class="cart-have-bar" :price="3050" button-text="结算" @submit="onSubmit">
        <van-checkbox v-model="checked">全选</van-checkbox>
        <!-- <template #tip>
          你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
        </template> -->
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
import GoodsInfo from './components/GoodsInfo'
export default {
  name: 'Cart',
  components: {
    NavBar,
    GoodsInfo
  },
  data() {
    return {
      checked: true
    }
  },

  computed: {},

  methods: {
    /**
     * 结算
     */
    onSubmit() {

    }
  }
}

</script>
<style lang='less' scoped>
.cart{
  &-no{

  }
  &-have{
    &-list{
      &-item{
        background: white;
        display: flex;
        align-items: center;
        padding: @paddingSize;
        box-sizing: border-box;
        &-goods{
          flex-grow: 1;
        }
      }
    }
    &-bar{
      margin-bottom: 100px;
    }
  }
}
</style>
