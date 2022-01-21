import request from '@/utils/request';
//查询热门关键字
export function getSearchKeyword(data) {
	return request({
		url: '/search/keyword',
		method: 'get',
		params: data
	})
}

//搜索商品
export function products(data) {
	return request({
		url: '/products',
		method: 'get',
		params: data
	})
}

export default {
	getSearchKeyword,
	products
}
