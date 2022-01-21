import request from '@/utils/request'

//添加或修改地址
export function editAddress(data) {
	return request({
		url: '/address/edit',
		method: 'post',
		data
	})
}
//地址
export function getAddress(data) {
	return request({
		url: '/address/list',
		method: 'get',
		params: data
	})
}

export function getDataDetails(data) {
	return request({
		url: '/address/detail/' + data.id,
		method: 'get'
	})
}
export function delAddress(data) {
	return request({
		url: '/address/del',
		method: 'post',
		data
	})
}

export function getAddressList() {
	return request({
		url: '/citys',
		method: 'get'
	})
}


export default {
	editAddress,
	delAddress,
	getAddress,
	getDataDetails,
	getAddressList
}
