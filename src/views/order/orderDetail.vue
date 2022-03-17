<template>
	<div class="warpper" v-if="order.statusDto">
		<div class="top-1">
			<div class="top">
				<div class="text">
					<span>{{order.statusDto.msg}}</span>
				</div>
				<van-cell class="address">
					<template #title>
						<span class="custom-title">{{order.realName}}</span>
						<span class="custom-title" style="margin-left: 8px;">{{order.userPhone}}</span>
					</template>
					<template #label>
						<span class="custom-title">{{order.userAddress}}</span>
					</template>
				</van-cell>
			</div>
		</div>
		<van-cell title="订单状态" :value="order.statusDto.title" />
		<template  v-for="(item,index) in order.cartInfo">
			<van-card :key="index" :num="item.cartNum" :desc="item.productInfo.storeInfo" :title="item.productInfo.storeName"
				:thumb="imgUrls+item.productInfo.image">
				<template #price>
					<font size="3" color="#ED6A0C">￥</font>
					<font size="4" color="#ED6A0C">{{item.productInfo.attrInfo.price}}</font>
				</template>
				<template #tags>
					<van-tag plain type="danger">{{item.productInfo.attrInfo.sku}}</van-tag>
				</template>
			</van-card>
		</template>
		<van-cell title="快递" :value="order.deliveryName" />
		<van-cell title="订单号" :value="order.orderId" />
		<van-cell title="下单时间" :value="order.payTime" />
		<van-cell title="运费" :value="order.payPostage==0?'免运费':order.payPostage" />
		<van-cell title="优惠" :value="order.payPostage==0?'无优惠':order.couponPrice" />
		<van-cell title="总金额" :value="order.payPrice" />
		<van-cell title="支付方式" :value="order.statusDto.payType" />

	</div>
</template>

<script>
	import {
		order
	} from "@/api/order.js"
	export default {
		data() {
			return {
				imgUrls: this.$baseApi,
				order: {}
			};
		},
		created() {
			this.getOrder()
		},
		methods: {
			getOrder() {
				order(this.$route.query.key).then(res => {
					this.order = res.data
				})
			}
		},
	}
</script>

<style scoped>
	.top-1 {
		height: 150px;
	}

	.top {
		background-image: url(../../../static/userBg.png);
		position: relative;
	}

	.text {
		text-align: center;
		line-height: 90px;
		font-size: 16px;
		color: #F0F0F0;
	}

	.address {
		bottom: -60%;
		position: absolute;
		border-top-left-radius: 9px;
		border-top-right-radius: 9px;

	}
</style>
