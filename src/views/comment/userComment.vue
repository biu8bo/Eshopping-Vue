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
      <div>
        <div style="margin-left: 16px">
          <div style="line-height: 44px; height: 44px">
            <span style="font-size: 14px">图片上传</span>
          </div>
          <div style="margin-left: 10px">
            <van-uploader
              v-model="e.picList"
              :after-read="afterRead"
              multiple
              :max-count="5"
            />
          </div>
        </div>
      </div>
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
      <van-divider
        v-show="OrderData.store_order_cart_info.length - 1 > i"
        :style="{
          color: '#1989fa',
          borderColor:
            'linear-gradient(to right, rgb(255, 96, 52), rgb(238, 10, 36))',
          padding: '0 16px',
        }"
      >
        ----------------------------------     ---------------------------------
      </van-divider>
    </div>
    <van-button
      style="margin-top: 20px"
      block
      color="linear-gradient(to right, #ffd01e, #ff8917)"
      round
      @click="submitComment"
      type="primary"
      >提交评价</van-button
    >
  </div>
</template>
<script>
import { upload } from "@/utils/upload.js";
import {comment} from '@/api/order.js'
export default {
  data() {
    return {
      OrderData: this.$store.state.app.orderData,
      subForm:[]
    };
  },
  created(){
    //Vuex中不存在待评论商品信息，就跳回订单详情
    if(this.$store.state.app.orderData.length==0){
      this.$router.push({name:"Order",query:{type:1}})
    }
  },
  methods: {
    //提交评论
    submitComment(){
      //提取数据
      this.OrderData.store_order_cart_info.forEach(element => {
        if (element.product_score==undefined) {
          this.$toast.fail(`请给${element.store_product.store_name}的商品评分`);
          return;
        }

         if (element.service_score==undefined) {
           this.$toast.fail(`请给${element.store_product.store_name}的服务评分`);
            return;
        }
        //提取图片
        let pics = "";
        element.picList.forEach(e=>{
         pics+=e.pic+','
        });
        //去除尾部逗号
        pics = pics.substr(0,pics.length-1);
        element.pics=pics
        
        this.subForm.push(element)
      });
      this.subForm = JSON.parse(JSON.stringify(this.subForm))

      comment(this.subForm).then(e=>{
        this.$toast.success("评论成功！")
         this.$store.commit("SET_OrderData", []);
        this.$router.push({name:"Order",query:{type:4}})
      })
    },
    afterRead(file) {
      //调用文件上传接口
      upload(file.file).then((e) => {
      file.pic =e.data.Data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.warpper {
  background: #fff;
}
</style>