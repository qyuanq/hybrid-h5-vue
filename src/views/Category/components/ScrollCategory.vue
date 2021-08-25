<!--
  滚动分类组件
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
          :class="index === currentIndex && isChange ? 'menu-wrapper-item-active' : ''"
          @click="changeCate(index)"
        >{{ item.name }}</li>
      </ul>
    </div>
    <div ref="contentWrapper" class="content-wrapper">
      <div class="content-wrapper-bg">
        <div v-for="content in categoryGood" :key="content.name" ref="content">
          <h4 class="content-wrapper-name">{{ content.name }}</h4>
          <div class="content-wrapper-items">
            <div
              v-for="item in content.content"
              :key="item.id"
              class="content-wrapper-item"
            >
              <div class="content-wrapper-item-img">
                <img :src="item.picture" :alt="item.name">
              </div>
              <p class="content-wrapper-item-name">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

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
    }
  },
  data() {
    return {
      // 内容滚动值
      scrollY: 0,
      // 内容模块高度值
      listHeight: [],
      isChange: true
    }
  },

  computed: {
    // 菜单id
    cateId() {
      if (this.categoryMenu.length === 0) {
        return 1
      }
      return this.categoryMenu[this.currentIndex].id
    },
    // 滚动关联选中菜单项索引
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (this.scrollY < height1) {
          return 0
        }
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i + 1
        }
      }
      return 0
    }
  },
  watch: {
    categoryGood() {
      this.$nextTick(() => {
        this.initData()
      })
    },
    currentIndex(n, o) {
      const el = this.$refs.menuItem[n]
      this.menuScroll.scrollToElement(el, 300)
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
          probeType: 3,
          click: true,
          scrollY: true,
          tap: true,
          mouseWheel: true
        })

        // 监听内容区域滚动
        this.contentWrapper.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
          console.log(this.scrollY)
        })

        this.contentWrapper.on('scrollEnd', () => {
          this.isChange = true
        })
      } else {
        this.contentWrapper.refresh()
      }
      // 获取内容高度
      this.calculateHeight()
    },
    // 计算内容各个模块高度列表
    calculateHeight() {
      let height = 0
      const listHeight = this.$refs.content
      if (!listHeight) return
      listHeight.forEach(item => {
        height += item.clientHeight
        this.listHeight.push(height)
      })
    },
    // 切换分类
    changeCate(cateIndex) {
      this.isChange = false
      // 滚动到对应菜单位置
      const el = this.$refs.menuItem[cateIndex]
      this.menuScroll.scrollToElement(el, 300)
      // 滚动到对应内容位置
      const elC = this.$refs.content[cateIndex]
      this.contentWrapper.scrollToElement(elC)
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
