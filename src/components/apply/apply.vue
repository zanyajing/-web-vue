<template>
	<div @click="dbfsTextShow=false">
		<div class="header">
			<headers :showBread="showBread" :inowBread="inowBread" :prevBread="prevBread" :prevUrl="prevUrl"></headers>
			<img src="./logo.png" id="logo" />
			<div class="steps">
				<img src="./steps.png" />
			</div>
		</div>
		<div class="content">
			<div class="content_top">
				<h2 class="title">基本信息</h2>
				<div class="contentWrap">
					<div class="inputWrapt clearfix mb20">
						<!--<span class="fl">企业名称：</span><input v-model="entName" class="fl" value="" type="text" />-->
						<span class="fl">企业名称：</span>
						<div style="border:1px solid #999;border-radius: 4px;width:270px;background:#fff" class="fl"><el-autocomplete class="fl searchNameWrap" minlength="2" :trigger-on-focus='focusFalse' v-model="entName" :fetch-suggestions="querySearchAsync" placeholder="请输入企业名称" @select="handleSelect"></el-autocomplete></div>
						<i class="g-form-error" v-show="firstSumbit">{{entNameErrors.errorText }}</i>
					</div>
					<ul class="entList" v-if="entList.length>0 && showEntList && entName.length>0">
						<li class="overHidden" v-for="(item,index) in entList" v-if="index<5" @click="selectEntName(item)">{{item.entName}}</li>
					</ul>
					<div class="inputWrapt clearfix mb20">
						<span class="fl">企业法人：</span><input v-model="legalPerson" class="fl" maxlength="20" value="" type="text" />
					</div>
					<div class="inputWrapt">
						<span class="fl">注册资金：</span><input v-model="entRegAmount" class="fl" maxlength="10" value="" type="number" /><span class="fl" style="margin-left:10px;text-align: left;">万元</span>
					</div>
				</div>
			</div>
			<div class="content_bottom">
				<h2 class="title">贷款需求</h2>
				<div class="contentWrap pl437" style="padding-bottom: 20px;">
					<div class="lvWrap clearfix mb20">
						<dl class="clearfix">
							<dt>可接受利率范围：</dt>
							<dd class="clearfix" v-for="(item,index) in interestRangeList"><span @click="selectInterest(index)" class="radius" :class="{'active':item.active}"></span><strong>{{item.text}}</strong></dd>
						</dl>
					</div>
					<div class="inputWrapt clearfix mb20">
						<span class="fl">贷款金额：</span><input maxlength="10" v-model="amount" class="fl short" value="" type="number" /><strong class="fl">万元</strong><i class="g-form-error" v-show="firstSumbit">{{amountErrors.errorText }}</i>
					</div>
					<div class="inputWrapt clearfix mb20">
						<span class="fl">贷款期限：</span><input maxlength="3" v-model="periodNum" class="fl short" value="" type="number" /><strong class="fl">个月</strong><i class="g-form-error" v-show="firstSumbit">{{periodNumErrors.errorText }}</i>
					</div>
					<div class="inputWrapt clearfix mb20">
						<span class="fl">用款时间：</span><input maxlength="10" v-model="usetime" class="fl short" value="" type="number" /><strong class="fl">天内</strong><i class="g-form-error" v-show="firstSumbit">{{usetimeErrors.errorText }}</i>
					</div>
					<div class="inputWrapt clearfix mb20">
						<span class="fl">担保方式：</span>
						<div class="dbfs fl" @click.stop="dbfsTextShow = true">{{dbfsText}}</div>
						<ul class="selectDbfs" v-show="dbfsTextShow">
							<li v-for="(item,index) in dbfsTextList" @click="selectDbfs(index)">{{item.value}}</li>
						</ul>
					</div>
					<div class="inputWrapt clearfix mb20" v-for="item in assureDesc">
						<div v-if="item.id==8" class="clearfix">
							<span class="fl minW80">{{item.name}}：</span>
							<el-date-picker class="fl dataStart"  value-format="yyyy-MM-dd" v-model="item.value" type="date" placeholder="选择日期"></el-date-picker>
						</div>
						<div v-if="item.id==11" class="clearfix">
							<span class="fl minW80">{{item.name}}：</span><textarea v-model="item.value" class="fl" maxlength="50" value="" style="height:44px;font-size: 16px;overflow: hidden;"></textarea>
						</div>
						<!--房产估值--><!--应收款金额-->
						<div v-if="item.id==1 || item.id==3|| item.id==5 || item.id==7 || item.id==10" class="clearfix">
							<span class="fl minW80" :class="{'minW136':item.id==10}">{{item.name}}：</span><input v-model="item.value" class="fl" maxlength="20" :class="{'short':item.unit}" value="" type="number" /><strong class="fl" v-if="item.unit">{{item.unit}}</strong>
						</div>
						<div v-if="item.id!=1 && item.id!=3 &&item.id!=8 && item.id!=11&& item.id!=5&& item.id!=7&& item.id!=10" class="clearfix">
							<span class="fl minW80" :class="{'minW136':item.id==10}">{{item.name}}：</span><input v-model="item.value" class="fl" maxlength="20" :class="{'short':item.unit}" value="" type="text" /><strong class="fl" v-if="item.unit">{{item.unit}}</strong>
						</div>
					</div>
					<div class="inputWrapt h50 clearfix mb20" style="display: none;">
						<span class="fl">补充说明：</span><textarea maxlength="50" v-model="des" class="fl w140" value="" placeholder="其他担保方式说明"></textarea>
					</div>
					<div class="inputWrapt phoneWrap clearfix mb20">
						<span class="fl">联系电话：</span>
						<!--<input v-model="mobile" maxlength="11" class="fl w140" value="" type="text" placeholder="请输入手机号" />
						<SendCode :type="'SEND_BY_MORTGAGE_REQUEST'" :phone="mobile"></SendCode>-->
						<formPhone ref="formPhone" v-model="mobile" class="fl"></formPhone>
					</div>
					<div id="captcha"></div>
					<div class="inputWrapt codeWrap clearfix">
						<span class="fl w80">验证码：</span>
						<formCode class="fl" @input="changeCode" :key="'formCode'" ref="formCode" :type="'SEND_BY_MORTGAGE_REQUEST'" v-model="phoneVerify" :phone="mobile"></formCode>
					</div>
					<div class="inputWrapt codeWrap clearfix">
						<div v-show="yzmerrorMsg">
							<span class="fl w80"></span><div class="fl" style="height: 34px;line-height: 34px;color: red;font-size: 12px;">{{yzmErrorText}}</div>
						</div>
					</div>
				<!--	<div class="inputWrapt clearfix mb20">
						<span class="fl w80">验证码：</span><input v-model="phoneVerify" maxlength="6" class="fl w140" value="" type="text" placeholder="请输入手机验证码" /><i class="g-form-error">{{phoneVerifyErrors.errorText }}</i>
					</div>-->
				</div>
			</div>
		</div>
		<a href="javascript:;" class="submit" @click="saveEntProject">提交</a>
		<footers></footers>
	</div>
