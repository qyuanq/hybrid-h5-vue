<template>
  <div ref="main" class="main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <tool-bar
      v-model="isComponent"
    />
  </div>
</template>

<script>
import ToolBar from '@c/ToolBar'
export default {
  name: 'Main',
  components: {
    ToolBar
  },
  data() {
    return {
      isComponent: 0,
      scrollTopValue: 0
    }
  },
  activated() {
    // this.$refs.main.scrollTop = 100
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, '#/main/home')
      window.addEventListener('popstate', this.watchReturn, false)// false阻止默认事件
    }
  },
  destroyed() {
    window.removeEventListener('popstate', this.watchReturn, false)// false阻止默认事件
  },
  methods: {
    // 此方法适用于浏览器，android需要判断未退出程序成功再pushState(null, null, '#/main/home')
    watchReturn(event) {
      console.log('回退', this.isComponent, event)
      if (this.isComponent !== 0) {
        history.pushState(null, null, '#/main/home')
        this.isComponent = 0
      } else {
        // window.history.back()
        this.$router.go(-1)
      }
    }
  }
}

</script>
<style lang='less' scoped>
.main{
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
