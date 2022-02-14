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
          <div
            style="float: right; color: gray; font-size: 13px; font-weight: 500"
          >
            <span>销量{{ productData.sales }}</span>
            <span style="margin-left: 10px"
              >浏览量{{ productData.browse }}</span
            >
          </div>
          <div>
            <span style="font-size: 20px">¥</span>
            <span style="font-size: 29px">{{
              Number(productData.price).toFixed(2)
            }}</span>
            <span style="font-size: 16px; font-weight: 500"> 起 </span>
            <span style="font-size: 16px; font-weight: 500; color: gray"
              ><s>¥{{ Number(productData.ot_price).toFixed(2) }}</s></span
            >
          </div>
        </div>
        <p class="title">{{ productData.store_name }}</p>
        <p class="title2">{{ productData.store_info }}</p>
      </div>
      <div>
        <van-cell
          style="margin-top: 8px"
          class="detail-card shadow-box"
          @click="show = true"
          title="选择规格"
          is-link
          :value="selectSku"
        />
      </div>
    </div>
    <div>
      <div>
        <van-sku
          v-model="show"
          :sku="sku"
          :goods="goods"
          :goods-id="pid"
          :hide-stock="sku.hide_stock"
          @sku-selected="onSkuSelected"
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"
        />
      </div>
    </div>
    <van-submit-bar
      :price="3050"
      button-text="立即购买"
      @submit="show = true"
    />
  </div>
</template>

<script>
import { getProductInfo } from "@/api/product.js";
import { List } from 'vant';
export default {
  data() {
    return {
      current: 0,
      pid: this.$route.query.id,
      sliderImg: [],
      productData: [],
      show: false,
      selectSku: "",
      sku: {
        tree:[],
        list:[],
        price: "", // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        collection_id: 0, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "",
      },
    };
  },
  created() {
    this.getProductInfo();
  },
  methods: {
    onBuyClicked(skuData) {
      console.log(skuData);
    },
    onAddCartClicked(skuData) {},
    onChange(index) {
      this.current = index;
    },
    //规格变化
    onSkuSelected(skuValue, selectedSku, selectedSkuComb){
   this.selectSku= skuValue.skuValue.name
    },
    getProductInfo() {
      getProductInfo(this.pid).then((e) => {
        this.productData = e.Data;
        this.sliderImg = e.Data.slider_image.split(",");
        this.goods.picture = this.$baseUrl + this.sliderImg[0];
        this.sku.stock_num =  this.productData.stock
        this.sku.price = this.productData.price.toFixed(2)
        //创建sku结构、
        const skuAttrValues = this.productData.storeProductAttrValues;
        const skuAttr = this.productData.storeProductAttrs;
        //创建规格列表
        let tree = [];
        skuAttr.forEach((element) => {
          let treeItem = {};
          treeItem.k = element.attr_name;
          treeItem.k_s = element.attr_name;
          treeItem.v = [];
          let attrValues = element.attr_values.split(",");
          //遍历规格类目下的所有规格
          attrValues.forEach((element) => {
            let item = {};
            item.id = element;
            item.name = element;
            treeItem.v.push(item);
          });
          tree.push(treeItem);
        });
        this.sku.tree = tree;

        let list = []
        //设置可选项
        skuAttrValues.forEach((j) => {
          //可选组合元素
          let listItem = {
            id: j.id,
            unique: j.unique,
            price: j.price*100,
            stock_num: j.stock,
          };
          //拆分可选组合
          let combinations = j.sku.split(",");
          combinations.forEach((combinationsItem) => {
            //从组合中找对应类别
            skuAttr.forEach((k) => {
              let attrValues = k.attr_values.split(",");
              let isExist = 
                attrValues.find(e=>e===combinationsItem) === combinationsItem;
              if (isExist) {
                listItem[k.attr_name] = combinationsItem;
              }
            });
          });
        list.push(listItem)
        });
        this.sku.list = list
      });
    },
  },
};
</script>

<style scoped lang="scss">
.detail-card {
  background: white;
  padding: 10px 13px;
  .title {
    font-size: 16px;
    font-weight: 600;
    margin: 5px 0px;
  }
  .title2 {
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