</template>

<script>
	import Headers from 'components/header/header'
	import Footers from 'components/footer/footer'
	import SendCode from 'components/sendCode/sendCode'
	import formPhone  from "../form/phone.vue"
  	import formCode  from "../form/code.vue"
	import {
		saveEntProject,
		getLabelConfigList
	} from 'api/apply'
	import {
		sendVeirfyCode
	} from 'api/sendVeirfyCode'
	import {
		searchByKey
	} from 'api/searchByKey'
	import {
		Message
	} from 'element-ui'
	import {
		getUrlKey,
		Session,
		Cookie
	} from '../../common/js/common'
	import {
		dbfsTextList
	} from '../../common/js/dbfs'
	import {
		ERR_OK
	} from 'api/config'
	export default {
		data() {
				return {
					focusFalse: false,
					amount: '',
					periodNum:'',
					mobile: '',
					usetime: '',
					phoneVerify: '',
					des: '',
					type: this.$route.query.type || getUrlKey('type') || 0,
					assureDesc: [], //下面的字段
					entName: this.$route.query.enterprise || '',
					entList: [],
					showEntList: false,
					legalPerson: this.$route.query.legalPerson || '',
					entRegAmount: this.$route.query.entRegAmount || '',
					interestRangeList: [{
						text: '不超过7%',
						active: true,
						value: '<=7%'
					}, {
						text: '不超过9%',
						active: false,
						value: '<=9%'
					}, {
						text: '不超过11%',
						active: false,
						value: '<=11%'
					}, {
						text: '11%以上',
						active: false,
						value: '>11%'
					}],
					interestRange: '<=7%'||'',
					sending: false,
					dbfsText: '',
					dbfsTextList: [],
					dbfsTextShow: false,
					showBread: true,
					inowBread: '贷款申请',
					prevBread: '贷款助手',
					prevUrl: './index.html',
					productId: this.$route.query.id || '',
					firstSumbit:false,
					yzmerrorMsg:false,
					yzmErrorText:'',
					entUid:''
				}
			},
			computed: {
				entNameErrors(){
					let errorText, status
					if(this.entName == '') {
						status = false;
						errorText = '请填写企业名称';
					} else {
						status = true;
						errorText = '';
					}
					/*第一次进入的时候不显示*/
					if(!this.userFlag) {
						errorText = '请填写企业名称';
						this.userFlag = true;
					}
					return {
						status,
						errorText
					}
				},
				amountErrors() {
					let errorText, status
					if(this.amount == '') {
						status = false;
						errorText = '请填写贷款金额';
					} else {
						status = true;
						errorText = '';
					}
					/*第一次进入的时候不显示*/
					if(!this.userFlag) {
						errorText = '请填写贷款金额';
						this.userFlag = true;
					}
					return {
						status,
						errorText
					}
				},
				periodNumErrors() {
					let errorText, status
					if(this.periodNum == '') {
						status = false;
						errorText = '请填写贷款期限';
					}else if(this.periodNum > 360){
						status = false;
						errorText = '贷款期限不超过360个月';
					} else {
						status = true;
						errorText = '';
					}
					/*第一次进入的时候不显示*/
					if(!this.periodNumFlag) {
						errorText = '请填写贷款期限';
						this.periodNumFlag = true;
					}
					return {
						status,
						errorText
					}
				},
				usetimeErrors() {
					let errorText, status
					if(this.usetime == '') {
						status = false;
						errorText = '请填写用款时间';
					} else {
						status = true;
						errorText = '';
					}
					/*第一次进入的时候不显示*/
					if(!this.usetimeFlag) {
						errorText = '请填写用款时间';
						this.usetimeFlag = true;
					}
					return {
						status,
						errorText
					}
				},
				phoneVerifyErrors() {
					let errorText, status
					if(this.phoneVerify == '') {
						status = false;
						errorText = '请填写手机验证码';
					} else {
						status = true;
						errorText = '';
					}
					/*第一次进入的时候不显示*/
					if(!this.phoneVerifyFlag) {
						errorText = '请填写手机验证码';
						this.phoneVerifyFlag = true;
					}
					return {
						status,
						errorText
					}
				}
			},
			created() {
				/*if(Cookie.get('token') == '' || Cookie.get('token') == 'null'|| Cookie.get('token') == null){
					location.href = '#/login'
				}*/
				this._getLabelConfigList()
				window.scrollTo(0, 0)
			},
			watch: {
				type() {
					this._getLabelConfigList()
				}
			},
			mounted() {

				this.amount=this.$route.query.loanMoney || '',
				this.periodNum=this.$route.query.times || '',
				this.dbfsTextList = dbfsTextList
				this.type = this.$route.query.type || getUrlKey('type') || '0'
				this.entRegAmount = this.$route.query.entRegAmount || '';
				console.log(this.$route.query.entRegAmount)
				if(Session.get('applyParams')){
					var applyParams = JSON.parse(Session.get('applyParams'))
					for(var i =0;i<applyParams.length;i++){
						if(applyParams[i].key == 'loanMoney'){
							if( applyParams[i].val){
								this.amount = applyParams[i].val
							}
						}else if(applyParams[i].key == 'times'){
							if(applyParams[i].val){
								this.periodNum = applyParams[i].val
							}
						}else if(applyParams[i].key == 'type'){
							if(applyParams[i].val){
								this.type =  applyParams[i].val
							}
						}
					}
				}
				this.dbfsText = this.dbfsTextList[this.type].value
				setTimeout(()=>{
					this.mobile = this.$route.query.mobile || this.$store.state.userInfo.mobile || Session.get('strMobile') || ''
				},1000)
			},
			methods: {
				inputNumber(val){
					console.log(val)
				},
				changeCode(params){
					if(params.length==6){
						this.$refs.formCode.checkValue(this.phoneVerify)
					}
				},
				querySearchAsync(queryString, cb) {
					if(!queryString || queryString.length < 2) {
						cb([]);
						return
					}
					searchByKey({
						entName: queryString
					}).then((res) => {
						if(res.data.datas != null) {
							let data = JSON.parse(res.data.datas);
							data.list.forEach(item => {
								item.value = item.entName
							})
							cb(data.list);
						} else {
							cb([]);
						}
					})
				},
				handleSelect(item) {
	  				this.legalPerson = item.legalPerson;
	  				this.entUid = item.entUid
				},
				selectDbfs(index) { //选择担保方式
					this.dbfsText = this.dbfsTextList[index].value
					this.type = this.dbfsTextList[index].type
					this.dbfsTextShow = false
				},
				selectInterest(index) { //选择利率
					for(var i = 0; i < this.interestRangeList.length; i++) {
						this.interestRangeList[i].active = false
					}
					this.interestRangeList[index].active = true
					this.interestRange = this.interestRangeList[index].value
				},
				selectEntName(item) { //选择公司
					this.showEntList = false
					this.legalPerson = item.legalPerson
					this.entRegAmount = item.entRegAmount
					this.entName = item.entName
					this.entList = []
				},
				searchByKey() { //搜索公司
					if(!this.showEntList) {
						return
					}
					if(this.sending) {
						return
					}
					this.sending = true
					searchByKey({
						entName: this.entName
					}).then((res) => {
						if(res.data.datas != null) {
							let data = JSON.parse(res.data.datas)
							this.entList = data.list
						}
						this.sending = false
					})
				},
				_getLabelConfigList() { //获取担保类型
					getLabelConfigList({
						type: this.type
					}).then((res) => {
						if(res.code === ERR_OK) {
							this.assureDesc = res.data
						}
					})
				},
				saveEntProject() { //保存项目
					this.firstSumbit = true
					var code = this.$refs.formCode.checkValue(this.phoneVerify)
					if(!code || !this.amountErrors.status || !this.periodNumErrors.status || !this.usetimeErrors.status || !this.phoneVerifyErrors.status || !this.entNameErrors.status) {
						return;
					}
					saveEntProject({
						amount: this.amount,
						periodNum: this.periodNum,
						mobile: this.mobile,
						usetime: this.usetime,
						phoneVerify: this.phoneVerify,
						des: this.des,
						assureDesc: JSON.stringify(this.assureDesc),
						interestRange: this.interestRange,
						entName: this.entName,
						entUid:this.entUid,
						productId: this.productId,
						legalPerson: this.legalPerson,
						regAmount: this.entRegAmount,
						type: this.type,
						diffCode: "No"
					}).then((res) => {
						if(res.code === ERR_OK) {
							this.$router.push({
								name: 'applySuccess',
								query: {
									id: res.data
								}
							});
							Session.get('applyParams','')
							this.yzmerrorMsg = false
						}else if(res.code == 'W00013'){
							this.yzmerrorMsg = true
							this.yzmErrorText = '验证码错误，请重新输入'
						}else if(res.code == 'W00058'){
							this.yzmerrorMsg = true
							this.yzmErrorText = '验证码已失效，请重新发送'
						}else{
							this.yzmerrorMsg = false
						}
					})
				}
			},
			components: {
				Headers,
				Footers,
				formPhone,
				formCode
			}
	}
