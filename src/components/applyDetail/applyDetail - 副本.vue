<template>
	<div>
		<div class="header">
			<headers :showBread="showBread" :inowBread="inowBread" :prevBread="prevBread" :prevUrl="prevUrl"></headers>
			<img src="./logo.png" id="logo" />
			<div class="steps">
				<img src="./steps.png" />
			</div>
		</div>
		<div class="content">
			<div class="content-mod">
				<h2 class="title">基本信息</h2>
				<div class="content-article">
					<div class="content-article-bd">
						<div class="sqcpHeader clearfix">
							<h2 class="fl overHidden"><strong class="">申请产品:</strong><span v-if="mortProject.provider">{{mortProject.provider}}-</span>{{mortProject.name}}</h2>
							<p class="fl"><strong>申请日期：</strong>{{mortProject.createtime}}</p>
						</div>
						<div class="sqcpList clearfix">
							<ul class="sqcpUlList fl">
								<li><strong>企业名称：</strong>{{mortProject.entName}}</li>
								<li><strong>联系电话：</strong>{{mortProject.mobile}}</li>
								<li><strong>企业法人：</strong>{{mortProject.legalPerson}}</li>
								<li><strong>注册资金：</strong>{{mortProject.regAmount}}万</li>
								<li><strong>贷款金额：</strong>{{mortProject.amount}}万</li>
								<li><strong>贷款期限：</strong>{{mortProject.periodNum}}月</li>
								<li><strong>可接受利率：</strong>{{mortProject.interestRange}}</li>
								<li><strong>用款时间：</strong>{{mortProject.usetime}}天内</li>
								<li><strong>担保方式：</strong>{{assureType[mortProject.type].value}}</li>
								<li v-for="item in jsonParse(mortProject.assureDesc)">
									<strong>{{item.name}}：</strong>{{item.value}}{{item.unit}}
								</li>
							</ul>
							<div class="fl jd">
								<strong>当前进度：</strong>{{statusFormat(mortProject.status)}}
							</div>
							<a href="javscript:;" class="fl ch">撤回申请&gt;</a>
						</div>
					</div>
				</div>
			</div>
			<div class="content-mod">
				<h2 class="title">材料信息</h2>
				<div class="content-article information-card">
					<el-tabs type="card" value="first">
						<el-tab-pane label="财务报表" name="first">
							<ul class="report-list">
								<li class="clearfix">
									<label class="fl">最近一期月报</label>
									<span class="tips fl">（上传可提高贷款成功率）</span>
									<el-upload class="fr uploadWrap" action="/material/upload.shtml" :data="uploadData" :onError="uploadError" :onSuccess="uploadSuccess" :beforeUpload="beforeAvatarUpload">
										<el-button class="btn-upload"  plain type="primary" size="mini">上传文件&gt;</el-button>
									</el-upload>
								</li>
								<!--<li>
									<label>2016年财报</label>
									<span class="tips">（上传可提高贷款成功率）</span>
									<el-button class="btn-upload" plain type="primary" size="mini">上传文件&gt;</el-button>
								</li>
								<li>
									<label>2015年财报</label>
									<span class="tips">（上传可提高贷款成功率）</span>
									<el-button class="btn-upload" plain type="primary" size="mini">上传文件&gt;</el-button>
								</li>
								<li class="upload">
									<label>2014年财报</label>
									<span class="tips">（已上传）</span>
									<div class="upload-file">
										<span>文件名</span>
										<i class="el-icon-delete"></i>
									</div>
									<el-button class="btn-upload" type="primary" size="mini">重新上传</el-button>
								</li>-->
								<li class="explain-item">
									<span class="explain">说明</span>
									<span>1.上传文件大小10M以内；</span>
									<span>2.文件上传后，可以修改和删除。</span>
								</li>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="经营情况" name="second">
							<el-form class="manage-from" label-width="120px">
								<el-form-item label="主营产品">
									<el-input type="textarea" v-model="manageInfo.product" placeholder="填写主要经营模式，主营产品"></el-input>
								</el-form-item>
								<el-form-item label="主要客户名称">
									<div style="margin-bottom: 20px;" v-for="item in manageInfo.customer">
										<el-input :placeholder="item.label" v-model="item.name"></el-input>
										<el-input :placeholder="item.label2" v-model="item.value"></el-input>
									</div>
								</el-form-item>
								<el-form-item label="主要供应商名称">
									<div style="margin-bottom: 20px;" v-for="item in manageInfo.provider">
										<el-input :placeholder="item.label" v-model="item.name"></el-input>
										<el-input :placeholder="item.label2" v-model="item.value"></el-input>
									</div>
								</el-form-item>
								<el-button type="primary" size="large" @click="_saveManageinfo">保存&gt;</el-button>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="管理人员" name="third" class="manage-tab">
							<div class="manage-member-wrap">
								<el-form class="manage-member" label-width="40px" v-for="form in dynamicForm" :key="form.key">
									<el-form-item v-for="(item, idx) in form.items" :key="idx" :label="item.label">
										<el-input v-if="item.type != 'select'" v-model="item.value" :type="item.type" :placeholder="item.placeholder"></el-input>
										<el-select v-model="item.value" v-if="item.type == 'select'">
											<el-option v-for="(option, idx) in education" :key="idx" :label="option.label" v-model="option.value"></el-option>
										</el-select>
									</el-form-item>
								</el-form>
							</div>
							<a href="javascript:;" class="add-member" @click="addMemberForm"><i class="el-icon-circle-plus-outline"></i>添加管理人员</a>
							<el-button type="primary" @click="_saveManager" size="large">保存&gt;</el-button>
						</el-tab-pane>
					</el-tabs>
					<div class="progress-information">
						<label>资料完整度</label>
						<el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>
						<span class="tips">资料越完整，获得融资概率越高哦！</span>
					</div>
				</div>
			</div>
			<div class="content-mod">
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
									<el-button type="primary" class="reply-button" size="mini">发送&gt;</el-button>
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
		getMateRepInfoByid
	} from '../../api/applyDetail'
	import {
		AuditStatus
	} from 'common/js/AuditStatus'
	import {
		Storage
	} from 'common/js/common'
	const assureTypeData = [{
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
	}]

	const educationData = [{
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
	}]

	export default {
		data() {
				return {
					assureType: assureTypeData,
					education: educationData,
					dynamicForm: [{
						key: "form-1",
						items: [{
							label: "姓名",
							value: "",
							placeholder: "请输入姓名"
						}, {
							label: "职位",
							value: "",
							placeholder: "工程师"
						}, {
							label: "学历",
							value: 1,
							type: "select",
							placeholder: "学历"
						}, {
							label: "简介",
							type: "textarea",
							value: "",
							placeholder: "曾经就职单位，职务，主要业绩等"
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
							placeholder: "工程师"
						}, {
							label: "学历",
							value: 2,
							type: "select",
							placeholder: "学历"
						}, {
							label: "简介",
							value: "",
							type: "textarea",
							placeholder: "曾经就职单位，职务，主要业绩等"
						}]
					}],
					mortgageId: getQueryString('id'),
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
					inowBread: '补充材料',
					prevBread: '贷款助手',
					prevUrl: '/',
					isSearch: getQueryString('search') || false, //从我的社情记录进入
					mortProject: {},
					percentage: 0,
					uploadData: {
						mortgageId: '60001085',
						data: '2017',
						attachType: 'ATTACH_YEAR_17',
						token: Storage.get('token') || ''
					},
					mateRep:{}
				}
			},
			computed: {},
			created() {},
			watch: {},
			mounted() {},
			methods: {
				// 上传成功后的回调
				uploadSuccess(response, file, fileList) {
					console.log('上传文件', response)
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
							console.log(res.data)
							this.mateRep = res.data
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
								console.log('经营情况')
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
							//基本信息
							this.mortProject = res.data.mortProject
						}
					})
				},
				_saveManager() {
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
									edu = this.education[j].label
								}
							}
							resume = this.dynamicForm[i].items[3].value
						}
						content.push({
							'name': name,
							'role': role,
							'edu': edu,
							'resume': resume
						})
					}
					saveManager({
						mortgageId: this.mortgageId,
						content: '{list:' + JSON.stringify(content) + '}'
					}).then((res) => {
						if(res.code === ERR_OK) {
							this.showSuccess = true
							this.successText = '上传成功'
							setTimeout(() => {
								this.showSuccess = false
							}, 1000)
							this.percentage = parseInt(this.percentage) + parseInt(Math.ceil('33.333333'))
						}
					})
				},
				_saveManageinfo() {
					saveManageinfo({
						mortgageId: this.mortgageId,
						customer: JSON.stringify(this.manageInfo.customer),
						provider: JSON.stringify(this.manageInfo.provider),
						product: this.manageInfo.product
					}).then((res) => {
						if(res.code === ERR_OK) {
							this.showSuccess = true
							this.successText = '上传成功'
							setTimeout(() => {
								this.showSuccess = false
							}, 1000)
							this.percentage = parseInt(this.percentage) + parseInt(Math.ceil('33.333333')) + ''
						}
					})
				},
				addMemberForm(name, role, edu, resume) {
					const suffix = Date.now();
					this.dynamicForm.push({
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
							value: resume || "",
							type: "textarea",
							placeholder: "曾经就职单位，职务，主要业绩等"
						}]
					});
				}
			},
			components: {
				Headers,
				Footers
			},
			created() {
				this._getMortProjectByid()
				this._getMateRepInfoByid()
				if(this.isSearch) { //从我的社情记录进入
					this._getMateInfoByid()
				}
			}
	}
