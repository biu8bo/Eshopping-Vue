// axios
import request from '@/utils/request'

// 登录
export function login(data) {
	return request({
		url: '/login',
		method: 'post',
		data
	})
}


// 用户信息 post 方法
export function getUserInfo() {
	return request({
		url: '/userinfo',
		method: 'get'
	})
}


// 退出登录
export function loginOut() {
	return request({
		url: '/auth/logout',
		method: 'post'
	})
}


//修改密码
export function forget(data) {
	return request({
		url: '/user/password',
		method: 'post',
		data
	})
}
//获取验证码
export function registerCode(params) {
	return request({
		url: '/register/vertify',
		method: 'get',
		params
	})
}
//注册 
export function register(data) {
	return request({
		url: '/register',
		method: 'post',
		data
	})
}


export default {
	login,
	getUserInfo,
	loginOut,
	forget,
	registerCode,
	register
}
