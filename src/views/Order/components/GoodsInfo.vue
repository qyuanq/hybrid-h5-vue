<template>
  <div class="goods-info">
    <div class="goods-info-img">
      <img :src="goods.picture" alt="">
    </div>
    <div class="goods-info-content">
      <p class="goods-info-content-desc text-line-2">{{ goods.desc }}</p>
      <div class="goods-info-content-operation">
        <div class="goods-info-content-operation-price"><em>￥</em>{{ goods.price | priceValue }}</div>
        <van-stepper v-if="isType === 'now'" v-model="num" integer @change="changeNum" />
        <span v-else>{{ 'x ' + num }}</span>
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
    },
    isType: {
      type: String,
      default: 'now'
    }
  },
  data() {
    return {
      // 数量
      num: this.goods.number
    }
  },

  computed: {},

  methods: {
    /**
     * 数量变了
     */
    changeNum() {
      this.$emit('change', this.num)
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: @infoSize;
      &-price{
        color: @mainColor;
        em{
          font-size: @minSize;
        }
      }
    }
  }
}
</style>
