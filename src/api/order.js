import request from '@/utils/request';
//查询订单
export function getOrderList(data) {
	return request({
		url: '/order/list',
		method: 'get',
		params: data
	})
}

//订单确认
export function getOrderInfo(data) {
	return request({
		url: '/order/confirm',
		method: 'post',
		data
	})
}

//计算订单金额
export function getOrderSum(data) {
	return request({
		url: '/order/computed/' + data.key,
		method: 'post',
		data
	})
}
//创建订单信息
export function createOrder(data) {
	return request({
		url: '/order/create/' + data.key,
		method: 'post',
		data
	})
}
//取消订单
export function cancelOrder(data) {
	return request({
		url: '/order/cancel',
		method: 'post',
		data
	})
}
//订单支付
export function payOrder(data) {
	return request({
		url: '/order/pay',
		method: 'post',
		data
	})
}
//订单收货
export function takeOrder(data) {
	return request({
		url: '/order/take',
		method: 'post',
		data
	})
}


//订单评论
export function orderReview(data) {
	return request({
		url: '/order/comment',
		method: 'post',
		data
	})
}


//订单del
export function delOrder(data) {
	return request({
		url: '/order/del',
		method: 'post',
		data
	})
}


//订单
export function order(data) {
	return request({
		url: '/order/detail/' + data,
		method: 'get'

	})
}





export default {
	getOrderList,
	getOrderInfo,
	getOrderSum,
	createOrder,
	cancelOrder,
	payOrder,
	takeOrder,
	orderReview,
	delOrder,
	order
}
