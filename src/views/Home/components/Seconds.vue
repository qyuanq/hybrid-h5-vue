<template>
  <div class="seconds">
    <div class="seconds-top">
      <p class="seconds-top-title">
        京东秒杀
        <!-- 倒计时组件 -->
        <count-down :end-hours="17" />
      </p>
      <p class="seconds-top-more">更多秒杀<svg-icon icon-class="fs" /></p>
    </div>
    <div class="seconds-context">
      <div v-for="(item,index) in goodList" :key="item.id" class="seconds-context-good">
        <img ref="picture" class="seconds-context-good-img" :src="item.img">
        <p class="seconds-context-good-price"><em>￥</em>{{ item.price | priceValue }}</p>
        <p class="seconds-context-good-old-price"><em>￥</em>{{ item.oldPrice | priceValue }}</p>
        <svg-icon icon-class="cart" @click="onCart(index)" />
      </div>
    </div>
    <transition
      v-for="(item,index) in showMoveDot"
      :key="index"
      appear
      @after-appear="afterEnter"
      @before-appear="beforeEnter"
    >
      <!--
        利用节点进入渲染：才可以实现动画结束后删除数组
        appear
        @after-appear="afterEnter"
        @before-appear="beforeEnter"
        动画进入渲染
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        -->
      <div v-if="item.show" class="ball z-index-max">
        <!-- 缩略图小球 -->
        <img :src="dropImage" alt="" class="ball-img">
      </div>
    </transition>
  </div>
</template>

<script>
import CountDown from '@c/CountDown'
export default {

  components: { CountDown },
  data() {
    return {
      goodList: [
        { id: 1, price: 99.012, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-10.jpg') },
        { id: 2, price: 99.85, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-9.jpg') },
        { id: 3, price: 99.00, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-8.jpg') },
        { id: 4, price: 99.268, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-7.jpg') },
        { id: 5, price: 99, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-6.jpg') },
        { id: 6, price: 99, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-5.jpg') },
        { id: 7, price: 99, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-4.jpg') },
        { id: 8, price: 99, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-3.jpg') },
        { id: 9, price: 99, oldPrice: 108, img: require('@/assets/images/jingDongMiaoSha-2.jpg') }
      ],
      showMoveDot: [],
      elLeft: 0,
      elTop: 0,
      dropImage: '',
      idx: 0
    }
  },

  created() {
    // for (let i = 0; i < this.goodList.length; i++) {
    //   this.showMoveDot.push({ show: false })
    // }
  },

  methods: {
    async onCart(index) {
      // 没登录去登录
      if (!this.$store.getters.userToken) {
        this.$router.push({
          name: 'Login',
          routerType: 'push'
        })
        return
      }
      // 清理定时器
      clearTimeout(timeHandle)

      // @todo 判断当前商品数量大于库存或约定数量；提示不可添加

      this.dropImage = this.goodList[index].img
      // 获取图片及购物车元素的大小及其相对于视口的位置
      const dom = this.$refs.picture[index].getBoundingClientRect()
      const cart = document
        .getElementById('cart')
        .getBoundingClientRect()
      // translate x、y轴偏移量
      this.elLeft = -(cart.left - (dom.left + dom.width / 2))
      this.elTop = -(cart.top - (dom.top + dom.height / 2))
      // this.$set(this.showMoveDot[index], 'show', true)
      // this.idx = index
      this.showMoveDot.push({ show: true })

      // 添加购物车
      const goodInfo = {
        id: index + 10,
        picture: 'https://img10.360buyimg.com/mobilecms/s372x372_jfs/t1/194565/25/8782/189675/60cc5ba3Ee379b81d/939fcfebf73789f4.jpg!q70.dpg.webp',
        desc: '秒杀商品',
        price: '989',
        checked: true,
        number: 2
      }
      // 这里的setTimeout，当动画执行完毕，徽标再加1
      const timeHandle = setTimeout(async() => {
        await this.$store.dispatch('Cart/addCartData', goodInfo)
      }, 780)
    },
    beforeEnter(el) {
      el.style.transform = `translate3d(${this.elLeft}px,${this.elTop}px,0)`
      el.style.opacity = 0
    },
    enter(el, done) {
      // enter动画不生效：原因在于浏览器不会根据你js对style的修改实时更新
      // 1.触发重绘
      el.offsetHeight
      // 2.$nextTick
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0,0,0)'
        el.style.transition = 'transform 0.88s cubic-bezier(0.3, -0.25, 0.7, -0.15)'
        el.style.transition = 'transform 0.88s linear'
        el.style.opacity = 1
      })
      done()
    },
    afterEnter(el) {
      el.style.transform = 'translate3d(0,0,0)'
      // 贝塞尔曲线
      el.style.transition = 'transform 0.78s cubic-bezier(0.3, -0.25, 0.7, -0.15)'
      // el.style.transition = 'transform 0.78s linear'
      el.style.opacity = 1

      // this.$set(this.showMoveDot[this.idx], 'show', false)
      this.showMoveDot.shift()
    }
  }
}

</script>
<style lang='less' scoped>
.seconds{
    background-color: #fff;
    border-radius: @radiusSize;
    padding: @paddingSize;
    ::-webkit-scrollbar {
        display: none;
    }
    &-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        // line-height: 48px;
        &-title{
            display: flex;
            font-size: @titleSize;
        }
        &-more{
            font-size: @infoSize;
            color: @mainColor;
        }
    }
    &-context{
        display: flex;
        overflow: hidden;
        overflow-x: scroll;
        &-good{
          flex: 0 0 180px;
          &-img{
            width: 100%;
          }
          &-price{
            margin-top: 10px;
            font-size: @infoSize;
            color: @mainColor;
            em{
              font-size: @signSize;
            }
          }
          &-old-price{
              margin-top: 6px;
              font-size: @infoSize;
              color: @textHintColor;
              text-decoration: line-through;
              em{
                font-size: @signSize;
              }
          }
        }
    }
}
.ball{
  position: fixed;
  bottom: 10px;
  right: 150px;
  perspective: 1000;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  &-img {
    transform: translate3d(0, 0, 0);
    animation: 0.88s mymove ease-in-out;
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
}
@keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.2);
    }
  }
</style>
