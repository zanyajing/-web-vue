<template>
	<div class="container-cont">
		<div class="m-top">
			<Headers></Headers>
			<Slider v-if="slides.length==3" :slides="slides" :inv="invTime"></Slider>
			<div class="search-wrap">
				<div class="search-content clearfix">
					<div class="clearfix ">
						<ul v-for="area in areas" class="areas">
							<a :href="area.href" :style="{background:'url('+area.img+') top center no-repeat'}" target="_blank" class="area" style="">
								<p class="area-h">{{area.tit}}</p>
								<p class="tit-bor"></p>
							</a>
						</ul>
						
					</div>
				</div>
			</div>
		</div>

		<div class="cont" style="margin-bottom:100px;">
			<div class="situation-list clearfix">
				
				<ul class="situation-list-left">
					<div class="bar bar3" style="border:none;">
						<span class="bar-tit">轻松贷款</span>
					</div>
					<li class="situat-list situat-list2" :style="{background:'url('+imgList[0]+') center no-repeat'}">
						<div class="situat-list-bag">
							<div class="list-cont1">
								<img src="../assets/images/banner/icon2.png" alt="" />
								<p>我有房产 </p>
							</div>
							<div class="list-cont2">
								<p>住宅商铺土地均可抵押 </p>
								<p>快速获得融资</p>
								<div class="list-cont2-bor"></div>
								<router-link :to="{name:'apply',query:{type:1,times:this.termRangeMaxs,loanMoney:this.amountRangeMax}}" class="list-cont2-btn">申请贷款</router-link>
							</div>
						</div>
					</li>
					<li class="situat-list situat-list2" :style="{background:'url('+imgList[1]+') center no-repeat'}">
						<div class="situat-list-bag">
							<div class="list-cont1">
								<img src="../assets/images/banner/icon1.png" alt="" />
								<p>我有应收账款 </p>
							</div>
							<div class="list-cont2">
								<p>通过应收账款保理盘活资金</p>
								<p>实现快速回笼</p>
								<div class="list-cont2-bor"></div>
								<router-link :to="{name:'apply',query:{type:2,times:this.termRangeMaxs,loanMoney:this.amountRangeMax}}" class="list-cont2-btn">申请贷款 </router-link>
							</div>
						</div>
					</li>
					<li class="situat-list situat-list2" :style="{background:'url('+imgList[2]+') center no-repeat'}">
						<div class="situat-list-bag">
							<div class="list-cont1">
								<img src="../assets/images/banner/icon3.png" alt="" />
								<p>我有订单</p>
							</div>
							<div class="list-cont2">
								<p>最高获得订单金额60%贷款 </p>
								<p>有订单就能贷</p>
								<div class="list-cont2-bor"></div>
								<router-link :to="{name:'apply',query:{type:3,times:this.termRangeMaxs,loanMoney:this.amountRangeMax}}" class="list-cont2-btn">申请贷款 </router-link>
							</div>
						</div>
					</li>
					<li class="situat-list" :style="{background:'url('+imgList[3]+') center no-repeat'}">
						<div class="situat-list-bag">
							<div class="list-cont1">
								<img src="../assets/images/banner/icon4.png" alt="" />
								<p>我有商票 </p>
							</div>
							<div class="list-cont2">
								<p>通过商业承兑汇票贴现 </p>
								<p>让商票快速变现</p>
								<div class="list-cont2-bor"></div>
								<router-link :to="{name:'apply',query:{type:4,times:this.termRangeMaxs,loanMoney:this.amountRangeMax}}" class="list-cont2-btn">申请贷款</router-link>
							</div>
						</div>
					</li>
					<li class="situat-list" :style="{background:'url('+imgList[4]+') center no-repeat'}">
						<div class="situat-list-bag">
							<div class="list-cont1">
								<img src="../assets/images/banner/icon5.png" alt="" />
								<p>我有公司担保 </p>
							</div>
							<div class="list-cont2">
								<p>实力公司担保</p>
								<p>无资产也能贷</p>
								<div class="list-cont2-bor"></div>
								<router-link :to="{name:'apply',query:{type:5,times:this.termRangeMaxs,loanMoney:this.amountRangeMax}}" class="list-cont2-btn">申请贷款</router-link>
							</div>
						</div>
					</li>
					<li class="situat-list" :style="{background:'url('+imgList[5]+') center no-repeat'}">
						<div class="situat-list-bag">
							<div class="list-cont1">
								<img src="../assets/images/banner/icon6.png" alt="" />
								<p>我有股权</p>
							</div>
							<div class="list-cont2">
								<p>通过股权质押获得贷款 </p>
								<p>继续享受股权增值</p>
								<div class="list-cont2-bor"></div>
								<router-link :to="{name:'apply',query:{type:7,times:this.termRangeMaxs,loanMoney:this.amountRangeMax}}" class="list-cont2-btn">申请贷款</router-link>
							</div>
						</div>
					</li>
				</ul>
				
				<div class="situation-list-right">
					<div class="bar">
						<span class="bar-tit">搜索贷款</span>
					</div>
					<div class="form">
						<div class="item clearfix">
                           <div class="amount mb38 layoutInput fl">
								<div>贷款金额&nbsp;</div>
								<input type="number" value="" min="0" max="120" v-model="amountRangeMax" placeholder="" />
								<span>万元</span>
						    </div>
						</div>

						<div class="item clearfix">
							<div class="amount mb38 layoutInput fl">
								<div>贷款期限&nbsp;</div>
								<input type="number" value="" maxlength="8" v-model="termRangeMaxs" placeholder="" />
								<span>个月  </span>
						    </div>
						</div>
						<a class="fr fr2 search mb38 clearfix" href="javascript:;" @click="search(amountRangeMax,'',termRangeMaxs)">搜索贷款</a><br/>
                         
                        <ul class="mb38 showSearchAmount clearfix">
							<li>
								<a href="javascript:;" @click="search('50','0','')">50万信用贷</a>&nbsp;
							</li>
							<li>
								<a href="javascript:;" @click="search('100','3','')">100万订单贷</a>&nbsp;
							</li>
							<li>
								<a href="javascript:;" @click="search('500','1','')">500万抵押贷</a>&nbsp;
							</li>
						</ul> 
					</div>
					
					<div class="bar bar2">
						<span class="bar-tit">快速申请</span>
					</div>
					<div class="form form2">
						<div class="item">

							<el-autocomplete class="text-field1 cheangeInputIndex" v-model="enterprise" :fetch-suggestions="querySearchAsync" minlength="2" placeholder="请输入企业名称" @select="autocompleteSelect"></el-autocomplete>
							<div :class="[{alertCont:!enterpriseRight && !firstEr},'opacity0']">请输入企业名称</div>
						</div>

						<div class="item">
							<input type="text" class="text-field" name="" id="" v-model="mobile" maxlength="11" value="" placeholder="请输入手机号" />
							<div :class="[{alertCont:!mobileRight && !firstMr},'opacity0']">请输入正确的手机号</div>
						</div>

						<a href="javascript:;" @click="_queryUserBaseByMobile" class="btn-field">立即申请 </a>

					</div>
					<!--<a :href="toQd" target="_blank">
						<img class="btnField" src="../assets/images/banner/btnLogin.jpg" alt="" style="" />
					</a>-->

				</div>
			</div>
			<div class="hot-loan clearfix">
				<div class="hot-loan-left">
					<div class="bar">
						<span class="bar-tit">贷款超市</span>
						<router-link to='/projectList' class="bar-tit-rig">查看更多 ></router-link>

					</div>
					<ul class="loan-left-list">
						<li v-for="list in lists" class="loan-list clearfix" @click="toInfo(list)">
							<p class="over-hid fl">
								<img :src="list.logourl" />
							</p>
							<div class="fl fl-left">
								<div class="flex1" style="width:510px">
									<p class="over-hid1 clearfix" style="font-size: 16px;text-align: left;color: #008fff;">{{list.name}}</p>
								</div>
								<div class="flex1 clearfix" style="width:510px;margin-top:12px;margin-right:70px;">
									<p class="w142 overHidden fl">额度上限：<span style="color: #008fff;">{{filterAmount(list.amountRangeMax)}}</span>万</p>
									<p class="w134 overHidden fl">贷款期限：<span style="color: #008fff;">{{list.termRangeMax/360}}</span>年</p>
									<p class="w170 overHidden fl">担保条件：{{filterSubType(list.subtype)}}</p>
								</div>
							</div>
							<a href="javascript:;"  class="over-btn">查看详情 </a>
						</li>

					</ul>
				</div>
				<div class="hot-loan-right">
					<div class="bar">
						<span class="bar-tit">我们的优势</span>

					</div>
					<ul class="loan-right-list">
						<li>
							<img src="../assets/images/banner/loan-icon1.jpg" alt="" />
							<div class="right-list-cont">
								<p class="right-list-tit">门槛低 </p>
								<p>2亿数据加持，融资更极客</p>
							</div>

						</li>
						<li>
							<img src="../assets/images/banner/loan-icon2.jpg" alt="" />
							<div class="right-list-cont">
								<p class="right-list-tit">额度高</p>
								<p>专属产品，量身定制更高额度</p>
							</div>

						</li>
						<li>
							<img src="../assets/images/banner/loan-icon3.jpg" alt="" />
							<div class="right-list-cont">
								<p class="right-list-tit">利率低</p>
								<p>智能比价，优选利率最优产品</p>
							</div>

						</li>
						<li>
							<img src="../assets/images/banner/loan-icon4.jpg" alt="" />
							<div class="right-list-cont">
								<p class="right-list-tit">放款快</p>
								<p>直达100+银行，享受业务优先通道</p>
							</div>

						</li>

					</ul>
				</div>
			</div>

			<div class="case-list clearfix">
				<div class="bar">
					<span class="bar-tit">成功案例</span>
					<!--<span class="bar-tit-rig">查看更多 ></span>-->

				</div>
				<div class="case-cont">
					<div class="case-list-cont">
						<img src="../assets/images/banner/case1.jpg" alt="" />
						<div class="case-list-details">
							<p>优化贷款条件</p>
							<div class="case-list-bar"></div>
							<div class="case-list-c">
								<p><img src="../assets/images/titIcon.png" alt="" /><b>项目概况  : </b></p>
								<p style="text-indent:30px;">北京某商贸公司，融资需求300万元，以自有房产抵押提供担保。企业法人王先生合作的银行提供1年期抵押贷款，利率上浮50%。</p><br/>
								<p><img src="../assets/images/titIcon.png" alt="" /><b>解决方案  : </b></p>
								<p style="text-indent:30px;">王先生通过启迪金科平台提出融资申请，最终有7家银行提供了融资解决方案。 王先生最终选择的银行，给予的贷款条件为20年期限，按月等额本息还款，且抵押率达到70%，利率只需上浮30%，通过启迪金科平台王先生获得的贷款条件有较大的提升。</p>
							</div>
						</div>
					</div>
					<div class="case-list-cont">
						<img src="../assets/images/banner/case2.jpg" alt="" />
						<div class="case-list-details">
							<p>无需抵押也能贷款</p>
							<div class="case-list-bar"></div>
							<div class="case-list-c">
								<p><img src="../assets/images/titIcon.png" alt="" /><b>项目概况  : </b></p>
								<p style="text-indent:30px;">广东某服装代工企业，由于下游为上市大企业，应收账款付款周期较长，融资需求200万元，但无法提供房产抵押作为担保，合作的银行无法为其提供贷款。</p><br/>
								<p><img src="../assets/images/titIcon.png" alt="" /><b>解决方案  : </b></p>
								<p style="text-indent:30px;">企业主赵先生通过启迪金科平台提出融资申请，平台为其联系了多家银行后，发现下游的核心企业与某银行长期合作，且拥有较多的供应链授信额度。因此联系该银行为赵先生提供了200万的应收账款融资，且无需房产抵押，解决了赵先生的燃眉之急。</p>
							</div>
						</div>
					</div>
					<div class="case-list-cont">
						<img src="../assets/images/banner/case3.jpg" alt="" />
						<div class="case-list-details">
							<p>解决贷款的疑难杂症</p>
							<div class="case-list-bar"></div>
							<div class="case-list-c">
								<p><img src="../assets/images/titIcon.png" alt="" /><b>项目概况  : </b></p>
								<p style="text-indent:30px;">天津某科技研发企业，是国家高新技术企业，创始人方先生希望保存股权，不引进外部投资，但是企业刚刚盈利，难以支撑较大的研发费用支出，因此希望获得债权融资。</p>
								<p><img src="../assets/images/titIcon.png" alt="" /><b>解决方案  : </b></p>
								<p style="text-indent:30px;">方先生通过启迪金科平台申请了融资，平台为其寻找到某金融机构。该金融机构认可方先生的技术和企业发展前景，为其提供信用融资200万元，以股权及知识产权作为质押担保。方先生在未稀释股权的情况下，获得了债权融资。</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="lore clearfix">
				<div class="bar">
					<span class="bar-tit">贷款学院</span>
					<router-link :to="{name:'knowList'}" class="bar-tit-rig">查看更多 ></router-link>

				</div>
				<div class="lore-main">
					<ul class="header">
						<li @click="loreTg(ix,it)" :class="[{active:ix==index},'list']" v-for="(it,ix) in loreList">{{it.name}}</li>
						<li class="flex1"></li>

					</ul>
					<div class="main clearfix">
						<div>
							<div class="msg" v-for="cont in conts">
								<div>
									<router-link class="title active" :to="{name:'details',query:{id:cont.id}}">{{cont.name}}</router-link>
								</div>
								<div>
									<router-link tag="div" :to="{name:'details',query:{id:cont.id}}" class="msg-main1" >
										<div v-if="cont.summary" >{{cont.summary.substr(0,100)}}<span v-if="cont.summary"><span>......</span><span style="color:#008fff;">详情></span></span></div>
									</router-link>
									
								</div>
							</div>
						</div>
						<div class="flex1"></div>
						<div>
							<ul class="list">
								<router-link tag="li" v-for="item in titles" :key="item.id" :to="{name:'details',query:{id:item.id}}" class="msg-main">
									<span style="margin:0 10px"><img src="../assets/images/titIcon.png" alt="" /></span>
									<span v-html="item.name"></span>
								</router-link>

							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="hot-mechanism clearfix">
				<div class="bar">
					<span class="bar-tit">合作机构</span>
				</div>
				<ul class="hot-mechanism-cont">
					<li><img src="../assets/images/banks/bank1.png" /></li>
					<li><img src="../assets/images/banks/bank2.png" /></li>
					<li><img src="../assets/images/banks/bank3.png"/></li>
					<li><img src="../assets/images/banks/bank4.png" /></li>
					<li><img src="../assets/images/banks/bank5.png" /></li>
					<li><img src="../assets/images/banks/bank6.png" /></li>
					<li><img src="../assets/images/banks/bank7.png" /></li>
					<li><img src="../assets/images/banks/bank8.png" /></li>
				</ul>
				<ul class="hot-mechanism-cont">
					<li><img src="../assets/images/banks/bank9.png" /></li>
					<li><img src="../assets/images/banks/bank10.png" /></li>
					<li><img src="../assets/images/banks/bank11.png" /></li>
					<li><img src="../assets/images/banks/bank12.png" /></li>
					<li><img src="../assets/images/banks/bank13.png" /></li>
					<li><img src="../assets/images/banks/bank14.png" /></li>
					<li><img src="../assets/images/banks/bank15.png" /></li>
					<li><img src="../assets/images/banks/bank16.png" /></li>
				</ul>
				
				<ul class="hot-mechanism-cont">
					<li><img src="../assets/images/banks/bank17.png" /></li>
					<li><img src="../assets/images/banks/bank18.png" /></li>
					<li><img src="../assets/images/banks/bank19.png" /></li>
					<li><img src="../assets/images/banks/bank20.png" /></li>
					<li><img src="../assets/images/banks/bank21.png" /></li>
					<li><img src="../assets/images/banks/bank22.png" /></li>
					<li><img src="../assets/images/banks/bank23.png" /></li>
					<li><img src="../assets/images/banks/bank24.png" /></li>
				</ul>
				
				<ul class="hot-mechanism-cont">
					<li><img src="../assets/images/banks/bank25.png" /></li>
					<li><img src="../assets/images/banks/bank26.png" /></li>
					<li><img src="../assets/images/banks/bank27.png" /></li>
					<li><img src="../assets/images/banks/bank28.png" /></li>
					<li><img src="../assets/images/banks/bank29.png" /></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>

		</div>
		<Footers></Footers>
	</div>
