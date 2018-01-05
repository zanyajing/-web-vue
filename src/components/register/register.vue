<template>
  <div class="box">
    <div class="login-bag">
      <div class="login-logo">
        <img src="../../assets/images/logo.png" width="270"/>
        <div class="login-cont">
        	<ul class="login-sel clearfix">
						<li @click="toggle(item,index)" v-for="(item,index) in tabs " :class="{active:active===index}">
							{{item.type}}
						</li>
					</ul>
        	<div v-if="!active">
	          <div class="form" style="position:relative;">
              <formPhone ref="formPhone" v-model="mobile"></formPhone>
              <formCode ref="formCode" :phoneUse="phoneUse" :type="'SEND_BY_REGIST_ACCOUNT'" v-model="code" :phone="mobile"></formCode>
              <formPwd ref="formPwd" v-model="pwd"></formPwd>
              <a href="javascipt:;" @click="sure" class="btn-field">注册</a>
							<div class="login-hav">
								<!--<span class="login-hav1">-->
							  	<!--<router-link to="/passwordCode" class="login-col">忘记密码？</router-link>-->
								<!--</span>-->
								<!--<span class="login-hav2">-->
									已有账号?去<router-link :to="{path:'/login',query:{mobile:this.mobile}}" class="login-col">登录</router-link>
							  <!--</span>-->
 							</div>
	          </div>
          </div>
          <div v-else class="login-account">
						<div class="form" style="position:relative;">
							<div id="login_container"></div>
              <div v-if="!$route.query.phoneBind" class="login-hav" style="margin-top: -50px">
                已有账号?去<router-link to="/login" class="login-col">登录</router-link>
              </div>
              <div v-if="$route.query.phoneBind">
                <formPhone ref="formPhoneBind" v-model="phone"></formPhone>
                <formCode ref="formCodeBind" :type="'SEND_BY_MORTGAGE_REQUEST'" v-model="phoneCode" :phone="phone"></formCode>
                <a href="javascipt:;" @click="bindPhone" :class="['btn-field',{disabled:disabled}]">绑定并登录</a>
              </div>

						</div>
					</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    userRegist
  } from "../../api"
  import {
    ERR_OK
  } from "../../api/config"
  import {
    Storage,
    Cookie
  } from '../../common/js/common'
  import {
    queryInfo
  } from "api/queryInfo"
  import {bindMobileForjk} from "api/phoneBind"
  import {
    getCaptcha
  } from '../../api/getCaptcha'
  import {
    queryUserBaseByMobile
  } from 'api/index'
  import  formPhone  from "../form/phone.vue"
  import  formCode  from "../form/code.vue"
  import  formPwd  from "../form/pwdAngin.vue"
  export default {
    name: 'login',
    data() {
      return {
        mobile: '',
        phoneUse: true,
        pwd: '',
        code: "",
        canClick: true,

        phoneCode: '',
        phone: '',

        disabled: true,
        active: 0,
        tabs: [{
					type: '手机号注册',
					view: 'child1'
				}, {
					type: '微信注册',
					view: 'child2'
				}],
      }
    },
    methods: {
      initWx: function() {
        var sendUrl = "";
        this.dialogVisible = true;
        /*是否从财务分析页面登录*/
        sendUrl = "https://ty.tusjf.com/wx/login_jk.shtml";
        setTimeout(function () {
          var obj = new WxLogin({
            id: "login_container",
            appid: "wxdcbe5982c8974df8",
            scope: "snsapi_login",
            state: "STATE",
            href:"https://ty.tusjf.com/web/dist/myApplyList.css",
            redirect_uri: sendUrl
          });
        },30)
      },
    	toggle(it, i) {
				this.active = i;
				if(!this.active && this.$route.query.phoneBind) {
				  this.$router.push({name:"register"})
        }
				if(i && !this.$route.query.phoneBind){
          this.initWx()
        }
			},
      bindPhone () {
        if(this.disabled){
          return ;
        }
        const phoneRight =  this.$refs.formPhoneBind.checkValue(this.phone);
        const codeRight =  this.$refs.formCodeBind.checkValue(this.phoneCode);
        if (!phoneRight || !codeRight || !this.canClick) {
          return;
        }
        this.canClick = false;
        bindMobileForjk({
          phone: this.phone,
          phoneVerify: this.phoneCode,
          openId: this.$route.query.openId
        }).then(res => {
          this.canClick = true;
          if (res.code === ERR_OK) {
            Cookie.set('token', res.data,30)
            this.$router.push({name: 'index',query:{token:res.data}})
//            this._queryInfo()
          }
        })
      },
      sure() {
        this.$refs.formPwd.checkValue();
        const phoneRight =  this.$refs.formPhone.checkValue(this.mobile);
        const pwdAnginRight =  this.$refs.formPwd.chechValueAngin(this.pwd);
        const codeRight =  this.$refs.formCode.checkValue(this.code);
        if(!this.canClick){
          return;
        }
        if (!phoneRight || !pwdAnginRight || !codeRight ) {
          return;
        }
        this.canClick = false;
        userRegist({
          phone: this.mobile,
          password: this.pwd,
          phoneVerify: this.code
        }).then(res => {
          this.canClick = true;
          if (res.code === ERR_OK) {
            Cookie.set('token', res.data.token,30)
            this.$router.push({name: 'registerSuc'})
//          this._queryInfo()
          }
        })
      },
      _queryInfo() {
        queryInfo().then((res) => {
          if(res.code === ERR_OK) {
            this.userInfo = {
              email: res.data.email,
              headImgUrl: res.data.headImgUrl,
              mobile: res.data.mobile,
              nickname: res.data.nickname
            }
            this.$store.commit('updateUserInfo', this.userInfo);
            this.$router.push({name: 'registerSuc'})
          }
        })
      }
    },
    components: {
      formPhone, formCode, formPwd
    },
    created () {
      if(this.$route.query.mobile){
        this.mobile = this.$route.query.mobile;
      }
      this.active = this.$route.query.phoneBind?1:0;
//    setTimeout(res => {
//      this.$refs.formPhoneBind.errorMsg = "请填写验证码完成绑定并登录"
//    },50)
    },
    watch: {
      mobile (val) {
        const phoneRight = /^1[3|4|5|8][0-9]\d{8}$/.test(val);
        if(val.length<11){
            this.$refs.formPhone.register = false;
        }
        if(phoneRight){
          queryUserBaseByMobile(this.mobile).then((res) => {
            if(res.code === ERR_OK && !res.data.userinfo) {
                this.phoneUse = false;
                this.$refs.formPhone.register = false;
            }else{
              this.$refs.formPhone.register = true;
            }
          })
        }
      },
      phone (val) {
        const phoneRight = /^1[3|4|5|8][0-9]\d{8}$/.test(val);
        if(phoneRight && this.phoneCode.length === 6){
          this.disabled = false;
        }else{
          this.disabled = true;
        }
      },
      phoneCode (val) {
        if(val.length ===6 && this.phone.length === 11){
          this.disabled = false;
        }else{
          this.disabled = true;
        }
      }
    }
  }
