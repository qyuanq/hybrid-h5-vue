<template>
  <div class="goods-info">
    <div class="goods-info-img">
      <img src="@/assets/images/jingDongMiaoSha-2.jpg" alt="">
    </div>
    <div class="goods-info-content">
      <p class="goods-info-content-desc text-line-2">xxxxxxxxxxxxxxxxxxxxxx</p>
      <div class="goods-info-content-operation">
        <div class="goods-info-content-operation-price">{{ goods.price | priceValue }}</div>
        <van-stepper v-model="num" integer @change="changeNum" />
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
      num: 1
    }
  },

  computed: {},

  methods: {
    /**
     * 数量变了
     */
    changeNum() {

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
    }
  }
}
</style>
