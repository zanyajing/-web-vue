<template>
	<div class="box">
		<div class="login-bag">
			<div class="login-logo">
				<img src="../../assets/images/logo.png" width="270" />

				<div class="login-cont">
					<div class="form" style="position:relative;">
						<div class="active">
							设置密码
						</div>
						<div :class="[{'alert-hide':errMsg && !pwdFirst},'missAlert']">
							{{errMsg}}
						</div>
						<div class="item">
							<input type="text" class="text-field" name="" id="" v-model="mobile" maxlength="11" value="" placeholder="请输入手机号"/>
						</div>
						<!--<router-link to="/passwordRet" @click="passwordCode" class="btn-field">找回密码> </router-link>-->
						<div id="embed-captcha"></div>
						<a href="javascript:;" @click="passwordCode" class="btn-field">找回密码</a>
						<div class="login-hav">
							<span class="login-hav1">
						已有账号?去<router-link to="/login" class="login-col">登录</router-link>
					</span>
							<span class="login-hav2">
						没有账号?去<router-link to="/register" class="login-col">注册</router-link>
					</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import {
		getCaptcha
	} from '../../api/getCaptcha'
	import {
		sendVeirfyCode
	} from 'api/sendVeirfyCode'
	import {
		ERR_OK
	} from "../../api/config"
	export default {
		name: 'phone',
		data() {
			return {
				codeFirst: true,
				codeHave: false,
				pwdFirst: true,
				canClick: true,
				mobile: ''
			}
		},
		methods: {
			passwordCode() {


				var validate = this.objCaptcha.getValidate();
				if(!validate) {
					this.$alert( '请先完成验证！')
					return;
				}

				this.pwdFirst = false;
				if(this.errMsg || !this.canClick) {
					return;
				}
				this.canClick = false;
				this.sendVeirfyCode();

			},
			sendVeirfyCode() { //发送验证码
					//发送验证码
					sendVeirfyCode({
						mobile: this.mobile,
						type: 'SEND_BY_FIND_PWD'
					}).then((res) => {
					  this.canClick = true;
						if(ERR_OK === res.code)
						this.$router.push({name:'passwordRet',query:{mobile:this.mobile}});
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
					}, function(captchaObj) {
						_this.objCaptcha = captchaObj
						captchaObj.appendTo('#embed-captcha');
						captchaObj.onReady(function() {
							console.log('onReady')
						})
						captchaObj.onSuccess(function() {
							console.log('onReady1')
						})
						captchaObj.onError(function() {
							console.log('onReady2')
						})
					})
				})
			}

		},
		created() {
			this._getCaptcha();
		},
		computed: {
			errMsg() {
				if(!/^1[3|4|5|8][0-9]\d{8}$/.test(this.mobile)) {
					return "请输入正确的手机号码"
				}
			}
		}
	}
</script>

<style scoped lang="less">
	#embed-captcha{
		width:400px;
		margin:0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20px;
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

	.missAlert {
		position: absolute;
		top: 164px;
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
		>img {
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
					margin-bottom: 20px;
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
				.login-hav {
					margin-top: 10px;
				}
				.login-col {
					color: rgb(0, 144, 255);
				}
				.login-hav1 {
					float: left;
				}
				.login-hav2 {
					float: right;
				}
			}
		}
		.active{
			margin-bottom:20px;
			height: 56px;
		    width: 400px;
		    line-height: 56px;
		    color: #008fff;
  			border-bottom: 2px solid #008fff;
		}
	}
</style>
