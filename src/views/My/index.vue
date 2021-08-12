<template>
  <div ref="my" class="my" @scroll="changeScroll">
    <nav-bar
      :nav-bar-style="navBarStyle"
      :fixed="true"
      title="个人中心"
      right-text="设置"
      @click-right="onSet"
    />
    <div class="my-content">
      <div :class="['my-content-header',{'my-content-header-iphoneX':$store.state.isIphoneX}]">
        <div class="user-info">
          <div class="user-info-content">
            <div class="user-info-content-icon">
              <img src="https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png" alt="用户头像">
            </div>
            <div class="user-info-content-desc">
              <div class="desc-name">
                jd_79a14cabc6e8d
              </div>
              <div class="desc-label">
                <span class="desc-label-text">京享值</span>
                <span class="desc-label-text">小白信用97.0></span>
              </div>
            </div>
          </div>
          <div class="user-info-set" @click="onSet">
            <svg-icon icon-class="setting" class-name="icon" />
          </div>
        </div>
        <div class="xlist_group">
          <div class="xlist_group-item">
            <p class="xlist_group-item-num">6</p>
            <p class="xlist_group-item-text">商品收藏</p>
          </div>
          <div class="xlist_group-item">
            <p class="xlist_group-item-num">22</p>
            <p class="xlist_group-item-text">店铺收藏</p>
          </div>
          <div class="xlist_group-item">
            <p class="xlist_group-item-num">2</p>
            <p class="xlist_group-item-text">我的足迹</p>
          </div>
        </div>
      </div>
      <div class="my-content-order">
        <div class="order-group">
          <div class="order-group-item">
            <svg-icon icon-class="dfk" class-name="order-group-item-icon" />
            <span class="order-group-item-text">待付款</span>
          </div>
          <div class="order-group-item">
            <svg-icon icon-class="dsh" class-name="order-group-item-icon" />
            <span class="order-group-item-text">待收货</span>
          </div>
          <div class="order-group-item">
            <svg-icon icon-class="sh" class-name="order-group-item-icon" />
            <span class="order-group-item-text">售后</span>
          </div>
          <div class="order-group-item">
            <svg-icon icon-class="dd" class-name="order-group-item-icon" />
            <span class="order-group-item-text">全部订单</span>
          </div>
        </div>
        <receiving-info />
      </div>
      <van-divider>为您推荐</van-divider>
      <goods layout-type="2" />
    </div>
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
import ReceivingInfo from './components/ReceivingInfo'
import Goods from '@c/GoodList/Goods'
export default {
  name: 'My',
  components: {
    NavBar,
    ReceivingInfo,
    Goods
  },
  data() {
    return {
      // 滚动距离
      scrollTopValue: -1,
      // 滚动锚点值
      ANCHOR_SCROLL_TOP: 15
    }
  },

  computed: {
    navBarStyle() {
      return {
        left: 0,
        top: this.scrollTopValue >= this.ANCHOR_SCROLL_TOP ? 0 : '-110px'
      }
    }
  },

  activated() {
    // 组件被激活时，页面滚动值为最后滚动的位置
    this.$refs.my.scrollTop = this.scrollTopValue
  },

  methods: {
    /**
     * 跳转账户设置
     */
    onSet() {
      this.$router.push({
        name: 'UserSet',
        params: {
          routerType: 'push'
        }
      })
    },
    /**
     * 发生滚动
     */
    changeScroll(event) {
      this.scrollTopValue = event.target.scrollTop
    }
  }
}

</script>
<style lang='less' scoped>
.my{
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  ::v-deep{
    .van-nav-bar__text{
      color: #333;
    }
  }
  &-content{
    padding-bottom: calc(100px + constant(safe-area-inset-bottom));
    padding-bottom: calc(100px + env(safe-area-inset-bottom));
    &-header{
      width: 100%;
      padding-top: @statusBarHeight;
      padding-bottom: 60px;
      background: url('../../assets/images/mybg.png') no-repeat scroll 0 0/cover;
      &-iphoneX{
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
      }
      .user-info{
        padding: @paddingSize;
        display: flex;
        justify-content: space-between;
        &-content{
          display: flex;
          &-icon{
            width: 100px;
            height: 100px;
            img{
              width: 100%;
            }
          }
          &-desc{
            width: 290px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: @infoSize;
            margin-left: 20px;
            text-align: left;
            .desc-name{
              color: white;
              font-weight: 700;
            }
            .desc-label{
              display: flex;
              justify-content: space-between;
              &-text{
                display: inline-block;
                padding: 8px;
                border-radius: @radiusSize;
                color: white;
                font-size: @minInfoSize;
                background: rgba(0,0,0,.16)
              }
            }
          }
        }
        &-set{
          .icon{
            width: 40px;
            height: 40px;
          }
        }
      }
      .xlist_group{
        display: flex;
        justify-content: space-around;
        color: white;
        margin-top: 20px;
        &-item{
          &-num{
            font-size: 32px;
            font-weight: 700;
          }
          &-text{
            font-size: 24px;
            margin-top: 20px;
          }
        }
      }
    }
    &-order{
      width: 100%;
      border-radius: @radiusSize;
      background-color: white;
      margin-top: -20px;
      .order-group{
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 40px 0;
        border-bottom: 1px solid @textHintColor;
        &-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          &-icon{
            width: 50px;
            height: 50px;
          }
          &-text{
            margin-top: 10px;
            font-size: @infoSize;
          }
        }
      }
    }
  }
}
</style>
