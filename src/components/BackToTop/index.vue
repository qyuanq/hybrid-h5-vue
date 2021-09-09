<template>
  <transition name="moveR">
    <div v-show="scrollTopValue > 200" class="backtotop" @click="toTop">
      <svg-icon class-name="backtotop-icon" icon-class="backtotop" />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    // 滚动值
    scrollTopValue: {
      type: Number,
      default: 0
    },
    // 元素id
    ele: {
      type: String,
      require: true,
      default: 'hook'
    }
  },
  data() {
    return {

    }
  },
  methods: {
    toTop() {
      // scrollIntoView 不兼容ios本机测试版本12
      document.getElementById(this.ele).scrollIntoView()
      // 要求所有页面的scroll-view class都要设置为scroll
      if (this.scrollTopValue !== 0) {
        // 兼容处理
        document.querySelector('.scroll').scrollTop = 0
      }
    }
  }
}

</script>
<style lang='less' scoped>
.backtotop{
  position: fixed;
  bottom: 200px;
  cursor: pointer;
  right: 20px;
  z-index: 99;
  &-icon{
    width: 38PX;
    height: 38PX;
  }
}

.moveR-enter-active,
.moveR-leave-active {
  transition: all 0.2s linear;
  transform: translateX(0);
}
//动画一开始和动画结束设为 translateX(100%)
.moveR-enter,
.moveR-leave {
  transform: translateX(100%);
}
.moveR-leave-to {
  transform: translateX(100%);
}
</style>
