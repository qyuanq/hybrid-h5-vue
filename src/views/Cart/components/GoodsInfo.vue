<template>
  <div class="goods-info">
    <div class="goods-info-img">
      <img :src="goods.picture" alt="">
    </div>
    <div class="goods-info-content">
      <p class="goods-info-content-desc text-line-2">{{ goods.desc }}</p>
      <div class="goods-info-content-operation">
        <div class="goods-info-content-operation-price"><em>￥</em>{{ goods.price | priceValue }}</div>
        <van-stepper
          v-model="num"
          integer
          @change="changeNum"
          @overlimit="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      // 数量
      num: this.goods.number
    }
  },

  watch: {
    goods: {
      handler(o, n) {
        this.goods = n
        this.num = this.goods.number
      },
      deep: true
    }
  },

  methods: {
    /**
     * 数量变了
     */
    changeNum() {
      this.$store.dispatch('Cart/setCartNumber', { cartId: this.goods.id, num: this.num })
    },
    // 减少操作
    onDelete() {
      // 判断当前值是否为1
      if (this.num <= 1) {
        this.$dialog.confirm({
          message: '确定删除该商品吗'
        }).then(() => {
          // 删除操作
          this.$store.dispatch('Cart/deleteCart', this.goods.id)
          console.log('shanchu')
        }).catch(() => {
          return
        })
      }
      return
    }
  }
}

</script>
<style lang='less' scoped>
.goods-info{
  padding: @paddingSize;
  display: flex;
  background: white;
  &-img{
    width: 240px;
    // height: 240px;
    img{
      width: 100%;
    }
  }
  &-content{
    flex-grow: 1; //占满剩余空间
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    &-desc{
      font-size: @minInfoSize;
    }
    &-operation{
      margin-top: @marginSize;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-price{
        font-size: @infoSize;
        font-weight: 700;
        color: @mainColor;
        em{
          font-size: @minSize;
        }
      }
    }
  }
}
</style>
