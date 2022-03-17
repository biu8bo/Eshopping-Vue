<template>
	<div>
		<van-submit-bar :price="money*100" button-text="提交订单" @submit="onSubmit" tip="向左滑动商品可删除该商品！">
			<van-checkbox v-model="value" @click="toggleAll(ckAll==false?true:false)">全选</van-checkbox>
		</van-submit-bar>
		<van-empty description="空空如也!" v-if="cartList.length<=0" />
		<div class="cart">
			<van-checkbox-group v-model="result" ref="checkboxGroup">
				<van-swipe-cell v-for="item in cartList" :key="item.cart.cart.id"
					>
					<van-card :num="item.cart.cart.cart_num" :desc="item.productData.store_info" :title="item.productData.store_name"
						:thumb="item.productData.image">
						<template #tags>
							<van-tag plain type="danger" style="margin-top: 10px;">{{item.cart.sku}}
							</van-tag>
						</template>
						<template #price>
							<span>
								<font color="red" size="3"> ￥{{item.cart.truePrice}}</font>
							</span>
						</template>
						<template #footer>
							<van-stepper v-model="item.cart.cart.cart_num" integer @change="onChange" :value="changevalue"
								@plus="itemId=item.cart.cart.id" @minus="itemId=item.cart.cart.id" @focus="itemId=item.cart.cart.id" />
						</template>
						<template #tag>
							<van-checkbox :name="item.cart.cart.id" @click="toggle(item.cart.cart.id,item.cart.truePrice*item.cart.cart.cart_num)"
								checked-color="#ee0a24"></van-checkbox>
						</template>
					</van-card>
					<template #right>
						<van-button square text="删除" type="danger" class="delete-button" @click="del(item.cart.cart.id)" />
					</template>
				</van-swipe-cell>
			</van-checkbox-group>
		</div>
	</div>
</template>
<script>
	import {
		getCartList,
		upCartNum,
		delCart
	} from "@/api/cart.js"
	export default {
		data() {
			return {
				imgUrls: this.$baseApi,
				changevalue: 0, //计数器
				cartList: [],
				value: false, //控制全选按钮
				money: 0, //总金额
				result: [], //全选的 name数组
				list: [], //获取点击的id数组
				ckAll: false, //是否全选
				itemId: null, //商品id 改变商品数量时使用
			};
		},
		created() {
			this.getCart()
		},
		methods: {
			//获取购物车列表
			getCart() {
				getCartList().then(res => {
					this.cartList = res.Data
				})
			},
			//获取点击的name 复选框
			toggle(name, money) {
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i] == name) {
						this.ckAll = false
						this.money = this.money - money
						this.list.splice(i, 1);
						name = null
						this.value = false
						return
					}
				}
				if (name != null) {
					this.list.push(name)
					this.money = this.money + money
				}
			},
			////修改购物车数量
			onChange(value) {
					console.log(value);
				this.money = 0
				this.cartList.forEach((item, index) => {
					console.log(item.cart.cart.id);
					this.list.forEach((element,i) => {
						if (item.cart.cart.id ==element) {
						this.money = this.money + item.cart.truePrice * item.cart.cart.cart_num
					}
					});
					
				})

				this.$toast.loading({
					forbidClick: true
				});
				let vm = this
				clearTimeout(vm.timer);
				vm.timer = setTimeout(() => {
					vm.$toast.clear();
					vm.changevalue = value;
					if (vm.changevalue > 0 && vm.itemId != null) {
						upCartNum({
							cart_num: vm.changevalue,
							id: vm.itemId
						}).then(res => {
							this.getCart();
						})
					}
				}, 500);
			},
			//提交按钮
			onSubmit() {
				if (this.list.length > 0) {
					if (this.list.length == 1) {
						this.$router.push({
							name: 'CreateOrder',
							query: {
								ids: this.list[0]
							}
						});
					} else {
						this.$router.push({
							name: 'CreateOrder',
							query: {
								ids: JSON.stringify(this.list).replace('[', '').replace(']', '')
							}
						});
					}

				} else {
					this.$toast.fail("至少选择一件商品！")
				}


			},
			//删除
			del(id) {
				delCart({
					cid:id
				}).then(res => {
						this.getCart()
						this.$toast.success('删除成功');
				})
			},
			//全选
			toggleAll(ckAll) {
				this.money = 0
				this.$refs.checkboxGroup.toggleAll(ckAll);
				this.ckAll = ckAll
				this.list = []
				let money = 0
				if (ckAll) {
					//计算总金额
					this.cartList.forEach(item => {
						money = money + item.cart.truePrice * item.cart.cart.cart_num
						this.list.push(item.id)
					})
					this.money = money
				} else {
					this.list = []
					this.money = money
				}
			},
		},
	};
</script>

<style scoped>
	.warpper {
		position: absolute;

		left: 0px;
		right: 0px;
		height: 80%;
		background: #fff;
	}

	.cart {

		background-color: #FFFFFF;
		padding: 10px;
	}

	.delete-button {
		height: 100%;
	}

	.van-swipe-cell {
		margin-top: 5px;
	}
</style>
