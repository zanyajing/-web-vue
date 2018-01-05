import api from './api'
import {
	commonParams
} from './config'
import {
	Storage,
	Cookie
} from '../common/js/common'

export function queryMyMortgage(params) {
	const url = "/project/queryMyMortgage.shtml"
	const data = Object.assign({}, commonParams, {
		'token': Cookie.get('token') || '',
		'pageSize':10000
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}