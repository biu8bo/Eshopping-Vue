import request from '@/utils/request';
//查询订单
export function getCartList(data) {
	return request({
		url: '/cart/list',
		method: 'get',
		params: data
	})
}

export function delCart(data) {
	return request({
		url: '/cart/del',
		method: 'post',
		data
	})
}
//修改购物车数量
export function upCartNum(data) {
	return request({
		url: '/cart/num',
		method: 'post',
		data
	})
}


//添加购物车
export function addCart(data) {
	return request({
		url: '/cart/add',
		method: 'post',
		data
	})
}


export default {
	getCartList,
	delCart,
	upCartNum,
	addCart
}
