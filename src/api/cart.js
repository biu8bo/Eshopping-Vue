// axios
import request from '@/utils/request'

//  添加进购物车
export function addCart(data) {
	return request({
		url: '/addCart',
		method: 'post',
		data
	})
}

export function getCartList() {
	return request({
		url: '/getCartList',
		method: 'get',
	})
}

export function upCartNum(data) {
	return request({
		url: '/updateNum',
		method: 'post',
		data
	})
}

export function delCart(params) {
	return request({
		url: '/delCart',
		method: 'post',
		params
	})
}
export default {
	addCart,
	getCartList,
	delCart,
	upCartNum
}
