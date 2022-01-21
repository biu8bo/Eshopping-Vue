import request from '@/utils/request'

//获取评论列表
export function getReview(data) {
	return request({
		url: '/reply/list/' + data.id,
		method: 'get',
		params: data
	})
}



export default {
	getReview
}
