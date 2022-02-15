// axios
import request from '@/utils/request'

// 获取商品详情信息
export function getProductInfo(data) {
	return request({
		url: '/product/'+data,
		method: 'get',
	})
}

//获取商品评论数据
export function getProductReply(params) {
	return request({
		url: '/reply',
		method: 'get',
		params
	})
}
export default {
    getProductInfo,
	getProductReply
}