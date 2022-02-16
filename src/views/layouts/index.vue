<template>
	<div class="app-container">

		<van-sticky :offset-top="0">
			<van-nav-bar left-arrow v-if="$route.meta.navBar" @click-left="onClickLeft" @click-right="onClickRight">
				<template #right>
					<van-icon name="search" size="18" @click="go" />
				</template>
				<template #title>
					{{$route.meta.title}}
				</template>
			</van-nav-bar>
		</van-sticky>

		<div class="layout-content">
			<!-- <transition name="van-slide-left"></transition> -->
			<keep-alive v-if="$route.meta.keepAlive">
				<router-view></router-view>
			</keep-alive>
			<router-view v-else></router-view>

		</div>

		<div class="layout-footer" v-if="$route.meta.tabBar">
			<TabBar :data="tabbars" @change="handleChange" />
		</div>
	</div>
</template>

<script>
	import TabBar from '@/components/TabBar'
	export default {
		name: 'AppLayout',
		data() {
			return {
				tabbars: [{
						title: '首页',
						to: {
							name: 'Home'
						},
						icon: 'home-o'
					},
					{
						title: '分类',
						to: {
							name: 'category'
						},
						icon: 'apps-o'
					},
					
					{
						title: '购物车',
						to: {
							name: 'Cart'
						},
						icon: 'shopping-cart-o'
					},
					{
						title: '个人中心',
						to: {
							name: 'User'
						},
						icon: 'user-o'
					}
				]
			}
		},
		created() {},
		components: {
			TabBar
		},
		methods: {
			go() {
				this.$router.push("/search")
			},
			onClickLeft() {
				this.$router.go(-1);
			},
			onClickRight() {

			},
			handleChange(v) {}
		}
	}
</script>
<style lang="scss">


</style>
