import request from '@/utils/request'

// 登录
export function hotSearch() {
	return request({
		url: 'index/hotSearch',
		method: 'get'
	})
}
export function Search(data) {
	return request({
		url: 'search',
		method: 'POST',
		data
	})
}


export default {
    hotSearch,
    Search
}
