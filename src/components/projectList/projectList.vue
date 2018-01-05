<template>
	<div class="all">
		<div class="m-top">
			<Headers :showBread="showBread" :inowBread="inowBread" :prevBread="prevBread" :prevUrl="prevUrl"></Headers>
			<div class="logo">
				<img src="./banner.png" />
			</div>
			<Search :selctType="type" :showDbfs="showDbfs"  :amountRangeMax.sync="searchAmountRangeMax" :termRangeMax.sync="termRangeMaxs" @on-changeTermRange="changeTermRange"  @on-changeAmount="changeAmount" @on-search="search" @on-change="setType"></Search>
		</div>
		<div class="listWrap">
			<div class="listContent">
				<ul class="listUl" v-if="list.length>0">
					<li class="clearfix" v-for="item in list">
						<div class="listContent-left fl">
							<img :src="item.logourl" />
						</div>
						<div class="listContent-center fl">
							
							<router-link :to="{name:'fncDetails',query:{id:item.id,amount:item.amountRangeMax||'',termRange:item.termRangeMax||'',type:item.subtype,logourl:item.logourl||''}}" class="listContent-top clearfix" tag="div">
								<p class="fl overHidden">{{item.name}}</p>
							<!--	<p class="fl w688 overHidden">{{item.descp}}</p>-->
							</router-link>
							<div class="listContent-bottom">
								<p class="w142 overHidden">额度上限：<span>{{filterAmount(item.amountRangeMax)}}</span>万</p>
								<p class="w134 overHidden">贷款期限：<span>{{item.termRangeMax/360}}</span>年</p>
								<p class="w170 overHidden">担保条件：{{filterSubType(item.subtype)}}</p>
								<p class="w288 overHidden">适用对象：{{item.condit}}</p>
							</div>
						</div>
						<div class="listContent-right fr">
							<router-link :to="{name:'fncDetails',query:{searchAmountRangeMax,termRangeMaxs,id:item.id,type:item.subtype,logourl:item.logourl||''}}" class="searchInfo">查看详情 </router-link>
						</div>
					</li>
				</ul>
				<div v-if="list.length ==0 && isShowEmpty" class="empty" style="padding:20px 0;"><img src="../../assets/images/empty.png"/></div>
				<div class="pageWrap clearfix":class="{'hide':count==0}">
					<div class="fl">
						<paginate ref="paginate" :page-count="parseInt(pageCount)" :prev-class="'prevClass'" :next-class="'nextClass'" :page-range="3" :margin-pages="1" :click-handler="pageClickCallback" :prev-text="'上一页'" :next-text="'下一页'" :container-class="'pagination'" :page-class="'page-item'"></paginate>
					</div>
					<p class="pageContent fl">共<span>{{count}}</span>个结果</p>
				</div>
			</div>
		</div>
		<div class="quickWrap">
			<div class="quickContent">
				<p>没有找到合适的产品？<strong>试试快捷申请</strong></p>
				<!--<div class="quickInput clearfix">
					<input type="text" value="" placeholder="请输入企业名称" />
					<input type="text" value="" maxlength="11" placeholder="请输入手机号" />
					<a href="/apply" class="searchInfo">立即申请</a>
				</div>-->
				 <quickApply :money="loanMoney" :time="times"></quickApply>
			</div>
		</div>
		<Footers></Footers>
	</div>
</template>
<script type="text/ecmascript-6">
	
	import Slider from 'base/slider/slider'
	import Search from 'base/search/search'
	import QuickApply from 'components/quickApply/quickApply'
	import Headers from 'components/header/header'
	import Footers from 'components/footer/footer'
	import {
		hotLoan
	} from 'api/index'
	import Paginate from 'vuejs-paginate'
	import {
		ERR_OK
	} from 'api/config'

	export default {
		data() {
				return {
					list: [],
					type: '',
					count: '',
					pageCount: 0,
					pageSize: 5,
					pageNo: 1,
					showBread: true,
					inowBread: '贷款超市',
					prevBread: '贷款助手',
					prevUrl: './index.html',
					showDbfs: true,
					searchAmountRangeMax: '',
					termRangeMaxs: '',
					loanMoney:'',
     				times:'',
     				isShowEmpty:false
				}
			},
			components: {
				Slider,
				Footers,
				Search,
				Headers,
				Paginate,
				QuickApply
			},
			watch: {
				type() {
					this.pageNo = 1
					this.$refs.paginate.selected = 0
					this._hotLoan()
				}
			},
			methods: {
				changeTermRange(val){
					this.termRangeMaxs = val
				},
				changeAmount(val){
					this.searchAmountRangeMax = val
				},
				filterAmount(value){
					if(!value){
						value = '--'
					}
					return value
				},
				filterSubType(value){
					switch(value){
						case 0:
							value = "信用融资"
						break;
						case 1:
							value = "房产抵押"
						break;
						case 2:
							value = "应收账款"
						break;
						case 3:
							value = "采购订单"
						break;
						case 4:
							value = "商业承兑汇票"
						break;
						case 5:
							value = "公司担保"
						break;
						case 6:
							value = "pos流水"
						break;
						case 7:
							value = "其他担保方式"
						break;
					}
					return value
				},
				setType(index) {
					this.type = index + ''
				},
				pageClickCallback(index) {
					this.pageNo = index
					this._hotLoan()
				},
				search(amount, termRange) {
					this.searchAmountRangeMax = amount || ''
					this.termRangeMaxs = termRange || ''
					this.loanMoney = this.searchAmountRangeMax
					this.times = this.termRangeMaxs
					this._hotLoan()
					this.$refs.paginate.selected = 0
				},
				_hotLoan() {
					hotLoan({
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						platformSource: 2,
						type: this.type,
						amountRangeMax: 100000,
						amountRangeMin:this.searchAmountRangeMax,
						termRangeMax: 360,
						termRangeMin:this.termRangeMaxs ? parseInt(this.termRangeMaxs) * 30 : ''
					}).then((res) => {
						if(res.code === ERR_OK) {
							this.list = res.data.productList
							this.count = res.data.count
							this.pageCount = res.data.pageCount
							window.scrollTo(0,0)
							this.isShowEmpty = true
						}
					})
				}
			},
			mounted() {
				if(this.$route.params.amountRangeMax || this.$route.params.termRangeMaxs || this.$route.params.type) {
					this.searchAmountRangeMax = this.$route.params.amountRangeMax || ''
					this.termRangeMaxs = this.$route.params.termRangeMaxs || ''
					this.type = this.$route.params.type || ''
					if(this.type == '') {
						this._hotLoan()
					}
				} else {
					this._hotLoan()
				}
				window.scrollTo(0, 0);
			}
	}
