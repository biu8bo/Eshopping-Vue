<template>
  <div class="warpper">
    <div class="head">
      <span style="font-size: 15px; font-weight: 600; padding-top: 15px"
        >订单信息</span
      >
      <p style="color: #eaeaea">
        累计订单：{{ userPriceData.orderSum }}条 总消费：￥{{
          userPriceData.orderStatusSum
        }}
      </p>
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
      <div  class="card" v-for="(item, index) in OrderData" :key="index">
        <p>
          <span>订单编号:{{ item.order_id }}</span>
          <span class="time">{{ parseTime(item.create_time) }}</span>
        </p>
        <van-card
          @click="$router.push({name:'orderDetail',query:{key:item.order_id}})"
          v-for="(e, i) in item.store_order_cart_info"
          :key="i"
          :num="e.store_cart.cart_num"
          :price="e.store_cart.store_product_attr_value.price.toFixed(2)"
          :desc="e.store_product.store_info"
          :title="e.store_product.store_name"
          :thumb="$baseUrl + e.store_product.image"
        >
          <template #tags>
            <van-tag plain type="danger">{{
              e.store_cart.store_product_attr_value.sku
            }}</van-tag>
          </template>
          <template #footer>
            <div v-if="active == 0">
              <van-button @click.stop="handlerPay(item.order_id)" size="mini"
                >立即付款</van-button
              >
              <van-button @click.stop="cancelOrder(item.order_id)" size="mini"
                >取消付款</van-button
              >
            </div>
            <div v-if="active == 2">
              <van-button @click.stop="deliverOK(item.order_id)" size="mini"
                >确认收货</van-button
              >
            </div>
            <div v-if="active == 3">
              <van-button @click.stop="replay(item.order_id)" size="mini"
                >立即评论</van-button
              >
            </div>
          </template>
        </van-card>
      </div>
    </div>
    <van-empty
      v-if="OrderData.length == 0"
      image-size="190px"
      :image="emptyImg"
    />
    <van-overlay :show="isload">
  <div class="wrapp" @click.stop>
   <van-loading v-show="isload" type="spinner" color="#1989fa" />
  </div>
</van-overlay>
<div style="text-align:center">
      <van-loading
      v-if="loading"
      color="#0094ff"
      size="20px"
      style="display: inline-block; position: none"
      type="spinner"
    />
</div>
  </div>
</template>
<script>
import { order, cancelOrder, handlerPay,deliverOK } from "@/api/order.js";
import { getBalance } from "@/api/user.js";
import { parseTime } from "@/utils";
export default {
  data() {
    return {
      active: 0,
      emptyImg: require("./img/noOrder.png"),
      OrderData: [],
      hasNext: false,
      isload:false,
      page: 1,
      loading: false,
      limit: 10,
      parseTime,
      userPriceData: {},
    };
  },
  created() {
    this.active = Number(this.$route.query.type ?? 0);
    this.getOrder()
    this.getBalance();
    let vm = this;
    window.onscroll = function () {
      //scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight >= scrollHeight) {
        //到了这个就可以进行业务逻辑加载后台数据了
        vm.more();
      }
    };
  },
  watch: {
    active(n, o) {
      this.OrderData = [];
      this.active = n;
      this.page=1;
   
      this.getOrder();
    },
  },
  methods: {
    deliverOK(id){
      deliverOK(id).then(e=>{
         this.$toast.success("收货成功!");
        this.$router.push({name:"Order",query:{type:3}});
       this.OrderData=[];
       this.getOrder();
       this.active=3;
        this.$forceUpdate();
      })
    },
    //点击加载更多
    more() {
       if (this.hasNext) {
      this.loading = true;
      this.page++;
      this.getOrder();
      }
    },
    replay() {},
    getBalance() {
      getBalance().then((e) => {
        this.userPriceData = e.Data;
      });
    },
    handlerPay(orderKey) {
      handlerPay({
        orderKey,
      }).then((e) => {
        this.$toast.success("支付成功!");
        this.getOrder();
      });
    },
    cancelOrder(orderKey) {
      cancelOrder({
        orderKey,
      }).then((e) => {
        this.$toast.success("取消成功!");
        this.getOrder();
      });
    },
    getOrder() {
      this.isload=true;
      order({
        orderType: this.active,
        Page: this.page,
        Limit: this.limit,
      }).then((e) => {
        this.loading=false;
        this.hasNext = e.Data.HasNext;
        this.OrderData.push(...e.Data.Data);
        this.isload=false;
        this.$forceUpdate();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.warpper {
   .wrapp {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
  height: 100%;
  padding: 0;
  .body {
    padding-top: 10px;
    height: 100%;
    .card {
      background: #fafafa;

      > p {
        padding: 5px 5px 0 5px;
        .time {
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