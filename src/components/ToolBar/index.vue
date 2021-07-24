<template>
  <van-tabbar
    v-model="active"
    active-color="#ee0a24"
    inactive-color="#000"
    class="tabbar"
  >
    <van-tabbar-item replace to="/">
      <span>首页</span>
      <template v-slot:icon>
        <!-- <svg-icon :icon-class="props.active ? 'home' : 'home-active'" class-name="home" /> -->
        <svg-icon icon-class="home" class-name="icon-size" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/category">
      <span>分类</span>
      <template v-slot:icon>
        <svg-icon icon-class="cate" class-name="icon-size" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/surprised">
      <span>惊喜</span>
      <template v-slot:icon>
        <svg-icon icon-class="jd" class-name="icon-size" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/cart">
      <span>购物车</span>
      <template v-slot:icon>
        <svg-icon icon-class="cart" class-name="icon-size" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/not-login">
      <span>未登录</span>
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
      active: 0
    }
  }
}
</script>
<style lang="less" scoped>
.van-tabbar {
  height: 44px;
  ::v-deep {
    .van-tabbar-item__icon {
      margin-bottom: 5px;
    }
  }
  .icon-size {
    width: 18px;
    height: 18px;
  }
}
</style>
