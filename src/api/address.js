// axios
import request from '@/utils/request'

//  添加进购物车
export function addAddress(data) {
	return request({
		url: '/addAddress',
		method: 'post',
		data
	})
}

export function getAddress() {
	return request({
		url: '/getAddressList',
		method: 'get',
	})
}

export function editAddress(data) {
	return request({
		url: '/editAddress',
		method: 'post',
		data
	})
}

export function delAddress(params) {
	return request({
		url: '/delAddress',
		method: 'get',
		params
	})
}
export function setDefualt(params) {
	return request({
		url: '/setDefault',
		method: 'get',
		params
	})
}

export function getAddressData(params) {
	return request({
		url: '/getAddressData',
		method: 'get',
		params
	})
}
import { areaList } from '@vant/area-data';
export function getAreaList() {
	return new Promise(function(resolve,reject){
        resolve(areaList)
        reject("获取城市数据失败")
    })
}
export default {
	addAddress,
    editAddress,
    delAddress,
    getAddress,
    getAreaList,
    setDefualt,
	getAddressData
}
