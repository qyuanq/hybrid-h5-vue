<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="keepAliveNames">
        <router-view />
      </keep-alive>
    </transition>
    <!-- 底部导航 -->

  </div>
</template>
<script>

export default {
  name: 'App',
  data() {
    return {
      // transition name
      transitionName: '',
      // 只有名称匹配的组件会被缓存
      keepAliveNames: [
        'Main'
      ]
    }
  },
  watch: {
    // 监听路由变化，判断执行前进 or 后退 动画
    '$route'(to, from) {
      if (to.params.clearTask) {
        // 初始化虚拟任务栈
        this.virtualTaskStack = ['Main']
        return
      }
      const routerType = to.params.routerType
      if (routerType === 'push') {
        this.keepAliveNames.push(to.name)
        this.transitionName = 'fold-left'
      } else {
        this.keepAliveNames.pop()
        this.transitionName = 'fold-right'
      }
    }
  },
  created() {
    this.$store.commit('setIsIphoneX', window.isIphoneX)
    console.log('iphonex', window.isIphoneX, this.$store.state.isIphoneX)
  }
}
</script>

<style lang="less">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  width: 100%;
  height:100%;
  //push页面时： 新页面进入动画
  .fold-left-enter-active{
    animation-name: fold-left-in;
    animation-duration: .4s;
  }
  @keyframes fold-left-in{
    0% {
      transform: translate(100%,0);
    }
    100%{
      transform: translate(0,0);
    }
  }
  //push页面时： 原页面退出动画
  .fold-left-leave-active{
    animation-name: fold-left-out;
    animation-duration: .4s;
  }
  @keyframes fold-left-out{
    0% {
      transform: translate(0,0);
    }
    100%{
      transform: translate(-100%,0);
    }
  }
  //后退页面时： 即将展示页面的动画
  .fold-right-enter-active{
    animation-name: fold-right-in;
    animation-duration: .4s;
  }
  @keyframes fold-right-in{
    0% {
      transform: translate(-100%,0);
    }
    100%{
      transform: translate(0,0);
    }
  }
  //后退页面时： 后退页面的动画
  .fold-right-leave-active{
    animation-name: fold-right-out;
    animation-duration: .4s;
  }
  @keyframes fold-right-out{
    0% {
      transform: translate(0,0);
    }
    100%{
      transform: translate(100%,0);
    }
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
