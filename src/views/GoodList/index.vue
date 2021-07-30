<template>
  <div class="good-list-page">
    <nav-bar
      title="商品列表"
      left-arrow
      @click-left="onClickLeft"
      @click-right="changeLayout"
    >
      <template v-slot:right>
        <svg-icon :icon-class="layoutType.icon" />
      </template>
    </nav-bar>
    <DropdownMenu :options-datas="optionsDatas" @optionsChange="optionsChange" />
    <div class="good-list-page-content">
      <goods :layout-type="layoutType.type" :sort="sortId" />
    </div>
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
import DropdownMenu from '@c/DropdownMenu'
import Goods from '@c/GoodList/Goods'
export default {
  name: 'GoodList',
  components: {
    NavBar,
    DropdownMenu,
    Goods
  },
  data() {
    return {
      overlay: false,
      value1: 0,
      optionsDatas: [
        {
          id: '1',
          name: '综合',
          subs: [
            {
              id: '1',
              name: '综合'
            },
            {
              id: '1-2',
              name: '自营'
            },
            {
              id: '1-3',
              name: '价格最低'
            },
            {
              id: '1-4',
              name: '价格最高'
            }
          ]
        },
        {
          id: '2',
          name: '销量'
        },
        {
          id: '3',
          name: '有货优先'
        },
        {
          id: '4',
          name: '筛选'
        }
      ],
      // 切换布局
      layoutTypeDatas: [
        {
          type: '1',
          icon: 'list'
        },
        {
          type: '2',
          icon: 'grid'
        },
        {
          type: '3',
          icon: 'pbl'
        }
      ],
      // 选中布局
      layoutType: {},
      // 商品排序
      sortId: '1'
    }
  },

  created() {
    this.layoutType = this.layoutTypeDatas[0]
  },

  methods: {
    /**
     * 返回上一层
     */
    onClickLeft() {
      this.$router.go(-1)
    },
    /**
     * 切换布局
     */
    changeLayout() {
      if (this.layoutType.type === '1') {
        this.layoutType = this.layoutTypeDatas[1]
      } else if (this.layoutType.type === '2') {
        this.layoutType = this.layoutTypeDatas[2]
      } else {
        this.layoutType = this.layoutTypeDatas[0]
      }
    },

    /**
     * 改变排序
     */
    optionsChange(seleOption) {
      this.sortId = seleOption.id
    }
  }
}
</script>
<style lang="less" scoped>
.good-list-page{
  position: absolute;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  &-content{
    display: flex;
    flex-direction: column;
  }
}
</style>
