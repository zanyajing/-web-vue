<template>
  <div class="item">
   <div class="clearfix">
     <input
       type="text"
       :class="['form-code',{error:errorMsg}]"
       ref="input"
       key="mobileCheck"
       :value="value"
       maxlength="6"
       placeholder="请输入验证码"
       @blur = "checkValue($event.target.value)"
       @input="$emit('input', $event.target.value)"
     >
    <sendCode :type="type" :phone="phone" :phoneUse="phoneUse"></sendCode>
   </div>
    <div :class="['error-msg',{error:errorMsg}]">{{errorMsg}}</div>
  </div>
</template>

<script>
  export default {
    name: 'code',
    data() {
      return {
        errorMsg:''
      }
    },
    props:['value','isRight','phone',"type","phoneUse"],
    methods: {
      checkValue (val) {
      	if (!val ||val.length !== 6) {
          this.errorMsg =  "请输入6位数验证码";
        }else{
          this.errorMsg =  "";
        }
        return !this.errorMsg
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../assets/css/input";
</style>
