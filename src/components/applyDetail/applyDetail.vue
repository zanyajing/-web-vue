<template>
	<div>
		<div class="header">
			<headers></headers>
			<div class="bread" v-if="showBread">
				<div class="bread-content">
					<a href="./index.html">贷款助手&gt;</a>
					<router-link :to="{name:'myApplyList'}">贷款申请记录&gt;</router-link>
					<span>详情</span>
				</div>
			</div>
			<img src="./logo.png" id="logo" />
			<div class="steps">
				<img v-if="mortProject.status < 200" src="./steps2.png" />
				<!--初审-->
				<img v-if="mortProject.status == 200 || mortProject.status == 202" src="./steps3.png" />
				<!--复审-->
				<img v-if="mortProject.status == 500 || mortProject.status == 501" src="./steps4.png" />
				<!--
					180/190	初审/复审	待审核	绿色，可上传	展示
					200	机构审核	待审核	绿色，可上传	展示
					202	未放款	审核通过	绿色，不可上传	无
					500	还款中	还款中	绿色，不可上传	无
					501	已还款	已还款	绿色，不可上传	无
					160	初审拒绝	已拒绝	灰色	无
					150	撤回	已撤回	灰色	无
					170	复审退回	被退回	绿色，可上传	展示
				-->
			</div>
		</div>
		<div class="content">
			<div class="content-mod">
				<h2 class="title">基本信息</h2>
				<div class="content-article">
					<div class="content-article-bd" v-if="mortProject">
						<div class="sqcpHeader clearfix">
							<h2 class="fl overHidden">
								<strong class="" style="color: #666;">申请产品：</strong>
								<!--'times':mortProject.periodNum,'loanMoney':mortProject.amount-->
								<router-link :to="{name:'fncDetails',query:{'id':mortProject.productId,'logourl':mortProject.logourl,'type':mortProject.assureType}}"><span v-if="mortProject.provider" style="color: #008fff;">{{mortProject.provider}}-{{mortProject.name}}</span>
								</router-link>
							</h2>
							<p class="fl"><strong>申请日期：</strong>{{mortProject.createtimeStr|empty}}</p>
						</div>
						<div class="sqcpList clearfix">
							<ul class="sqcpUlList fl">
								<li><strong>企业名称：</strong>{{mortProject.entName|empty}}</li>
								<li><strong>联系电话：</strong>{{mortProject.mobile|empty}}</li>
								<li><strong>企业法人：</strong>{{mortProject.legalPerson|empty}}</li>
								<li><strong>注册资金：</strong>{{mortProject.regAmount|empty}}万</li>
								<li><strong>贷款金额：</strong>{{mortProject.amount|empty}}万</li>
								<li><strong>贷款期限：</strong>{{mortProject.periodNum|empty}}月</li>
								<li><strong>可接受利率：</strong>{{filterInterset(mortProject.interestRange)|empty}}</li>
								<li><strong>用款时间：</strong>{{mortProject.usetime|empty}}天内</li>
								<li><strong>担保方式：</strong>{{assureText|empty}}</li>
								<li v-for="item in mortProject.assureDesc">
									<strong>{{item.name}}：</strong>{{item.value}}{{item.unit}}
								</li>
							</ul>
							<div class="fl" style="margin-top: 80px;width:100px;">
								<div class="jd">
									<!--<strong>当前进度：</strong>-->{{statusFormat(mortProject.status)}}
								</div>
								<a v-if="reportUrl" :href="reportUrl" download="融资报告" class="downBtnReport">下载融资报告</a>
								<!--<div v-else>正在生成中<span style="color: #999;" v-for="n in spanshowLength">.</span></div>-->
								<a href="javascript:;" v-if="mortProject.status == 180 || mortProject.status == 190" class="ch" @click="chq">撤回申请</a>
							</div>
						</div>
					</div>
					<div class="cxMaskWrap" :class="{'block':showCxMask}">
						<div class="cxMask">
							<div class="cxInfo">
								<h2>撤回原因</h2>
								<textarea name="" rows="" cols="" v-model="content" placeholder="请输入撤回原因....."></textarea>
								<div class="btnWrap">
									<a href="javascript:;" class="ok" @click="cx">确定</a>
									<a href="javascript:;" class="cance" @click="showCxMask = false">取消</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="content-mod">
				<h2 class="title">材料信息</h2>
				<div class="content-article information-card">
					<el-tabs type="card" :value="tabName" @tab-click="handleClick">
						<el-tab-pane label="财务报表" name="first">
							<ul class="report-list">
								<li class="clearfix" v-for="(item,index) in mateRep">
									<label class="fl">{{filterName(item)}}</label>

									<el-upload class="fr uploadWrap" :onRemove="handleRemove" :file-list="fileList[index]" action="/material/upload.shtml" :data="initUploadParams(item)" :onError="uploadError" :onSuccess="uploadSuccess" :beforeUpload="beforeAvatarUpload" >
										<el-button class="btn-upload fr btn-color" plain type="primary" size="mini" v-if="fileList[index].length>0">上传文件</el-button>
										<el-button class="btn-upload fr btn-color" plain type="primary" size="mini" v-else>上传文件</el-button>
									</el-upload>
									<span class="tips fl" v-if="index<2 && (item.attchList.length==1&&!item.attchList[0].fileUrl)">（上传可提高贷款成功率）</span>
									
								</li>
								<li class="explain-item">
									<span class="explain">说明</span>
									<span>1.上传文件大小10M以内。</span>
									<span>2.文件上传后，可以修改和删除。</span>
									<span>3.参考报表文件模板下载。</span><a download="财务报表模板" href="./财务报表模板.xlsx" class="down"></a>
								</li>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="经营情况" name="second">
							<el-form class="manage-from" label-width="120px">
								<el-form-item label="主营产品">
									<el-input type="textarea" v-model="manageInfo.product" placeholder="请填写企业主营产品、经营模式" :disabled="khInputDisabled"></el-input>
								</el-form-item>
								<el-form-item label="主要客户名称">
									<div style="margin-bottom: 20px;" v-for="item in manageInfo.customer">
										<el-input :placeholder="item.label" v-model="item.name" :disabled="khInputDisabled"></el-input>
										<el-input :placeholder="item.label2" v-model="item.value" :disabled="khInputDisabled"></el-input>
									</div>
								</el-form-item>
								<el-form-item label="主要供应商名称">
									<div style="margin-bottom: 20px;" v-for="item in manageInfo.provider">
										<el-input :placeholder="item.label" v-model="item.name" :disabled="khInputDisabled"></el-input>
										<el-input :placeholder="item.label2" v-model="item.value" :disabled="khInputDisabled"></el-input>
									</div>
								</el-form-item>
								<!--<el-button v-if="khInputDisabled" type="primary" size="large" @click="_saveManageinfo">编辑</el-button>
								<el-button v-else type="primary" size="large" @click="_saveManageinfo">保存</el-button>-->
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="管理人员" name="third" class="manage-tab">
							<div class="manage-member-wrap" id="manageWrap">
								<el-form ref="mange" class="manage-member" label-width="40px" v-for="form in dynamicForm" :key="form.key">
									<el-form-item v-for="(item, idx) in form.items" :key="idx" :label="item.label">
										<el-input :disabled="glInputDisabled" v-if="item.type != 'select'" v-model="item.value" :type="item.type" :placeholder="item.placeholder"></el-input>
										<el-select :disabled="glInputDisabled" v-model="item.value" v-if="item.type == 'select'">
											<el-option v-for="(option, idx) in education" :key="idx" :label="option.label" v-model="option.value"></el-option>
										</el-select>
									</el-form-item>
								</el-form>
								<div id="msg_end" style="height:0; overflow: hidden;"></div>
							</div>
							<!--<a href="javascript:;" v-if="!glInputDisabled" class="add-member" @click="addMemberForm1"><i class="el-icon-circle-plus-outline"></i>添加管理人员</a>
							<el-button v-if="glInputDisabled" type="primary" @click="_saveManager" size="large" style="margin-top:20px">编辑</el-button>
							<el-button v-else type="primary" @click="_saveManager" size="large">保存并提交</el-button>-->
						</el-tab-pane>
					</el-tabs>
					<div class="progress-information">
						<label>资料完整度</label>
						<el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>
						<span class="tips">资料越完整，获得融资概率越高哦！</span>
					</div>
					<div class="BtnWrap">
						<div v-show="tabName == 'first'">
							<a style="border-radius: 4px;" href="javascript:;" class="next" @click="tabName = 'second'">下一步</a>
						</div>
						<div v-show="tabName == 'second'">
							<a style="margin-right: 14px;border:1px solid #008fff;border-radius: 4px;" v-if="khInputDisabled" href="javascript:;" class="next" @click="_saveManageinfo">修改</a>
							<a style="margin-right: 14px;border:1px solid #008fff;border-radius: 4px;" v-else href="javascript:;" class="next" @click="_saveManageinfo">保存</a>
							<a style="margin-left: 14px;background:#fff;color: #008fff;border:1px solid #008fff;border-radius: 4px;" href="javascript:;" class="next" @click="tabName = 'third'">下一步</a>
						</div>
						<div v-show="tabName == 'third'">
							<a  @click="addMemberForm1" style="margin-right: 14px;background:#fff;color: #008fff;border:1px solid #008fff;border-radius: 4px;" href="javascript:;" class="next">添加管理人员</a>
							<a  v-if="glInputDisabled" style="margin-left: 14px;border:1px solid #008fff;border-radius: 4px;"   href="javascript:;" class="next" @click="_saveManager">修改</a>
							<a v-else style="margin-left: 14px;border:1px solid #008fff;border-radius: 4px;" href="javascript:;" class="next" @click="_saveManager">保存并提交</a>
						</div>
					</div>
				</div>
			</div>
			<div class="content-mod" style="display: none;">
				<h2 class="title">沟通记录</h2>
				<div class="content-article connect-card">
					<el-tabs type="card" value="first">
						<el-tab-pane label="机构一" name="first">
							<ul class="connect-list">
								<li class="clearfix">
									<a href="" class="user-avatar">
										<img src="../../assets/images/banner/avatar.png" alt="">
									</a>
									<div class="connect-content">
										<div class="connect-content-hd">
											<h4 class="user-name">客户经理A</h4>
											<span class="timestamp">2017-11-11</span>
										</div>
										<div class="connect-content-bd">
											<p>已经收到您的申请材料，正在审核中正在审核中正在审核中正在</p>
										</div>
									</div>
								</li>
								<li class="clearfix">
									<a href="" class="user-avatar">
										<img src="../../assets/images/banner/avatar.png" alt="">
									</a>
									<div class="connect-content">
										<div class="connect-content-hd">
											<h4 class="user-name">客户经理A</h4>
											<span class="timestamp">2017-11-11</span>
										</div>
										<div class="connect-content-bd">
											<p>对话框最长情况下就这么长，对话框最长情况下就这么长，对话框最长情况下就这么长，对话。</p>
										</div>
									</div>
								</li>
								<li class="clearfix">
									<a href="" class="user-avatar">
										<img src="../../assets/images/banner/avatar.png" alt="">
									</a>
									<div class="connect-content">
										<div class="connect-content-hd">
											<h4 class="user-name">客户经理A</h4>
											<span class="timestamp">2017-11-11</span>
										</div>
										<div class="connect-content-bd">
											<p>对话框最长情况下就这么长，对话框最长情况下就这么长，对话框最长情况下就这么长，对话框 对话框最长情况下就这么长，对话框最长情况</p>
										</div>
									</div>
								</li>
								<li class="reverse clearfix">
									<a href="" class="user-avatar">
										<img src="../../assets/images/banner/user-avatar.png" alt="">
									</a>
									<div class="connect-content">
										<div class="connect-content-hd">
											<h4 class="user-name">这里是用户名</h4>
											<span class="timestamp">2017-11-11</span>
										</div>
										<div class="connect-content-bd">
											<p>对话框最长情况下就这么长，对话框最长情况下就这么长，对话框最长情况下就这么长，对话框 对话框最长情况下就这么长，对话框最长情况</p>
										</div>
									</div>
								</li>
								<li class="reverse clearfix">
									<a href="" class="user-avatar">
										<img src="../../assets/images/banner/user-avatar.png" alt="">
									</a>
									<div class="connect-content">
										<div class="connect-content-hd">
											<h4 class="user-name">这里是用户名</h4>
											<span class="timestamp">2017-11-11</span>
										</div>
										<div class="connect-content-bd">
											<p>对话框最长情况下就这么长，对话框最长情况下就这么长，对话框最长情况下就这么长，对话框 对话框最长情况下就这么长，对话框最长情况</p>
										</div>
									</div>
								</li>
							</ul>
							<div class="connect-reply">
								<el-input class="reply-input" type="textarea" placeholder="输入信息，不超过200字">
								</el-input>
								<p class="clearfix">
									<el-button type="primary" class="reply-button" size="mini">发送</el-button>
								</p>
							</div>
						</el-tab-pane>
						<el-tab-pane label="机构二" name="second">机构二</el-tab-pane>
						<el-tab-pane label="机构三" name="third">机构三</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
		<footers></footers>
		<div class="wrapMask" :class="{'show':showSuccess}">
			<div class="mask">
				<img src="./success.png" id="success" />
				<h2>{{successText}}</h2>
			</div>
		</div>
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
	import {
		saveManageinfo,
		saveManager,
		getMateInfoByid,
		getMortProjectByid,
		getMateRepInfoByid,
		remove,
		withdrawProject,
		getMateRateByid
	} from '../../api/applyDetail'
	import {
		AuditStatus
	} from 'common/js/AuditStatus'
	import {
		Storage,
		Cookie
	} from 'common/js/common'

	export default {
		data() {
				return {
					tabName: 'first',
					content: '',
					showCxMask: false,
					assureText:'',
					assureType: [{
						value: '信用融资',
						type: 0,
						active: false
					}, {
						value: '房产抵押',
						type: 1,
						active: false
					}, {
						value: '应收账款',
						type: 2,
						active: false
					}, {
						value: '采购订单',
						type: 3,
						active: false
					}, {
						value: '商业承兑汇票',
						type: 4,
						active: false
					}, {
						value: '公司担保',
						type: 5,
						active: false
					}, {
						value: 'pos流水',
						type: 6,
						active: false
					}, {
						value: '其他担保方式',
						type: 7,
						active: false
					}],
					education: [{
						label: "请选择",
						value: 0
					}, {
						label: "博士",
						value: 1
					}, {
						label: "硕士",
						value: 2
					}, {
						label: "本科",
						value: 3
					}, {
						label: "大专",
						value: 4
					}, {
						label: "其他",
						value: 5
					}],
					dynamicForm: [{
						key: "form-1",
						items: [{
							label: "姓名",
							value: "",
							placeholder: "请输入姓名"
						}, {
							label: "职位",
							value: "",
							placeholder: "请输入职位"
						}, {
							label: "学历",
							value: 0,
							type: "select",
							placeholder: "学历"
						}, {
							label: "简介",
							type: "textarea",
							value: "",
							placeholder: "请描述该人员任职履历、主要业绩等"
						}]
					}, {
						key: "form-2",
						items: [{
							label: "姓名",
							value: "",
							placeholder: "请输入姓名"
						}, {
							label: "职位",
							value: "",
							placeholder: "请输入职位"
						}, {
							label: "学历",
							value: 0,
							type: "select",
							placeholder: "学历"
						}, {
							label: "简介",
							value: "",
							type: "textarea",
							placeholder: "请描述该人员任职履历、主要业绩等"
						}]
					}],
					mortgageId: '',
					manageInfo: { //经营情况
						product: '', //主要产品
						customer: //主要客户
							[{
							value: '',
							name: '',
							label: '客户一',
							label2: '销售产品一'
						}, {
							value: '',
							label: '客户二',
							label2: '销售产品二',
							name: ''
						}, {
							value: '',
							label: '客户三',
							label2: '销售产品三',
							name: ''
						}],
						provider: [ //主要供应商
							{
								name: '',
								value: '',
								label: '供应商一',
								label2: '供应产品一'
							}, {
								name: '',
								value: '',
								label: '供应商二',
								label2: '供应产品二'
							}, {
								name: '',
								value: '',
								label: '供应商二',
								label2: '供应产品二'
							}
						]
					},
					showSuccess: false,
					successText: '',
					showBread: true,
					isSearch: Boolean(this.$route.query.search) || false, //从我的社情记录进入
					khInputDisabled: Boolean(this.$route.query.search) || false,
					glInputDisabled: Boolean(this.$route.query.search) || false,
					mortProject: {},
					percentage: 0,
					mateRep: {},
					fileList: [
						[],
						[],
						[],
						[]
					],
					reportUrl:'',
					spanshowLength:1
				}
			},
			computed: {},
			created() {},
			watch: {},
			mounted() {
			},
			methods: {
				filterInterset(val) {
					if(val == '<=7%') {
						val = '不超过7%'
					}else if(val == '<=9%'){
						val = '不超过9%'
					}else if(val == '<=11%'){
						val = '不超过11%'
					}else if(val == '>11%'){
						val = '11%以上'
					}
					return val
				},
				handleClick(tab, event) {
					this.tabName = tab.name
				},
				chq() {
					if(this.mortProject.status == 150) {
						return
					}
					this.showCxMask = true
				},
				_empty(value) {
					empty(value)
				},
				cx() {
					if(this.content == ''){
						this.$alert("撤回原因不能为空")
						return
					}
					withdrawProject({
						id: this.mortgageId,
						content: this.content
					}).then((res) => {
						if(res.code === ERR_OK) {
							this._getMortProjectByid()
							setTimeout(()=>{
								this.showCxMask = false
							},500)
						}
					})
				},
				_getMateRateByid() {
					getMateRateByid({
						mortgageId: this.mortgageId
					}).then((res) => {
						if(res.code === ERR_OK) {
							this.percentage = parseInt(res.data)
							
						}
					})
				},
				handleRemove(file, fileList) {
					if(file.size > 10000000){
						return
					}
					var attachId = file.attachId;
					remove({
						attachId: attachId
					}).then((res) => {
						if(res.code === ERR_OK) {
							this._getMateRepInfoByid()
						}
					})
				},
				filterName(item) {
					var name = ''
					if(item.attachType == 20) {
						name = "最近一期月报"
					} /*else if(item.attachType == 19) {
						name = "最近一期年报"
					}*/ else {
						name = item.attchList[0].extraname.substring(0, 4) + '年财报'
					}
					return name
				},
				initUploadParams(item) {
					return {
						mortgageId: item.attchList[0].mortgageId,
						data: item.attchList[0].extraname,
						attachType: item.attachType,
						token: Cookie.get('token') || ''
					}
				},
				// 上传成功后的回调
				uploadSuccess(response, file, fileList) {
					for(var i = 0; i < fileList.length; i++) {
						if(file.uid == fileList[i].uid) {
							file.attachId = fileList[i].response.data.attachInfo.id
						}
					}
					this._getMateRateByid()
					this._getMateRepInfoByid()
				},
				// 上传错误
				uploadError(response, file, fileList) {
					console.log('上传失败，请重试！')
				},
				beforeAvatarUpload(file) {
					// 上传前对文件的大小的判断
					/*	const extension = file.name.split('.')[1] === 'xls'
						const extension2 = file.name.split('.')[1] === 'xlsx'
						const extension3 = file.name.split('.')[1] === 'doc'
						const extension4 = file.name.split('.')[1] === 'docx'*/
					const isLt2M = file.size / 1024 / 1024 < 10
						/*	if(!extension && !extension2 && !extension3 && !extension4) {
							console.log('上传模板只能是 xls、xlsx、doc、docx 格式!')
						}*/
					if(!isLt2M) {
						/*	console.log('上传模板大小不能超过 10MB!')*/
						this.$alert('上传模板大小不能超过 10MB!')
					}
					/*return extension || extension2 || extension3 || extension4 && isLt2M*/
					return isLt2M
				},
				_getMateRepInfoByid() {
					getMateRepInfoByid({
						mortgageId: this.mortgageId
					}).then((res) => {
						if(res.code === ERR_OK) {
							this.mateRep = res.data
							setInterval(()=>{
								this.spanshowLength++;
								if(this.spanshowLength == 7) {
									this.spanshowLength = 1;
								}
							}, 500);
							var yearObj = {}
							var list = []
							for(var i = 0; i < this.mateRep.length; i++) {
								/*if(this.mateRep[i].attachType == 19) {
									yearObj = this.mateRep[i]
								} else {*/
									list.push(this.mateRep[i])
								/*}*/
							}
						/*	list.unshift(yearObj)*/
							for(var i = 0; i < list.length; i++) {
								this.fileList[i] = []
								for(var j = 0; j < list[i].attchList.length; j++) {
									if(list[i].attchList[j].fileName && list[i].attchList[j].fileUrl) {
										this.fileList[i].push({
											name: list[i].attchList[j].fileName,
											url: list[i].attchList[j].fileUrl,
											attachId: list[i].attchList[j].id
										})
									}
								}
							}
							this.mateRep = list
						}
					})
				},
				statusFormat(status) {
					return AuditStatus(status)
				},
				jsonParse(item) {
					return JSON.parse(item)
				},
				_getMortProjectByid() {
					getMortProjectByid({
						mortgageId: this.mortgageId
					}).then((res) => {
						if(res.code === ERR_OK) {
							//基本信息
							this.mortProject = res.data
							this.mortProject.assureDesc = JSON.parse(this.mortProject.assureDesc)
							this.assureText = this.assureType[this.mortProject.assureType].value
							this.reportUrl = res.data.url
						}
					})
				},
				_getMateInfoByid() {
					getMateInfoByid({
						mortgageId: this.mortgageId
					}).then((res) => {
						if(res.code === ERR_OK) {
							//经营情况
							if(res.data.manageInfo != null) {
								this.manageInfo.product = res.data.manageInfo.product
								this.manageInfo.customer = JSON.parse(res.data.manageInfo.customer)
								this.manageInfo.provider = JSON.parse(res.data.manageInfo.provider)
							}
							//管理人员
							if(res.data.managerList.length > 0) {
								this.dynamicForm = []
								for(var i = 0; i < res.data.managerList.length; i++) {
									this.addMemberForm(res.data.managerList[i].name, res.data.managerList[i].role, res.data.managerList[i].edu, res.data.managerList[i].resume)
								}
							}
						}
					})
				},
				_saveManager() {
					if(this.glInputDisabled) {
						this.glInputDisabled = false
						return
					}
					var content = [];
					for(var i = 0; i < this.dynamicForm.length; i++) {
						var name = '';
						var role = '';
						var edu = '';
						var resume = ''
						for(var j = 0; j < this.dynamicForm[i].items.length; j++) {
							name = this.dynamicForm[i].items[0].value
							role = this.dynamicForm[i].items[1].value
							for(var j = 0; j < this.education.length; j++) {
								if(this.education[j].value == this.dynamicForm[i].items[2].value) {
									if(this.education[j].label == '请选择') {
										edu = ''
									} else {
										edu = this.education[j].label
									}
								}
							}
							resume = this.dynamicForm[i].items[3].value
						}
						if(this.dynamicForm[i].items[0].value == '' || this.dynamicForm[i].items[0].value == null) {} else {
							content.push({
								'name': name,
								'role': role,
								'edu': edu,
								'resume': resume
							})
						}
					}
					saveManager({
						mortgageId: this.mortgageId,
						content: '{list:' + JSON.stringify(content) + '}'
					}).then((res) => {
						if(res.code === ERR_OK) {
							this.showSuccess = true
							this.successText = '保存成功'
							this._getMateRateByid()
							this.glInputDisabled = true
							setTimeout(() => {
								this.showSuccess = false
							}, 1000)
						}
					})
				},
				_saveManageinfo() {
					if(this.khInputDisabled) {
						this.khInputDisabled = false
						return
					}
					saveManageinfo({
						mortgageId: this.mortgageId,
						customer: JSON.stringify(this.manageInfo.customer),
						provider: JSON.stringify(this.manageInfo.provider),
						product: this.manageInfo.product
					}).then((res) => {
						if(res.code === ERR_OK) {
							this.showSuccess = true
							this.successText = '保存成功'
							this._getMateRateByid()
							setTimeout(() => {
								this.showSuccess = false
							}, 1000)
							this.khInputDisabled = true
						}
					})
				},
				addMemberForm(name, role, edu, resume) {
					const suffix = Date.now();
					this.dynamicForm.push({
						/*this.dynamicForm.unshift({*/
						key: "form-" + suffix,
						items: [{
							label: "姓名",
							value: name || "",
							placeholder: "请输入姓名"
						}, {
							label: "职位",
							value: role || "",
							placeholder: "请输入职位"
						}, {
							label: "学历",
							value: edu || "",
							type: "select",
							placeholder: "请选择学历"
						}, {
							label: "简介",
							value: resume ||"",
							type: "textarea",
							placeholder: "曾经就职单位，职务，主要业绩等"
						}]
					});
					setTimeout(() => {
						document.getElementById('manageWrap').scrollTop = document.getElementById('manageWrap').scrollHeight;
					}, 20)
				},
				addMemberForm1() {
					const suffix = Date.now();
					this.dynamicForm.push({
						/*this.dynamicForm.unshift({*/
						key: "form-" + suffix,
						items: [{
							label: "姓名",
							value: "",
							placeholder: "请输入姓名"
						}, {
							label: "职位",
							value: "",
							placeholder: "请输入职位"
						}, {
							label: "学历",
							value: "",
							type: "select",
							placeholder: "请选择学历"
						}, {
							label: "简介",
							value: "",
							type: "textarea",
							placeholder: "曾经就职单位，职务，主要业绩等"
						}]
					});
					setTimeout(() => {
						document.getElementById('manageWrap').scrollTop = document.getElementById('manageWrap').scrollHeight;
					}, 20)
				}
			},
			components: {
				Headers,
				Footers
			},
			created() {
				this.mortgageId = this.$route.query.id
				this._getMortProjectByid()
				this._getMateRepInfoByid()
				this._getMateRateByid()
				if(this.isSearch) { //从我的社情记录进入
					/*this._getMateInfoByid()*/
				}
				this._getMateInfoByid()
			}
	}
