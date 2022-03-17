<template>
	<div class="content">
		<van-icon name="checked" size="100" color="#fa436a" />
		<font size="4" color="#fa436a">订单已生成！</font>
		<div class="btn">
			<van-button style="background-color: #fa436a;color: #FFFFFF;" block to="/orderType?type=1">查看订单</van-button>
			<van-button block to="/">返回首页</van-button>
		</div>
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
		created() {},
		methods: {},
	}
</script>

<style scoped>
	.content {
		margin-top: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.tit {
		font-size: 20px;
		color: #303133;
	}

	.btn {
		width: calc(100% - 60px);
		margin: 45px auto;
	}

	.btn button {
		margin-top: 15px;
	}
</style>
