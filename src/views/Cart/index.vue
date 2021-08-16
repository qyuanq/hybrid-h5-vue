<template>
  <div class="cart">
    <!--
      添加购物车 动画
      购物车存在该商品，则数量 + 1否则新添商品
      默认状态下商品未选中，数量为1
      购物车会展示已选商品价格和已选商品总数量
      可以在购物车中修改数量，展示的总价格和总数量也会发生对应的变化
     -->
    <nav-bar title="购物车" @click-right="onEdit">
      <template v-slot:right>
        <!-- <svg-icon icon-class="" />  -->
        编辑
      </template>
    </nav-bar>
    <van-pull-refresh v-model="isLoading" style="min-height: 100vh;" @refresh="onRefresh">
      <!-- 购物车没内容 -->
      <div class="cart-no">
        <!-- 购物车没登录 -->
        <div class="cart-no-login" />
      </div>

      <!-- 购物车有内容 -->
      <div class="cart-have">
        <!-- 商品列表 -->
        <div class="cart-have-list">
          <div v-for="item in cartData" :key="item.id" class="cart-have-list-item">
            <!-- 这里使用复选框或者svg -->
            <van-checkbox v-model="item.checked" checked-color="#ee0a24" />
            <goods-info :goods="item" class="cart-have-list-item-goods" />
          </div>
        </div>

      </div>
    </van-pull-refresh>
    <!-- 底部结算框 -->
    <div class="cart-have-bar">
      <van-submit-bar
        v-if="!isEdit"
        :disabled="disabled"
        :price="totalPrice"
        :button-text="'结算 ' + totalCount"
        :safe-area-inset-bottom="false"
        @submit="onSubmit"
      >
        <van-checkbox :value="isSelectAll" checked-color="#ee0a24" @click="changeChecked">全选</van-checkbox>
        <!-- <template #tip>
          你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
        </template> -->
      </van-submit-bar>
      <div v-else class="cart-have-bar-edit">
        <van-checkbox :value="isSelectAll" checked-color="#ee0a24" @click="changeChecked">全选</van-checkbox>
        <div class="cart-have-bar-edit-btn">
          <div class="cart-have-bar-edit-btn-clean">
            <svg-icon icon-class="delete" />
            快速清理
          </div>
          <button class="cart-have-bar-edit-btn-collage">移入收藏夹</button>
          <button class="cart-have-bar-edit-btn-delete" @click="onDelete">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
import GoodsInfo from './components/GoodsInfo'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components: {
    NavBar,
    GoodsInfo
  },
  data() {
    return {
      // 编辑那妞
      isEdit: false,
      // 上拉刷新
      isLoading: false
    }
  },

  computed: {
    // 购物车数据
    ...mapState('Cart', ['cartData']),
    ...mapGetters('Cart', ['totalPrice', 'isSelectAll', 'totalCount', 'totalSpecies']),
    // 结算按钮是否禁用
    disabled() {
      if (this.totalSpecies <= 0) {
        return true
      }
      return false
    }
  },

  async created() {
    await this.getCartData()
  },
  deactivated() {
    this.isEdit = false
  },
  methods: {
    /**
     * 获取购物车数据
     */
    ...mapActions('Cart', ['getCartData', 'checkCartAll', 'deleteCartAll']),
    /**
     * 结算
     */
    onSubmit() {
      this.$router.push({
        name: 'Order',
        params: {
          routerType: 'push',
          isType: 'cart'
        }
      })
    },
    /**
     * 改变选项
     */
    changeChecked(event) {
      this.checkCartAll(!this.isSelectAll)
    },
    /**
     * 编辑
     */
    onEdit() {
      this.isEdit = !this.isEdit
    },
    /**
     * 删除
     */
    onDelete() {
      this.$dialog.confirm({
        message: `确认要删除这${this.totalSpecies}个商品吗`
      })
        .then(() => {
          this.deleteCartAll()
          this.isEdit = false
        })
        .catch(() => {
          this.$dialog.close()
        })
    },
    /**
     * 上拉刷新
     */
    onRefresh() {
      this.isLoading = false
    }
  }
}

</script>
<style lang='less' scoped>
.cart{
  width: 100%;
  height: 100vh;
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
        border-bottom: 1px solid @lineColor;
        &:last-child{
          border-bottom: 0;
        }
        .van-checkbox{
          overflow: visible;
        }
        &-goods{
          flex-grow: 1;
        }
      }
    }
    &-bar{
      ::v-deep{
        .van-submit-bar{
          bottom: calc(100px + constant(safe-area-inset-bottom));
          bottom: calc(100px + env(safe-area-inset-bottom));
          box-sizing: border-box;
        }
      }
      &-edit{
        width: 100%;
        height: 100px;
        background-color: white;
        position: fixed;
        left: 0;
        bottom: 100px;
        box-sizing: border-box;
        font-size: @minInfoSize;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 32px;
        &-btn{
          display: flex;
          justify-content: space-around;
          align-items: center;
          &-clean{
            color: @mainColor;
            margin-right: @marginSize;
          }
          &-collage{
            margin-right: @marginSize;
          }
          &-collage,&-delete{
            padding: 10px;
            border-radius: @radiusSize;
            border: 1px solid @textHintColor;
            background-color: white;
          }
        }
      }
    }
  }
}
</style>
