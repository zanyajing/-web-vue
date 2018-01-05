import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import {ERR_OK} from './config'
import { Message } from 'element-ui'
import {Storage,Cookie} from '../common/js/common'
/*请求时的拦截器*/
axios.interceptors.request.use(config =>{
	//这里可以加一些动作，比如来个进度条开始动作
	NProgress.start()
	/*if (Storage.get('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
	     config.headers.Authorization = Storage.get('token');
	}*/
	if(Cookie.get('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
	    config.headers.Authorization = Cookie.get('token');
	}
	return config
},error=>{
	return Promise.reject(error)
})



/*请求完成后的拦截器*/
axios.interceptors.response.use(response=>{
	return response
},error=>{
	//这里我们把错误信息扶正，后面就不需要写catch了
	return Promise.resolve(error.response)
})

/*
 这里的return response 返回的是一个对象，内容如下
 {
  // 服务器提供的响应
  data: {},
  // 服务器响应的HTTP状态代码
  status: 200,
  // 服务器响应的HTTP状态消息
  statusText: 'OK',
  // 服务器响应头
  headers: {},
  // axios 的配置
  config: {}
}
 * */

/*这里一般封装两种方法，一个是get请求，一个是post请求，有其他情况也可以自行添加*/
export default{
	post(urlstr,data){
		return axios({
			method:'post',
			url:urlstr,
			data:qs.stringify(data),  //post请求的数据
			timeout:30000,//超时间，单位毫秒
			headers:{
				'X-Requested-With':'XMLHttpRequest',
                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}).then(checkStatus).then(checkCode)
	},
	get(urlstr,params){
		return axios({
			method:'get',
			url:urlstr,
			params,
			timeout:30000,
			headers:{
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(checkStatus).then(checkCode)
	}
}
/*这里的 data 为什么需要用qs.stringify(data)包一下, 主要是配合下面headers里的Content-Type, 转成表单提交, 让后端可以直接用 $_POST 拿到数据
这样, 一个大概的封装就完成了*/

function checkStatus(response){
	//这里可以加一些动作，比如来个进度条结束动作
	NProgress.done()
	//如果http状态正常，则直接返回数据
	if(response && response.status === 200 || response.status === 304){
		return response
		//这里，如果不需要除data外的其他数据，可以直接 return response.data 这样可以让后面的代码精简一些
	}
	//异常状态下，把错误信息返回
	//因为前面我们把错误扶正了，不然像404，500这样的错误是走不到这里的
	return{
		data:{
			coede:-404,
			message:response.statusText,
			data:response.statusText
		}
	}
	 // 如果上面你 return 的是 response.data, 那么这里可以写成
    // return {
    //    code: -404,
    //    message: response.statusText,
    //    data: response.statusText,
    //}
}

//再来处理来自程序端的错误，创建一个 checkCode函数
function checkCode(res) {
    // 如果状态 code 异常(这里已经包括网络错误, 服务器错误, 后端抛出的错误), 可以弹出一个错误提示, 告诉用户
    if(res.data.code){
    	 if (res.data.code !== ERR_OK && res.config.data.indexOf('diffCode') === -1) {// 或者是res.code, 视上面你返回的数据来决定
	       if(res.data.code == 'W00020'){
		    	/*Storage.set('token','')*/
		    	Cookie.dele('token')
		    	//this.$router.push({name:'login'});
		    	location.href = '#/login'
		    }else{
		    	 Message({
			       	message:res.data.msg,
			       	type:'error'
			       })
		    }
	    }
    }
    return res
}


