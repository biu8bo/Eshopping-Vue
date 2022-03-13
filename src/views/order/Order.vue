<template>
  <div class="warpper">
    <div class="head">
      <span style="font-size: 15px; font-weight: 600; padding-top: 15px"
        >订单信息</span
      >
      <p style="color: #eaeaea">累计订单：￥0 总消费：￥0</p>
      <div>
        <van-tabs title-active-color="red" v-model="active">
          <van-tab>
            <template #title>
              <div>待付款</div>
              <!-- <div>0</div> -->
            </template>
          </van-tab>
          <van-tab>
            <template #title>
              <div>待发货</div>
              <!-- <div>0</div> -->
            </template>
          </van-tab>
          <van-tab>
            <template #title>
              <div>待收货</div>
              <!-- <div>0</div> -->
            </template>
          </van-tab>
          <van-tab>
            <template #title>
              <div>待评价</div>
              <!-- <div>0</div> -->
            </template>
          </van-tab>
          <van-tab>
            <template #title>
              <div>已完成</div>
              <!-- <div>0</div> -->
            </template>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="body">
      <div class="card" v-for="(item, index) in OrderData" :key="index">
        <p><span>订单编号:{{ item.order_id }}</span>
        <span class="time">{{parseTime(item.create_time)}}</span>
        </p>
        <van-card
          v-for="(e, i) in item.store_order_cart_info"
          :key="i"
          :num="e.store_cart.cart_num"
          :price="e.store_cart.store_product_attr_value.price"
          :desc="e.store_product.store_info"
          :title="e.store_product.store_name"
          :thumb="$baseUrl+e.store_product.image"
        >
          <template #tags>
            <van-tag plain type="danger">{{
              e.store_cart.store_product_attr_value.sku
            }}</van-tag>
          </template>
          <template #footer>
            <van-button size="mini">按钮</van-button>
            <van-button size="mini">按钮</van-button>
          </template>
        </van-card>
      </div>
    </div>
    <van-empty
      v-if="OrderData.length == 0"
      image-size="190px"
      :image="emptyImg"
    />
  </div>
</template>
<script>
import { order } from "@/api/order.js";
import {parseTime} from '@/utils'
export default {
  data() {
    return {
      active: 0,
      emptyImg: require("./img/noOrder.png"),
      OrderData: [],
      hasNext: true,
      page: 1,
      limit: 10,
      parseTime
    };
  },
  created() {
    this.active = this.$route.query.type ?? 0;
    this.getOrder();
  },
  watch:{
    active(n,o){
      this.getOrder()
      this.OrderData=[]
    }
  },
  methods: {
    getOrder() {
      order({
        orderType: this.active,
        Page: this.page,
        Limit: this.limit,
      }).then((e) => {
        this.hasNext = e.Data.HasNext;
        this.OrderData = e.Data.Data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.warpper {
  height: 100%;
  padding: 0;
  .body {
    padding-top: 10px;
    height: 100%;
    .card {
      background: #fafafa;
     
      >p{
        padding: 5px 5px 0 5px;
         .time{
        float: right;
        
      }
        font-size: 13px;
      }
    }
    .van-card {
      margin-top: 10px;
    }
  }

  .head {
    position: relative;
    padding: 20px;
    color: white;
    background-color: #eb3729 !important;
    height: 100px;
    .van-tabs {
      width: 90%;
      position: absolute;
      left: 5%;
      bottom: -15px;
      /deep/ .van-tabs__wrap {
        height: 65px;
      }
    }
    /deep/ .van-tab__text--ellipsis {
      display: block;
      text-align: center;
    }
  }
}
</style>