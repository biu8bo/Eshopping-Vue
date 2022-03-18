// axios
import request from '@/utils/request'

// 获取商品详情信息
export function getProductInfo(data) {
	return request({
		url: '/product/'+data,
		method: 'get',
	})
}


export default {
    getProductInfo
}