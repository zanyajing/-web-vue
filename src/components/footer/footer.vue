<template>
	<div class="m-footer">
		<div class="footer-wrap clearfix">
			<div class="footer-left fl">
				<h2>联系我们&nbsp;&nbsp;Contact us</h2>
				<p><strong>客服邮箱：</strong><span>kefu@tpfg.com.cn</span></p>
				<p><strong>客服热线：</strong><span>010-52725410 （工作日9:00-18:00） </span></p>
				<p><strong>办公地址：</strong><span>北京市海淀区清华科技园创业大厦509</span></p>
			</div>
			<div class="footer-right fr">
				<img src="./wxh.png"/>
				<p>启迪金科官微</p>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	}
</script>

<style scoped>
	@import url("../../assets/css/common.css");
	.m-footer{
		width:100%;
		background: #282828;
		height: 200px;
		color: #fff;
		font-family: Microsoft Yahei;
	}
	.footer-wrap{
		width:1200px;
		margin:0 auto;
	}
	.footer-left{
		margin-top:32px;
	}
	.footer-left h2{
		height: 40px;
		line-height: 40px;
		font-weight: bold;
		text-align: left;
		font-size: 16px;
	}
	.footer-left p{
		height: 30px;
		line-height: 30px;
		text-align: left;
		font-size: 14px;
	}
	.footer-left p strong{
		font-weight: bold;
	}
	
	.footer-right{
		padding-top:35px;
	}
	.footer-right p{
		height: 34px;
		line-height: 34px;
		color: #fff;
		font-size: 14px;
	}
</style>