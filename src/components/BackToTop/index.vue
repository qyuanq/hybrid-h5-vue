<template>
  <div class="backtotop">
    <svg-icon icon-class="backtotop" @click="toTop" />
  </div>
</template>

<script>
export default {

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  methods: {
    toTop() {
      document.body.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

</script>
<style lang='less' scoped>
</style>
