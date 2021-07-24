<template>
  <div class="good-list-page">
    <nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-dropdown-menu :overlay="overlay">
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        @open="openOption1"
        @close="closeOption1"
      />
      <van-dropdown-item title="包邮" />
      <van-dropdown-item title="筛选" />
    </van-dropdown-menu>

    <div class="good-list-page-content" />
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
export default {
  components: { NavBar },
  data() {
    return {
      overlay: false,
      value1: 0,
      option1: [
        {
          text: '综合',
          value: 0
        },
        {
          text: '最新上架',
          value: 1
        },
        {
          text: '价格最低',
          value: 2
        },
        {
          text: '价格最高',
          value: 3
        }
      ]
    }
  },

  computed: {},

  methods: {
    /**
     * 返回上一层
     */
    onClickLeft() {
      this.$router.go(-1)
    },
    /**
     * 打开一个菜单
     */
    openOption1() {
      this.overlay = true
    },
    /**
     * 关闭一个菜单
     */
    closeOption1() {
      this.overlay = false
    }
  }
}
</script>
<style lang="less" scoped>
.good-list-page{
  &-content{
    display: flex;
    flex-direction: column;
  }
}
</style>
