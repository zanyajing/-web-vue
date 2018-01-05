<template>
	<div class="contenter">
		<div class="m-top">
			<Headers>

			</Headers>
			<div class="bread">
				<div class="bread-content">
					<a href="./index.html">贷款助手 ></a>
					<router-link :to="{name:'projectList'}">贷款超市></router-link>
					<span>产品详情</span>
				</div>
			</div>
			<img :src="banner" class="logo">
			<div class="search-wrap">

				<div class="search-content clearfix">
					<div class="details">
						<div class="detailsLi">
							<img :src="$route.query.logourl" alt="" />
						</div>
						<div class="details-rig">
							<p>{{name}}</p>
							<p>{{provider}}</p>
						</div>
					</div>
					<div class="amountLayout">
						<div class="amount layoutInput fl">
							<div >贷款金额:</div>
								<input type="number" class="amountCont" maxlength="8" v-model="searchAmountRangeMax"/>
							<span >万元</span>
						</div>
						<div  class="amount layoutInput fl">
							<div>贷款期限:</div>
								<input type="number" class="amountCont" maxlength="8" v-model="termRangeMaxs"/>
							<span>个月</span>
						</div>
						<router-link :to="{name:'apply',query:{loanMoney:this.searchAmountRangeMax,times:this.termRangeMaxs,type:$route.query.type,id:$route.query.id}}" class="btn-field" >立即申请  </router-link>
						<!--<div class="quq">
							<p><span>1600</span>人已成功申请</p>
							<p class="quq-r">
								<img src="../../assets/images/banner/xing.png" alt="" />
								<img src="../../assets/images/banner/xing.png" alt="" />
								<img src="../../assets/images/banner/xing.png" alt="" />
								<img src="../../assets/images/banner/xing2.png" alt="" />
								<img src="../../assets/images/banner/xing3.png" alt="" />
							</p>
						</div>-->
					</div>
					<div class="amountLayout2">

						<div  class="amountCont">
							<div  class="amountDet">
								<img src="../../assets/images/banner/limit1.png" alt="" />
								<div class="amountCont-l">
									<p>额度上限</p>
									<p><span>{{amount}}</span> 万元</p>
								</div>
							</div>
						</div>
						<div  class="amountCont">
							<div  class="amountDet">
								<img src="../../assets/images/banner/limit2.png" alt="" />
								<div class="amountCont-l">
									<p>期限上限</p>
									<p><span>{{termRange}}</span> 个月</p>
								</div>
							</div>
						</div>
						<div  class="amountCont">
							<div  class="amountDet" style="width:190px;">
								<img src="../../assets/images/banner/limit3.png" alt="" />
								<div class="amountCont-l">
									<p>担保条件</p>
									<p><span>{{type}}</span></p>
								</div>
							</div>
						</div>
					</div>
					<div class="features">
						<!--<div class="details-left">
							产品特征：
						</div>
						<div class="details-rig">
							{{descp}}
						</div>-->
					</div>
				</div>
			</div>
		</div>

		<div class="condition clearfix">
			<div class="condition-left">
				<bar :productName="'产品特征'"></bar>
				<div class="condition-cont">
					{{descp}}
				</div>

				<bar :productName="'适用对象'"></bar>
				<div class="condition-cont">
					{{condit}}
				</div>

				<bar :productName="'业务流程'"></bar>
				<div class="condition-cont">
					{{operflow}}
				</div>

				<!--<bar :productName="'担保方式说明'"></bar>
				<div class="condition-cont">
					{{assuredesc}}
				</div>-->

				<bar :productName="'材料清单'"></bar>
				<div class="condition-cont">
					{{material}}
				</div>
			</div>
			<div class="condition-right">

			  <!--<quickApply :money="loanMoney" :time="times"></quickApply>-->
	          <!--<div class="kong"></div>-->
	           <bar :productName="'其他热门产品'"></bar>
			  <ul class="loan-right-list" >
	            <router-link :key="list.id" :to="{name:'fncDetails',query:{id:list.id,type:list.type,logourl:list.logourl,searchAmountRangeMax:searchAmountRangeMax,termRangeMaxs:termRangeMaxs}}"  target='_blank' class="loan-sty" v-for="list in lists" >

	              <!--<img :src="list.logourl" alt="" />-->
				  <img :src="list.logourl"/>
	              <div class="right-list-cont">
	                <p class="right-list-tit">{{list.name}}</p>
	                <!--<p>{{list.descp}}</p>-->
	              </div>

	            </router-link>

	          </ul>

			</div>


		</div>

		<Footers></Footers>
	</div>
