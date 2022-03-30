<template>
  <div class="warpper">
    <div class="top-1">
      <div class="top">
        <div class="text">
          <span>{{ order.statusInfo }}</span>
        </div>
        <van-cell class="address">
          <template #title>
            <span class="custom-title">{{ order.real_name }}</span>
            <span class="custom-title" style="margin-left: 8px">{{
              order.user_phone
            }}</span>
          </template>
          <template #label>
            <span class="custom-title">{{ order.user_address }}</span>
          </template>
        </van-cell>
      </div>
    </div>
    <van-cell title="订单状态" :value="order.statusInfo" />
          <van-steps :active="active">
          <van-step>等待下单</van-step>
          <van-step>卖家发货</van-step>
          <van-step>买家收货</van-step>
          <van-step>买家评价</van-step>
          <van-step>完成</van-step>
        </van-steps>
    <template v-for="(item, index) in order.store_order_cart_info">
      <van-card
        :key="index"
        :num="item.cart_num"
        :desc="item.store_product.store_info"
        :title="item.store_product.store_name"
        :thumb="item.store_product.image"
      >
        <template #price>
          <font size="3" color="#ED6A0C">￥</font>
          <font size="4" color="#ED6A0C">{{
            item.store_cart.store_product_attr_value.price
          }}</font>
        </template>
        <template #tags>
          <van-tag plain type="danger">{{
            item.store_cart.store_product_attr_value.sku
          }}</van-tag>
        </template>
      </van-card>
    </template>
    <van-cell v-if="order.status>=1" title="快递" :value="order.delivery_name" />
    <van-cell v-if="order.status>=1" title="快递单号" :value="order.delivery_id" />
    <van-cell title="订单号" :value="order.order_id" />
    <van-cell title="下单时间" :value="order.pay_time" />
    <van-cell title="运费" :value="'免运费'" />
    <van-cell title="总金额" :value="order.pay_price" />
    <van-cell title="支付方式" value="余额" />
  </div>
</template>

<script>
import { getOrder } from "@/api/order.js";
export default {
  data() {
    return {
      order: {},
	  active:0
    };
  },
  created() {
    this.getOrder();
	this.active= this.$route.query.active
  },
  methods: {
    getOrder() {
      getOrder(this.$route.query.key).then((res) => {
        this.order = res.Data;
      });
    },
  },
};
</script>

<style scoped>
.top-1 {
  height: 150px;
}

.top {
  background-image: url(../../assets/userBg.png);
  position: relative;
}

.text {
  text-align: center;
  line-height: 90px;
  font-size: 16px;
  color: #f0f0f0;
}

.address {
  bottom: -60%;
  position: absolute;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}
</style>
