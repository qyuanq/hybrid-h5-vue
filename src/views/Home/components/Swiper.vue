<template>
  <div class="my-swipe">
    <van-swipe :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(image,index) in images" :key="index">
        <div class="my-swiper-item">
          <img v-lazy="image" class="my-swipe-img">
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    swiperHeight: {
      type: String,
      default: 'auto'
    }
    // images: {
    //   type: Array,
    //   default: function() {
    //     return []
    //   }
    // }
  },
  data() {
    return {
      images: [
        require('@/assets/images/swiper-1.jpg'),
        require('@/assets/images/swiper-2.jpg'),
        require('@/assets/images/swiper-3.jpg'),
        require('@/assets/images/swiper-4.jpg'),
        require('@/assets/images/swiper-5.jpg')
      ]
    }
  },

  computed: {},

  methods: {}
}

</script>
<style lang='less' scoped>
.my-swipe{
  width:100%;
  .my-swiper-item{
    width:100%;
    border-radius: @radiusSize;
    overflow: hidden;
    .my-swipe-img{
      width: 100%;
      height: 240px;
    }
  }
  ::v-deep{
    .van-swipe__track{
        height: 240px;
    }
  }
}

</style>
