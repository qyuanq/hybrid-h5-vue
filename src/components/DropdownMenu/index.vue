<template>
  <div class="dropdown-menu">
    <!-- 一级筛选内容 -->
    <div class="dropdown-menu-list">
      <div
        v-for="item in options"
        :key="item.id"
        :class="['dropdown-menu-list-item',seletOption.id === item.id ? 'dropdown-menu-list-item-active' : '']"
        @click="onMenuList(item)"
      >
        {{ item.name }}
        <span v-if="item.subs && item.subs.length > 0" class="dropdown-menu-list-item-icon" :class="[isShowSubContent && seletOption.id === item.id ? 'dropdown-menu-list-item-icon-open' : 'dropdown-menu-list-item-icon-close']" />
      </div>
    </div>
    <!-- 子选择内容 -->
    <transition name="fold-height">
      <div v-show="isShowSubContent" class="dropdown-menu-sub">
        <ul class="dropdown-menu-sub-list">
          <li
            v-for="item in seletOption.subs"
            :key="item.id"
            class="dropdown-menu-sub-list-item"
            @click="onSubList(item)"
          >
            <span :class="{'dropdown-menu-list-item-active': seletOption.id === item.id }">{{ item.name }}</span>
            <svg-icon v-show="seletOption.id === item.id" icon-class="right" />
          </li>
        </ul>
      </div>
    </transition>
    <!-- 遮盖层 -->
    <!-- <van-overlay :show="isShowSubContent" :z-index="0" @click="isShowSubContent = !isShowSubContent" /> -->
    <div v-show="isShowSubContent" class="overlay" @click="isShowSubContent = !isShowSubContent" />
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    optionsDatas: {
      type: Array,
      default: function() {
        return []
      }
    }
  },

  data() {
    return {
      // 选中项
      seletOption: {},
      // 子视图展开
      isShowSubContent: false,
      // 数据
      options: this.optionsDatas
    }
  },

  watch: {
    seletOption(newValue, oldValue) {
      this.$emit('optionsChange', newValue)
    }
  },

  created() {
    this.seletOption = this.optionsDatas[0]
  },

  methods: {
    /**
     * 一级菜单点击
     */
    onMenuList(menuItem) {
      this.seletOption = menuItem
      const subs = menuItem.subs && menuItem.subs.length > 0

      // 当前子视图展开，让它关闭
      if (this.isShowSubContent) {
        this.isShowSubContent = false
        return
      }
      if (subs) {
        this.isShowSubContent = true
      }
    },
    /**
     * 二级菜单点击
     */
    onSubList(subItem) {
      this.seletOption = subItem
      this.options.forEach(item => {
        if (item.subs && item.subs.length > 0) {
          item.subs.forEach(sub => {
            if (sub.id === subItem.id) {
              item.id = sub.id
              item.name = sub.name
            }
          })
        }
      })
      this.isShowSubContent = false
    }
  }
}

</script>
<style lang='less' scoped>
.dropdown-menu{
  width: 100%;
  height: 45PX;
  background: white;
  font-size: @minInfoSize;
  z-index: 2;
  &-list{
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &-item{
      display: flex;
      align-items: center;
      //三角形
      &-icon{
        margin-left: 6px;
        display: inline-block;
        width: 0;
        height: 0;
        border-bottom: 8px solid @mainColor;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        &-open{
          transform: rotate(-180deg);
          transition: all .3s;
        }
        &-close{
          transform: rotate(0deg);
          transition: all .3s;
        }
      }
    }
    &-item-active{
    color: @mainColor;
  }
  }
  &-sub{
    width: 100%;
    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;
    border-bottom: 1px solid @lineColor;
    background-color: white;
    padding: 0 10px;
    position: absolute;
    box-sizing: border-box;
    z-index: 2;
    // left: 0;
    // top: 0;
    &-list-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      font-size: @infoSize;
      border-top: 1px solid @lineColor;
    }
  }
  // 遮盖层
  .overlay{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    z-index: 1;
  }
  //当内容展开动画
  .fold-height-enter-active{
    animation-duration: .3s;
    animation-name: fold-height-open;
  }
  @keyframes fold-height-open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 300px;
    }
  }

  .fold-height-leave-active{
    animation-duration: .3s;
    animation-name: fold-height-close;
  }
  @keyframes fold-height-close {
    0% {
      max-height: 300px;
    }
    100% {
      max-height: 0;
    }
  }
}
</style>
