<!--
  @name: 商品展示组件
-->
<template>
  <div :class="['goods',layoutClass]" :style="{height: goodsViewHeight}">
    <div
      v-for="(item,index) in sortGoodsData"
      :key="item.id"
      ref="goodsItem"
      :class="['goods-item',layoutItemClass]"
      :style="goodsItemStyles[index]"
      @click="onGoodDetail(item)"
    >
      <img :src="item.picture" alt="" class="goods-item-img" :style="imgStyles[index]">
      <div class="goods-item-desc">
        <p class="goods-item-desc-name">
          <span class="text-line-2">
            <van-tag v-if="item.proprietary" type="danger">自营</van-tag>
            <van-tag v-if="item.stock === 0" color="#999">缺货</van-tag>
            {{ item.desc }}
          </span>
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price"><em>￥</em>{{ item.price | priceValue }}</p>
          <p class="goods-item-desc-data-volume">销量:{{ item.volume }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    /**
     * 在父元素中指定展示形式
     * 1.垂直列表
     * 2.网格布局
     * 3.瀑布流布局
     */
    layoutType: {
      type: String,
      default: '1'
    },
    // 排序方式
    sort: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      // 数据源
      dataSource: [],
      // 最大高度
      MAX_IMG_HEIGHT: 353,
      // 最小高度
      MIN_IMG_HEIGHT: 300,
      // item图片样式集合
      imgStyles: [],
      // item margin高度
      MARGIN_HEIGHT: 8,
      // item样式集合
      goodsItemStyles: [],
      // goods组件高度
      goodsViewHeight: 0,
      // 不同展示形式下的类名,默认垂直列表
      // 垂直列表   goods-list goods-list-item
      // 网格布局   goods-grid goods-grid-item
      // 瀑布流布局 goods-waterfall  goods-waterfall-item
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item',
      sortGoodsData: []
    }
  },

  watch: {
    layoutType() {
      this.initLayout()
    },
    sort() {
      this.setSortGoodsData()
    }
  },

  async created() {
    await this.initData()
  },

  methods: {
    /**
       * 获取数据
       */
    async initData() {
      const res = await this.$axios.get('/api/goods')
      this.dataSource = res.data
      // 商品排序
      this.setSortGoodsData()
      // 设置布局
      this.initLayout()
    },
    /**
     * 商品排序
     */
    setSortGoodsData() {
      switch (this.sort) {
        case '1':
          // 深拷贝，不改变原数组
          this.sortGoodsData = this.dataSource.slice(0)
          break
        // 自营
        case '1-2':
          this.getSortGoodsDataFromKey('proprietary')
          break
        // 价格最低
        case '1-3':
          this.getSortGoodsDataFromKey('price', 'low')
          break
        // 价格最高
        case '1-4':
          this.getSortGoodsDataFromKey('price', 'high')
          break
        // 销量
        case '2':
          this.getSortGoodsDataFromKey('volume')
          break
        // 有货优先
        case '3':
          this.getSortGoodsDataFromKey('stock')
          break
      }
    },

    /**
     * 根据传入的key进行由大到小排序
     * 返回 负数 ， 表示 goods1 在 goods2 之前，
     * 返回正数， 表示 goods1 在 goods2 之后，
     * 返回 0， 顺序不变
     */
    getSortGoodsDataFromKey(key, highAndLow = '') {
      return this.sortGoodsData.sort((goods1, goods2) => {
        const v1 = goods1[key]
        const v2 = goods2[key]
        if (highAndLow !== '') {
          console.log(highAndLow)
          // 判断价格高低
          if (highAndLow === 'high') {
            return v2 - v1
          } else if (highAndLow === 'low') {
            return v1 - v2
          }
        }

        // 判断是否有货或自营
        if (v1 === 1) {
          return -1
        }
        if (v2 === 1) {
          return 1
        }
        if (v1 === 0 && v2 === 0) {
          return 0
        }

        // 销量
        return v2 - v1
      })
    },
    /**
     * 返回随机图片高度
     */
    imgHeight() {
      // 生成0-1随机数 * (高度区间:最大高度 - 最小高度) + 最低的图片高度
      return Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT)
    },
    /**
     * 根据随机图片高度生成对应的图片样式数据
     */
    initImgStyles: function() {
      this.dataSource.forEach(item => {
        const imgHeight = this.imgHeight() + 'px'
        this.imgStyles.push({
          height: imgHeight
        })
      })
    },
    /**
     * 瀑布流布局
     * 1.获取所有item元素
     * 2.遍历item元素，得到每一个item的高度，加上一个margin的高度
     * 3.创建两个变量：leftHeightTotal,rightHeightTotal分别表示左右两侧目前距离顶部的高度
     * 通过对于左右两侧距离顶部的高度，来确定item 放置位置
     * 如果左侧小于等于右侧高度，那么item就应该放置到左侧,此时距离左侧为0，距离顶部为leftHeight
     * 否则item放置到右侧，此时距离右侧为0，距离顶部rightHeight
     * 4.保存计算出的item所有样式，配置到item上
     * 5.item配置完成之后，对比左右两侧最大高度，最大高度为goods组件的高度
     */
    initWaterfall() {
      // 获取到所有的item元素
      const goodsItem = this.$refs.goodsItem
      if (!goodsItem) return
      // 左右两侧距离顶部的高度
      let leftHeightTotal = 0
      let rightHeightTotal = 0
      let goodsItemStyle = {}
      goodsItem.forEach((el, index) => {
        const elHeight = el.clientHeight + this.MARGIN_HEIGHT
        if (leftHeightTotal <= rightHeightTotal) {
        // 设置样式
          goodsItemStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          // 更新左侧距离顶部的高度
          leftHeightTotal += elHeight
        } else {
          goodsItemStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }
          rightHeightTotal += elHeight
        }
        this.goodsItemStyles.push(goodsItemStyle)
      })
      this.goodsViewHeight = (leftHeightTotal >= rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
    },
    /**
     * 设置不同布局，为不同的layoutType设定不同的展示形式
     * goodsViewHeight -> 垂直布局、网格布局(100%)
     */
    initLayout() {
      this.goodsViewHeight = '100%'
      this.goodsItemStyles = []
      this.imgStyles = []
      // 为不同的layoutType 设置不同的展示类
      switch (this.layoutType) {
        // 垂直布局
        case '1':
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        // 网格布局
        case '2':
          this.layoutClass = 'goods-grid'
          this.layoutItemClass = 'goods-grid-item'
          break
        case '3':
          this.layoutClass = 'goods-waterfall'
          this.layoutItemClass = 'goods-waterfall-item'
          this.initImgStyles()
          this.$nextTick(() => {
            this.initWaterfall()
          })
          break
      }
    },
    /**
     * 跳转商品详情页
     */
    onGoodDetail(item) {
      this.$router.push({
        name: 'GoodDetail',
        params: {
          goods: item.id,
          routerType: 'push'
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
.goods{
    position: relative;
    margin-top: 8PX;
    // margin-bottom: 44PX;
    overflow: hidden;
    overflow-y: auto;
    &-item{
       background-color: white;
       padding: @paddingSize;
       box-sizing: border-box;
       &-desc{
           width: 100%;
           &-name{
               font-size: @minInfoSize;
               line-height: 1.5;
           }
           &-data{
               width: 100%;
               display: flex;
               align-items: center;
               justify-content: space-between;
               margin-top: @marginSize;
               &-price{
                   font-size: @minInfoSize;
                   color: @mainColor;
               }
               &-volume{
                  font-size: @minInfoSize;
               }
           }
       }
    }
}
//垂直列表
.goods-list{
  &-item{
    display: flex;
    border-bottom: 1px solid @lineColor;
    .goods-item-img{
      min-width: 120px;
      height: 120px;
    }
    .goods-item-desc{
      margin-left: 10px;
    }
  }
}
//网格布局
.goods-grid{
  margin: @marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item{
    width: 49%;
    border-radius: @radiusSize;
    margin-bottom: @marginSize;
    .goods-item-img{
      width: 100%;
    }
    .goods-item-desc{

    }
  }
}
//瀑布流布局
.goods-waterfall{
  &-item{
    width: 49%;
    position: absolute;
    border-radius: @radiusSize;
    .goods-item-img{
      width: 100%;
    }
  }
}
</style>