</script>
<style>
	/*验证码*/
	.phoneWrap .item{
		height: 30px!important;
	}
	.codeWrap .item input,.phoneWrap .item input{
		width:140px!important;
		padding:0 10px!important;
		font-size: 16px!important;
		color: #666!important;
		height: 28px!important;
		line-height: 31px!important;
		text-indent: 0!important;
		border:1px solid #999!important;
		border-radius: 4px!important;
		float:left;
	}
	.codeWrap {
		height: 30px!important;
		overflow: hidden;
	}
	.codeWrap .item .error-msg{
		position: relative;
	    top: -29px;
	    left: 288px;
	}
	.codeWrap .item .error-msg,.phoneWrap .item .error-msg{
		float: left!important;
		font-size: 14px;
	    color: #fa6363;
	    font-style: normal;
	    float: left;
	    height: 30px;
	    line-height: 30px;
	    margin-left: 20px;
	}
	.codeWrap .item input::-webkit-input-placeholder,.phoneWrap .item input::-webkit-input-placeholder{
		color: #666!important;
	}
	.inputWrapt .dataStart span.el-input__prefix {
		width: 6px;
	}

	div.inputWrapt .vConde {
		float: left;
		height: 30px;
		line-height: 30px;
		width: 106px;
		overflow: hidden;
		margin-left: 20px;
		border:none;
	}
	div.contentWrap div.inputWrapt .searchNameWrap input{
		line-height: 28px;
		line-height: 32px;
	}
	div.contentWrap div.inputWrapt .searchNameWrap input::placeholder {
		color: #666!important;
	}
	.dataStart .el-input__inner::placeholder {
		color: #666!important;
	}

	.dataStart .el-input__inner {
		height: 30px;
		width: 160px;
	}

	.dataStart .el-input {
		font-size: 16px;
		display: inline-block;
		width: 162px;
		color: #666;
		height: 28px;
	}

	.dataStart .el-input__icon {
		line-height: 32px;
		display: none;
	}

	.dataStart .el-input__inner {
		border: 1px solid #999;
		height: 30px;
		color: #666;
		font-size: 16px;
		line-height: 31px;
		padding: 0 10px!important;
	}

	.dataStart .el-input--prefix .el-input__inner {
		padding: 0 20px;
		padding-left: 40px;
	}

	div.inputWrapt .dataStart span.el-input__suffix {
		width: 20px;
	}

	div.inputWrapt .dataStart span.el-input__suffix-inner {
		position: relative;
		right: 60px!important;
	}

	.dataStart .el-date-editor.el-input,
	.dataStart .el-date-editor.el-input__inner {
		width: 20px;
	}
	div.inputWrapt .searchNameWrap input{
		height: 30px;
		outline: none;
		border:none;
		color: #666;
		font-size: 16px;
		font-family: Microsoft Yahei;
		padding: 0 10px;
		width: 270px;
	}
	div.inputWrapt .searchNameWrap input:hover{
		border:none
	}
