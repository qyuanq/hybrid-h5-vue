<!--
  首页骨架屏
-->
<template>
  <div class="skeleton">
    <content-loader
      :width="375"
      :height="836"
      :speed="1"
      primary-color="#f3f3f3"
      secondary-color="#ecebeb"
    >
      <rect x="14" y="27" rx="5" ry="5" width="100" height="20" />
    </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {

  components: {
    ContentLoader
  },
  data() {
    return {
    }
  },

  methods: {}
}

</script>
<style lang='less' scoped>
</style>
