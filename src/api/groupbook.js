import request from '@/utils/request'

//取消开团
export function removeGroup(data) {
	return request({
		url: '/combination/remove',
		method: 'post',
		data
	})
}


//拼团产品详情
export function groupDetail(data) {
	return request({
		url: '/combination/detail/' + data.id,
		method: 'get'
	})
}

//拼团明细
export function groupInfo(data) {
	return request({
		url: '/combination/pink/' + data.id,
		method: 'get'
	})
}
export default {
	removeGroup,
	groupDetail,
	groupInfo
}