</script>
<style>
	.el-select .el-input.is-disabled .el-input__inner{
		cursor: default!important;
	}
	.content-mod .el-input.is-disabled .el-input__icon{
		cursor: default!important;
	}
	.content-article .el-textarea__inner{
		font-family: Microsoft Yahei;
	}
	.content-mod .el-tabs__item.is-active {
		color: #fff;
		background: #409EFF;
	}
	.is-plain.el-button--primary:hover{
		color: #409EFF;
		border-color:#409EFF;
		background: #fff;
	}
	.content-article .el-textarea.is-disabled .el-textarea__inner,
	.content-article .el-input.is-disabled .el-input__inner {
		cursor: default!important;
	}
	
	.content-mod .el-progress-bar__innerText {
		position: relative;
		height: 18px;
		line-height: 18px;
	}
</style>
<style lang="less" scoped>
	@import "./apply.less";
	
	
	/*bread start*/
	
	div.bread {
		height: 34px;
		line-height: 34px;
		border-top: 1px solid #f7f7f7;
		background: rgba(255, 255, 255, 1);
		position: fixed;
		width: 100%;
		top: 80px;
		z-index: 30;
	}
	.report-list li .explain{
		height: 20px;
		line-height: 20px;
		display: inline-block;
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
	
	a.down{
		display: inline-block;
		background: url(./down.png) no-repeat;
		width:21px;
		height: 18px;
		position: relative;
	    top: 4px;
	    left: 2px;
	}
	.manage-member:last-of-type {
		border-bottom: none;
	}
	/*步骤 start*/
	
	.BtnWrap {
		padding-top: 30px;
		text-align: center;
	}
	
	a.next {
		display: inline-block;
		width: 300px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		color: #fff;
		background: #008fff;
		font-size: 16px;
	}
	/*步骤end*/
	/*撤销 start*/
	
	.cxMaskWrap {
		opacity: 0;
		transition: 1s;
		display: none;
	}
	
	.block {
		opacity: 1;
		display: block;
	}
	
	.cxMask {
		width: 100%;
		height: 100%;
		position: absolute;
		background: rgba(0, 0, 0, .2);
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	.cxInfo {
		width: 600px;
		height: 274px;
		background: #f7f7f7;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -137px;
		margin-left: -300px;
	}
	
	.cxInfo h2 {
		height: 64px;
		line-height: 64px;
		font-size: 24px;
		font-family: Microsoft Yahei;
		color: #666;
		font-weight: normal;
		margin-top: 10px;
	}
	
	.cxInfo textarea {
		width: 542px;
		height: 106px;
		border: none;
		border-radius: 4px;
	}
	
	.btnWrap {
		margin-top: 20px;
	}
	
	.btnWrap a {
		display: inline-block;
		width: 98px;
		height: 28px;
		line-height: 28px;
		border: 1px solid #008fff;
		border-radius: 4px;
	}
	
	.btnWrap a.ok {
		background: #008fff;
		color: #fff;
		margin-right: 7px;
	}
	
	.btnWrap a.cance {
		color: #008fff;
		margin-left: 7px;
	}
	/*撤销end*/
	
	.content-article {
		position: relative;
	}
	
	.content-article-bd {
		padding: 20px 30px 15px;
		position: relative;
	}
	
	.sqcpHeader {
		height: 36px;
		line-height: 36px;
		border-bottom: 1px solid #999;
	}
	
	.sqcpHeader h2,
	.sqcpHeader p {
		height: 36px;
		line-height: 36px;
		font-size: 16px;
		width: 530px;
		margin-right: 10px;
		color: #666;
	}
	
	.sqcpHeader h2 {
		color: #008fff;
	}
	
	.sqcpList {
		padding-top: 15px;
	}
	
	.sqcpUlList {
		width: 950px;
	}
	
	.sqcpUlList li {
		height: 44px;
		line-height: 44px;
		float: left;
		width: 490px;
		margin-right: 50px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #666;
	}
	.sqcpUlList li:nth-of-type(even){
		margin-right: 10px;
		width:400px;
	}
	.sqcpUlList li strong {
		color: #666;
	}
	
	div.jd {
		height: 28px;
		line-height: 28px;
		color: #008fff;
		text-align: center;
		font-size: 18px;
	}
	
	div.jd strong {
		color: #666;
	}
	
	.ch {
		display: block;
		text-align: center;
		height: 24px;
		line-height: 24px;
		font-size: 14px;
		color: #999999;
		text-decoration: underline;
	}
	
	div.header #logo {
		/*margin-top: 116px;*/
		margin-top: 80px;
	}
	
	.wrapMask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0);
		z-index: 10;
		opacity: 0;
		transition: .5s;
		display: none;
	}
	
	.show {
		display: block;
		opacity: 1;
	}
	
	.mask {
		width: 200px;
		height: 120px;
		background: rgba(0, 142, 255, .5);
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -100px;
		border-radius: 4px;
	}
	
	.mask h2 {
		color: #fff;
		font-size: Microsoft Yahei;
		font-size: 16px;
		height: 38px;
		line-height: 38px;
		font-weight: bold;
	}
	
	#success {
		margin-top: 22px;
	}
	
	.downBtnReport{
		display: block;
		font-family: "微软雅黑";
		font-size: 14px;
		color: #008fff;
		height: 28px;
		line-height: 28px;
		border-radius: 4px;
		border:1px solid #008fff;
		padding:0 6px;
		margin:1px 0;
	}
