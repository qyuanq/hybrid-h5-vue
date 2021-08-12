<template>
  <div class="navbox">
    <van-swipe class="my-swipe" indicator-color="red" :loop="false">
      <van-swipe-item>
        <van-grid :border="false" :column-num="5">
          <van-grid-item v-for="nav in navboxData" :key="nav.id" :text="nav.text" :to="routerData[0]">
            <svg-icon :icon-class="nav.icon" class-name="nav-icon" />
            <span class="van-grid-text">{{ nav.text }}</span>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
      <van-swipe-item />
    </van-swipe>
  </div>
</template>

<script>
export default {

  components: {},
  data() {
    return {
      // 路由
      routerData: [
        { name: 'GoodList', params: { routerType: 'push' }}
      ],
      navboxData: [
        // [
        {
          id: 1,
          icon: 'supermarket',
          text: '京东超市'
        },
        {
          id: 2,
          icon: 'smdq',
          text: '数码电器'
        },
        {
          id: 3,
          icon: 'fs',
          text: '京东服饰'
        },
        {
          id: 4,
          icon: 'sx',
          text: '京东生鲜'
        },
        {
          id: 5,
          icon: 'dj',
          text: '京东到家'
        },
        {
          id: 6,
          icon: 'supermarket',
          text: '京东超市'
        },
        {
          id: 7,
          icon: 'smdq',
          text: '数码电器'
        },
        {
          id: 8,
          icon: 'fs',
          text: '京东服饰'
        },
        {
          id: 9,
          icon: 'sx',
          text: '京东生鲜'
        },
        {
          id: 10,
          icon: 'dj',
          text: '京东到家'
        }
        // ],
        // []
      ]
    }
  },

  methods: {}
}

</script>
<style lang='less' scoped>
.van-grid-text{
    margin-top: 5PX;
    font-size: 12PX;
}
.my-swipe{
  ::v-deep{
    .van-grid-item__content{
      background-color: @bgColor;
      padding: 16PX 8PX;
    }
    .van-swipe__track{
        height: 160PX;
    }
    .van-swipe__indicators{
      bottom: 8PX;
    }
    .van-swipe__indicator{
      width: 12px;
      height: 12px;
    }
  }
  .nav-icon{
    width: 30PX;
    height: 30PX;
  }
}
</style>
