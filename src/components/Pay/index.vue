<!--
  @name: 支付方式组件
-->
<template>
  <div class="pay">
    <van-radio-group v-model="radio">
      <div
        v-for="item in contentData"
        :key="item.radio"
        class="pay-cell"
        @click="onRadio(item.radio)"
      >
        <div class="pay-cell-content">
          <svg-icon :icon-class="item.icon" class-name="pay-cell-content-icon" />
          <div class="pay-cell-content-text">
            <p class="pay-cell-content-text-title">
              {{ item.text }}
            </p>
            <p class="pay-cell-content-text-desc">
              {{ item.desc }}
            </p>
          </div>
        </div>
        <van-radio :name="item.radio" />
      </div>
    </van-radio-group>

  </div>
</template>

<script>
export default {

  components: {},
  data() {
    return {
      // 单选
      radio: '1',
      contentData: [
        {
          icon: 'wxpay',
          text: '微信支付',
          desc: '亿万用户选择，更快更安全',
          radio: '1'
        },
        {
          icon: 'zfb',
          text: '支付宝支付',
          desc: '数亿用户都在用，安全可托付',
          radio: '2'
        }
      ]
    }
  },

  computed: {},

  methods: {
    /**
     * 切换radio
     */
    onRadio(radioName) {
      this.radio = radioName
    }
  }
}

</script>
<style lang='less' scoped>
.pay{
  background-color: white;
  &-cell{
    border-bottom: 1px solid @lineColor;
    padding: @paddingSize;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content{
      display: flex;
      align-items: center;
      &-icon{
        width: 50px;
        height: 50px;
      }
      &-text{
        margin-left: 20px;
        text-align: left;
        line-height: 1.5;
        &-title{
          font-size: @infoSize;
          font-weight: 700;
        }
        &-desc{
          font-size: @minSize;
          color: @textHintColor;
        }
      }
    }
  }
}
</style>