</script>
<style>
	/*分页start*/
	
	.pageWrap {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.pagination {
		height: 40px;
	}
	
	.pagination li {
		float: left;
		min-width: 38px;
		min-height: 38px;
		line-height: 38px;
		border: 1px solid #999999;
		border-radius: 4px;
		margin: 0 4px;
	}
	
	.prevClass,
	.nextClass {
		width: 98px;
	}
	li.prevClass a,
	li.nextClass a{
		outline: none;
	}
	li.prevClass:hover,
	li.nextClass:hover{
		border:1px solid #008fff;
	}
	li.prevClass:hover a,
	li.nextClass:hover a{
		color: #008fff;
	}
	li.page-item a {
		color: #666;
		font-family: Microsoft Yahei;
		display: block;
	}
	
	.pagination li.active {
		border: 1px solid #008fff;
		background: #008fff;
		color: #fff;
	}
	
	.pagination li.active a {
		color: #fff;
	}
	
	.pageContent {
		font-size: 14px;
		color: #999;
		margin-left: 36px;
	}
	
	.pageContent span {
		color: #008fff;
	}
	.listContent .hide{
		display: none!important;
	}
	/*分页end*/
	div.quickContent .form{
		border: none;
		padding-top:0;
	}
	div.quickContent .form .text-field{
		background:#fff;
		width: 400px;
		/*color:#666;*/
	}
	div.quickContent .form .btn-field{
		width: 400px;
	}
</style>
<style scoped>
	@import url("../../assets/css/common.css");
	.m-top {
		position: relative;
		padding-bottom: 100px;
	}
	div.all {
		background-color: #fff!important;
		background: #fff!important;
	}
	
	.listWrap {
		width: 1200px;
		margin: 74px auto 0;
		background: #fff;
	}
	
	.listContent ul {
		border-radius: 4px;
		overflow: hidden;
	}
	
	ul.listUl {
		margin-bottom: 70px;
	}
	
	.listContent ul li {
		padding: 10px 30px;
		border-bottom: 1px solid #999;
		background: #fff;
	}
	
	.listContent ul li:hover {
		background: #f7f7f7;
		cursor: pointer;
	}
	
	.listContent ul li a:hover{
		background:#008fff;
		color: #fff;
	}
	
	.listContent ul li div.listContent-left {
		width: 98px;
		height: 78px;
		background: #fff;
		text-align: center;
		display: flex;
		margin-right: 30px;
		overflow: hidden;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
	}
	
	.listContent ul li div.listContent-left img {
		width:100%;
	}
	
	.listContent-right a {
		display: block;
		line-height: 30px;
		text-align: center;
		width: 100px;
    	height: 30px;
		border-radius: 4px;
		border: 1px solid #008fff;
		font-size: 14px;
		color: #008fff;
		margin-top: 24px;
	}
	
	.listContent-top p {
		height: 34px;
		line-height: 34px;
		font-size: 16px;
		/*margin-left: 48px;*/
		margin-top: 7px;
		text-align: left;
		color: #008fff;
	}
	
	.listContent-top p span,
	.listContent-bottom p span {
		color: #008fff;
	}
	
	
	.listContent-bottom p {
		height: 33px;
		line-height: 33px;
		float: left;
	}
	
	.quickWrap {
		background: #f7f7f7;
		overflow: hidden;
		width: 100%;
		margin: 70px auto 0;
		display: flex;
		justify-content: center;
	}
	
	.quickContent p {
		height: 77px;
		line-height: 77px;
		text-align: center;
		margin-top: 9px;
	}
	
	.quickContent p strong {
		color: #008fff;
	}
	
	.quickInput input {
		width: 360px;
		padding: 20px;
		height: 20px;
		border-radius: 4px;
		background: #fff;
		margin-right: 30px;
		display: block;
		margin-bottom: 20px;
	}
	
	.quickInput a.searchInfo {
		display: block;
		width: 400px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		color: #fff;
		font-size: 16px;
		background: #008fff;
		border-radius: 2px;
		margin-bottom: 40px;
	}
	
	.w288 {
		width: 340px;
		text-align: left;
	}
	
	.listContent-top p.w688 {
		width: 614px;
		margin-left:10px;
	}
	
	.w160 {
		width: 160px;
		text-align: left;
	}
	.w142{
		width:152px;
		margin-right: 10px;
		margin-left:0;
		text-align: left;
	}
	.w134{
		width:124px;
		margin-right: 10px;
		text-align: left;
	}
	.w170{
		width:180px;
		margin-right: 10px;
		text-align: left;
	}
	.logo {
		margin-top: 115px;
	}
</style>