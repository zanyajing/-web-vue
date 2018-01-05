<template>
  <div>
    <div class="item">
      <input
        :class="[{error:errorMsg}]"
        type="password"
        v-model="pwd"
        placeholder="密码(8-20位字母和数字组合)"
        @blur = "checkValue($event.target.value)"
      >
      <div :class="['error-msg',{error:errorMsg}]">{{errorMsg}}</div>
    </div>
    <div class="item">
      <input
        :class="[{error:errorMsgAngin}]"
        type="password"
        :value="value"
        placeholder="确认密码"
        @blur = "chechValueAngin($event.target.value)"
        @input="$emit('input', $event.target.value)"
      >
      <div :class="['error-msg',{error:errorMsgAngin}]">{{errorMsgAngin}}</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'phone',
    data() {
      return {
        pwd: '',
        errorMsg:'',
        errorMsgAngin: ''
      }
    },
    methods: {
      checkValue (val) {
        val = val || this.pwd;
        if (val.length < 8 || val.length > 20) {
          this.errorMsg ="密码(8-20位字母和数字组合)";
          return ;
        }
        if (!/\D+/g.test(val)) {
          this.errorMsg ="密码不能为纯数字"
          return ;
        }
        if (!/[^\a-\z\A-\Z]/g.test(val)) {
          this.errorMsg ="密码不能为纯字母"
          return ;
        }
        if (/\s/g.test(val)) {
          this.errorMsg ="密码不能输入空格"
          return ;
        }
        this.errorMsg =  "";
      },
      chechValueAngin (val) {
        if (this.pwd !== val) {
          this.errorMsgAngin =  "两次密码输入不一致";
        }else{
          this.errorMsgAngin = "";
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
