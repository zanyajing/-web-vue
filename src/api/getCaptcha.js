import api from './api'
import {
	commonParams
} from './config'

export function getCaptcha(params) {
	const url = "/captcha/getCaptcha.shtml"
	const data = Object.assign({}, {}, {
		'vcodeKey': randomNum(1000,9999)
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