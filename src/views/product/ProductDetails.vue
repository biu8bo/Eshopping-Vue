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
          <div style="float: right; color: gray; font-size: 12px">
            <span>销量{{ productData.sales+productData.ficti }}</span>
            <span style="margin-left: 12px"
              >浏览量{{ productData.browse }}</span
            >
          </div>
          <div>
            <span style="font-size: 18px">¥</span>
            <span style="font-size: 26px">{{
              Number(productData.price).toFixed(2)
            }}</span>
            <span style="font-size: 14px"> 起 </span>
            <span style="font-size: 14px; color: gray"
              ><s>¥{{ Number(productData.ot_price).toFixed(2) }}</s></span
            >
          </div>
        </div>

        <p class="title">{{ productData.store_name }}</p>
        <p class="title2">{{ productData.store_info }}</p>
      </div>
      <div style="margin-top: 8px">
        <van-cell-group class="shadow-box">
          <van-cell
            class="radius-top"
            @click="show = true"
            title="选择规格"
            is-link
            :value="selectSku"
          />
          <van-cell>
            <template #title>
              <div>
                <span>保障</span>
                <span style="margin-left: 12px"
                  >假一赔四 · 退货运费险 · 上门取退</span
                >
              </div>
            </template>
          </van-cell>
          <van-cell
            class="radius-bottom"
            @click="showAddress = true"
            :label="'24点前付款，预计' + sendTime + '送达'"
            is-link
          >
            <template #title>
              <div>
                <span>送至</span>&nbsp;&nbsp;<span
                  ><van-icon name="location-o" size="16px"
                /></span>
                <span>{{ locationInfo }}</span
                >&nbsp;<span style="color: #ff652c; font-size: 13px">{{
                  stockTips
                }}</span>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <!-- 评论区展示 -->
      <div style="margin-top: 8px">
        <van-cell-group class="shadow-box">
          <van-cell class="radius-top">
            <template #title>
              <span style="font-weight: 500"
                >宝贝评价({{ commentData.Total }})</span
              >
            </template>
            <template>
              <span style="color: #ff652c"
              @click="toAllComment()"
              v-if="commentShowData.length != 0"
                >查看全部<van-icon name="arrow"
              /></span>
            </template>
          </van-cell>
          <van-cell v-if="commentShowData.length == 0">
            <div>暂无宝贝评论~</div>
          </van-cell>
          <UserComment
            v-if="commentShowData.length"
            :commentData="commentShowData[0]"
            class="radius-bottom"
          />
        </van-cell-group>
      </div>
      <!-- 图文描述 -->
      <div v-html="productData.description"></div>
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
    <van-goods-action>
      <van-goods-action-icon
        @click="$router.push({ name: 'Home' })"
        icon="wap-home-o"
        text="首页"
        color="#ee0a24"
      />
      <van-goods-action-icon
        icon="like-o"
        @click="addCollect"
        v-if="!isCollect"
        text="收藏"
      />
      <van-goods-action-icon
        icon="like"
        @click="addCollect"
        v-if="isCollect"
        text="已收藏"
        color="#ff5000"
      />
      <van-goods-action-icon
        icon="shopping-cart-o"
        text="购物车"
        @click="$router.push({ name: 'Cart' })"
        color="#ff5000"
      />
      <van-goods-action-button
        type="warning"
        @click="show = true"
        text="加入购物车"
      />
      <van-goods-action-button
        type="danger"
        @click="show = true"
        text="立即购买"
      />
    </van-goods-action>
  </div>
</template>

