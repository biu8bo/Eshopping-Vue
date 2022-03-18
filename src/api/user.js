import request from '@/utils/request'

// 获取充值方案
export function getRecharge() {
	return request({
		url: '/recharge/getRecharge',
		method: 'get'
	})
}
// 消费信息
export function getBalance() {
	return request({
		url: '/recharge/getBalance',
		method: 'get'
	})
}
// 消费信息
export function recharge(params) {
	return request({
		url: '/recharge/recharge',
		method: 'post',
        params
	})
}

export default {
    getRecharge,
    getBalance,
    recharge
}