</template>

<script>
  import Footers from 'components/footer/footer'
  import Bar from 'components/bar/bar'
  import QuickApply from 'components/quickApply/quickApply'
  import {ERR_OK} from 'api/config'
  import {details} from 'api/index'
  import {hotLoan} from 'api/index'
  import Headers from 'components/header/header'

  export default {
    name: 'HelloWorld',

     data() {
      return {
      	index:0,
      content:'热门贷款详情',
      showBread:true,
      logourl:'',
      loanMoney:this.$route.query.loanMoney||'',
      times:this.$route.query.times||'',
      searchAmountRangeMax:this.$route.query.searchAmountRangeMax||'',
      termRangeMaxs:this.$route.query.termRangeMaxs||'',
      type:'',
      termRange:'',
      condit:'',
      amount:'',
      name:'',
      lists:'',
      descp:'',
      types:'',
      provider:'',
      operflow:'',
      material:'',
      assuredesc:'',
      assureType:'',
      amountRangeMax:'',
      assuredesc:'',
      inowBread: '热门贷款详情',
	  prevBread: '产品详情',
	  prevUrl: './index.html',
	  productName:'额度上限',
	  id:this.$route.query.id,
	  banner:require('../../assets/images/banner/logo.png'),
      }
     },
     methods:{

          _details(){
        	details({
        		id:this.$route.query.id
        	}).then((res)=>{
        		this.logourl=res.data.logourl;
        		this.name=res.data.name;
        		this.descp=res.data.descp;
        		this.amountRangeMax=res.data.amountRangeMax;
        		this.assuredesc=res.data.assuredesc;
        		this.operflow=res.data.operflow;
        		this.material=res.data.material;
        		this.assureType=res.data.assureType;
        		this.provider=res.data.provider;
        		this.condit=res.data.condit;
		   		this.termRange=Math.round(res.data.termRangeMax/30);
		   		this.amount=this.amountRangeMax;
		   		
		   		const ary = ["信用融资","房产抵押","应收账款","采购订单","商业承兑汇票","公司担保","pos流水","其他担保方式 "];
	   		 	this.type= ary[Number(res.data.subtype)];
        	})
         },
          _hotLoan(){
		      hotLoan({
		      	pageNo:1,
		      	pageSize:4,
		      	hotflag :1,
		      	platformSource:2,
		      }).then((res)=>{
		      	this.lists=res.data.productList
		      })

	       },
	       init () {
	         this._details();
	   		 this. _hotLoan();

	   		 
	   		 // ary是数组 数组下标
//	   		 this.types="信用融资 、房产抵押、 应收账款 、采购订单、 商业承兑汇票 、公司担保 、pos流水、 其他担保方式 "
	       }
       },
     created(){
     	window.scrollTo(0, 0);

     },
//   watch : {
//   	loanMoney (newval,oldval){
//			if(newval > this.amount){
//				this.loanMoney = this.amount;
//			}
//   	},
//   	times (newval,oldval){
//   		if(newval > this.termRange){
//				this.times = this.termRange;
//			}
//   	}
//   },
	 watch: {
	 	//$route () {
	 		//this._details();
   		 //this.init()

	 	//}
	 },
      mounted(){

      this.$nextTick(res => {
   		// this._details();
   		 this.init()
      })
    },
     components: {
      Footers,
      Headers,
      Bar,
      QuickApply
    }
   }
</script>

