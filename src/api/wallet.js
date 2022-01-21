import request from '@/utils/request';
//获取账户信息 params:data
export function getBalance() {
	return request({
		url: '/user/balance',
		method: 'get'
	})
}
//充值方案
export function prepaidPlan() {
	return request({
		url: '/recharge/index',
		method: 'get'
	})
}
//充值
export function prepaid(data) {
	return request({
		url: '/recharge/test',
		method: 'post',
		data
	})
}


export default {
	getBalance,
	prepaidPlan,
	prepaid
}
