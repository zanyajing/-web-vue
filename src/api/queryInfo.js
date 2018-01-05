import api from './api'
import {
	commonParams
} from './config'
import {
	Storage,
	Cookie
} from '../common/js/common'
export function queryInfo() {
	const url = "/user/queryInfo.shtml"
	const data = Object.assign({}, commonParams, {
		'token': Cookie.get('token') || ''
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}