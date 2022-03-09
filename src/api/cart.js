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
export default {
	addCart,
}
