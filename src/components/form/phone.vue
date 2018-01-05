<template>
  <div class="item">
    <input
      :class="[{error:errorMsg}]"
      type="text"
      ref="input"
      key="mobileCheck"
      :value="value"
      placeholder="请输入手机号"
      @blur = "checkValue($event.target.value)"
      @input="$emit('input', $event.target.value)"
      maxlength="11"
    >
    <div :class="['error-msg',{error:errorMsg}]" v-if="!register"  v-html="errorMsg"></div>
    <div :class="['error-msg',{error:register}]" v-if="register">
      手机号已经注册，<router-link :to="{path:'/login',query:{mobile:this.value}}"  tag="span">去登录</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'phone',
    data() {
      return {
        phone: '',
        errorMsg:'',
        register: false
      }
    },
    methods: {
      checkValue (val) {
        if (!/^1[3|4|5|8][0-9]\d{8}$/.test(val)) {
          this.errorMsg =  "请输入正确手机号";
        }else{
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
  .error-msg{
    span{
      color: #009fff;
      cursor: pointer;
    }
  }
</style>
