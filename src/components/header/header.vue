<template>
	<div class="m-header">
		<div class="m-header-content clearfix">
			<div style="width:1200px;margin:0 auto">
				<div class="m-header-wrap">
					<div class="m-header-left fl">
						<img src="./logo.png" alt="" class="fl logo" />
						<p class="chaining fl"></p>
						<img src="./chaining.png" alt="" class="fl logo logo2" />
						
					</div>
				</div>
				<div class="m-header-right fr">
					<router-link :to="{path: 'login'}" class="userLogin" v-if="!$store.state.userInfo.nickname">登录</router-link>
					<div class="loginStatus clearfix" v-else>
						<!--<router-link class="userName" :to="{path: '/myApplyList'}" tag="span" @mouseover="mouseoverUser" @mouseout="mouseoutUser">{{$store.state.userInfo.mobile}}</router-link>-->
						<span @mouseover="mouseoverUser" @mouseout="mouseoutUser">{{$store.state.userInfo.mobile}}</span>
						<!--<span>{{$store.state.userInfo.mobile}}</span>-->
						<ul class="menuList" v-if="showList" @mouseover="mouseoverUser" @mouseout="mouseoutUser">
							<li>
								<router-link class="userName" :to="{path: '/myApplyList'}" tag="a" @click.native="flushCom">贷款申请记录</router-link>
							</li>
							<li>
								<a href="javascript:;" @click="logout">退出</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="m-header-right2 fr">
					<ul class="fl">
							<li>
								<router-link :to="{path: '/'}">首页</router-link>
							</li>
							<li>
								<router-link :to="{path: 'projectList'}">贷款超市</router-link>
							</li>
							<li>
								<router-link :to="{path: 'knowList'}">贷款学院</router-link>
							</li>
							<!--<li>
								<a href="javascript:;">客户经理</a>
							</li>-->
							<li>
								<a target="_blank" href="http://www.tusjf.com/">关于我们</a>
							</li>
						</ul>
				</div>
				
			</div>
		</div>
		<div class="bread" v-if="showBread">
			<div class="bread-content">
				<a :href="prevUrl">{{prevBread}}&gt;</a><span>{{inowBread}}</span>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {
		Storage,
		Session,
		Cookie
	} from '../../common/js/common'

	export default {
		data() {
				return {
					showList: false,
					timer: null
				}
			},
			props: {
				showBread: {
					type: Boolean,
					default: false
				},
				inowBread: {
					type: String,
					default: ''
				},
				prevBread: {
					type: String,
					default: ''
				},
				prevUrl: {
					type: String,
					default: ''
				}
			},
			methods: {　　
				flushCom: function() {
					 //router是路由实例,例如:var router = new Router({})
					　//router.go(n)是路由的一个方法，意思是在history记录中前进或者后退多少步，0就表示还是当前，类似window.history.go(n)
					this.$router.go(0);
				},
				mouseoutUser() {
					clearTimeout(this.timer)
					this.timer = setTimeout(() => {
						this.showList = false
					}, 500)
				},
				mouseoverUser() {
					clearTimeout(this.timer)
					this.showList = true
				},
				logout() {
					this.userInfo = {
						email: null,
						headImgUrl: null,
						mobile: null,
						nickname: null
					}
					this.$store.commit('updateUserInfo', this.userInfo);
					Session.set('strMobile', '')
					Session.set('applyParams', '')
					Cookie.dele('token')
					this.$router.push({
						name: 'index'
					});
				}
			}
	}
</script>

<style scoped>
	@import url("../../assets/css/common.css");
	/*menuList start*/
	
	.menuList {
		padding: 0 10px;
		position: absolute;
		top: 40px;
		z-index: 40;
		background: #fff;
		left: 0;
		border-radius: 4px;
	}
	.chaining{
		border:1px solid rgb(35,98,149);
		height:32px;
		margin:24px 16px 0 0;
	}
	.menuList li {
		height: 40px;
		line-height: 40px;
		width: 180px;
		text-align: center;
		left: 0;
		border-bottom: 1px solid #999999;
	}
	
	.menuList li:last-of-type {
		border-bottom: none;
	}
	
	.m-header-right div.loginStatus .menuList li a {
		display: block;
		width: 100%;
		text-align: center;
		color: #999;
	}
	
	.m-header-right div.loginStatus .menuList li:hover a {
		color: #008fff;
	}
	/*menuList end*/
	/*bread start*/
	
	div.bread {
		height: 34px;
		line-height: 34px;
		border-top: 1px solid #f7f7f7;
		background: rgba(255, 255, 255, 1);
	}
	
	div.bread-content {
		width: 1200px;
		margin: 0 auto;
	}
	
	div.bread-content a {
		float: left;
		font-size: 14px;
		color: #666;
		margin-right: 4px;
		font-family: Microsoft Yahei;
	}
	
	div.bread-content span {
		float: left;
		font-size: 14px;
		color: #666;
		font-weight: bold;
		font-family: Microsoft Yahei;
		cursor: pointer;
	}
	
	div.m-header-wrap {
		margin: 0 auto;
		width: 1200px;
	}
	/*bread end*/
	
	.m-header {
		width: 100%;
		position: fixed;
		z-index: 40;
		left: 0;
		top: 0;
		right: 0;
	}
	
	.m-header-content {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		height: 80px;
	}
	
	.logo {
		margin: 20px 16px 0 0;
	}
	.logo2{
		margin-top:25px;
	}
	.m-header-right2 ul {}
	
	.m-header-right2 ul li {
		float: left;
		height: 80px;
		padding: 0 25px;
		font-family: Microsoft Yahei;
	}
	
	.m-header-right2 ul li a {
		display: block;
		height: 40px;
		line-height: 40px;
		text-line-through-width: 40px;
		margin-top: 20px;
		font-family: Microsoft Yahei;
		font-size: 16px;
		color: #333;
	}
	
	.router-link-exact-active {
		font-weight: bold;
	}
	
	.m-header-right a.userLogin {
		display: block;
		height: 40px;
		line-height: 40px;
		margin-top: 20px;
		width: 120px;
		text-align: center;
		background: #008fff;
		color: #fff;
		border-radius: 4px;
		font-family: Microsoft Yahei;
		font-size: 16px;
	}
	
	.m-header-right div.loginStatus {
		height: 38px;
		border: 1px solid #008fff;
		border-radius: 4px;
		margin: 20px 0 0 25px;
		padding: 0 20px;
		position: relative;
	}
	
	.m-header-right div.loginStatus a,
	.m-header-right div.loginStatus span {
		display: block;
		height: 38px;
		line-height: 38px;
		font-size: 16px;
		float: left;
		cursor: pointer;
	}
	
	.m-header-right div.loginStatus a {
		color: #999;
	}
	
	.m-header-right div.loginStatus span {
		color: #008fff;
		width: 160px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	span.userName {
		font-weight: normal;
	}
</style>