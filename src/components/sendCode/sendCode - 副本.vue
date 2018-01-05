<template>
	<div class="vConde">
		<div :class="[{active:!isSend}]" id="getCode">
			{{sendText}}
		</div>
		<div style="padding-top: 100px;">
			<div id="embed-captcha" class="change"></div>
		</div>
	</div>
</template>

<script>
	import {
		ERR_OK
	} from "../../api/config"
	import {
		getCaptcha
	} from '../../api/getCaptcha'
	import {
		sendVeirfyCode
	} from 'api/sendVeirfyCode'
	import gt from '../../common/js/gt'

	export default {
		name: 'sendCode',
		data() {
			return {
				count: "0s",
				sendText: '获取验证码',
				isSend: false,
				captchaObj: ''
			}
		},
		props: ["phone", "type", "phoneUse","auto"],
		methods: {
			init() {
				var _this = this
				let num = 59;
				let timer = setInterval(() => {
					if(num === 0) {
						if(this.auto){
							_this.sendText = "重新发送"
						}else{
							_this.sendText = "获取验证码"
						}
						_this.isSend = false
						clearInterval(timer)
					} else {
						_this.sendText = num + "s";
					}
					num--;
				}, 1000)
			},
			sendCode(challenge) {
				var validate = challenge.getValidate();
				sendVeirfyCode({
					mobile: this.phone,
					type: this.type,
					seccode: validate.geetest_seccode,
					challenge: validate.geetest_challenge,
					validate: validate.geetest_validate
				}).then((res) => {
					if(res.code === ERR_OK) {
						this.sendText = "60s";
						this.isSend = true
						this.init();
					}
				})
			},
			_getCaptcha() {
				getCaptcha().then((res) => {
					this.gt = res.gt;
					this.challenge = res.challenge;
					initGeetest({
						gt: res.gt,
						challenge: res.challenge,
						offline: !res.success,
						product: 'popup'
					}, this.handler)
				})
			},
			handler(captchaObj) {
				var _this = this
				captchaObj.onReady(function() {
					console.info('geetest has load')
				})
				captchaObj.onSuccess(function() {
					console.log('handler' + captchaObj);
					_this.sendCode(captchaObj);
					captchaObj.refresh();
				});
				document.getElementById('getCode').onclick = function() {
					if(_this.phoneUse) {
						return false;
					}
					if(!_this.isSend && _this.checkValue(_this.phone)) {
						captchaObj.show();
					}
				}
				captchaObj.appendTo('#embed-captcha')
			},
			checkValue(val) {
				if(!/^1[3|4|5|8][0-9]\d{8}$/.test(val)) {
					return false;
				} else {
					return true
				}
			}
		},
		created() {
			if(this.auto){
				this.sendText ="60s"
				this.isSend = true
				this.init()
			}
			this._getCaptcha()
		}
	}
</script>

<style scoped lang="less">
	#embed-captcha {
		width: 400px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20px;
	}
	
	.vConde {
		float: right;
		width: 36%;
		height: 52px;
		border: 1px solid rgb(221, 221, 221);
		line-height: 52px;
		border-radius: 5px;
		font-size: 13px;
		background: #d8d8d8;
	}
	
	div.active {
		background: #0090ff !important;
		color: #fff;
		cursor: pointer;
	}
</style>