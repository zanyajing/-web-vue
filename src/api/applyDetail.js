import api from './api'

import {
	commonParams
} from './config'
import {
	Storage,
	Cookie
} from '../common/js/common'
//查询材料
export function queryUserBaseByMobile(params) {
	const url = '/attach/queryByMortgageId.shtml'
	const data = Object.assign({}, commonParams, {
		mortgageId: params.mortgageId
	})
	return api.get(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}

export function upload(params) {
	const url = '/attach/upload.shtml'
	const data = Object.assign({}, commonParams, {
		mortgageId: params.mortgageId
	})
	return api.get(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}

export function saveManageinfo(params) {   //保存经营情况
	const url = '/material/saveManageinfo.shtml'
	const data = Object.assign({}, commonParams, {
		product:params.product,
		customer:params.customer,
		provider:params.provider,
		mortgageId:params.mortgageId,
		token:Cookie.get('token') || ''
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}

export function saveManager(params) {		//保存管理者
	const url = '/material/saveManager.shtml'
	const data = Object.assign({}, commonParams, {
		content:params.content,
		mortgageId:params.mortgageId,
		token:Cookie.get('token') || ''
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}


export function getMateInfoByid (params) {		//查看经营情况  和 管理人员
	const url = '/material/getMateInfoByid.shtml'
	const data = Object.assign({}, commonParams, {
		mortgageId:params.mortgageId,
		token:Cookie.get('token') || ''
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}


export function getMortProjectByid(params) {		//查看基本信息
	const url = '/project/getMortProjectByid.shtml'
	const data = Object.assign({}, commonParams, {
		mortgageId:params.mortgageId,
		token:Cookie.get('token') || ''
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}


export function getMateRepInfoByid  (params) {		//根据项目id查询 财报材料信息
	const url = '/material/getMateRepInfoByid.shtml'
	const data = Object.assign({}, commonParams, {
		mortgageId:params.mortgageId,
		token:Cookie.get('token') || ''
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}


export function remove(params) {		//根据项目id删除
	const url = '/material/remove.shtml'
	const data = Object.assign({}, commonParams, {
		attachId:params.attachId,
		token:Cookie.get('token') || ''
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}

export function withdrawProject(params) {		//撤销
	const url = '/project/withdrawProject.shtml'
	const data = Object.assign({}, commonParams, {
		id:params.id,
		content:params.content,
		token:Cookie.get('token') || ''
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}

export function getMateRateByid(params) {		//进度
	const url = '/material/getMateRateByid.shtml'
	const data = Object.assign({}, commonParams, {
		mortgageId:params.mortgageId,
		token:Cookie.get('token') || ''
	})
	return api.post(url, data).then((res) => {
		return Promise.resolve(res.data)
	})
}
