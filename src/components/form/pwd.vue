<template>
  <div class="item">
    <input
      :class="[{error:errorMsg}]"
      type="password"
      ref="input"
      key="mobileCheck"
      :value="value"
      placeholder="请输入密码"
      @blur = "checkValue($event.target.value)"
      @input="$emit('input', $event.target.value)"
    >
    <router-link to="/passwordCode" class="forget-password">忘记密码？</router-link>
    <div :class="['error-msg',{error:errorMsg}]" v-html="errorMsg"></div>
  </div>
</template>

<script>
  export default {
    name: 'phone',
    data() {
      return {
        errorMsg:''
      }
    },
    methods: {
      checkValue (val) {
        if (val.length < 4 ) {
          this.errorMsg =  "请输入密码";
        }
        else{
          this.errorMsg =  "";
        }
        return !this.errorMsg
      }
    },
    props:['value','isRight']
  }
</script>
<style scoped lang="less">
  @import "../../assets/css/input";
  .forget-password {
    position: absolute;
    top: 19px;
    left: 80%;
    font-size: 13px;
    cursor: pointer;
  }
</style>
