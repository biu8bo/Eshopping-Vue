// axios
import request from '@/utils/request'

// 登录
export function order(data) {
	return request({
		url: '/order',
		method: 'post',
		data
	})
}
export default {
	order,
}
