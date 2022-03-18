import request from '@/utils/request'
//获取商品评论数据
export function getProductReply(params) {
	return request({
		url: '/reply',
		method: 'get',
		params
	})
}

export default {
    getProductReply,
}