<script>
import UserComment from "@/components/UserComment.vue";
import { addCollect } from "@/api/collect.js";
import { getProductInfo } from "@/api/product.js";
import { addCart } from "@/api/cart.js";
import { getProductReply } from "@/api/replay.js";
import { parseTime } from "@/utils";
export default {
  data() {
    return {
      current: 0,
      pid: this.$route.query.id,
      sliderImg: [],
      productData: [],
      show: false,
      selectSku: "",
      locationInfo: "正在获取位置...",
      stockTips: "",
      showAddress: false,
      selectSkuPrice: 0,
      commentData: [],
      commentShowData: [],
      isCollect: false,
      sendTime: "",
      sku: {
        tree: [],
        list: [],
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
  components: { UserComment },
  created() {
    this.getProductInfo();
    this.getLocationInfo();
    this.getProductReply();
    this.sendTime = parseTime(
      new Date().getTime() + 86400000 * 3,
      "{y}-{m}-{d}"
    );
  },
  methods: {
    toAllComment(){
      this.$store.commentData =  this.commentData;
      this.$router.push({
        name:"Comment",
        query:{
          pid:this.pid
        }
      })
    },
    //添加收藏
    addCollect() {
      addCollect({
        pid: this.pid,
        type: "collect",
      }).then((e) => {
        this.isCollect = !this.isCollect;
      });
    },
    //获取位置信息
    async getLocationInfo() {
      //获取当前位置
      let vm = this;
      var geolocation = new BMap.Geolocation();
      await geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          //获取地址信息，设置地址label
          var gc = new BMap.Geocoder();
          gc.getLocation(r.point, function (rs) {
            //   debugger
            var addComp = rs.addressComponents;
            vm.locationInfo =
              addComp.province + " " + addComp.city + " " + addComp.district;
          });
        }
      });
    },
    onBuyClicked(skuData) {
      addCart({
        unique: skuData.selectedSkuComb.unique,
        productId: skuData.goodsId,
        num: skuData.selectedNum,
      }).then((e) => {
        this.$router.push({
          name: "CreateOrder",
          query: {
            ids: e.Data,
          },
        });
        this.show = false;
      });
    },
    onAddCartClicked(skuData) {
      addCart({
        unique: skuData.selectedSkuComb.unique,
        productId: skuData.goodsId,
        num: skuData.selectedNum,
      }).then((e) => {
        this.$toast.success("加入成功！");
        this.show = false;
      });
    },
    onChange(index) {
      this.current = index;
    },
    //获取评论区数据
    getProductReply() {
      getProductReply({
        pid: this.pid,
        page: 1,
        limit: 10,
      }).then((resp) => {
        resp.Data.Data.forEach(e=>{
          if (e.productInfo!=null) {
            e.productInfo.cart_info =JSON.parse(e.productInfo.cart_info)
          }
          
        })
        this.commentData = resp.Data;
        this.commentShowData = this.commentData.Data;
      });
    },
    //监听规格变化
    onSkuSelected(skuValue) {
      this.selectSkuPrice =
        skuValue.selectedSkuComb == null ? 0 : skuValue.selectedSkuComb.price;
      let str = "";
      let selecteds = Object.keys(skuValue.selectedSku);
      selecteds.forEach((e, index) => {
        if (skuValue.selectedSku[e] != "") {
          str += skuValue.selectedSku[e] + ",";
        }
      });
      str = str.substring(0, str.length - 1);

      //设置组合预览的图片
      let attrValues = this.productData.storeProductAttrValues;
      for (let index = 0; index < attrValues.length; index++) {
        const element = attrValues[index];
        if (element.image != null && element.image != "") {
          this.goods.picture = this.$baseUrl + element.image;
        }
      }
      this.selectSku = str;
    },
    getProductInfo() {
      getProductInfo(this.pid).then((e) => {
        this.productData = e.Data;
        this.isCollect = this.productData.isCollect;
        this.sliderImg = e.Data.slider_image.split(",");
        this.goods.picture = this.$baseUrl + this.sliderImg[0];
        this.sku.stock_num = this.productData.stock;
        this.sku.price = this.productData.price.toFixed(2);
        //库存提示
        if (this.productData.stock < 100) {
          this.stockTips = "库存紧张";
        }
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

        let list = [];
        //设置可选项
        skuAttrValues.forEach((j) => {
          //可选组合元素
          let listItem = {
            id: j.id,
            unique: j.unique,
            price: j.price * 100,
            stock_num: j.stock,
          };
          //拆分可选组合
          let combinations = j.sku.split(",");
          combinations.forEach((combinationsItem) => {
            //从组合中找对应类别
            skuAttr.forEach((k) => {
              let attrValues = k.attr_values.split(",");
              let isExist =
                attrValues.find((e) => e === combinationsItem) ===
                combinationsItem;
              if (isExist) {
                listItem[k.attr_name] = combinationsItem;
              }
            });
          });
          list.push(listItem);
        });
        this.sku.list = list;
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

.address-bottom {
  padding: 5px 10px;
  /deep/ .van-button {
    width: 100%;
    height: 40px;
  }
}
</style>