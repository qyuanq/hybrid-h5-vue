<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
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
      transitionName: 'fold-left',
      // 只有名称匹配的组件会被缓存
      keepAliveNames: [
        'Home'
      ]
    }
  },
  watch: {
    // 监听路由变化，判断执行前进 or 后退 动画
    '$route'(to, from) {
      const routerType = to.params.routerType
      if (routerType === 'push') {
        this.keepAliveNames.push(to.name)
        console.log(this.keepAliveNames)
        this.transitionName = 'fold-left'
      } else {
        this.keepAliveNames.pop()
        console.log(this.keepAliveNames)
        this.transitionName = 'fold-right'
      }
    }
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
