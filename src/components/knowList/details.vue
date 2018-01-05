<template>
	<div class="contenter">
		<div class="m-top">
			<Headers :showBread="showBread" :inowBread="inowBread" :prevBread="prevBread" :prevUrl="prevUrl"></Headers>
      <img src="./banner.png" class="logo"/>
      <div class="search-wrap">
				<div class="search-content clearfix">
				  <bar :productName="'贷款学院'"></bar>
				    <div class="detail-tit">
				  	  <div class="title">{{name}}</div>
					  <div class="title-date"><span>{{updatetimestr}}</span><!--<span>来源：融360</span>--></div>
					</div>
					<div class="detail-cont">
					  <div v-html="content"></div>
					  <img :src="logourl" alt="" />
				    </div>
				</div>
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
     	 title: "担保方式",
     	 subtype:9
     	 },
     	 {
     	  title: "精选问答",
     	  subtype:10
     	 },
      ],
      logourl:'',
      subtype:'',
      conts:[],
      name:'',
      updatetimestr:'',
      showBread:true,
      inowBread: '知识详情',
	  prevBread: '贷款学院',
	  prevUrl: '#/knowList',
	  content:'',
      }
     },
     methods:{

     	_knowledge() {
			knowledge({
				pageNo: this.pageNo,
				pageSize: 5,
				type: 6,
				id:this.$route.query.id,
				subtype: this.subtype
			}).then((res) => {

				this.conts = res.data.messageList
				this.name=res.data.messageList[0].name
		    	this.logourl=res.data.messageList[0].logourl
		    	const timers=res.data.messageList[0].updatetimestr;
                this.updatetimestr=timers.split(" ")[0]
				this.content=res.data.messageList[0].content
			})
		}
       },
     created(){
     	window.scrollTo(0, 0);
     	this.subtype = this.$route.query.subtype;
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
    }
   }
</script>

<style scoped lang="less">
	.m-top{
	position: relative;
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
    min-height: 360px;
    padding: 50px 20px 50px;
    background: rgb(247,247,247,0.8);
  }
  .bar{
  	border:none !important;
  }

	 .main{
          height: 464px;
          display: flex;
          width: 100%;
          justify-content: space-between;
    }
	.detail-tit{
		text-align: center;
		.title{
			font-size:20px;
			line-height:48px;
			font-weight:600;
			margin-top:-10px;
		}
		.title-date{
			color:rgb(169,169,169);
			border-bottom:1px solid #999999;
			padding-bottom: 20px;
			/*>span:nth-child(1){
				margin-right:60px;
			}*/
		}
	}
	.detail-cont{
		padding:20px;
		line-height:28px;
		/*color:rgb(189,189,189);*/
		img{
			max-width: 800px;
			max-height:300px;
			display: block;
			margin:20px auto;
		}
	}
	.search-content img{
		max-width:1000px;
		margin:0 auto;
		display: block;
	}
</style>