<style scoped lang="less">
	.m-top{
	position: relative;
    padding-bottom: 100px;
	}
	.quq{
		margin-left:10px;
		span{
			color:#0090ff;
		}
	}
  .logo{
  	height: 201px;
    width: 100%;
    margin-top:115px;
    background-size: auto 201px;
  }
  .search-wrap {
  	text-align: left;
    width: 1200px;
    background: rgba(255, 255, 255, .4);
    padding: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    top:200px;
    left: 50%;
    -webkit-transform: translateX(-600px);
    transform: translateX(-600px);
  }
  .search-content{
    height: auto;
    background: #fff;
    -webkit-box-shadow: 0px 0px 28px rgba(0, 0, 0, .4);
    box-shadow: 0px 0px 28px rgba(0, 0, 0, .4);
    /*padding: 40px 40px 0 60px;*/
  }
  .details{
  	background:rgb(0,143,255);
  	height:100px;
  	display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    flex-flow: wrap;
  	.detailsLi{
  		margin:0 18px 0 20px;
  		float:left;
  		font-size:14px;
  		img{
  		 vertical-align: middle;
  		 max-height:60px;
  		 /*margin-top:5px;*/
  		 display: block;
  		}
  	}
  	.details-rig{
  		float:left;
  		color:#fff;
  		>p:nth-child(2){
  		 font-size:14px;
  		 margin-top:7px;
  		}
  		>p:nth-child(1){
  		 font-size:20px;
  		}

  	}
  }
   .btn-field{
        width: 160px;
    	height: 40px;
        text-align: center;
        display:inline-block;
        font-size: 16px;
        color:#fff;
        line-height:40px;
        cursor: pointer;
        background:rgb(0,144,255);
        border-radius: 5px;
    }


  .amountLayout{
  	height:100px;
  	padding-left:96px;
  	display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    flex-flow: wrap;
    background:rgb(252,252,252);
  }
  .amountLayout2{
  	height:120px;
  	width:100%;
  	display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    flex-flow: wrap;
    .amountCont{
	    width:33.2%;
	    border-right:1px solid rgb(242,242,242);
	    img,.amountCont-l{
	    	float:left;
	    }
	    .amountCont-l{
	    	font-size:14px;
	    	margin:2px 0 0 20px;
	    	span{
	    		font-size:20px;
	    		color:#0090ff;
	    	}
	    }
    }
     .amountDet{
    	margin-left: 50%;
    	transform: translateX(-50%);

	   }
   }

  .layoutInput{
    margin-right: 30px;
    position: relative;
   }
   .layoutInput div{
    float: left;
	height: 40px;
	line-height: 40px;
	color: #333;
	font-weight: bold;
	padding-right: 10px;
  }
  .layoutInput .amountCont{
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
  .fl {
	 float: left;
  }
  .layout-condition{
    font-size: 14px;

  }
  .layoutInput-col{
  	color:rgb(0,143,255);
  	margin-left:20px;
  }
  .features{
    margin:0 20px;
  	clear: both;
  	height:auto;
  	.details-left{
  		width:8%;
  		float:left;
   	    font-size: 16px;
  	}
  	.details-rig{
  		width:90%;
  		float:left;
        font-size: 14px;
  		margin-bottom:30px;
        line-height: 22px;

  	}
  }
  /*condition*/
  .condition{
  	width:1200px;
  	margin:180px auto 0;
  	.condition-left{
  		width:870px;
  		height:auto;
  		float:left;
  		.condition-cont{
  			text-align: left;
  			line-height:24px;
  			padding:30px;
  			font-size:14px;
  			height:100px;
  			height:auto;
  			margin-bottom:32px;
  			background:rgb(241,245,248);
  		}
  	}
  	.condition-right{
  		width:300px;
  		float:right;
  		margin-bottom:40px;

        .loan-sty{
        	text-align: left;
            border-bottom:1px solid rgb(218,218,218);
            display: block;
            width:100%;
            height:100px;
            display: -webkit-flex;
	       display: -ms-flexbox;
	       display: flex;
	       align-items: center;
	       flex-flow: wrap;

            img{
                display: block;
                margin:10px 16px 0px 0;
                float:left;
                max-width:80px;
            }
            .right-list-cont{
                float:left;
                .right-list-tit{
                    font-size:18px;
                    font-weight:600;
                }
                >P:nth-child(2){
                    font-size:14px;

                }
            }
         }
  	}

  }
  .bread {
	    width:100%;
		height: 34px;
		line-height: 34px;
		border-top: 1px solid #f7f7f7;
		background: rgba(255, 255, 255, 1);
		position:fixed;
		top:80px;
		text-align: left;
		width:100%;
		z-index: 30;
	}
	 .bread-content {
		width: 1200px;
		margin: 0 auto;

		span{
			font-size: 14px;
			color: #666;
			font-weight: 700;
		}
	   }
   .bread-content a {
		float: left;
		font-size: 14px;
		color: #666;
		margin-right: 4px;
		font-family: Microsoft Yahei;
	}
</style>
