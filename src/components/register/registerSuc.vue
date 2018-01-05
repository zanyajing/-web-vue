<template>
  <div class="box">
    <div class="login-bag">
      <div class="login-logo">
        <img src="../../assets/images/logo.png" />

        <div class="login-cont">

          <div class="form" >
            <img src="../../assets/images/loginS.png" width="70"/>
            <p style="line-height:50px;">注册成功 {{count}}s 之后跳转到首页</p>
            <router-link to="/" href="javascript:;" class="btn-field"> 去首页 > </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import {
    queryInfo
  } from "api/queryInfo"
  import {ERR_OK} from 'api/config'
  export default {
    name: 'login',
    data(){
      return{
        count: 3
      }
    },
    methods: {
      init() {
        let num = 2;
        let timer = setInterval(() => {
          if (num === 0) {
            clearInterval(timer)
            this.$router.push({name:'index'});
          } else {
            this.count = num ;
          }
          num--;
        }, 1000)
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
    created(){
      this._queryInfo();
      this.init();
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
        padding-top:36px;

        .text-field{
          border: 1px solid rgb(221,221,221);
          width:100%;
          height:56px;
          font-size: 13px;
          text-indent:20px ;
          line-height:56px;
          border-radius: 5px;
          margin-bottom:20px;
        }
        .btn-field{
          width:100%;
          height:56px;
          border: 1px solid rgb(221,221,221);
          display:inline-block;
          font-size: 16px;
          color:#fff;
          line-height:56px;
          cursor: pointer;
          background:rgb(0,144,255);
          border-radius: 5px;
        }

      }


    }



  }
</style>
