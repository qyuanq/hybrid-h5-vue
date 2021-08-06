<template>
  <van-tabbar
    active-color="#ee0a24"
    inactive-color="#000"
    :class="['tabbar',{'iphonex-bottom':$store.state.isIphoneX}]"
    :safe-area-inset-bottom="true"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- <van-tabbar-item replace :to="{name:'Home'}"> -->
    <van-tabbar-item name="home">
      <span class="tabbar-text">首页</span>
      <template v-slot:icon>
        <!-- 作用域插槽v-slot:icon="prop" -->
        <!-- <svg-icon :icon-class="props.active ? 'home' : 'home-active'" class-name="home" /> -->
        <svg-icon icon-class="home" class-name="icon-size" />
      </template>
    </van-tabbar-item>
    <!-- <van-tabbar-item replace to="/category"> -->
    <van-tabbar-item name="category">
      <span class="tabbar-text">分类</span>
      <template v-slot:icon>
        <svg-icon icon-class="cate" class-name="icon-size" />
      </template>
    </van-tabbar-item>
    <!-- <van-tabbar-item replace to="/surprised"> -->
    <van-tabbar-item name="surprised">
      <span class="tabbar-text">惊喜</span>
      <template v-slot:icon>
        <svg-icon icon-class="jd" class-name="icon-size" />
      </template>
    </van-tabbar-item>
    <!-- <van-tabbar-item replace :to="{name:'Cart'}"> -->
    <van-tabbar-item name="cart">
      <span class="tabbar-text">购物车</span>
      <template v-slot:icon>
        <svg-icon icon-class="cart" class-name="icon-size" />
      </template>
    </van-tabbar-item>
    <!-- <van-tabbar-item replace to="/user"> -->
    <van-tabbar-item name="my">
      <span class="tabbar-text">未登录</span>
      <template v-slot:icon>
        <svg-icon icon-class="login" class-name="icon-size" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  components: {},
  data() {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.van-tabbar {
  ::v-deep {
    .van-tabbar-item__icon {
      margin-bottom: 5PX;
    }
  }
  .icon-size {
    // width: 18PX;
    // height: 18PX;
  }
}
.tabbar-text{
  // font-size: 18px;
}
</style>
