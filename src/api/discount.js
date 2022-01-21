import request from '@/utils/request';
//查询用户已领取优惠券
export function getCoupons(data) {
	return request({
		url: '/coupons/user/1',
		method: 'get',
		params: data
	})
}


//获取订单优惠券
export function getOrderCoupons(data) {
	return request({
		url: '/coupons/order/' + data,
		method: 'get'

	})
}
//查询优惠券
export function getAallCoupons(data) {
	return request({
		url: '/coupons',
		method: 'get',
		params: data
	})
}

export function receiveCoupons(data) {
	return request({
		url: '/coupon/receive',
		method: 'post',
		data
	})
}

export default {
	getCoupons,
	getAallCoupons,
	receiveCoupons,
	getOrderCoupons
}
