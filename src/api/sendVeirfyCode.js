import api from './api'
import {
	commonParams
} from './config'

export function sendVeirfyCode(params) {
	const url = "/message/sendVeirfyCode.shtml"
	const data = Object.assign({}, commonParams, {
		'businessType': params.type,//取的自己传入对象的type
		'mobile': params.mobile,
		'vcodeKey':randomNum(1000,9999),
		'seccode':params.seccode,
		'challenge':params.challenge,
		'validate':params.validate
	})
	return api.post(url, data).then((res) => {
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
