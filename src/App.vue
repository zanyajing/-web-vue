<template>
	<router-view></router-view>
</template>
<script src="https://cdn.bootcss.com/babel-polyfill/6.23.0/polyfill.min.js"></script>
<script>
	import {
		queryInfo
	} from "api/queryInfo"
	import {
		ERR_OK
	} from 'api/config'
	import {
		Storage,
		Session,
		Cookie
	} from './common/js/common'
	export default {
		name: 'app',
		data() {
			return {
				userInfo: { //保存用户信息
					email: null,
					headImgUrl: null,
					mobile: null,
					nickname: null
				}
			}
		},
		created() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				if(Cookie.get('token') != null && Cookie.get('token') != 'null' && Cookie.get('token') != '') {
					queryInfo().then((res) => {
						if(res.code === ERR_OK) {
							this.userInfo = {
								email: res.data.email,
								headImgUrl: res.data.headImgUrl,
								mobile: res.data.mobile,
								nickname: res.data.nickname
							}
							this.$store.commit('updateUserInfo', this.userInfo);
							Session.set('strMobile',res.data.mobile)
						}
					})
				}
			}
		}
	}
</script>

<style>
	@import "assets/css/common/common.css";
	#app {
		max-width: 750px;
		margin: 0 auto;
		color: #2c3e50;
		min-height: 100%;
	}
</style>