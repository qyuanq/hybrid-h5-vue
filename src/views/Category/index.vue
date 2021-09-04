<template>
  <div>
    <skeleton v-if="isShowLoading" />
    <div
      v-else
      ref="category"
      class="category"
    >
      <nav-bar
        class="nav-bar z-index-4"
        :fixed="true"
      >
        <template v-slot:left>
          <van-search v-model="keywords" class="van-search" placeholder="请输入搜索关键词" />
        </template>
      </nav-bar>
      <div :class="['category-content',{'category-content-iphonex': $store.state.isIphoneX}]">
        <scroll-category
          ref="scrollCategory"
          :category-menu="categoryMenu"
          :category-good="categoryGood"
        />

      <!-- <scroll-content
        :category-menu="categoryMenu"
        :category-good="categoryGood"
        :total="total"
        @changeCate="changeCate"
        @pullUpLoad="pullUpLoad"
      /> -->
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
import Skeleton from './components/Skeleton'
import ScrollCategory from './components/ScrollCategory'
// import ScrollContent from './components/ScrollContent.vue'
export default {
  name: 'Category',
  components: {
    NavBar,
    Skeleton,
    ScrollCategory
    // ScrollContent
  },
  data() {
    return {
      // 加载中 骨架屏
      isShowLoading: true,
      // 搜索关键词
      keywords: '',
      // 分类菜单
      categoryMenu: [],
      // 分类商品
      categoryGood: [],
      // 商品总数，基于ScrollContent组件
      total: 0
    }
  },

  computed: {},

  async created() {
    await this.initData()
    // 隐藏加载
    this.isShowLoading = false
  },

  methods: {
    async initData() {
      const res = await Promise.all([
        this.$axios.get('/api/category'),
        // 基于基于ScrollCategory组件 数据
        this.$axios.get('/api/category/goods/1')

        // 基于ScrollContent组件 数据
        // this.$axios.get('/api/category/1')
      ])
      const isSuccess = res.every(item => {
        if (item.code === 0) {
          return true
        }
        return false
      })
      if (isSuccess) {
        this.categoryMenu = res[0].data
        // 基于ScrollCategory组件 数据
        this.categoryGood = res[1].data._req

        // 基于ScrollContent组件 数据
        // this.categoryGood = res[1].data._req.content
        // this.total = res[1].data._req.total
      }
    },
    // 切换值
    async changeCate(event) {
      const res = await this.$axios.get(`/api/category/${event}`)
      if (res.code === 0) {
        this.categoryGood = res.data._req.content
        this.total = res.data._req.total
      } else {
        this.$toast.fail('获取数据失败')
        this.categoryGood = []
        this.total = 0
      }
    },
    // 滚动内容上拉加载
    async pullUpLoad(args, callback) {
      const res = await this.$axios.get(`/api/category/${args.cateId}?page=${args.page}&pageSize=${args.pageSize}`)
      if (res.code === 0) {
        this.categoryGood = this.categoryGood.concat(res.data._req.content)
      } else {
        this.$toast.fail('获取数据失败')
      }
      // 回调，子组件执行后续操作
      callback()
    }
  }
}

</script>
<style lang='less' scoped>
.category{
  // padding-bottom: calc(100px + constant(safe-area-inset-bottom));
  // padding-bottom: calc(100px + env(safe-area-inset-bottom));
  .nav-bar{
    ::v-deep{
      // .van-nav-bar__content{
      //   height: 44PX;
      // }
      .van-nav-bar__left{
        max-width: 90%;
        width: 90%;
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
  }
  .category-content{
    width: 100%;
    position: absolute;
    top: 92px + @statusBarHeight;
    left: 0;
    bottom: calc(100px + constant(safe-area-inset-bottom));
    bottom: calc(100px + env(safe-area-inset-bottom));
    &-iphonex{
      top: calc(92px  + constant(safe-area-inset-top));
      top: calc(92px  + env(safe-area-inset-top));
    }
  }
}
</style>
