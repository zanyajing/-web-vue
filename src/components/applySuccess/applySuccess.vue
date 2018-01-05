<template>
	<div>
		<div class="header">
			<headers></headers>
			<img src="./logo.png" id="logo" />
			<div class="steps">
				<img src="./steps2.png" />
			</div>
		</div>
		<div class="content">
			<img src="./success.png" alt="" id="success" />
			<p>已经将您的融资需求提交金融机构</p>
			<p>最新进展会发短信提醒你喔</p>
			<!--<a download="融资申请书" href="./融资申请书.docx" class="down">下载贷款申请书</a>-->
			<!--<a href="/applyDetail" class="more">补充更多材料，提高贷款成功率&gt;</a>-->
			<router-link class="more" style="margin-top:20px;" :to="{name:'applyDetail',query:{id:id}}">补充材料 提高成功率</router-link>
		</div>
		<footers></footers>
	</div>
</template>

<script>
	import Headers from 'components/header/header'
	import Footers from 'components/footer/footer'
	import {
		getQueryString
	} from 'common/js/common'
	import {
		ERR_OK
	} from 'api/config'

	export default {
		data() {
				return {
					id: ''
				}
			},
			components: {
				Headers,
				Footers,
			},
			created() {
				this.id =  this.$route.query.id
			}
	}
</script>

<style scoped>
	@import url("../../assets/css/common.css");
	/*头部start*/
	
	div.header {
		position: relative;
		padding-bottom: 64px;
		margin-bottom: 36px;
	}
	
	div.header #logo {
		height: 201px;
		width: 100%;
		background-size: auto 201px;
		margin-top: 80px;
	}
	
	div.header div.steps {
		width: 1140px;
		background: #fff;
		padding: 30px;
		position: absolute;
		left: 50%;
		margin-left: -600px;
		bottom: 0;
		-moz-box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
		-webkit-box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
		box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
	}
	/*内容 start*/
	
	#success {
		margin: 5px 0 5px 0;
	}
	
	.content p {
		height: 36px;
		line-height: 36px;
		font-size: 18px;
		color: #666;
		font-family: Microsoft Yahei;
	}
	
	a.down {
		margin-top: 18px;
		display: block;
		height: 64px;
		line-height: 64px;
		font-family: Microsoft Yahei;
		font-size: 16px;
		color: #008eff;
		width: 170px;
		margin: 0 auto;
		text-align: left;
		background: url(./down.png) no-repeat left center;
		text-indent: 38px;
	}
	
	a.more {
		width: 400px;
		height: 60px;
		line-height: 60px;
		color: #fff;
		text-align: center;
		display: block;
		font-family: Microsoft Yahei;
		font-size: 16px;
		color: #fff;
		background: #008eff;
		border-radius: 4px;
		margin: 0 auto 100px;
	}
</style>