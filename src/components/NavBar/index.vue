<template>
  <van-nav-bar
    v-bind="$attrs"
    :style="navBarStyle"
    v-on="$listeners"
  >
    <slot v-for="(_,name) in $slots" :slot="name" :name="name">
    <!-- <template v-slot:left>
      <slot name="left" />
    </template>

    <template v-slot:title>
      <slot name="title" />
    </template>
    <template v-slot:right>
      <slot name="right" />
    </template> -->
    </slot></van-nav-bar>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    navBarStyle: {
      type: Object,
      default: function() {
        return { backgroundColor: 'transparent' }
      }
    }
  },
  data() {
    return {
    }
  }
}

</script>
<style lang='less'>
  .van-nav-bar{
      // height: @navBarHeight;
      // line-height: @navBarHeight;
      .van-icon{
        color: #252525;
      }
  }
</style>
