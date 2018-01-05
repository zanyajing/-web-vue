import api from './api'
import {
	commonParams
} from './config'
import {
	Storage,Cookie
} from '../common/js/common'

export function searchByKey(params) {
	const url = "/project/searchByKey.shtml"
	const data = Object.assign({}, commonParams, {
		'keyword': params.entName,
		'cityCode': '',
		'token': Cookie.get('token') || ''
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}