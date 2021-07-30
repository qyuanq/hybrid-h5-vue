<template>
  <div class="good-detail">
    <!-- 顶部导航 -->
    <nav-bar
      :fixed="true"
      :border="false"
      class="good-detail-navbar z-index-4"
      :nav-bar-style="navBarStyle"
      @click-left="onClickLeft"
    >
      <template v-slot:left>
        <svg-icon
          icon-class="detail-left"
          class-name="good-detail-navbar-icon"
          :style="{opacity: leftIconDefault}"
        />
        <svg-icon
          icon-class="back"
          class-name="good-detail-navbar-icon"
          :style="{opacity: navBarOpactity}"
        />
      </template>
      <template v-slot:title>
        <p class="good-detail-navbar-title" :style="{opacity: navBarOpactity}">商品列表</p>
      </template>
    </nav-bar>

    <parallax @onScrollChange="onScrollChange">
      <template v-slot:parallax-slow>
        <!-- 轮播 -->
        <van-swipe class="good-detail-swiper" @change="onChangeSwiper">
          <van-swipe-item v-for="(image,index) in images" :key="index">
            <div class="my-swiper-item">
              <img v-lazy="image" class="my-swipe-img">
            </div>
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }} / 4</div>
          </template>
        </van-swipe>
      </template>
      <template>
        <div class="good-detail-content">
          <!-- 秒杀 -->
          <!-- 商品描述 -->
          <div class="good-detail-desc">
            <p class="good-detail-desc-name text-line-2">{{ '【顺丰包邮】CHERRY樱桃原装DW3000无线办公打字静音电脑外设键盘鼠标套装码字便携usb键盘' }}</p>
            <div class="good-detail-desc-wrap">
              <div class="good-detail-desc-wrap-item">
                <span>快递：</span>
                <span>{{ 1 }}</span>
              </div>
              <div class="good-detail-desc-wrap-item">
                <span>月销量：</span>
                <span>{{ 1 }}件</span>
              </div>
              <div class="good-detail-desc-wrap-item">
                <span>上海</span>
              </div>
            </div>
          </div>
          <!-- 选择 -->
          <div class="good-detail-option">
            <div class="good-detail-option-sku">
              <span class="good-detail-option-sku-label">已选</span>
              <p class="good-detail-option-sku-content">
                xxx
              </p>
              <svg-icon icon-class="go" /></div>
            <div class="good-detail-option-sku">
              <span class="good-detail-option-sku-label">送至</span>
              <p class="good-detail-option-sku-content">
                xxx
              </p>
              <svg-icon icon-class="go" /></div>
          </div>
          <!-- 评价 -->
          <!-- 详情 -->
          <div class="good-detail-images">
            <img
              v-for="item in goodInfo.detailImgs"
              :key="item"
              :src="item"
              alt="详情图片"
              class="good-detail-images-img"
            >
          </div>
        </div>
      </template>
    </parallax>

    <!-- 商品导航 -->
    <div class="good-detail-action">
      <van-goods-action class="z-index-4">
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
import Parallax from '@c/Parallax'
export default {
  name: 'GoodDetail',
  components: {
    NavBar,
    Parallax },
  data() {
    return {
      // 指示器
      current: 0,
      // 轮播图
      images: [
        require('@/assets/images/detail1.webp'),
        require('@/assets/images/detail2.webp'),
        require('@/assets/images/detail3.webp'),
        require('@/assets/images/detail4.webp')
      ],
      // 商品详情信息
      goodInfo: {},
      // 滚动距离
      scrollTopValue: 0,
      // 滚动锚点值
      ANCHOR_SCROLL_TOP: 310
    }
  },

  computed: {
    leftIconDefault() {
      return 1 - this.scrollTopValue / this.ANCHOR_SCROLL_TOP
    },
    navBarOpactity() {
      return 1 - this.leftIconDefault
    },
    navBarStyle() {
      return {
        backgroundColor: 'rgba(255, 255, 255, ' + this.navBarOpactity + ')'
      }
    }
  },

  created() {
    this.goodInfo = this.$route.params.goods
    console.log(this.goodInfo)
  },

  methods: {
    /**
     * 滑动swiper
     */
    onChangeSwiper(index) {
      this.current = index
    },
    /**
     * 返回上一页
     */
    onClickLeft() {
      this.$router.go(-1)
    },
    /**
     * 页面滚动
     */
    onScrollChange(scrollTop) {
      this.scrollTopValue = scrollTop
    }
  }
}

</script>
<style lang='less' scoped>
.good-detail{
  position: absolute;
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  &-navbar{
    &-icon{
      position:absolute;
    }
  }
  &-swiper{
    ::v-deep{
      .van-swipe__track{
          height: 750px;
      }
    }
    .my-swipe-item{
      box-sizing: border-box;
    }
    .my-swipe-img{
        width: 100%;
        height: 100%;
    }
    .custom-indicator{
      position: absolute;
        right: 5px;
        bottom: 10px;
        padding: 4px 10px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: @radiusSize;
    }
  }
  &-content{
    background: @bgColor;
  }
  &-desc{
    padding: @paddingSize;
    background-color: white;
    &-name{
      font-size: @minInfoSize;
    }
    &-wrap{
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: @minSize;
      color:#999;
    }
  }
  &-option{
    margin-top: @marginSize;
    background-color: white;
    font-size: @minInfoSize;
    display: flex;
     flex-direction: column;
    &-sku{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: @paddingSize;
      &-label{
        color: #999;
      }
      &-content{
        color: @fontColor;
      }
    }
  }
  &-images{
    font-size:0;
    margin-top: @marginSize;
    &-img{
      width: 100%;
      height: 100%;
    }
  }
  // &-action{
  //   height: 50PX;
  // }
}
</style>
