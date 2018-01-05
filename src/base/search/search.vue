<template>
	<div class="search-wrap" :class="{'bottom74':showDbfs}">
		<div class="search-content clearfix">
			<div class="clearfix">
				<div class="amount mb38 layoutInput fl">
					<div>贷款金额:</div>
					<input type="number" maxlength="8" value="" @input="changeAmount" v-model="amount" placeholder="" />
					<span>万元</span>
				</div>
				<div class="amount mb38 layoutInput fl">
					<div>贷款期限:</div>
					<input type="number"  maxlength="8" value="" @input="changeTermRange" v-model="termRange" placeholder="" />
					<span>个月</span>
				</div>
				<ul v-if="showSearchAmount" class="mb38 showSearchAmount">
					<li>
						<a href="javascript:;">50万信用贷&nbsp;&nbsp;</a>
					</li>
					<li>
						<a href="javascript:;">100万订单贷</a>
					</li>
					<li>
						<a href="javascript:;">500万抵押贷</a>
					</li>
				</ul>
				<a class="fr fr2 search mb38" href="javascript:;" @click="search">搜索贷款</a>
			</div>
			<div class="listHeader clearfix" v-if="showDbfs">
				<h2 class="fl">担保方式：</h2>
				<ul class="fl">
					<li v-for="(item,index) in dbfs">
						<a href="javascript:;" :class="{'active':item.active}" @click="selectDbfs(index)">{{item.value}}</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		dbfsTextList
	} from '../../common/js/dbfs'

	import {
		hotLoan
	} from 'api/index'
	export default {
		props: {
			showSearchAmount: {
				type: Boolean,
				default: false
			},
			showDbfs: {
				type: Boolean,
				default: false
			},
			amountRangeMax:{
				type:String,
				default:''
			},
			termRangeMax:{
				type:String,
				default:''
			},
			selctType:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				dbfs: [],
				amount:'',
				termRange:''
			}
		},
		mounted() {
			this.dbfs = dbfsTextList
			setTimeout(()=>{
				for(let i = 0; i < this.dbfs.length; i++) {
					this.dbfs[i].active = false
				}
				if(this.selctType != '' ){
					this.dbfs[this.selctType].active = true
				}
				this.$emit('on-change', this.selctType)
				this.amount=this.amountRangeMax
				this.termRange=this.termRangeMax
			},20)
		},
		methods: {
			changeAmount(){
				this.$emit('on-changeAmount', this.amount)
			},
			changeTermRange(){
				this.$emit('on-changeTermRange', this.termRange)
			},
			selectDbfs(index) {
				for(let i = 0; i < this.dbfs.length; i++) {
					this.dbfs[i].active = false
				}
				this.dbfs[index].active = true
				this.$emit('on-change', index)
			},
			search(){
				this.$emit('on-search', this.amount,this.termRange)
			}
		}
	}
</script>
<style scoped>
	@import url("../../assets/css/common.css");
	.search-wrap {
		width: 1200px;
		background: rgba(255, 255, 255, .4);
		padding: 30px;
		box-sizing: border-box;
		margin: 0 auto;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-600px);
	}
	
	.search-content {
		background: #fff;
		-moz-box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
		-webkit-box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
		box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
		padding: 30px 40px 0 60px;
	}
	
	a.search {
		display: block;
		width: 160px;
		height: 40px;
		border-radius:4px;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		background: #008fff;
		color: #fff;
	}
	.fr2{
		float:left;
	}
	
	.layoutInput div {
		float: left;
		height: 40px;
		line-height: 40px;
		color: #333;
		font-weight: bold;
		padding-right: 10px;
	}
	
	.layoutInput {
		margin-right: 29px;
		position: relative;
	}
	
	.layoutInput input {
		float: left;
		height: 18px;
		line-height: 18px;
		padding: 10px 40px 10px 20px;
		border: 1px solid #999999;
		border-radius: 4px;
		width: 94px;
		font-size: 14px;
		text-align: left;
	}
	
	.layoutInput span {
		position: absolute;
		top: 12px;
		left: 200px;
		font-size: 12px;
	}
	
	.search-wrap ul.showSearchAmount {
		width: 216px;
		float: right;
	}
	
	.search-wrap ul.showSearchAmount li {
		float: left;
	}
	
	.search-wrap ul.showSearchAmount li a {
		display: block;
		color: #036eb8;
		font-size: 14px;
		text-decoration: underline;
		display: block;
		height: 30px;
		line-height: 30px;
		width: 108px;
		
		text-align: right;
	}
	/*担保方式 start*/
	
	.listHeader {
		border-top: 2px solid #999;
	}
	
	.listHeader h2 {
		height: 76px;
		line-height: 76px;
		font-size: 16px;
		color: #333333;
		margin-right: 8px;
	}
	
	.listHeader ul {}
	
	.listHeader ul li {
		float: left;
		height: 76px;
		line-height: 76px;
		font-size: 14px;
		color: #333;
		padding: 0 8px;
	}
	
	.listHeader ul li a {
		display: block;
		/*background: url(./xsj.png) no-repeat right center;*/
		padding-right: 12px;
		color: #333;
	}
	
	.listHeader ul li a.active {
		/*background: url(./ssj.png) no-repeat right center;*/
		color: #008fff;
	}
	/*担保方式 end*/
	
	.mb38 {
		margin-bottom: 30px;
	}
	
	.bottom74 {
		bottom: -74px
	}
</style>