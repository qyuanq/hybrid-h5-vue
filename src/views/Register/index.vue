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
      <van-button round block type="info" native-type="submit" @click="onRegister">注册</van-button>
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
      // 电话
      tel: '',
      // 验证码
      sms: ''
    }
  },

  computed: {},

  methods: {
    /**
     * 返回
     */
    onBack() {
      this.$router.go(-1)
    },
    /**
     * 注册
     */
    onRegister() {
      // 1.表单验证
      // 手机号输入格式正确； 验证短信是否正确

      // 2.与native交互
      if (window.androidJSBridge) { // 调用android提供给web端的方法
        this.onRegisterToAndroid()
      } else if (window.webkit) { // ios
        this.onRegisterToIos()
      }
    },
    /**
     * 调用android注册方法
     * 只能接收基本数据类型
     * 如果是引用类型 JSON.stringify(Object)   转成 string 传参
     * 可以直接接收返回值
     */
    onRegisterToAndroid() {
      const params = JSON.stringify({
        'tel': this.tel
      })
      const result = window.androidJSBridge.register(params)
      this.onRegisterCallback(result)
    },
    /**
     * 调用ios注册方法
     * 可以接收object数据和基本数据类型
     * 接收返回值是以回调函数形式
     */
    onRegisterToIos() {
      const params = {
        'tel': this.tel
      }
      // ios 回调函数 要在调用函数前
      window.registerCallback = this.onRegisterCallback
      window.webkit.messageHandlers.register.postMessage(params)
    },
    /**
     * 注册方法回调
     */
    onRegisterCallback(result) {
      if (result) {
        this.$notice({
          type: 'success',
          message: '注册成功'
        })
        this.$router.push({
          name: 'Login'
          // params:{
          //   router
          // }
        })
      } else {
        this.$notice({
          type: 'danger',
          message: '注册失败'
        })
      }
    }
  }
}

</script>
<style lang='less' scoped>
</style>
