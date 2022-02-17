import request from '@/utils/request'

export function addCollect(data) {
	return request({
		url: '/addCollect',
		method: 'Post',
        data
	})
}
export function delCollect(data) {
	return request({
		url: '/delCollect',
		method: 'Post',
        data
	})
}


export default {
	addCollect,
    delCollect
}
