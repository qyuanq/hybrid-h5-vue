<template>
  <div class="seconds">
    <div class="seconds-top">
      <p class="seconds-top-title">
        京东秒杀
        <!-- 倒计时组件 -->
        <count-down :end-hours="17" />
      </p>
      <p class="seconds-top-more">更多秒杀<svg-icon icon-class="fs" /></p>
    </div>
    <div class="seconds-context">
      <div v-for="item in goodList" :key="item.id" class="seconds-context-good">
        <img class="seconds-context-good-img" :src="item.img">
        <p class="seconds-context-good-price"><em>￥</em>{{ item.price | priceValue }}</p>
        <p class="seconds-context-good-old-price"><em>￥</em>{{ item.oldPrice | priceValue }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CountDown from '@c/CountDown'
export default {

  components: { CountDown },
  data() {
    return {
      goodList: [
        { id: 1, price: 99.012, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-10.jpg') },
        { id: 2, price: 99.85, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-9.jpg') },
        { id: 3, price: 99.00, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-8.jpg') },
        { id: 4, price: 99.268, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-7.jpg') },
        { id: 5, price: 99, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-6.jpg') },
        { id: 6, price: 99, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-5.jpg') },
        { id: 7, price: 99, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-4.jpg') },
        { id: 8, price: 99, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-3.jpg') },
        { id: 9, price: 99, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-2.jpg') }
      ]
    }
  },

  computed: {},

  methods: {}
}

</script>
<style lang='less' scoped>
.seconds{
    background-color: #fff;
    border-radius: @radiusSize;
    padding: @paddingSize;
    ::-webkit-scrollbar {
        display: none;
    }
    &-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        // line-height: 48px;
        &-title{
            display: flex;
            font-size: @titleSize;
        }
        &-more{
            font-size: @infoSize;
            color: @mainColor;
        }
    }
    &-context{
        display: flex;
        overflow: hidden;
        overflow-x: scroll;
        &-good{
          flex: 0 0 180px;
          &-img{
            width: 100%;
          }
          &-price{
            margin-top: 10px;
            font-size: @infoSize;
            color: @mainColor;
            em{
              font-size: @signSize;
            }
          }
          &-old-price{
              margin-top: 6px;
              font-size: @infoSize;
              color: @textHintColor;
              text-decoration: line-through;
              em{
                font-size: @signSize;
              }
          }
        }
    }
}
</style>
