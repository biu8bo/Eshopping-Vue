<template>
  <div class="warpper">
    <template>
      <van-cell is-link @click="addressShow = true" v-if="!addressInfo">
        <template #title>
          <span class="custom-title">请选择地址 </span>
        </template>
      </van-cell>
      <van-cell is-link @click="addressShow = true" v-if="addressInfo">
        <template #title>
          <span class="custom-title">{{ addressInfo.real_name }}</span>
          <span class="custom-title" style="margin-left: 8px">{{
            addressInfo.phone
          }}</span>
        </template>
        <template #label>
          <span class="custom-title">{{
            addressInfo.province +
            " " +
            addressInfo.district +
            " " +
            addressInfo.city
          }}</span>
        </template>
      </van-cell>

      <van-popup
        v-model="addressShow"
        round
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-contact-card type="add" @click="onAdd" />
        <template v-for="(item, index) in addressList">
          <van-contact-card
            :key="index"
            type="edit"
            :name="item.real_name"
            :tel="item.phone"
            @click="address(item)"
          />
        </template>
      </van-popup>
      <!-- 商品信息 -->
      <template>
        <div :key="index" v-for="(item, index) in cartInfo">
          <van-card
            v-if="cartInfo.length > 0"
            :num="item.cart_num"
            :desc="item.productInfo.store_info"
            :title="item.productInfo.store_name"
            style="background-color: #fff"
            :thumb="item.productInfo.image"
          >
            <template #price>
              <span>
                <font size="3" color="#ED6A0C">￥</font>
                <font size="4" color="#ED6A0C">{{ item.attrInfo.price }}</font>
              </span>
            </template>
            <template #tags>
              <van-tag plain type="danger">{{ item.attrInfo.sku }}</van-tag>
            </template>
          </van-card>
        </div>
      </template>
      <!-- 商品信息end -->
      <!-- 优惠券列表 -->
      <!-- 		<van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" /> -->
      <!-- <van-cell
        title="优惠券"
        is-link
        @click="showList = true"
        v-if="!enableIntegral"
      >
        <template #default v-if="couponInfo">
          <span>
            <font size="2" color="#cccccc"
              >已减{{ couponInfo.couponPrice }}</font
            >
          </span>
        </template>
      </van-cell> -->
      <!-- <van-popup
        v-model="showList"
        round
        position="bottom"
        :style="{ height: '30%', background: '#f5f5f5' }"
      >
        <van-cell
          center
          class="discount"
          v-for="(item, index) in couponList"
          :key="index"
          @click="ckCoupon(item)"
        >

          <template #title>
            <span style="margin-left: 10px">{{ item.couponTitle }}</span
            ><br />
            <span style="margin-left: 10px">
              <font size="2" color="#cccccc"
                >满{{ item.useMinPrice }}减{{ item.couponPrice }}</font
              >
            </span>
          </template>
          <template #label>
            <font style="margin-left: 10px" size="3" color="#ff5a5f"
              >{{ item.endTime }} 到期</font
            >
          </template>
          <template #icon>
            <font size="2" color="#ff5a5f">￥</font>
            <font size="6" color="#ff5a5f">{{ item.couponPrice }}</font>
          </template>
        </van-cell>
      </van-popup> -->

      <template>
        <van-cell>
          <van-cell
            title="商品价格"
            :value="'¥ ' + orderInfo.priceGroup.totalPrice.toFixed(2)"
          />

          <van-cell title="运费" value="免邮费" />
          <van-field v-model="mark" label="备注" placeholder="请输入备注" />
        </van-cell>
      </template>
      <!-- 支付方式 -->
      <div class="pay">
        <van-radio-group v-model="radio">
          <van-cell center icon="shop-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #title>
              <span class="custom-title">余额</span>
            </template>
            <template #label>
              <span class="custom-title">￥{{ userInfo.now_money }}</span>
            </template>
            <template #right-icon>
              <van-radio name="1"></van-radio>
            </template>
          </van-cell>
          <van-cell center icon="shop-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #title>
              <span class="custom-title">微信</span>
            </template>
            <template #label>
              <span class="custom-title">暂未开通</span>
            </template>
            <template #right-icon>
              <van-radio name="1" disabled></van-radio>
            </template>
          </van-cell>
        </van-radio-group>
      </div>

      <van-submit-bar
        :price="orderInfo.priceGroup.totalPrice * 100"
        button-text="提交订单"
        @submit="createOrder"
      />
    </template>
  </div>
</template>
<script>
import { confirm, updateOrderAddress,payOrder } from "@/api/order.js";
import { getAddress } from "@/api/address.js";

import { parseTime } from "@/utils";
export default {
  data() {
    return {
      radio: "1",
      mark: "",
      addressShow: false,
      orderInfo: [],
      parseTime,
      userInfo: null,
      orderKey: null,
      addressInfo: null,
      cartInfo: null,
      addressList: [],
    };
  },
  created() {
    this.$nextTick((_) => {
      this.getOrderInfo();
      this.getAddress();
    });
  },
  methods: {
    getAddress() {
      getAddress().then((e) => {
        this.addressList = e.Data;
      });
    },
    onAdd() {
      this.$router.push({
        name: "NewContact",
      });
    },
    address(item) {
      //更新订单地址信息
      updateOrderAddress({
        addressId: item.id,
        orderKey: this.orderKey,
      }).then((res) => {
        this.addressInfo = res.Data.addressInfo;
        this.addressShow = false;
      });
    },
    //创建订单
    createOrder() {
      payOrder({
        orderKey:this.orderKey,
        mark:this.mark
      }).then(e=>{
        console.log(e);
      })
    },
    getOrderInfo() {
      confirm({
        cartIds: this.$route.query.ids.toString().split(","),
      }).then((res) => {
        this.orderInfo = res.Data;
        this.addressInfo = res.Data.addressInfo;
        this.userInfo = res.Data.userInfo;
        this.cartInfo = res.Data.cartInfo;
        this.orderKey = res.Data.orderKey;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.warpper {
  padding: 15px;
}

.discount {
  width: calc(100% - 15px);
  margin: 10px auto;
  border-radius: 8px;
}

.pay {
  margin-top: 15px;
  border: 1px solid #f8f8f8;
}
</style>