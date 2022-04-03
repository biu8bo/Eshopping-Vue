import request from '@/utils/request'


// 秒杀时间配置
export function getSeckillTime() {
	return request({
		url: '/getSeckillTime',
		method: 'get',
        
	})
}
export function getSeckill(params) {
	return request({
		url: '/getSeckill',
		method: 'get',
        params
        
	})
}
export function getSeckillByID(id) {
	return request({
		url: '/getSeckillDetail/'+id,
		method: 'get',
        
        
	})
}

export default {
    getSeckillTime,
    getSeckill,
	getSeckillByID
}
