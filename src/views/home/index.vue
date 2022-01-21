<!-- home -->
<template>
	<div>
		<div class="warpper">
			<van-sticky :offset-top="0">
				<van-search background="#fff" shape="round" placeholder="请输入搜索关键词" @focus="onfocus" />
			</van-sticky>
			<!-- 搜索end -->
			<van-swipe :autoplay="3000" class="my-swipe" style="margin-top: 5px;">
				<van-swipe-item v-for="(image, index) in slideshowList" :key="index">
					<img v-lazy="imgUrls+image.pic" />
				</van-swipe-item>
			</van-swipe>
			<!-- 轮播图end -->
			<div style="background-color: #FFFFFF;margin-top: 5px;">
				<div style="margin-top: 5px;">
					<van-grid :column-num="4" :border="false">
						<template v-for="(item,index) in menus">
							<van-grid-item :to="item.url">
								<van-image width="50" height="50" :src="imgUrls+item.pic" />
								<span>
									<font size="3" color="">{{item.name}}</font>
								</span>
							</van-grid-item>
						</template>
					</van-grid>
				</div>
			</div>
			<!-- 宫格end -->
			<!-- 热门 新品end -->
			<div style="width: 100%;background-color: #FFFFFF;margin-top: 10px;">
				<div style="height: 28px;line-height: 35px;padding: 5px;">
					<font size="3">精品推荐：</font>
				</div>
				<div style="margin-top: 10px;">
					<van-grid :column-num="2" :border="false">
						<van-grid-item v-for="(item, index) in bastList" :key="index"
							:to="'/productDetails?id='+item.id">
							<van-image :src="imgUrls+item.image" height="140" />
							<span>
								<font size="2">{{ item.storeName }}</font>
							</span>
							<span>
								<font size="4" color="#ff8001">￥{{ item.price }}</font>
								<font size="2" color="#C0C4CC" style="text-decoration:line-through">￥{{item.otPrice}}
								</font>
							</span>
						</van-grid-item>
					</van-grid>
				</div>
			</div>
			<div style="width: 100%;background-color: #FFFFFF;margin-top: 10px;">
				<div style="height: 28px;line-height: 35px;padding: 5px;">
					<font size="3">猜你喜欢：</font>
				</div>
				<div style="margin-top: 10px;">
					<van-card
					@click="goto('/productDetails?id='+item.id)"
					style="background-color: #fff;"
					 v-for="(item, index) in guesslikes" :key="index"
					  tag="Like"
					  :desc="item.storeInfo"
					  :title="item.storeName"
					  :thumb="imgUrls+item.image"
					  :origin-price="item.otPrice"
					>
					 <template #price>
					    <font color="#EE883B" size="4">￥{{item.price}}</font>
					  </template>
					</van-card>
				</div>
			</div>
			<!-- 商品列表end -->
		</div>

	</div>
</template>

<script>
	import {
		getData,
		groupList,
		getMenus,
		getLike,
		getCombinationList,
		getBastList,
		getBanner
	} from "@/api/home.js"
	export default {
		data() {
			return {
				imgUrls: this.$baseApi,
				menus: [],
				groupLists: [],
				bastList: [],
				slideshowList: [],
				guesslikes: [],
				value: '',
			};
		},

		created() {
			this.getData();
		},
		methods: {
			getData() {
				getMenus().then(res => {
					this.menus = res.data
				})
				getLike().then(res => {
					this.guesslikes = res.data
				})

				getBastList().then(res => {
					this.bastList = res.data
				})
				getBanner().then(res => {
					this.slideshowList = res.data
				})
			},
			goto(url) {
				this.$router.push(url)
			},
			onfocus() {
				this.$router.push("/search")
			},
		},
	};
</script>
<style lang="scss" scoped>
	.warpper {
		background-color: #F8F8F8;
		padding: 5px;
	}

	.my-swipe .van-swipe-item img {
		width: 100%;
		height: 200px;
	}

	.my-swipe {
		margin-top: 5px;
		margin-bottom: 7px;
		height: 180px;
	}

	// 滚动条
	.item {
		margin: 5px;
		width: 31.3%;
		white-space: nowrap;
		display: inline-block;
	}

	.scroll {
		padding: 5px;
		margin-top: 8px;
		background-color: #fff;
		text-align: center;
		white-space: nowrap;
		overflow-x: scroll;
		overflow-y: hidden;
	}

	::-webkit-scrollbar {
		display: none;
	}

	// 滚动条
	.grid2 /deep/ .van-hairline {
		align-items: flex-start;
	}

	.grid2 {
		background-color: #F8F8F8;
		margin-top: 8px;

	}

	.colon {
		display: inline-block;
		margin: 0 4px;
		color: #ee0a24;
	}

	.block {
		display: inline-block;
		margin-left: 8px;
		height: 18px;
		width: 18px;
		color: #fff;
		font-size: 5px;
		text-align: center;
		background-color: #ff8001;
	}

	.classifys {
		height: 35px;
		line-height: 35px;
		padding: 15px;
	}

	.activity {
		background-color: #FFFFFF;
		margin-top: 10px;
		padding: 5px;
	}

	.activity-col {
		padding: 10px;
		background-color: #ffe3ce;
	}
</style>
