<template>
  <div ref="main" class="main">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" /> -->
    <keep-alive>
      <component :is="isComponent" />
    </keep-alive>
    <tool-bar
      v-model="isComponent"
      @change="changeComponent"
    />
  </div>
</template>

<script>
import ToolBar from '@c/ToolBar'
export default {
  name: 'Main',
  components: {
    ToolBar,
    'home': () => import('@/views/Home'),
    'cart': () => import('@/views/Cart'),
    'my': () => import('@/views/My')
  },
  data() {
    return {
      isComponent: 'home',
      scrollTopValue: 0
    }
  },
  activated() {
    this.$refs.main.scrollTop = 100
    this.pushComponent()
  },
  methods: {
    /**
     * 切换tabbar
     */
    changeComponent(active) {
      this.isComponent = active
    },
    /**
     * 显示指定tabbar组件
     */
    pushComponent() {
      const componentName = this.$route.params.componentName
      if (!componentName) return
      this.isComponent = componentName
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