</style>
<style>
	/*上传文件start*/
	
	.el-upload-list:after {
		content: '';
		display: block;
		clear: both;
	}
	
	.uploadWrap {
		position: relative;
		width: 900px;
		text-align: center;
	}
	
	.report-list li {
		padding: 24px 0;
	}
	
	.report-list li .tips {
		display: inline-block;
		font-size: 16px;
		display: block;
    	width: 100%;
	}
	
	.report-list li label,
	.report-list li .tips {
		height: 29px;
		line-height: 29px;
		overflow: hidden;
		font-size: 16px;
	}
	
	.uploadWrap .el-button--primary.is-plain {
		color: #008fff;
		background: #fff;
		border-color: #008fff;
		width: 98px;
		height: 28px;
		line-height: 28px;
		padding: 0;
		font-size: 14px;
		position: relative;
		top: 0;
		right: 0;
	}
	
	.uploadWrap .el-upload {
		float: right;
	}
	
	.uploadWrap .el-button--primary.is-plain:hover {
		font-weight: bold;
		background: #fff;
		color: #008fff;
	}
	.uploadWrap .is-plain.el-button--primary:focus, .is-plain.el-button--primary:hover{
		background: #fff !important;
		color: #008fff !important;
	}
	.uploadWrap .el-upload-list {
		position: relative;
		padding: 0 10px;
		top: 0;
		left: 0;
		width: 606px;
	}
	
	.report-list ul.el-upload-list li {
		padding: 0;
		margin: 0;
		float: left;
		border-bottom: none;
	}
	
	.report-list ul.el-upload-list li:hover {
		background: none;
	}
	
	.report-list .el-upload-list__item-name {
		color: #008fff;
		font-size: 16px;
		line-height: 29px;
	}
	
	.report-list .el-upload-list__item {
		width: auto;
		line-height: 28px;
		height: 28px;
	}
	
	.report-list .el-upload-list__item.is-success .el-upload-list__item-status-label {
		display: none;
	}
	
	.report-list .el-icon-document {
		display: none;
	}
	
	.report-list .el-upload-list__item-name {
		display: inline-block;
	}
	
	div.content-mod .el-icon-close:before {
		content: "";
	}
	
	div.content-mod li.is-success .el-icon-close {
		background: url(./del.png) no-repeat right center;
		display: inline-block;
		width: 15px;
		height: 16px;
		top: 0;
		height: 29px;
	}
	
	div.content-mod .el-upload-list__item .el-icon-close {
		top: 0;
		right: 18px;
	}
	
	/*上传文件end*/
</style>