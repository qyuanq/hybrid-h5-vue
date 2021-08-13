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
    <van-form>
      <van-field
        v-model="tel"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="rules.tel"
      />
      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :rules="rules.sms"
      >
        <template #button>
          <van-button :disabled="disabled" size="small" type="primary" @click="sendVerifyCode">{{ codeText }}</van-button>
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
      sms: '',
      // 校验规则
      rules: {
        tel: [
          { required: true, message: '请填写手机号' },
          { pattern: /[1][3,4,5,6,7,8][0-9]{9}$/, message: '请填写正确手机格式' }
        ],
        sms: [{ required: true, message: '请填写验证码' }]
      },
      // 倒计时
      countDown: 0
    }
  },

  computed: {
    // 验证码文字
    codeText() {
      if (this.countDown > 0) {
        return '倒计时' + this.countDown + '秒'
      }
      return '发送验证码'
    },
    // 发送验证码是否禁用
    disabled() {
      // 倒计时>0 手机号为空/手机号不正确
      if (this.countDown > 0 || !this.tel || !(/[1][3,4,5,6,7,8][0-9]{9}$/.test(this.tel))) {
        return true
      }
      return false
    }
  },

  methods: {
    /**
     * 返回
     */
    onBack() {
      this.$router.go(-1)
    },
    /**
     * 发送短信验证码
     */
    sendVerifyCode() {
      // 判断手机号是否正确
      // @todo  发送验证码请求
      this.countDown = 60
      const timer = setInterval(() => {
        this.countDown--
        if (this.countDown === 0) {
          // 清除定时器
          clearInterval(timer)
        }
      }, 1000)
    },
    /**
     * 注册
     */
    onRegister() {
      // @todo 发送验证请求  1.验证短信验证码是否正确

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