</template>

<script>
	import Slider from 'base/slider/slider'
	import Headers from 'components/header/header'
	import Footers from 'components/footer/footer'
	import {
		queryUserBaseByMobile
	} from 'api/index'
	import {
		ERR_OK
	} from 'api/config'
	import {
		hotLoan
	} from 'api/index'
	import {
		banner
	} from 'api/index'
	import {
		knowledge
	} from 'api/index'
	import {
		searchByKey
	} from 'api/searchByKey'
	import {
		Storage,
		Cookie
	} from 'common/js/common'
	import {
		queryInfo
	} from "api/queryInfo"
	export default {
		name: 'HelloWorld',

		data() {
			return {
				options: [],
				loading: false,
				mobile: '',
				isDis:true,
				enterprise: '',
				alertCont1: '',
				alertCont2: '',
				conts: [],
				titles: [],
				firstMr: true,
				firstEr: true,
				termRange: '',				
				areas:[
					{img:require('../assets/images/Area1.png'),
					 tit:'OFO供应链专区',
					 href:"#/apply?loanMoney=&times=&type=2&id=8"
					},
					{img:require('../assets/images/Area2.png'),
					 tit:'启迪之星专区',
					 href:"https://star.tusjf.com/web-gyl/qd/index.html"
					},
					{img:require('../assets/images/Area3.png'),
					 tit:'启迪数字专区(敬请期待)' 
					},
					{img:require('../assets/images/Area4.png'),
					 tit:'临沂小商品城专区(敬请期待)' 
					},
//					require('../assets/images/Area2.png'),
//					require('../assets/images/Area3.png'),
//					require('../assets/images/Area4.png'),
					
				],
				/*banner:require('../assets/images/banner1.jpg'),*/
				imgList: [
					require('../assets/images/banner/situat-list1.jpg'),
					require('../assets/images/banner/situat-list2.jpg'),
					require('../assets/images/banner/situat-list3.jpg'),
					require('../assets/images/banner/situat-list4.jpg'),
					require('../assets/images/banner/situat-list5.jpg'),
					require('../assets/images/banner/situat-list6.jpg'),
				],
				loreList: [{
					name: "贷款攻略",
					subtype: 8
				}, {
					name: "担保知识",
					subtype: 9
				}, {
					name: "精选问答 ",
					subtype: 10
				}],
				index: 0,
				legalPerson: '',
				entRegAmount:'',
				restaurants: '',
				lists: [{
						imgs: require("../assets/images/banner/bank1.jpg"),
						over1: "浦发银行-现代派现代派现代",
						over2: "限时超大力度促销，利润最低至5折利润最低至5折"
					}, {
						imgs: require("../assets/images/banner/bank1.jpg"),
						over1: "浦发银行-现代派现代派现代",
						over2: "限时超大力度促销，利润最低至5折利润最低至5折"
					}, {
						imgs: require("../assets/images/banner/bank1.jpg"),
						over1: "浦发银行-现代派现代派现代",
						over2: "限时超大力度促销，利润最低至5折利润最低至5折"
					}, {
						imgs: require("../assets/images/banner/bank1.jpg"),
						over1: "浦发银行-现代派现代派现代",
						over2: "限时超大力度促销，利润最低至5折利润最低至5折"
					}

				],
				invTime: 5000,
				/*slides: [{
					src: require('../assets/images/banner1.jpg'),
					title: '',
					href: 'javascript:;'
				}, {
					src: require('../assets/images/banner2.jpg'),
					title: '',
					href: 'javascript:;'
				}, {
					src: require('../assets/images/banner3.jpg'),
					title: '',
					href: 'javascript:;'
				}],*/
				slides: [],
				showInfo: true,
				showSearchAmount: true,
				amountRangeMax: '',
				termRangeMaxs: '',
				toQd:'https://star.tusjf.com/web-gyl/qd/index.html'
			}
		},
		methods: {
			toInfo(list){
				this.$router.push({name:'fncDetails',query:{id:list.id,logourl:list.logourl,times:this.termRangeMaxs,loanMoney:this.amountRangeMax}});
			},
			filterSubType(value) {
				switch(value) {
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
			filterAmount(value) {
				if(!value) {
					value = '--'
				}
				return value
			},
			autocompleteSelect(item) {
				this.legalPerson = item.legalPerson;
				this.entRegAmount = item.entRegAmount;
			},
			querySearchAsync(queryString, cb) {
				if(!queryString || queryString.length < 2) {
					cb([]);
					return;
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
			remoteMethod(query) {
				if(query !== '') {
					this.loading = true;
					searchByKey({
						entName: query
					}).then((res) => {
						this.loading = false;
						if(res.data.datas != null) {
							let data = JSON.parse(res.data.datas)
							this.options = data.list.map(item => {
								return {
									value: item.entName,
									label: item.entName
								};
							});
						}
					})
				} else {
					this.options = [];
				}
			},
			search(amout, type, termRange) {
				this.$router.push({
					name: 'projectList',
					params: {
						'amountRangeMax': amout,
						'type': type,
						'termRangeMaxs': termRange
					}
				});
			},
			_queryUserBaseByMobile() {
				this.firstMr = false;
				this.firstEr = false;
				//校验输入信息是否符合格式
				if(!this.enterprise || !this.mobileRight) {
					return;
				}
				if(this.$store.state.userInfo.nickname) {
					this.$router.push({
						name: 'apply',
						query: {
							enterprise: this.enterprise,
							mobile: this.mobile,
							legalPerson: this.legalPerson,
							entRegAmount:this.entRegAmount
						}
					})
					return;
				}
				localStorage.setItem("enterprise", this.enterprise);
				//发起快速注册请求
				queryUserBaseByMobile(this.mobile).then((res) => {
					if(res.code === ERR_OK) {

						if(!res.data.userinfo) {
							this.$router.push({
								name: 'register',
								query: {
									mobile: this.mobile,
									enterprise: this.enterprise,
									redirect: encodeURIComponent('/apply?mobile=' + this.mobile + '&enterprise=' + this.enterprise +'&entRegAmount=' + this.entRegAmount + '&legalPerson=' + this.legalPerson)
								}
							})

						} else {
							this.$router.push({
								name: 'login',
								query: {
									mobile: this.mobile,
									redirect: encodeURIComponent('/apply?mobile=' + this.mobile + '&enterprise=' + this.enterprise +'&entRegAmount=' + this.entRegAmount + '&legalPerson=' + this.legalPerson)
								}
							})

						}

					}
				})
			},
			loreTg(ix, it) {

				this.index = ix;
				this._knowledge(it.subtype, 0, 10);
				this._knowledge(it.subtype, 1, 3);

			},
			_hotLoan() {
				hotLoan({
					pageNo: 1,
					pageSize: 5,
					hotflag: 1,
					platformSource: 2,

				}).then((res) => {
					this.lists = res.data.productList

				})

			},
			_knowledge(subtype, hotflag, pageSize) {
				knowledge({
					pageNo: 1,
					pageSize: pageSize,
					//hotflag: hotflag,
					type: 6,
					subtype: subtype

				}).then((res) => {
//					if(pageSize == 3) {
//						this.conts = res.data.messageList.splice(0,3)
//
//					} else {
//						this.titles = res.data.messageList.splice(3,7)
//
//					}
					this.conts = res.data.messageList.slice(0,3);
					this.titles = res.data.messageList.slice(3,13);
				})
			},
			_queryInfo() {
				queryInfo().then((res) => {
					if(res.code === ERR_OK) {
						this.userInfo = {
							email: res.data.email,
							headImgUrl: res.data.headImgUrl,
							mobile: res.data.mobile,
							nickname: res.data.nickname
						}
						this.$store.commit('updateUserInfo', this.userInfo);
					}
				})
			}
		},
		computed: {
			enterpriseRight() {
				return this.enterprise
			},
			mobileRight() {
				return /^1[3|4|5|8][0-9]\d{8}$/.test(this.mobile)
			}
		},
		created(){
			banner().then((res) => {
				for(var i =0;i<res.data.bannerList.length;i++){
					this.slides.push({
						src:res.data.bannerList[i].img,
						title:'',
						href:'javascript:;'
					})
				}
			})
		},
		mounted() {
			this.$nextTick(res => {
				this._hotLoan();
				this._knowledge(8, 1, 3);
				this._knowledge(8, 0, 10);
				if(this.$route.query.token) {
					Cookie.set('token', this.$route.query.token,30)
					this._queryInfo()
				}
			})
			this.toQd = this.toQd +'?token=' +	Cookie.get('token')
		},
		components: {
			Slider,
			Footers,
			Headers
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
	@import "../assets/css/index.less";
	.m-top {
		position: relative;
		padding-bottom: 100px;
	}
	/*search start*/
	.dis{
		display:none;
	}
	.search-wrap {
		width: 1200px;
		background: rgba(255, 255, 255, .4);
		/*padding: 30px;*/
		box-sizing: border-box;
		margin: 0 auto;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-600px);
		-moz-box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
		-webkit-box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
		box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
	}
	
	/*.search-content {
		background: #fff;
		-moz-box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
		-webkit-box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
		box-shadow: 8px 4px 28px rgba(0, 0, 0, .4);
		padding: 50px 40px 0 50px;
		
	}*/
	
	a.search {
		display: block;
		width: 240px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 14px;
		background: #008fff;
		color: #fff;
		border-radius:4px ;
	}
	.fr2{
		float:left;
		margin-left:30px;
	}
	
	.layoutInput div {
		float: left;
		height: 60px;
		line-height: 40px;
		color: #333;
		padding-right: 10px;
	}
	
	.layoutInput {
		margin-left: 26px;
		position: relative;
	}
	
	.layoutInput input {
		float: left;
		height: 20px;
		line-height: 20px;
		padding: 10px 46px 9px 16px;
		border: 1px solid #999999;
		border-radius: 4px;
		width: 100px;
		text-align: left;
		font-size: 12px;
	}
	
	.layoutInput span {
		position: absolute;
		top: 12px;
		left: 200px;
		font-size: 12px;
	}
	.loan-list:hover{
	cursor:pointer;
	}
	.showSearchAmount {
		/*width: 216px;*/
		margin:0 auto;
		clear: both;
	}
	
	.showSearchAmount li {
		clear: both;
		display: inline-block;
		
	}
	
	.showSearchAmount li a {
		color: #036eb8;
		font-size: 12px;
		text-decoration: underline;
		height: 30px;
		line-height: 30px;
		float:left;
		display: inline-block!important;
	}
	
	.mb38 {
		clear: both;
		margin-bottom: 10px;
	}
	/*search end*/
	
	.case-list-cont {
		cursor: default;
	}
	.w142{
		width:156px;
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
		width:185px;
		margin-right: 10px;
		text-align: left;
	}
	.msg-main1{
		height:80px;
		font-size:14px;
		line-height:26px;
		color:#666666;
		letter-spacing: 0.5px;
	}
	.bar2{
		margin-top:40px;
	}
	.bar3{
		margin-top:30px;
	}
</style>
<style>
	.cheangeInputIndex .el-input__inner {
		border: none !important;
		background: none;
		 border-radius: 4px;
	}
	
	.cheangeInputIndex .el-scrollbar {
		text-align: left;
	}
	
	.cheangeInputIndex input {
		font-size: 16px !important;
	}
	
	.el-autocomplete-suggestion li {
		text-align: left;
	}
</style>