</style>

<style scoped>
	@import url("../../assets/css/common.css");
	/*头部start*/

	body {
		font-family: Microsoft Yahei;
	}

	div.header {
		padding-bottom: 64px;
		margin-bottom: 36px;
		position: relative;
		margin-top: 116px;
	}

	div.header #logo {
		height: 201px;
		width: 100%;
		background-size: auto 201px;
		margin-top: 0;
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

	ul.entList {
		background: rgba(255, 255, 255, 1);
		position: absolute;
		padding: 10px;
		border: 1px solid #d5d9db;
		border-radius: 4px;
		left: 548px;
		width: 180px;
		top: 56px;
	}

	ul.entList li {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		text-align: left;
		cursor: pointer;
		width: 180px;
	}
	/*头部end*/
	/*内容start*/

	ul.selectDbfs {
		background: rgba(255, 255, 255, .95);
		border: 1px solid #999;
		border-radius: 4px;
		width: 160px;
		position: absolute;
		z-index: 10;
		text-indent:10px;
		/*padding: 10px;*/
		top: 292px;
		left: 587px;
		color:#666;
	}

	ul.selectDbfs li {
		height: 30px;
		line-height: 30px;
		font-size: 15px;
		text-align: left;
		cursor: pointer;
		border-bottom:1px solid rgb(216,216,216);
	}
	ul.selectDbfs li:hover{
		background:rgb(216,216,216);
	}
	.content {
		width: 1200px;
		margin: 0 auto;
	}

	h2.title {
		background: url("./line.png") no-repeat left center;
		height: 34px;
		line-height: 34px;
		font-size: 16px;
		color: #333;
		font-weight: normal;
		text-align: left;
		width: 100%;
		border-bottom: 1px solid #999;
		text-indent: 6px;
	}

	.contentWrap {
		background: #f7f7f7;
		padding: 24px 24px 56px 437px;
		position: relative;
	}

	.content_top {
		margin-bottom: 30px;
	}

	.inputWrapt span {
		font-weight: bold;
		font-size: 16px;
		color: #666;
		margin-right: 14px;
		display: block;
		height: 30px;
		line-height: 30px;
		width: 136px;
		text-align: right;
	}

	.inputWrapt input {
		padding: 6px 10px;
		height: 16px;
		border: 1px solid #999;
		border-radius: 4px;
		width: 178px;
		vertical-align: middle;
		font-family: Microsoft Yahei;
		font-size: 16px;
		line-height: 18px;
		color: #666;
	}

	div.dbfs {
		padding: 0 10px;
		height: 28px;
		line-height: 28px;
		border: 1px solid #999;
		border-radius: 4px;
		width: 140px;
		text-align: left;
		font-size: 16px;
		/*color: #666;*/
		background: #fff url(./xsj.png) no-repeat 140px center;
		font-family: Microsoft Yahei;
	}

	.inputWrapt input.short {
		width: 100px;
	}

	.inputWrapt input.w140 {
		width: 140px;
	}

	.inputWrapt strong {
		font-weight: normal;
		display: block;
		font-size: 16px;
		color: #666;
		margin-left: 10px;
		height: 30px;
		line-height: 30px;
	}

	.divWrap {
		margin-top: 16px;
		height: 30px;
		line-height: 30px;
	}

	.divWrap div {
		margin-left: 14px;
		height: 30px;
		line-height: 30px;
	}

	a.submit {
		width: 160px;
		text-align: center;
		height: 40px;
		line-height: 40px;
		color: #fff;
		font-size: 16px;
		display: block;
		margin: 30px auto 53px;
		background: #008fff;
		border-radius: 4px;
	}
	a.sendCode {
		width: 96px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #fff;
		display: block;
		background: #008fff;
		border-radius: 4px;
		margin-left: 20px;
		font-size: 12px;
	}

	.content_bottom div.inputWrapt {
		padding-left: 47px;
	}

	.lvWrap {
		padding-top: 10px;
	}

	.lvWrap dl {
		font-size: 16px;
		color: #666;
		font-family: Microsoft Yahei;
		width:540px;
		margin-left:41px;
	}

	.lvWrap dt {
		float: left;
		font-weight: bold;
		height: 60px;
		line-height: 30px;
		margin-right: 14px;
		margin-left: 14px;
	}

	.lvWrap dd {
		float: left;
		height: 30px;
		line-height: 30px;
		width: 109px;
		margin-right: 56px;
	}

	.lvWrap dd strong {
		display: block;
		float: left;
		font-weight: normal;
	}

	.lvWrap dd span.radius {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: 1px solid #666;
		display: block;
		float: left;
		margin-top: 5px;
		margin-right: 6px;
		background-color: #fff;
		cursor: pointer;
	}

	.lvWrap dd span.active {
		background: #fff url(./radius.png) no-repeat center center;
	}
	/*内容end*/

	.w80 {
		width: 80px;
		text-align: left;
	}

	.mb20 {
		margin-bottom: 20px;
	}

	.h50 {
		height: 50px;
	}

	textarea {
		resize: none;
		outline: none;
		border: 1px solid #999;
		border-radius: 4px;
		padding: 10px;
		height: 28px;
		width: 300px;
		font-family: Microsoft Yahei;
		font-size: 12px;
	}

	.pl437 {
		padding-left: 390px;
	}

	.content_bottom div.pl33 {
		padding-left: 33px;
	}

	.minW80 {
		min-width: 80px;
		text-align: left;
	}

	::-webkit-input-placeholder {
		color: #666!important;
		line-height: normal!important;
	}
	/*错误信息*/

	.g-form-error {
		font-size: 14px;
		color: #fa6363;
		font-style: normal;
		float: left;
		height: 30px;
		line-height: 30px;
		margin-left: 20px;
		opacity: 1;
		transition: .5s;
	}

	.hide {
		opacity: 0;
	}

	.minW136 {
		min-width: 136px;
	}

	.inputWrapt {
		height: auto;
	}
	/*发送信息*/
</style>
