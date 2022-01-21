import request from '@/utils/request';
//获取商品详情
export function getProduct(data) {
	return request({
		url: '/product/detail/' + data,
		method: 'get'
	})
}


//获取商品列表
export function getProductList(data) {
	return request({
		url: '/products',
		method: 'get',
		params: data
	})
}
//为你推荐
export function getProductforU(data) {
	return request({
		url: '/product/hot',
		method: 'get',
		params: data
	})
}




export default {
	getProduct,
	getProductList,
	getProductforU
}
