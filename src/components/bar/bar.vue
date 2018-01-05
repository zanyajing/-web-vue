<template>
	<div class="bar">
	    <span class="bar-tit">{{productName}}</span>
	    <span v-if="titRig" class="bar-tit-rig">查看更多 ></span>
    </div>
</template>

<script>
	export default {
    name: 'HelloWorld',

    data() {
      return {
      	titRig:false
      }
     },
     //props 接收外的参数
 	props: {
 		productName: {
 			default: ''
 		}
 	}
   }
</script>

<style scoped lang="less">
.bar{
    width:100%;
    padding-bottom:10px;
    border-bottom:2px solid rgb(184,184,184);
    text-align: left;
    .bar-tit{
        border-left:2px solid #00A1E9;
        padding-left:6px;
        display: inline-block;

    }
    .bar-tit-rig{

        float:right;
        display: inline-block;
        cursor: pointer;
        color:rgb(0,144,255);
    }
}
</style>