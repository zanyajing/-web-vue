import api from './api'

import {
  commonParams
} from './config'

//快速申请页面接口
export function queryUserBaseByMobile(mobile){
	const url = '/user/queryUserBaseByMobile.shtml'
	const data = Object.assign({},commonParams,{
    mobile
	})
	return api.post(url,data).then((res)=>{
		return Promise.resolve(res.data)
	})
}

//密码登录接口
export function userLogin(obj){
  const url = '/login/userLogin.shtml'
  const data = Object.assign({}, commonParams,obj)
  return api.post(url,data).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//验证码登录接口


//注册接口
export function userRegist(obj){
  const url = '/regist/regAccount.shtml'
  const data = Object.assign({'vcodeKey':randomNum(1000,9999)}, commonParams,obj)
  return api.post(url,data).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//找回密码接口
export function findPassword(obj){
  const url = '/findPassword/findLoginPwdByPhone.shtml'
  const data = Object.assign({'vcodeKey':randomNum(1000,9999)}, commonParams,obj)
  return api.post(url,data).then((res)=>{
    return Promise.resolve(res.data)
  })
}
// 热门贷款列表

export function hotLoan(obj){
	//obj 请求后端的参数
  const url = '/proconf/getProductListByPlatform.shtml'
  // 请求的url
  const data = Object.assign({},commonParams,obj)
  //定义对象  Object.assign() 合并对象
  return api.post(url,data).then((res)=>{
    return Promise.resolve(res.data)
  })
}
  //  知识
export function knowledge(obj){
	//obj 请求后端的参数
  const url = '/message/getMessageList.shtml'
  // 请求的url
  const data = Object.assign({},commonParams,obj)
  //定义对象  Object.assign() 合并对象
  return api.post(url,data).then((res)=>{
    return Promise.resolve(res.data)
  })
}

// 详情
export function details(obj){
	//obj 请求后端的参数
  const url = '/proconf/getProductDetail.shtml'
  // 请求的url
  const data = Object.assign({},commonParams,obj)
  //定义对象  Object.assign() 合并对象
  return api.post(url,data).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//获取banner
export function banner(obj){
  const url = '/homePage/getBannersForJk.shtml'
  const data = Object.assign({},commonParams,obj)
  return api.post(url,data).then((res)=>{
    return Promise.resolve(res.data)
  })
}


function randomNum(minNum, maxNum) {
  switch(arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
      break;
    default:
      return 0;
      break;
  }
}
