<template>
  <van-nav-bar
    v-bind="$attrs"
    :style="navBarStyle"
    :class="{'iphonex-top':$store.state.isIphoneX}"
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
        return { backgroundColor: '#fff' }
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
    //适配手机
    padding-top: @statusBarHeight;
      box-sizing: border-box;
      .van-icon{
        color: #252525;
      }
  }
</style>
