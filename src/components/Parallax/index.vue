<!--
  @name: 滚动视差组件
-->
<template>
  <div ref="parallax" class="parallax" @scroll="onScrollChange">
    <!-- 缓慢移动区 -->
    <div class="parallax-slow" :style="{transform:`translate3d(0,${slowTop},0)`}">
      <slot name="parallax-slow" />
    </div>
    <!-- 正常移动区 -->
    <div class="parallax-content z-index-2">
      <slot />
    </div>
  </div>
</template>

<script>
export default {

  components: {},
  data() {
    return {
      // 页面滚动距离
      parallaxScroll: 0,
      // 速度差
      SPEED_DIFF: 1.3
    }
  },

  computed: {
    // 返回slow距离顶部的距离
    slowTop() {
      // 当前页面的滑动距离 / 速度差 = 该内容区实际应该滑动的距离
      // 当前页面的滑动距离 - 该内容区实际应该滑动的距离 = slow 距离顶部的距离
      return (this.parallaxScroll - this.parallaxScroll / this.SPEED_DIFF) + 'px'
    }
  },
  activated() {
    this.$refs.parallax.scrollTop = this.parallaxScroll
  },
  methods: {
    /**
     * 滚动改变
     */
    onScrollChange(event) {
      this.parallaxScroll = event.target.scrollTop
      this.$emit('onScrollChange', this.parallaxScroll)
    }
  }
}

</script>
<style lang='less' scoped>
.parallax{
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  perspective: 1000;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  &-slow{
    // position: relative;
    //开启translate3d GPU硬件加速
  }
  &-content{
    position: relative;
  }
}
</style>
