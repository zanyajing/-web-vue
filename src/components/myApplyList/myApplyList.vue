<template>
	<div v-if="showDom">
		<headers :showBread="showBread" :inowBread="inowBread" :prevBread="prevBread" :prevUrl="prevUrl"></headers>
		<img src="./logo.png" id="logo" />
		<div class="content">
			<div class="contentWrap">
				<div class="contentTop clearfix">
					<h2 class="fl">贷款申请记录</h2>
					<!--<a href="/apply" class="fr">申请贷款&gt;</a>-->
					<router-link to="/apply" class="fr">申请贷款&gt;</router-link>
				</div>
				<ul class="list" v-if="myList.length > 0">
					<li v-for="item in myList">
						<div class="listTop clearfix">
							<router-link :to="{name:'applyDetail',query:{'id':item.id,'search':true}}"><h2 class="fl" style="color: #666;">申请产品：<span v-if="item.provider" style="color: rgb(0, 143, 255);">{{item.provider}}-{{item.name}}</span></h2></router-link>
							<p class="fr"><strong >申请日期：</strong><span>{{item.createtimeStr}}</span></p>
						</div>
						<div class="listBottom clearfix">
							<div class="listBottomLeft1 overHidden item fl">
								<div class="clearfix">
									<strong>企业名称：</strong><span style="width:250px;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{item.entName}}</span>
								</div>
								<div class="clearfix">
									<strong>贷款金额：</strong><span>{{item.amount}}万</span>
								</div>
							</div>
							<div class="listBottomLeft2 overHidden item fl">
								<div class="clearfix">
									<strong>联系电话：</strong><span>{{item.mobile}}</span>
								</div>
								<div class="clearfix">
									<strong>贷款期限：</strong><span>{{item.periodNum}}个月</span>
								</div>
							</div>
							<div class="listBottomLeft3 overHidden item fl">
								<strong>当前进度：</strong><span>{{status(item.status)}}</span>
							</div>
							<div class="listBottomLeft4 item fl">
								<router-link :to="{name:'applyDetail',query:{'id':item.id,'search':true}}" class="searchInfo">查看详情</router-link>
							</div>
						</div>
					</li>
				</ul>
				<div v-else class="empty" style="padding:20px 0"><img src="../../assets/images/empty.png"/></div>
			</div>
		</div>
		<footers></footers>
	</div>
</template>

<script>
	import Headers from 'components/header/header'
	import Footers from 'components/footer/footer'
	import {
		queryMyMortgage
	} from 'api/queryMyMortgage'
	import {
		AuditStatus
	} from 'common/js/AuditStatus'
	export default {
		data() {
				return {
					myList: [],
					showDom:false,
					showBread: true,
					inowBread: '贷款申请记录',
					prevBread: '贷款助手',
					prevUrl: './index.html',
				}
			},
			components: {
				Headers,
				Footers
			},
			created() {
				this._queryMyMortgage()
			},
			methods: {
				_queryMyMortgage() {
					queryMyMortgage().then((res) => {
						this.myList = res.data.mortgageList
						this.showDom=true
					})
				},
				status(item){
					return AuditStatus(item)
				}
			}
	}
</script>

<style scoped>
	@import url("../../assets/css/common.css");
	/*头部strat*/
	
	.content {
		margin: 0px auto 0;
		position: relative;
	}
	
	#logo {
		vertical-align: top;
		margin-top: 116px;
	}
	
	.contentWrap {
		padding: 40px 30px 28px;
		width: 1140px;
		position: relative;
		top: -100px;
		left: 50%;
		background: rgba(247, 247, 247, .95);
		margin-left: -600px;
	}
	
	.contentTop {}
	
	.contentTop h2 {
		color: #333;
		height: 36px;
		line-height: 36px;
		background: url(./line.png) no-repeat left center;
		padding-left: 10px;
		font-size: 16px;
		font-family: Microsoft Yahei;
	}
	
	.contentTop a {
		display: block;
		color: #008fff;
		display: block;
		height: 36px;
		line-height: 36px;
		font-size: 16px;
		font-family: Microsoft Yahei;
	}
	/*头部end*/
	/*list start*/
	
	.list {}
	
	.list li {
		margin-bottom: 30px;
		padding: 20px 30px 22px 30px;
		background: #fff;
	}
	
	.list li:hover {
		background: #f1f5f8;
		cursor: pointer;
	}
	
	.list li div.listTop {
		border-bottom: 1px solid #999;
	}
	
	.list li div.listTop h2 {
		font-size: 16px;
		font-family: Microsoft Yahei;
		color: #008fff;
		height: 36px;
		line-height: 36px;
	}
	
	.list li div.listTop p {
		margin-right: 168px;
		height: 36px;
		line-height: 36px;
	}
	
	.list li div.listTop p strong {
		color: #666;
		font-size: 16px;
	}
	
	.listBottom {
		padding-top: 10px;
	}
	
	.item strong,
	.item span {
		display: block;
		height: 32px;
		line-height: 32px;
		text-align: left;
		float: left;
		font-size: 14px;
		font-family: Microsoft Yahei;
		color: #999;
	}
	
	.listBottomLeft1,
	.listBottomLeft2 {
		width: 350px;
		margin-right: 10px;
	}
	
	.listBottomLeft3 {
		width: 250px;
		margin-right: 10px;
	}
	
	.listBottomLeft3 span {
		color: #008fff;
	}
	
	.listBottomLeft4 a {
		display: block;
		height: 28px;
		line-height: 28px;
		width: 98px;
		border: 1px solid #008fff;
		color: #008fff;
		border-radius: 4px;
		margin-top: 16px;
	}
	/*list ent*/
</style>