import api from './api'

import {
  commonParams
} from './config'

export function bindMobileForjk (obj){
  //obj 请求后端的参数
  const url = '/wx/bindMobileForjk.shtml'
  // 请求的url
  const data = Object.assign({},commonParams,obj)
  //定义对象  Object.assign() 合并对象
  return api.post(url,data).then((res)=>{
    return Promise.resolve(res.data)
  })
}
