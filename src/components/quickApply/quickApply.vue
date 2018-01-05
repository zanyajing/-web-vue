<template>

	<div class="form">
        <div class="item">
          <el-autocomplete
            class="text-field1 text-field changeInputQuick"
            v-model="enterprise"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入企业名称"
            @select="autocompleteSelect"
          ></el-autocomplete>
          <div :class="[{alertCont:!enterpriseRight && !firstEr},'opacity0']">请输入企业名称</div>
        </div>
        <div class="item">
          <input type="text" class="text-field text-field2" name="" id="" maxlength="11" v-model="mobile" value="" placeholder="请输入手机号"/>
          <div :class="[{alertCont:!mobileRight && !firstMr},'opacity0']" >请输入正确的手机号</div>
        </div>

        <a href="javascript:;" @click="_queryUserBaseByMobile" class="btn-field">立即申请  </a>

    </div>

</template>

<script>
  import {queryUserBaseByMobile} from 'api/index'
  import {ERR_OK} from 'api/config'
  import {
    searchByKey
  } from 'api/searchByKey'
   export default {
    name: 'HelloWorld',

     data() {
      return {
      content:'额度上限',
        mobile: '',
        enterprise: '',
        alertCont1: '',
        alertCont2: '',
        firstMr: true,
        firstEr: true,

      }
     },
     props:['money','time','id'],
     methods:{
     autocompleteSelect (item) {
	  	this.legalPerson = item.legalPerson;
	  	this.entRegAmount = item.entRegAmount;
	  },
      querySearchAsync(queryString, cb) {
        if(!queryString || queryString.length<2){
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
          }else{
            cb([]);
          }
        })
      },
     	_queryUserBaseByMobile() {
        this.firstMr = false;
        this.firstEr = false;
        //校验输入信息是否符合格式
        if(!this.enterprise || !this.mobileRight) {
          return;
        }
        if(this.$store.state.userInfo.nickname){
          this.$router.push({name: 'apply',query:{enterprise:this.enterprise,mobile:this.mobile,legalPerson:this.legalPerson,entRegAmount:this.entRegAmount,loanMoney:this.money,times:this.time}})
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
                  enterprise:this.enterprise,
                  redirect: encodeURIComponent('/apply?mobile='+this.mobile+'&enterprise='+this.enterprise + '&entRegAmount=' + this.entRegAmount+'&legalPerson='+this.legalPerson+'&loanMoney='+this.money+'&times='+this.time)
                }
              })

            } else {
              this.$router.push({
                name: 'login',
                query: {
                  mobile: this.mobile,
                  redirect: encodeURIComponent('/apply?mobile='+this.mobile+'&enterprise='+this.enterprise + '&entRegAmount=' + this.entRegAmount+'&legalPerson='+this.legalPerson+'&loanMoney='+this.money+'&times='+this.time)
                }
              })

            }


          }
        })
      },
     },
    computed:{
      enterpriseRight () {
        return this.enterprise
      },
      mobileRight () {
        return /^1[3|4|5|8][0-9]\d{8}$/.test(this.mobile)
      }
    }
   }

</script>

<style scoped lang="less">
@import "../../assets/css/common/common.css";
	 .form{
        width:400px;
        height:338px;
        padding-top:60px;
        color:#666;
        border: 1px solid rgb(221,221,221);
        .text-field{
            width:220px;
            color: #666;
            font-size: 16px;
            background:rgb(247,247,247)
        }
        .text-field2{
        	width:386px !important;
        	font-size: 16px;
        	padding:20px 0 20px 14px;
        }
        .item .opacity0{
            line-height: 40px;
      -webkit-transition: opacity 0.3s;
      -moz-transition: opacity 0.3s;
      -ms-transition: opacity 0.3s;
      -o-transition: opacity 0.3s;
      transition: opacity 0.3s;
            opacity: 0;
      text-align: left;
      color: red;
        }
        .item div.alertCont{
            opacity: 1;
        }
        .btn-field{
            width:240px;
            height:60px;
            display:inline-block;
            font-size: 16px;
            color:#fff;
            line-height:60px;
            cursor: pointer;
            background:rgb(0,144,255);
            border-radius: 5px;;
        }
        > p{
            margin-top:8px;
            span{
              color:rgb(0,144,255);
            }
        }
     }
     .text-field1{
     	height:60px;
     	line-height:60px;
	   	text-indent:0 !important;
		}
		.text-field::-webkit-input-placeholder{
             color:#aeaeae!important;
             font-size: 16px!important;
         }
         .text-field:-ms-input-placeholder{
             color:#aeaeae!important;
             font-size: 16px!important;
         }
</style>
<style>

  .changeInputQuick .el-input__inner{
   	border:none !important;
    margin-top:10px;

		}
  .changeInputQuick .el-scrollbar{
   	text-align: left;
   	text-indent:0 ;
   }
  .changeInputQuick input{
    font-size: 16px !important;
    
  }
  .el-autocomplete-suggestion li{
		text-align: left;
	}

</style>
