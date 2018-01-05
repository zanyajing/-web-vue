import api from './api'
import {commonParams} from './config'
import {
	Storage,Cookie
} from '../common/js/common'
export function saveEntProject(params) {
	const url = "/project/saveEntProject.shtml"
	const data = Object.assign({}, commonParams, {
		'amount': params.amount,
		'periodNum': params.periodNum,
		'entName': params.entName,
		'des':params.des,
		'entUid':params.entUid,
		'mobile': params.mobile,
		'usetime': params.usetime,
		'phoneVerify': params.phoneVerify,
		'interestRange':params.interestRange,
		'assureDesc':params.assureDesc,
		'token':Cookie.get('token') || '',
		'vcodeKey':randomNum(1000,9999),
		'productId':params.productId,
		'legalPerson':params.legalPerson,
		'regAmount':params.regAmount,
		'type':11,
		'diffCode': "No",
		'assureType':params.type
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}

export function getLabelConfigList(params) {
	const url = "/proconf/getLabelConfigList.shtml"
	const data = Object.assign({}, commonParams, {
		'type': params.type,
		'token':Cookie.get('token') || ''
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