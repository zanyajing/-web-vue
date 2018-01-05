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
	            <div class="item">
								<input type="text" class="text-field" name="" id="" maxlength="11" style="margin-bottom:20px;" v-model="mobile" value="" placeholder="请输入手机号" />
								<div :class="[{'alert-hide':errMsg && !pwdFirst},'missAlert']">{{errMsg}}</div>
						 	</div>
	          	
	            <div class="item">
	              <div class="clearfix">
									<input type="text" class="text-field text-field2" name="" id="" v-model="code" value=""
	                       placeholder="请输入验证码"/>
	                <sendCode :type="'SEND_BY_REGIST_ACCOUNT'" :phone="$route.query.mobile"></sendCode>
	              </div>
	              <div :class="['msg',{'error-msg':codeRight&&!first}]">请输入六位数验证码</div>
	            </div>
	
	            <div class="item">
	              <input type="password" class="text-field" name="" id="" v-model="pwd" value=""
	                     placeholder="密码(8-20位字母和数字组合)"/>
	              <div :class="['msg',{'error-msg':pwdRight&&!first}]">{{pwdRight}}</div>
	            </div>
	            <div class="item">
	              <input type="password" class="text-field" name="" id="" v-model="pwdAngin" value="" placeholder="确认密码"/>
	              <div :class="['msg',{'error-msg':pwdAnginRight&&!first}]">两次密码输入不一致</div>
	            </div>
							<a to="/passwordSuccess" href="javascipt:;" @click="sure" class="btn-field">注册</a>
							<div class="login-hav">
								<span class="login-hav1">
							  	<router-link to="/passwordCode" class="login-col">忘记密码？</router-link>
								</span>
								<span class="login-hav2">
									已有账号?去<router-link to="/login" class="login-col">登录</router-link>
							  </span>
 							</div>
	          </div>
          </div>
          <div v-else class="login-account">
						<div class="form" style="position:relative;">
							1111
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
    	toggle(it, i) {
				this.active = i
			},
      sure() {
        this.first = false;

        if (this.pwdRight || this.codeRight || this.pwdAnginRight || !this.canClick) {
          return;
        }
        this.canClick = false;
        userRegist({
          phone: this.mobile,
          password: this.pwdAngin,
          phoneVerify: this.code
        }).then(res => {
          this.canClick = true;
          if (res.code === ERR_OK) {
            Cookie.set('token', res.data.token,30)
            this._queryInfo()
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
    computed: {
      pwdRight() {
        if (this.pwd.length < 8 || this.pwd.length > 20) {
          return "密码长度为8-20位"
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
    created() {
      this.mobile = this.$route.query.mobile;
    }
  }
</script>

<style scoped lang="less">
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
      .login-sel {
				width: 100%;
				display: block;
				font-weight: 600;
				border-bottom: 2px solid #F2F2F2;
				li {
					float: left;
					height: 52px;
					width: 200px;
					line-height: 52px;
				}
				li:nth-child(2) {
					float: right;
				}
			}
      .form {
        width: 100%;
        height: auto;
        padding-top: 36px;

        .text-field {
          border: 1px solid rgb(221, 221, 221);
          width: 100%;
          height: 52px;
          font-size: 13px;
          text-indent: 20px;
          line-height: 52px;
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
          width: 60%;
          float: left;
        }
      }

    }

  }
</style>
