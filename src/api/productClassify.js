import request from '@/utils/request'

// 获取分类
export function getData() {
	return request({
		url: '/category',
		method: 'get'
	})
}


export default {
	getData
}
