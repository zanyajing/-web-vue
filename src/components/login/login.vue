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
          <div class="form" style="position:relative;">
            <formPhone ref="formPhone" v-model="mobile"></formPhone>
            <formCode :key="'formCode'" @input="changeCode" v-if="!active" ref="formCode" :type="'SEND_BY_MORTGAGE_REQUEST'" v-model="code" :phone="mobile"></formCode>
            <formPwd v-else :key="'formPwd'" ref="formPwd" v-model="pwd"></formPwd>
            <a href="javascript:;" @click="login()" :class="['logoBtn','btn-field',{disabled:disabled}]">登录

            </a>
            <!--<a href="javascript:;" @click="loginCode" class="btn-field">登录 </a>-->
            <a href="javascript:;" @click="initWx" class="btn-field btn-field2">
            	<img src="../../assets/images/weixin.png" alt="" /> 微信登录</a>
            <p class="btn-field-top">还没有账号 ？
              <router-link :to="{path:'/register',query:{mobile:this.mobile}}" class="btn-col">去注册 </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      :before-close="closeWxBefore"
      width="30%">
      <div id="login_container"></div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    userLogin
  } from "../../api"
  import {
    ERR_OK
  } from "../../api/config"
  import {
    Storage,
    Session,
    Cookie
  } from '../../common/js/common'
  import {
    queryInfo
  } from "api/queryInfo"
  import {
    getCaptcha
  } from '../../api/getCaptcha'
  import {
    loginByVcode
  } from '../../api/loginByVcode'
  import {
    queryUserBaseByMobile
  } from 'api/index'
  import  formPhone  from "../form/phone.vue"
  import  formCode  from "../form/code.vue"
  import  formPwd  from "../form/pwd.vue"
  import {getUrlKey} from 'common/js/common'

  export default {
    name: 'login',
    data() {
      return {
        dialogVisible: false,

        codeMobile: '',
        code: '',
        canCodeClick: true,

        mobile: '',
        pwd: '',
        canClick: true,

        disabled:true,
        active: 0,
        currentView: 'child1',
        tabs: [{
          type: '验证码登录',
          view: 'child1'
        }, {
          type: '密码登录',
          view: 'child2'
        }],
        objCaptcha: {}
      }
    },
    components: {
      formPhone, formCode, formPwd
    },
    methods: {
    	changeCode(params){
				if(params.length==6){
					this.$refs.formCode.checkValue(this.code)
				}
			},
      initWx: function() {
      	var _this = this;
        var sendUrl = "";
        this.dialogVisible = true;
        if(getUrlKey('redirect')) {
					sendUrl ="https://ty.tusjf.com/wx/login_jk.shtml?redirect="+getUrlKey('redirect')
				} else {
					sendUrl = "https://ty.tusjf.com/wx/login_jk.shtml"
				}
        setTimeout(function () {
          var obj = new WxLogin({
            id: "login_container",
            appid: "wxdcbe5982c8974df8",
            scope: "snsapi_login",
            state: "STATE",
            redirect_uri:sendUrl
          });
          _this.setRedirectParams()
        },30)
      },
      toggle(it, i) {
        this.active = i
        if(i){
          this.code = '';
        }else{
          this.pwd = '';
        }
        this.checkDisabled();
      },
      login() {
        if(this.disabled){
          return;
        }
        if(this.active === 0){
          this.loginCode();
          return false;
        }

        const phoneRight =  this.$refs.formPhone.checkValue(this.mobile);
        const pwdRight =  this.$refs.formPwd.checkValue(this.pwd)
        if (!phoneRight || !pwdRight || !this.canClick) {
          return;
        }

        this.canClick = false;
        this._queryUserBaseByMobile();
      },
      _userLogin () {
        userLogin({
          userName: this.mobile,
          password: this.pwd,
          diffCode: "No"
        }).then((res) => {
          this.canClick = true
          if (res.code === ERR_OK) {
            /*Storage.set('token', res.data.token)*/
 						Cookie.set('token',res.data.token,30)
            this._queryInfo()
          }else if (res.code === "P00042") {
            this.$refs.formPwd.errorMsg = "您尚未设置密码，请使用" +
              "<span style='color:#0090ff;cursor:pointer' onclick='window.location.reload()'>验证码登录</span>或" +
              "<span style='color:#0090ff;cursor:pointer' onclick='window.location.href=\"#/passwordCode\"'>设置密码</span>";
          }else{
            this.$refs.formPwd.errorMsg = res.msg;
          }
        })
      },
      loginCode() {
        const phoneRight =  this.$refs.formPhone.checkValue(this.mobile);
        const codeRight =  this.$refs.formCode.checkValue(this.code);
        if (!phoneRight ||!codeRight || !this.canCodeClick) {
          console.log("error")
          return;
        }
        this.canCodeClick = false

        loginByVcode({
          phone: this.mobile,
          phoneVerify: this.code,
          diffCode: "No"
        }).then((res) => {
          this.canCodeClick = true
          if (res.code === ERR_OK) {
            /*Storage.set('token', res.data)*/
          	 Cookie.set('token',res.data,30)
            this._queryInfo()
          }else {
            this.$refs.formCode.errorMsg = res.msg;
          }
        })

      },
      _queryInfo() {
        queryInfo().then((res) => {
          if (res.code === ERR_OK) {
            this.userInfo = {
              email: res.data.email,
              headImgUrl: res.data.headImgUrl,
              mobile: res.data.mobile,
              nickname: res.data.nickname
            }
            this.$store.commit('updateUserInfo', this.userInfo);
            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            this.$router.push({
              path: redirect
            })
          }
        })
      },
      _queryUserBaseByMobile() {

        //发起快速注册请求
        queryUserBaseByMobile(this.mobile).then((res) => {
          if(res.code === ERR_OK) {
            if(!res.data.userinfo) {
              this.$refs.formPhone.errorMsg = "该账户不存在";
              this.canClick = true;
            } else {
              this._userLogin();
            }
          }
        })
      },
      _getCaptcha() {
        var _this = this
        getCaptcha().then((res) => {
          initGeetest({
            gt: res.gt,
            challenge: res.challenge,
            offline: !res.success,
            product: 'float',
            width: '400px'
          }, function (captchaObj) {
            _this.objCaptcha = captchaObj
            captchaObj.appendTo('#embed-captcha');
            captchaObj.onReady(function () {
              console.log('onReady')
            })
            captchaObj.onSuccess(function () {
              console.log('onReady1')
            })
            captchaObj.onError(function () {
              console.log('onReady2')
            })
          })
        })
      },
      checkDisabled () {
        const phoneRight = /^1[3|4|5|8][0-9]\d{8}$/.test(this.mobile);
        if(this.active===0){
          if(this.code.length ===6 && phoneRight){
            this.disabled = false;
          }else{
            this.disabled = true;
          }
        }else{
          if(this.pwd.length >=8 && phoneRight){
            this.disabled = false;
          }else{
            this.disabled = true;
          }
        }
      },
      setRedirectParams(){
      	console.log(getUrlKey('redirect'))
      	if(getUrlKey('redirect')){
      		var str = getUrlKey('redirect').substring(getUrlKey('redirect').indexOf('?')+1,getUrlKey('redirect').length-1);
		    	var strArry = str.split("&")
		    	var reust = []
		    	for(var i =0;i<strArry.length;i++){
		    		var histArray = strArry[i].split('=');
		    		reust.push({
		    			key:histArray[0],
		    			val:histArray[1]
		    		})
		    	}
		    	Session.set('applyParams',JSON.stringify(reust))
      	}
      },
      closeWxBefore(done){
      	Session.set('applyParams','')
      	done()
      }
    },
    mounted() {
      this.$nextTick(res => {
        if(this.$route.query.mobile){
          this.codeMobile = this.$route.query.mobile;
          this.mobile = this.$route.query.mobile;
        }
      })
    },
    watch: {
      code (val) {
        this.checkDisabled()
      },
      pwd () {
        this.checkDisabled()
      },
      mobile (val) {
        this.checkDisabled()
      }
    }
  }
</script>

<style scoped lang="less">
	@import "../../assets/css/common/input.less";
  #embed-captcha {
    width: 400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .missAlert {
    position: absolute;
    top: 5px;
    left: 1%;
    color: red;
    opacity: 0;
    transition: opacity .3s;
  }

  .alert-hide {
    opacity: 1;
  }

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
          line-height: 56px;
          cursor: pointer;
          background: rgb(0, 144, 255);
          border-radius: 5px;
          color: #fff;
        }*/
        .btn-field2 {
          border: 1px solid rgb(101, 183, 78);
          background: rgb(247, 247, 247);
          color: rgb(101, 183, 78);
          margin-top: 10px;
          line-height:30px;
          line-height:52px;
          img{
          	margin-top:-5px;
          	vertical-align:middle
          }
        }
        .btn-field-top {
          margin: 36px 0 10px 0;
        }
      }
    }
    .btn-col {
      color: #0090ff;
    }
  }
  .logoBtn.disabled{
    /*opacity: 0.6;*/
    background: rgb(216, 216, 216) !important;
    color: #666!important;
  }
  .fontCol{
    color:#fff;
  }
</style>
