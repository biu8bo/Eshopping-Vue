<template>
  <div>
    <!-- 轮播商品图 -->
    <div>
      <van-swipe @change="onChange">
        <van-swipe-item
          :autoplay="3000"
          v-for="(item, index) in sliderImg"
          :key="index"
        >
          <van-image :src="$baseUrl + item" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{ sliderImg.length }}
          </div>
        </template>
      </van-swipe>
    </div>
    <div class="warpper">
      <!-- 商品详情信息 -->
      <div class="detail-card shadow-box">
        <div class="price">
          <div style="float: right;color:gray;font-size: 13px;font-weight: 500;"><span>销量{{productData.sales}}</span> <span style="margin-left:10px">浏览量{{productData.browse}}</span></div>
          <div>
            <span style="font-size: 20px">¥</span>
            <span style="font-size: 29px">{{
              Number(productData.price).toFixed(2)
            }}</span>
            <span style="font-size: 16px; font-weight: 500"> 起 </span>
            <span style="font-size: 16px; font-weight: 500; color: gray"
              ><s>¥{{  Number(productData.ot_price).toFixed(2)}}</s></span
            >
          </div>
        </div>
        <p class="title">{{productData.store_name}}</p>
        <p class="title2">{{productData.store_info}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductInfo } from "@/api/product.js";
export default {
  data() {
    return {
      current: 0,
      pid: this.$route.query.id,
      sliderImg: [],
      productData: [],
    };
  },
  created() {
    this.getProductInfo();
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    getProductInfo() {
      getProductInfo(this.pid).then((e) => {
        this.productData = e.Data;
        this.sliderImg = e.Data.slider_image.split(",");
      });
    },
  },
};
</script>

<style scoped lang="scss">
.detail-card {
  background: white;
  padding: 10px 13px;
  .title{
      font-size: 16px;
      font-weight: 600;
      margin: 5px 0px;
  }
    .title2{
      font-size: 13px;
      color: gray;
      margin: 5px 0px;
  }
  .price {
    font-weight: 700;
    color: #eb3729;
    height: 35px;
    line-height: 35px;
  }
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 7px 10px;
  color: white;
  font-size: 13px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.281);
}
</style>