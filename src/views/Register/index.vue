<template>
  <div class="register">
    <nav-bar
      class="register"
      title="手机快速注册"
      right-text="企业注册"
      left-arrow
      @click-left="onBack"
    />
    <div class="register-img">
      <img src="" alt="">
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="tel"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <van-button round block type="info" native-type="submit">注册</van-button>
    </van-form>
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
export default {

  components: {
    NavBar
  },
  data() {
    return {
    }
  },

  computed: {},

  methods: {
    /**
     * 返回
     */
    onBack() {
      this.$router.go(-1)
    }
  }
}

</script>
<style lang='less' scoped>
</style>
