<!--
  联系人组件
-->
<template>
  <div class="contact">
    <div v-if="JSON.stringify(currentContact) !== '{}'" class="contact-content">
      <svg-icon icon-class="user" />
      <div class="contact-content-text">
        <p class="contact-content-text-adress">{{ currentContact.city }}</p>
        <p class="contact-content-text-detail">{{ currentContact.adress }}</p>
        <p class="contact-content-text-name">
          <span>{{ currentContact.name }}</span>
          <span class="contact-content-text-name-tel">{{ currentContact.tel }}</span>
        </p>
      </div>
    </div>
    <div v-else class="contact-content">
      <svg-icon icon-class="add" />
      <div class="contact-content-text">添加联系人</div>
    </div>
    <svg-icon icon-class="go" />
  </div>
</template>

<script>
export default {
  props: {
    currentContact: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },

  computed: {},

  methods: {}
}

</script>
<style lang='less' scoped>
.contact{
  background-color: #f2f3f5;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-content{
    display: flex;
    align-items: center;
    &-text{
      margin-left: 20px;
      text-align: left;
      &-adress{
        font-size: @minInfoSize;
      }
      &-detail{
        font-size: @infoSize;
      }
      &-name{
        font-size: @minInfoSize;
        span{
          display: inline-block;
        }
        &-tel{
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
