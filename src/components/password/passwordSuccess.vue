<template>
  <div class="box">
	<div class="login-bag">
      <div class="login-logo">
        <img src="../../assets/images/logo.png" />
        
        <div class="login-cont">
        	<div class="active">
							设置密码
					</div>
           <div class="form">
       		 <img src="../../assets/images/loginS.png" width="70"/>
           	 <p style="line-height:50px;">找回密码成功</p>
	         <router-link :to="{name:'login',query:{mobile:$route.query.mobile}}" href="javascript:;" class="btn-field"> 去登录 </router-link>
		   </div>
          </div>
        </div>
      </div>
    </div>
 
 
</template>

<script>
   export default {
    name: 'login',
    data(){
      return{
        

      }
    },
    methods: {
     

    },
	created(){
      
    }
  }
</script>

<style scoped lang="less">
.box{
    width:100%;
    height:100%;
    background:rgb(247,247,247);
}
li.active{
    color: rgb(0,143,255);
    border-bottom:2px solid rgb(0,143,255);
}
.login-logo{

  >img{
    margin:60px 0 30px 0;
  }
  .login-cont{
    width:400px;
    height:auto;
    margin:0 auto;
   .form{
	 	width:100%;
	 	height:auto;
	 	padding-top:34px;

	 	.text-field{
		 	border: 1px solid rgb(221,221,221);
	 	  width:100%;
	 		font-size: 13px;
	    padding:18px 0;
	    text-indent: 20px;
	 		border-radius: 5px;
	 		margin-bottom:20px;
	 	}
	 	.btn-field{
	 		width:100%;
	 		height:52px;
	  	    border: 1px solid rgb(221,221,221);
	 		display:inline-block;
	 		font-size: 16px;
	 		color:#fff;
	 		line-height:52px;
	 		cursor: pointer;
	 		background:rgb(0,144,255);
	 		border-radius: 5px;
	 	}
	 	
	 }
    
    
  }
  .active{
			height: 52px;
		    width: 400px;
		    line-height: 52px;
		    color: #008fff;
  			border-bottom: 2px solid #008fff;
		}
    
}
</style>