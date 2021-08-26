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
    }
  },
  data() {
    return {
    }
  },

  methods: {
    toTop() {
      // 回到父组件顶部   this.$parent.$el：为父组件dom元素
      console.log(this.$parent)
      this.$parent.$el.scrollIntoView()
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
.moveR-enter,
.moveR-leave {
  transform: translateX(100%);
}
.moveR-leave-to {
  transform: translateX(100%);
}
</style>
