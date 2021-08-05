<template>
  <div class="login">
    <nav-bar right-text="按钮" @click-left="onBack">
      <template v-slot:left>
        <svg-icon icon-class="close" />
      </template>
    </nav-bar>
    <div class="login-content">
      <div class="login-content-img">
        <img src="" alt="">
      </div>
      <van-form class="login-content-form" @submit="onSubmit">
        <van-field
          v-model="country"
          name="country"
          label="国家/地区"
          right-icon="arrow"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="tel"
          type="tel"
          name="密码"
          label="手机"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-if="loginType === 'pawcode'"
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="login-content-form-agree">
          <van-checkbox v-model="checked" />
          <p class="login-content-form-agree-text">
            {{ loginType === 'smscode' ? '未注册的手机号验证后将自动创建账号，登录及代表您已同意':'登录即代表您已同意' }}
            <span class="login-content-form-agree-text-agreement">《隐私政策》</span>
          </p>
        </div>
        <van-button round block type="info" native-type="submit" class="login-content-form-btn">登录验证码</van-button>
      </van-form>
      <div class="login-content-reg">
        <span class="login-content-reg-text" @click="onNewRegister">新用户注册</span>
        <span class="login-content-reg-text" @click="changeLoginType">{{ loginType === 'smscode' ? '账号密码登录':'短信验证码登录' }}</span>
        <span v-if="loginType === 'pawcode'" class="login-content-reg-text" @click="onForgetPwd">忘记密码</span>
      </div>
      <div class="login-content-other">
        <van-divider>其他登录方式</van-divider>
        <div class="login-content-other-icon">
          <svg-icon icon-class="vx" class-name="svg" />
          <svg-icon icon-class="qq" class-name="svg" />
        </div>
      </div>
    </div>
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
      country: '',
      // 手机号
      tel: '',
      // 登陆方式 短信验证码smscode 密码 pawcode
      loginType: 'smscode',
      checked: true
    }
  },

  computed: {},

  methods: {
    /**
     * 提交
     */
    onSubmit() {

    },
    /**
     * 关闭当前页
     */
    onBack() {
      this.$router.go(-1)
    },
    /**
     * 切换登录方式
     */
    changeLoginType() {
      if (this.loginType === 'smscode') {
        this.loginType = 'pawcode'
        return
      }
      this.loginType = 'smscode'
    },
    /**
     * 跳转新用户
     */
    onNewRegister() {
      this.$router.push({
        name: 'Register'
      })
    }
    /**
     * 跳转忘记密码
     */
    // onForgetPwd(){
    //   this.$router.push({
    //     name: ''
    //   })
    // }
  }
}

</script>
<style lang='less' scoped>
.login{
  height: 100%;
  overflow: hidden;
  &-content{
    padding: 0 @paddingSize;
    height: 100%;
    position: relative;
    &-form{
      &-btn{
        margin-top: @marginSize;
      }
      &-agree{
        display: flex;
        align-items: center;
        margin-top: @marginSize;
        .van-checkbox{
          overflow: initial;
        }
        &-text{
          margin-left: @marginSize;
          flex-grow: 1;
          font-size: @minInfoSize;
          text-align: left;
          line-height: 1.5;
          &-agreement{
            color: royalblue;
          }
        }
      }
    }
    &-reg{
      margin-top: 40px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: @minInfoSize;
      color: @textHintColor;
    }
    &-other{
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 150px;
      &-icon{
        display: flex;
        justify-content: space-around;
        align-items: center;
        .svg{
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}
</style>
