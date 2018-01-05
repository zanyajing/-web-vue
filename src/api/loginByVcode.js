import api from './api'

import {
  commonParams
} from './config'
// /验证码登录接口

export function loginByVcode(obj){
  const url = '/login/byVcode.shtml'
  const data = Object.assign({}, commonParams,obj)
  return api.post(url,data).then((res)=>{
    return Promise.resolve(res.data)
  })
}
