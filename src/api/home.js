import request from '@/utils/request'

//首页数据
export function getData() {
	return request({
		url: '/index',
		method: 'get'
	})
}

//首页轮播图
export function getBanner() {
	return request({
		url: '/index/banner',
		method: 'get'
	})
}
//首页 精品推荐
export function getBastList() {
	return request({
		url: '/index/bastList',
		method: 'get'
	})
}

//首页  拼团
export function getCombinationList() {
	return request({
		url: '/index/combinationList',
		method: 'get'
	})
}
//首页  猜你喜欢
export function getLike() {
	return request({
		url: '/index/like',
		method: 'get'
	})
}

//首页  菜单
export function getMenus() {
	return request({
		url: '/index/menus',
		method: 'get'
	})
}

//拼团产品
// export function groupList() {
//   return request({
//     url: '/combination/list',
//     method: 'get'
//   })
// }


//获取签到列表
export function signList() {
	return request({
		url: '/sign/list',
		method: 'get'
	})
}

//签到
export function sign() {
	return request({
		url: '/sign/integral',
		method: 'post'
	})
}


export default {
	getData,
	signList,
	sign,
	getMenus,
	getLike,
	getCombinationList,
	getBastList,
	getBanner
}
