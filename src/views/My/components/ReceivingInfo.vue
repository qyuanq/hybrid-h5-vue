<template>
  <!-- 收货信息组件 -->
  <div class="receiving-info">
    <div class="receiving-info-picture">
      <img src="http://img10.360buyimg.com/N5/jfs/t1/111023/37/16743/203855/60d91470Ea225fe2c/d285330c0978937d.jpg" alt="">
      <p class="receiving-info-picture-num">共两件</p>
    </div>
    <div class="receiving-info-desc">
      <div class="receiving-info-desc-time">
        <p class="state">配送中 <span class="timer">{{ '时间' }}</span></p>
      </div>
      <div class="receiving-info-desc-adress">[长沙市] 快件已发车</div>
    </div>
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

  methods: {}
}

</script>
<style lang='less' scoped>
.receiving-info{
  display: flex;
  padding: @paddingSize;
  &-picture{
    width: 80px;
    height: 80px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    img{
      width: 100%;
      height: auto;
    }
    &-num{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      color: white;
      background-color: rgba(0,0,0,.4);
      font-size: @minSize;
    }
  }
  &-desc{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    &-time{
      text-align: left;
      .state{
        color: @mainColor;
        font-size: @infoSize;
        .timer{
          color: @textHintColor;
          font-size: @minInfoSize;
          display: inline-block;
          margin-left: 30px;
        }
      }
    }
    &-adress{
      color: @textHintColor;
      font-size: @minInfoSize;
    }
  }
}
</style>