</script>

<style lang="less">
	@import "./apply.less";
	/*上传文件start*/
	
	.uploadWrap {
		position: relative;
		width: 730px;
		text-align: center;
	}
	
	.report-list li {
		padding: 24px 0;
	}
	
	.report-list li .tips {
		display: inline-block;
		font-size: 16px;
	}
	
	.report-list li label,
	.report-list li .tips {
		height: 29px;
		line-height: 29px;
		overflow: hidden;
		font-size: 16px;
	}
	
	.el-button--primary.is-plain {
		color: #008fff;
		background: #fff;
		border-color: #008fff;
		width: 98px;
		height: 28px;
		line-height: 28px;
		padding: 0;
		font-size: 14px;
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.el-button--primary.is-plain:hover {
		font-weight: bold;
		background: #fff;
		color: #008fff;
	}
	
	.el-upload-list {
		position: absolute;
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
	
	.el-upload-list__item-name {
		color: #008fff;
		font-size: 16px;
		line-height: 29px;
	}
	
	.el-upload-list__item {
		width: auto;
	}
	
	.el-upload-list__item.is-success .el-upload-list__item-status-label {
		display: none;
	}
	
	.el-icon-document {
		display: none;
	}
	
	.el-upload-list__item-name {
		display: inline-block;
	}
	
	.el-icon-close:before {
		content: "";
	}
	
	.el-icon-close {
		background: url(./del.png) no-repeat right center;
		display: inline-block;
		width: 15px;
		height: 16px;
		top: 0;
		height: 29px;
	}
	
	.el-upload-list__item .el-icon-close {
		top: 0;
		right: 18px;
	}
	/*上传文件end*/
	
	.content-article-bd {
		padding: 20px 30px 15px;
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
		width: 350px;
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
		width: 720px;
	}
	
	.sqcpUlList li {
		height: 44px;
		line-height: 44px;
		float: left;
		width: 340px;
		margin-right: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #666;
	}
	
	.sqcpUlList li strong {
		color: #666;
	}
	
	div.jd {
		height: 44px;
		line-height: 44px;
		color: #008fff;
		width: 260px;
	}
	
	div.jd strong {
		color: #666;
	}
	
	.ch {
		width: 98px;
		display: block;
		text-align: center;
		height: 28px;
		border: 1px solid #008fff;
		border-radius: 4px;
		line-height: 28px;
		font-size: 14px;
		color: #008fff;
		position: relative;
		top: 7px;
	}
	
	div.header #logo {
		margin-top: 116px;
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
</style>