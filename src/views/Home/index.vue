<template>
  <div ref="home" class="home" @scroll="onScrollChange">
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
      <div class="home-header-bg" />
    </div>
    <div class="home-context">
      <swiper :swiper-height="swiperHeight" class="swiper" />
      <nav-box />
      <seconds />
      <Activity class="activity-ping-gou-jie">
        <img src="@img/haoHuoQiang.gif">
      </Activity>
      <Goods class="home-goods" />
      <van-divider>我是有底线的</van-divider>
    </div>
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
import Swiper from './components/Swiper'
import NavBox from './components/NavBox'
import Seconds from './components/Seconds'
import Activity from '@c/Activity'
import Goods from '@c/GoodList/Goods'
export default {
  name: 'Home',
  components: {
    NavBar,
    Swiper,
    NavBox,
    Seconds,
    Activity,
    Goods
  },
  data() {
    return {
      swiperHeight: window.isIphoneX ? '228px' : '184px',
      keywords: '',
      // 记录页面滚动值
      scrollTopValue: -1,
      // 锚点值
      ANCHOR_SCROLL_TOP: 160,
      navBarStyle: {
        backgroundColor: 'transparent'
      }
    }
  },

  activated() {
    // 组件被激活时，页面滚动值为最后滚动的位置
    this.$refs.home.scrollTop = this.scrollTopValue
    console.log(this.scrollTopValue)
  },

  methods: {
    /**
     * 监听页面滚动条
     * 1.获取到当前页面滚动距离
     * 2.计算nav-bar背景颜色（nav-bar背景透明度）
     *    当前滚动距离 / 锚点值 = nav-bar背景透明度 opacity
     * 3.opacity > 1,当前滚动的距离已经超过了锚点值，当前nav-bar变为高亮状态值
     */
    onScrollChange(event) {
      this.scrollTopValue = event.target.scrollTop
      // 背景透明度
      const opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
      this.navBarStyle.backgroundColor = 'rgba(200,37,25,' + opacity + ')'
    }
  }
}

</script>
<style lang='less' scoped>
.home{
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 100px;
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
      height: 30PX;
      border-radius: @radiusSize;
      .van-search__content{
        padding-left: 0;
      }
      .van-cell{
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
    &-bg{
      width: 150%;
      height: 208px;
      background-image: linear-gradient(0deg,#f1503b,#c82519 50%);
      border-bottom-left-radius: 100%;
      border-bottom-right-radius: 100%;
      position: absolute;
      top: 22PX;
      left: -25%;
    }
  }
  &-context{
    padding: 0 20px;
    .swiper{
      margin-top: @marginSize + 88px + 22PX;
      ::v-deep{
        .van-swipe__indicator{
          width: 8PX;
          height: 8PX;
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
