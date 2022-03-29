// axios
import request from '@/utils/request'

// 获取订单信息
export function order(data) {
	return request({
		url: '/order',
		method: 'post',
		data
	})
}

export function confirm(data) {
	return request({
		url: '/confirm',
		method: 'post',
		data
	})
}
export function updateOrderAddress(data) {
	return request({
		url: '/updateOrderAddress',
		method: 'post',
		data
	})
}

export function payOrder(data) {
	return request({
		url: '/payOrder',
		method: 'post',
		data
	})
}

export function cancelOrder(data) {
	return request({
		url: '/cancelOrder',
		method: 'post',
		data
	})
}

export function handlerPay(data) {
	return request({
		url: '/handlerPay',
		method: 'post',
		data
	})
}


export function deliverOK(oid) {
	return request({
		url: '/deliverOK/'+oid,
		method: 'post',
	})
}

export function getOrder(data) {
	return request({
		url: '/order/'+data,
		method: 'GET'
	})
}

export default {
	order,
	confirm,
	updateOrderAddress,
	payOrder,
	cancelOrder,
	handlerPay,
	deliverOK,
	getOrder
}
