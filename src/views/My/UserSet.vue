<template>
  <div class="user-set">
    <nav-bar title="账户设置" left-arrow @click-left="onBack" />
    <div class="user-set-info" @click="editUser">
      <div class="user-set-info-content">
        <div class="content-img">
          <img src="https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png" alt="">
        </div>
        <div class="content-desc">
          <p class="content-desc-name">
            jd_79a14cabc6exxx
          </p>
          <p class="content-desc-detail">
            用户名: jd_79a14awdqabc6e8d
          </p>
        </div>
      </div>
      <van-icon name="arrow" />
    </div>
    <van-cell title="收货地址" is-link to="" />

    <div
      v-for="(group,index) in blockList"
      :key="index"
      class="user-set-block"
    >
      <van-cell-group>
        <van-cell
          v-for="item in group"
          :key="item.title"
          :title="item.title"
          is-link
          :to="item.to"
          :value="item.value ? item.value : ''"
        />
      </van-cell-group>
    </div>

    <div class="user-set-btn">
      <van-cell title="切换用户" @click="changeUser" />
      <van-cell title="退出登录" @click="onExit" />
    </div>
  </div>
</template>

<script>
import NavBar from '@c/NavBar'
export default {
  name: 'UserSet',

  components: {
    NavBar
  },
  data() {
    return {
      blockList: [
        [
          {
            title: '账户与安全',
            to: ''
          },
          {
            title: '支付',
            to: ''
          }
        ],
        [
          {
            title: '消息通知',
            to: ''
          },
          {
            title: '主题换肤',
            to: ''
          },
          {
            title: '隐私',
            to: ''
          },
          {
            title: '通用',
            to: '',
            value: '地区、音效、辅助功能等'
          }
        ],
        [
          {
            title: '帮助与反馈',
            to: ''
          },
          {
            title: '关于淘宝',
            to: ''
          }
        ],
        [
          {
            title: '商家入驻',
            to: ''
          }
        ]
      ]
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
     * 切换用户
     */
    changeUser() {

    },
    /**
     * 退出登录
     */
    onExit() {

    },
    /**
     * 编辑用户
     */
    editUser() {

    }
  }
}

</script>
<style lang='less' scoped>
.user-set{
  &-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: @paddingSize;
    background-color: white;
    border-bottom: 1px solid @intervalLineColor;
    box-sizing: border-box;
    &-content{
      display: flex;
      align-items: center;
      .content-img{
        width: 90px;
        height: 90px;
        img{
          width: 100%;
          height: auto;
        }
      }
      .content-desc{
        text-align: left;
        margin-left: 20px;
        &-name{
          font-size: 32px;
          color: #333;
          font-weight: 700;
        }
        &-detail{
          font-size: 24px;
          color: #666;
          margin-top: 12px;
        }
      }
    }
  }
  .van-cell--clickable{
    text-align: left;
  }
  &-block{
    margin-top: 16px;
  }
  &-btn{
    .van-cell{
      margin-top: 16px;
    }
  }
}
</style>
