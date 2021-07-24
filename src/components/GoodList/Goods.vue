<template>
  <div class="goods" :style="{height: goodsViewHeight}">
    <div
      v-for="(item,index) in dataSource"
      :key="item.id"
      ref="goodsItem"
      class="goods-item"
      :style="goodsItemStyles[index]"
    >
      <img :src="item.picture" alt="" class="goods-item-img" :style="imgStyles[index]">
      <div class="goods-item-desc">
        <p class="goods-item-desc-name">
          <span class="text-line-2">
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
      goodsViewHeight: 0
    }
  },

  async created() {
    await this.initData()
    // this.initImgStyles()
    this.$nextTick(() => {
      this.initWaterfall()
    })
  },

  methods: {
    /**
       * 获取数据
       */
    async initData() {
      const res = await this.$axios.get('/api/goods')
      this.dataSource = res.data
      console.log(res)
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
    }
  }
}

</script>
<style lang='less' scoped>
.goods{
    position: relative;
    margin-top: 8PX;
    margin-bottom: 44PX;
    &-item{
       background-color: white;
       padding: @paddingSize;
       box-sizing: border-box;
       position: absolute;
       width: 49%;
       border-radius: @radiusSize;
       &-img{
           width: 100%;
           height: 360px;
       }
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
</style>
