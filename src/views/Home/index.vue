<template>
  <div ref="home" class="home" @scroll="onScrollChange">
    <skeleton v-if="isShowLoading" />
    <!-- 下拉刷新 -->
    <van-pull-refresh v-if="!isShowLoading" v-model="isLoading" @refresh="onRefresh">
      <div class="home-header">
        <nav-bar :fixed="true" class="home-nav-bar z-index-4" :nav-bar-style="navBarStyle" :border="false">
          <template v-slot:left>
            <svg-icon icon-class="menu" />
          </template>
          <template v-slot:title>
            <van-search v-model="keywords" class="van-search" placeholder="请输入搜索关键词" />
          </template>
          <template v-slot:right>
            <svg-icon icon-class="zixun" class-name="zixun" />
          </template>
        </nav-bar>
        <div :class="['home-header-bg',{'home-header-bg-iphonex':$store.state.isIphoneX}]" />
      </div>
      <div class="home-context">
        <swiper :swiper-height="swiperHeight" :class="['swiper',{'swiper-iphonex':$store.state.isIphoneX}]" />
        <nav-box />
        <seconds />
        <Activity class="activity-ping-gou-jie">
          <img src="@img/haoHuoQiang.gif">
        </Activity>
        <Goods ref="goods" class="home-goods" api-goods="/api/goods" />
        <!-- <van-divider>我是有底线的</van-divider> -->
      </div>
      <v-top :scroll-top-value="scrollTopValue" />
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
import Swiper from './components/Swiper'
import NavBox from './components/NavBox'
import Seconds from './components/Seconds'
import Activity from '@c/Activity'
import Goods from '@c/GoodList/Goods'
import Skeleton from './components/Skeleton'
import { throttle } from 'lodash-es'
export default {
  name: 'Home',
  components: {
    NavBar,
    Swiper,
    NavBox,
    Seconds,
    Activity,
    Goods,
    Skeleton
  },
  data() {
    return {
      // 骨架屏展示,加载
      isShowLoading: true,
      swiperHeight: window.isIphoneX ? '228px' : '184px',
      keywords: '',
      // 记录页面滚动值
      scrollTopValue: -1,
      // 锚点值
      ANCHOR_SCROLL_TOP: 160,
      navBarStyle: {
        backgroundColor: 'transparent'
      },
      // 下拉刷新
      isLoading: false
    }
  },
  async created() {
    if (this.$store.getters.userToken) {
      // 获取购物车数据
      await this.$store.dispatch('Cart/getCartData')
    }
  },
  activated() {
    // 组件被激活时，页面滚动值为最后滚动的位置
    this.$refs.home.scrollTop = this.scrollTopValue
  },

  mounted() {
    this.isShowLoading = false
  },
  methods: {
    /**
     * 监听页面滚动条
     * 1.获取到当前页面滚动距离
     * 2.计算nav-bar背景颜色（nav-bar背景透明度）
     *    当前滚动距离 / 锚点值 = nav-bar背景透明度 opacity
     * 3.opacity > 1,当前滚动的距离已经超过了锚点值，当前nav-bar变为高亮状态值
     */
    onScrollChange: throttle(function(event) {
      this.scrollTopValue = event.target.scrollTop
      // 背景透明度
      const opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
      this.navBarStyle.backgroundColor = 'rgba(200,37,25,' + opacity + ')'
    }, 300),
    // 下拉刷新
    async onRefresh() {
      await this.$refs.goods.initData()
      this.isLoading = false
    }
  }
}

</script>
<style lang='less' scoped>
.home{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(100px + constant(safe-area-inset-bottom));
  padding-bottom: calc(100px + env(safe-area-inset-bottom));
  box-sizing: border-box;
  &-nav-bar{
    ::v-deep{
      // .van-nav-bar__content{
      //   height: 44PX;
      // }
      .van-nav-bar__title{
        max-width: 80%;
        width: 80%;
      }
    }
    .van-search{
      width: 100%;
      box-sizing: border-box;
      padding: 0;
      border-radius: 80px;
      overflow: hidden;
      .van-search__content{
        padding-right: 24px;
      }
      .van-cell{
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        padding: 0;
      }
    }
    .zixun{
      color: white;
    }
  }
  &-header{
    position: relative;
    width: 100%;
    height: 1px;
    &-bg{
      width: 150%;
      background-image: linear-gradient(0deg,#f1503b,#c82519 50%);
      border-bottom-left-radius: 100%;
      border-bottom-right-radius: 100%;
      position: absolute;
      top: 0;
      left: -25%;
      height: 268px + @statusBarHeight;
      &-iphonex{
        height: calc(268px + constant(safe-area-inset-top));
        height: calc(268px + env(safe-area-inset-top));
      }
    }
  }
  &-context{
    padding: 0 20px;
    .swiper{
        margin-top: @marginSize + 92px + @statusBarHeight;
        &-iphonex{
          margin-top: calc(@marginSize + 92px  + constant(safe-area-inset-top));
          margin-top: calc(@marginSize + 92px  + env(safe-area-inset-top));
        }
      ::v-deep{
        .van-swipe__indicator{
          width: 12px;
          height: 12px;
        }
      }
    }
    .activity-ping-gou-jie {
        background-color: white;
        margin-top: @marginSize;
        img {
            width: 100%;
        }
    }
  }
}
</style>
