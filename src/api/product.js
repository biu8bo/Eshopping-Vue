// axios
import request from '@/utils/request'

// 登录
export function getProductInfo(data) {
	return request({
		url: '/product/'+data,
		method: 'get',
	})
}
export default {
    getProductInfo
}