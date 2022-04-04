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
export function Seckill(data) {
	return request({
		url: '/Seckill',
		method: 'POST',
        data
        
	})
}
export function SeckillPay(data) {
	return request({
		url: '/SeckillPay',
		method: 'POST',
        data
        
	})
}

export default {
    getSeckillTime,
    getSeckill,
	getSeckillByID,
	Seckill,
	SeckillPay
}
