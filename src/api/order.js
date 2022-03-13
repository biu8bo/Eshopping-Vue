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
export default {
	order,
	confirm
}
