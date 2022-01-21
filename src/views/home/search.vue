<template>
	<div>
		<van-sticky :offset-top="0">
			<van-search v-model="value" background="red" shape="round" placeholder="请输入搜索关键词" @search="onSearch"
				@cancel="onCancel" />
		</van-sticky>

		<div style="padding: 15px;">
			<div>最近搜索：</div>
			<van-tag v-for="(item,index) in hKeyword " :key="index" @click="keyword(item)" color="#eeeeee"
				text-color="#b6b6b6" size="large" style="margin: 10px;">
				{{item}}
			</van-tag>
		</div>
		<van-divider :style="{  padding: '0 16px' }" />
		<div style="padding: 15px;">
			<div>热门搜索：</div>
			<van-tag v-for="item in keyList" :key="item" @click="keyword(item)" color="#eeeeee" text-color="#b6b6b6"
				size="large" style="margin: 10px;">{{item}}</van-tag>
		</div>
		<div style="margin-top: 10px;">
			<van-grid :column-num="2" :gutter="10" class="grids">
				<van-grid-item v-for="(item,index) in productList" :key="index" :to="'/productDetails/?id='+item.id">
					<van-image :src="imgUrls+item.image" />
					<span>
						<font size="3" style="margin-left: 5px;">{{item.storeName}}</font>
					</span>
					<span>
						<font size="3" color="#ff8001">￥{{item.price}}</font>
						<font size="2" color="#C0C4CC" style="text-decoration:line-through">￥{{item.otPrice}}</font>
					</span>
				</van-grid-item>
			</van-grid>
		</div>
		<van-empty image="error" description="没有搜到该商品,换个关键字试试吧!" v-if="productList.length<1" />
	</div>
</template>

<script>
	import {
		getSearchKeyword,
		products
	} from "@/api/search.js"
	export default {
		data() {
			return {
				value: '',
				keyList: [],
				imgUrls: this.$baseApi,
				productList: [],
				hKeyword: [] //搜索历史
			};
		},
		created() {
			this.getKeyword()
			this.getHkeyword() //获取历史记录

		},
		methods: {
			keyword(data) {
				this.value = data
				this.onSearch(data)
			},
			//获取热门关键字
			getKeyword() {
				getSearchKeyword().then(res => {
					this.keyList = res.data
					
				})
			},
			onSearch(val) {
				products({
					keyword: val
				}).then(res => {
					this.hKeyword = [val, ...this.hKeyword]
					this.hKeyword = [...new Set(this.hKeyword)]
					if (this.hKeyword.length > 10) {
						this.hKeyword = this.hKeyword.slice(0, 10);
					}
					if (JSON.parse(sessionStorage.getItem("user"))) {
						localStorage.setItem(JSON.parse(sessionStorage.getItem("user")).username, this.hKeyword)
					}
					this.productList = res.data.content
				})
			},
			//获取历史
			getHkeyword() {
				this.hKeyword = []
				
				if (JSON.parse(sessionStorage.getItem("user"))) {
					
					this.hKeyword = localStorage.getItem(JSON.parse(sessionStorage.getItem("user")).username).split(',')
				}
			},
			onCancel() {
				Toast('取消');
			},
		},
	};
</script>

<style scoped>
	.grids /deep/ .van-hairline {
		align-items: flex-start;
	}
</style>
