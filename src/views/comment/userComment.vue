<template>
  <div class="warpper">
    <div v-for="(e, i) in OrderData.store_order_cart_info" :key="i">
      <van-card
        @click="$router.push('/productDetails?id=' + e.product_id)"
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
      </van-card>
      <van-cell title="产品评价">
        <van-rate v-model="e.product_score" />
      </van-cell>
      <van-cell title="服务评价">
        <van-rate v-model="e.service_score" />
      </van-cell>
      <van-uploader v-model="e.picList" :after-read="afterRead" multiple :max-count="5"/>
      <van-field
        v-model="e.comment"
        rows="2"
        autosize
        label="评论"
        type="textarea"
        maxlength="50"
        placeholder="给宝贝一个评价吧~"
        show-word-limit
      />
    </div>
    <van-button style="margin-top:20px" block color="linear-gradient(to right, #ffd01e, #ff8917)" round type="primary">提交评价</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      OrderData: this.$store.state.app.orderData,
    };
  },
  methods: {
      afterRead(file){
          console.log(file);
      }
  },
};
</script>
<style lang="scss" scoped>
</style>