<template>
  <div class="box">
    <div class="login-bag">
      <div class="login-logo">
        <img src="../../assets/images/logo.png" width="270"/>

        <div class="login-cont">
        	<div class="active">
							设置密码
					</div>
          <div class="form" style="position:relative;">
            <div class="item">
              <div class="clearfix">
                <input type="text" class="text-field text-field2" name="" id="" v-model="code" value=""
                       placeholder="请输入验证码"/>

                <sendCode :isSend="true" :type="'SEND_BY_FIND_PWD'" :phone="$route.query.mobile"></sendCode>

              </div>
              <div :class="['msg',{'error-msg':codeRight&&!first}]">请输入六位数验证码</div>
            </div>

            <div class="item">
              <input type="password" class="text-field" name="" v-model="pwd" value=""
                     placeholder="密码(8-20位字母和数字组合)"/>
              <div :class="['msg',{'error-msg':pwdRight&&!first}]">{{pwdRight}}</div>
            </div>
            <div class="item">
              <input type="password" class="text-field" name="" v-model="pwdAngin" value="" placeholder="确认密码"/>
              <div :class="['msg',{'error-msg':pwdAnginRight&&!first}]">两次密码输入不一致</div>
            </div>

            <a to="/passwordSuccess" href="javascipt:;" @click="sure" class="btn-field">找回密码</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    findPassword
  } from "../../api"
  import {
    ERR_OK
  } from "../../api/config"
  import {
    Storage
  } from '../../common/js/common'
  import {
    queryInfo
  } from "api/queryInfo"
  import {
    getCaptcha
  } from '../../api/getCaptcha'

  export default {
    name: 'login',
    data() {
      return {
        mobile: '',
        code: "",
        pwd: '',
        pwdAngin: '',
        first: true,
        canClick: true,
        count: "60s",
        auto:true
      }
    },
    methods: {
      sure() {
        this.first = false;

        if (this.pwdRight || this.codeRight || this.pwdAnginRight || !this.canClick) {
          return;
        }
        this.canClick = false;
        findPassword({
          phone: this.mobile,
          newPwd: this.pwdAngin,
          phoneVerify: this.code
        }).then(res => {
          this.canClick = true;
          if (res.code === ERR_OK) {
            //Storage.set('token', res.data.token)
            //this._queryInfo()
            //跳页不回调？
            this.$router.push("/passwordSuccess")
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
            this.$router.push({name: 'passwordSuccess',query:{mobile:this.mobile}})
          }
        })
      }
    },
    computed: {
      pwdRight() {
        if (this.pwd.length < 8 || this.pwd.length > 20) {
          return "密码(8-20位字母和数字组合)"
        }
        if (!/\D+/g.test(this.pwd)) {
          return "密码不能为纯数字"
        }
        if (!/[^\a-\z\A-\Z]/g.test(this.pwd)) {
          return "密码不能为纯字母"
        }
        if (/\s/g.test(this.pwd)) {
          return "密码不能输入空格"
        }
      },
      codeRight() {
        if (this.code.length !== 6) {
          return "请输入六位短信验证码"
        }
      },
      pwdAnginRight() {
        if (this.pwd !== this.pwdAngin) {
          return "两次密码输入不一致"
        }
      }
    },
     beforeRouteEnter (to, from, next) {
      if(!window.name){
        window.name = true;
        next();
      }else{
        window.name = "";
        next(vm => vm.$router.push("/passwordCode"));
      }
    },
    created() {
      this.mobile = this.$route.query.mobile;

      
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
    > img {
      margin: 60px 0 30px 0;
    }
    .login-cont {
      width: 400px;
      height: auto;
      margin: 0 auto;
      .form {
        width: 100%;
        height: auto;
        padding-top: 34px;

      .text-field {
          border: 1px solid rgb(221, 221, 221);
          width: 380px;
		 	    font-size: 13px;
			    padding:18px 0 18px 20px;
          border-radius: 5px;
        }
        div.msg {
          color: red;
          opacity: 0;
          line-height: 26px;
          height: 26px;
          transition: opacity .3s;
          text-align: left;
        }
        div.error-msg {
          opacity: 1;
        }
        .btn-field {
          width: 100%;
          height: 52px;
          border: 1px solid rgb(221, 221, 221);
          display: inline-block;
          font-size: 16px;
          color: #fff;
          line-height: 52px;
          cursor: pointer;
          background: rgb(0, 144, 255);
          border-radius: 5px;
        }
        .text-field2 {
          width:220px;
          float: left;
        }
        .vConde {
          float: right;
          width: 36%;
          height: 52px;
          border: 1px solid rgb(221, 221, 221);
          background: #fff;
          line-height: 52px;
          border-radius: 5px;
          font-size: 13px;
          cursor: pointer;
          background: #d8d8d8;
        }

      }

    }
    .active{
			height: 52px;
		    width: 400px;
		    line-height: 52px;
		    color: #008fff;
  			border-bottom: 2px solid #008fff;
		}

  }
</style>
