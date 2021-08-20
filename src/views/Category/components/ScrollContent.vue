<!--
  滚动分类组件 分页加载
-->
<template>
  <div class="scroll-category">
    <div ref="menuWrapper" class="menu-wrapper">
      <ul>
        <li
          v-for="(item,index) in categoryMenu"
          ref="menuItem"
          :key="item.id"
          class="menu-wrapper-item"
          :class="index === cateActive ? 'menu-wrapper-item-active' : ''"
          @click="changeCate(index)"
        >{{ item.name }}</li>
      </ul>
    </div>
    <div ref="contentWrapper" class="content-wrapper">
      <div class="content-wrapper-bg">
        <h4 class="content-wrapper-name">{{ categoryName }}</h4>
        <div class="content-wrapper-items">
          <div
            v-for="item in categoryGood"
            :key="item.id"
            class="content-wrapper-item"
          >
            <div class="content-wrapper-item-img">
              <img :src="item.picture" :alt="item.name">
            </div>
            <p class="content-wrapper-item-name">{{ item.name }}</p>
          </div>
        </div>
        <div class="content-wrapper-tips">
          <van-loading v-if="isPullUpLoad" size="24px">加载中...</van-loading>
          <van-divider v-if="isNotData">到底了，看看别的分类吧</van-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'

BScroll.use(PullUp)
BScroll.use(PullDown)
export default {
  components: {},
  props: {
    // 分类菜单
    categoryMenu: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 分类商品
    categoryGood: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 商品总数
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 分类选中项
      cateActive: 0,
      page: 1,
      pageSize: 20,
      // 加载中
      isPullUpLoad: false
    }
  },

  computed: {
    // 菜单id
    cateId() {
      if (this.categoryMenu.length === 0) {
        return 1
      }
      return this.categoryMenu[this.cateActive].id
    },
    categoryName() {
      if (this.categoryMenu.length === 0) {
        return ''
      }
      return this.categoryMenu[this.cateActive].name
    },
    // 是否加载完成
    isNotData() {
      return this.categoryGood.length === this.total
    }
  },
  watch: {
    categoryGood() {
      this.$nextTick(() => {
        this.initData()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initData()
    })
  },

  methods: {
    // 初始化分类滚动列表
    initData() {
      if (!this.menuScroll) {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          probeType: 3, // 实时监听scroll
          click: true,
          scrollY: true,
          tap: true,
          mouseWheel: true
        })
      } else {
        // 刷新
        this.menuScroll.refresh()
      }

      if (!this.contentWrapper) {
        this.contentWrapper = new BScroll(this.$refs.contentWrapper, {
          pullUpLoad: { // 下拉加载
            threshold: 50
          },
          // pullDownRefresh: true, // 上拉刷新
          probeType: 3,
          click: true,
          scrollY: true,
          tap: true,
          mouseWheel: true
        })
        // 监听上拉加载
        this.contentWrapper.on('pullingUp', this.pullUpLoad)

        // 监听下拉刷新
        // this.contentWrapper.on('pullingDown', this.pullingDown)
      } else {
        this.contentWrapper.refresh()
      }
    },
    // 切换分类
    changeCate(cateIndex) {
      this.cateActive = cateIndex
      // 滚动到对应菜单位置
      const el = this.$refs.menuItem[this.cateActive]
      this.menuScroll.scrollToElement(el, 300)

      // 内容回到开始位置
      this.contentWrapper.scrollTo(0, 0)

      // 请求内容
      this.$emit('changeCate', this.cateId)
      this.page = 1
    },
    // 上拉加载
    pullUpLoad() {
      console.log('上拉加载', this.categoryGood.length, this.total)
      if (this.isNotData) {
        this.contentWrapper.finishPullUp()
        return
      }
      this.isPullUpLoad = true
      // 请求
      this.page++
      this.$emit('pullUpLoad', { cateId: this.cateId, page: this.page, pageSize: this.pageSize }, () => {
        this.contentWrapper.finishPullUp()
        this.isPullUpLoad = false
      })
    },
    // 下拉刷新
    pullingDown() {
      console.log('上拉刷新')
      // @todo  请求数据

      this.contentWrapper.finishPullDown()
    }
  }
}

</script>
<style lang='less' scoped>
.scroll-mixin(){
  overflow: hidden;
  // overflow-y: auto;
  // -webkit-overflow-scrolling: touch;
  // scrollbar-width: none; /* firefox */
  // -ms-overflow-style: none; /* IE 10+ */
  // &::-webkit-scrollbar {
  //   display: none; /* Chrome Safari */
  // }
}
.scroll-category{
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  .menu-wrapper{
    min-width: 85PX;
    height: 100%;
    // position: absolute;
    // top:0;
    // left:0;
    // overflow: hidden;
    &-item{
      width: 100%;
      height: 46PX;
      line-height: 46PX;
      font-size: 14PX;
      background-color: #f8f8f8;
      &-active{
        color: #e93b3d;
        background: #fff;
      }
    }
  }
  .content-wrapper{
    height: 100%;
    background-color: #fff;
    flex-grow: 1;
    &-bg{
      padding-bottom: 20px;
      box-sizing: border-box;
    }
    &-name{
      font-size: @infoSize;
      text-align: left;
      font-weight: 700;
      padding-top: @paddingSize;
    }
    &-items{
      padding: 0 @paddingSize;
      box-sizing: border-box;
      margin-top: @marginSize;
      display: flex;
      // justify-content: space-around;
      align-content: center;
      flex-wrap: wrap;
    }
    &-item{
      width: 33.3333333%;
      &-img{
        width: 160px;
        height: 160px;
        img{
          width: 100%;
        }
      }
      &-name{
        font-size: @minInfoSize;
      }
    }
  }
}
</style>
