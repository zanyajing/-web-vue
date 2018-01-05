<template>
	<div class="contenter">
		<div class="m-top">
			<Headers :showBread="showBread" :inowBread="inowBread" :prevBread="prevBread" :prevUrl="prevUrl"></Headers>
			 <img src="./banner.png" class="logo"/>
			<div class="search-wrap">
				<div class="search-content clearfix">
				  <bar :productName="'贷款学院'"></bar>
				  <ul class="header">
				  	<li @click="togglt(tab,index)"  v-for="(tab,index) in tabs" :class="[{active:index==ix},'list']">{{tab.title}}</li>
			        
				  </ul>
				  <div class="main clearfix">
				  	<div>
				  	<router-link tag="div" :to="{name:'details',query:{id:cont.id,subtype:subtype}}" class="msg" v-for="cont in conts" :key="cont.id">
						<div class="title active">{{cont.name}}</div>
						<div v-if="cont.summary" class="msg-main1">
						{{cont.summary}}
						<span v-if="cont.summary"><span>......</span><span style="color:#008fff;">详情></span></span>
						</div>
					</router-link>
				  	</div>

				  </div>
				</div>
			</div>
			<div class="pageWrap clearfix">
				<div class="fl">
					<paginate ref="paginate" 
						:page-count="parseInt(pageCount)" 
						:prev-class="'prevClass'" 
						:next-class="'nextClass'" 
						:page-range="3" 
						:margin-pages="1" 
						:click-handler="pageClickCallback" 
						:prev-text="'上一页'" 
						:next-text="'下一页'" 
						:container-class="'pagination'" 
						:page-class="'page-item'"></paginate>
				</div>
				<p class="pageContent fl">共<span>{{count}}</span>个结果</p >
			</div>
		</div>

	<Footers></Footers>
	</div>
</template>

<script>
  import Bar from 'components/bar/bar'
  import {ERR_OK} from 'api/config'
  import {knowledge} from 'api/index' 
  import Footers from 'components/footer/footer'
  import Headers from 'components/header/header'
  import Paginate from 'vuejs-paginate'
  export default {
    name: 'HelloWorld',
   
     data() {
      return { 
      tabs:[
     	 {
     	  title: "贷款攻略",
     	  subtype:8
     	 },
     	 {
     	 title: "担保知识",
     	 subtype:9
     	 },
     	 {
     	  title: "精选问答",
     	  subtype:10
     	 },
      ],
      subtype:8,
      conts:[],
      ix:0,
      count:'',
      pageCount: 0,
      pageNo:1,
      showBread:true,
      inowBread: '贷款学院',
	  prevBread: '贷款助手',
	  prevUrl: './index.html',
	  
      }
     },
     watch: {
     	
	},
     methods:{
     	pageClickCallback(index) {
			this.pageNo = index
			this._knowledge()

		},
         togglt(tab,index){
         	
         	this.ix = index;
         	this.subtype = tab.subtype;
			this.$refs.paginate.selected = 0

         	this._knowledge();
         	
         },
     	_knowledge() {
			knowledge({
				pageNo: this.pageNo,
				pageSize: 5,
				type: 6,
				subtype: this.subtype
			}).then((res) => {
				this.conts = res.data.messageList
				this.titles = res.data.messageList
				this.count = res.data.count
				this.pageCount = res.data.pageCount
				window.scrollTo(0,0)
			})
		}
       },
     created(){
     	window.scrollTo(0, 0);
     	
     },
      mounted(){
      this.$nextTick(res => {
   		this._knowledge()
   		
      })
    },
     components: {
      Footers,
      Headers,
      Bar,
 	  Paginate
    }
   }
</script>
<style>
	/*分页start*/
	
	.pageWrap {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -30px;
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
	.pageContent {
		font-size: 14px;
		color: #999;
		margin-left: 36px;
	}
	
	.pageContent span {
		color: #008fff;
	}
	/*分页end*/
</style>
<style scoped lang="less">
	.m-top{
	position: relative;
    padding-bottom: 100px;
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
    /*margin:0 auto;*/
    position: relative;
    top:-100px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .search-content{
    min-height: 300px;
    padding: 50px 20px 50px;
    background: rgb(247,247,247,0.8);
  }
  .bar{
  	border:none !important;
  }
  .search-content{
  	
  .header{
          border-bottom: 1px solid #999999;
          box-sizing: border-box;
          display: flex;
           .list{
            width: 122px;
            line-height: 40px;
            border: 1px solid rgb(0,144,255);
            color: rgb(0,144,255);
            margin-right: 10px;
            text-align: center;
            margin-bottom: -1px;
            border-radius: 5px 5px 0 0;
          }
          .list:hover{
          	cursor:pointer;
          }
          .active{
            background-color: rgb(0,144,255);
            color: #fff;
          }
 
       }  
	}
	 .main{
          min-height: 264px;
          display: flex;
          width: 100%;
          justify-content: space-between;
    }
    .msg{
          margin-top: 18px;
          padding-bottom: 18px;
          background:#fff;
          padding:20px;
          width:1060px;
          cursor: pointer;
          line-height: 26px;
          letter-spacing: 0.5;
          .title{
            padding-bottom: 12px;
          }
          .msg-main{
            height:82px;
            line-height: 26px;
            overflow: hidden;
            color:#666666;
            font-size: 15px;
          }
          .title.active{
            color:#000;
          }
    }
   .msg:hover{
   	background:rgb(241,245,248);
   }
</style>