</script>

<style scoped lang="less">
@import "../../assets/css/common/input.less";
  .box {
    width: 100%;
    height: 100%;
    background: rgb(247, 247, 247);
  }

  li.active {
    color: rgb(0, 143, 255);
    border-bottom: 2px solid rgb(0, 143, 255);
  }

  .login-logo {
    /*> img {
      margin: 36px 0 20px 0;
    }*/
    .login-cont {
      width: 400px;
      height: auto;
      margin: 0 auto;
      .login-sel {
				width: 100%;
				display: block;
				font-weight: 600;
				border-bottom: 2px solid #F2F2F2;
				li {
					float: left;
					height: 56px;
					width: 200px;
					line-height: 56px;
				}
				li:nth-child(2) {
					float: right;
				}
			}
      .form {
        width: 100%;
        height: auto;
        /*.btn-field {
          width: 100%;
          height: 56px;
          border: 1px solid rgb(221, 221, 221);
          display: inline-block;
          font-size: 16px;
          color: #fff;
          line-height: 56px;
          cursor: pointer;
          background: rgb(0, 144, 255);
          border-radius: 5px;
        }*/
        .text-field2 {
          width: 60%;
          float: left;
        }
        .login-hav{
        	margin-top: 10px;
        }
        .login-hav1{
        	float: left;

        }
        .login-hav2{
        	float: right;
        }
        .login-col{
        	color:#0090ff;
        }
      }

    }

  }
  .login-account .disabled {
    background-color: #d8d8d8 !important;
  }
</style>
