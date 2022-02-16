<template>
  <div>
    <!-- 搜索 -->
    <van-sticky :offset-top="0">
      <div>
        <van-search
          shape="round"
          v-model="keyword"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
        >
          <template #left>
            <div style="color: gray; width: 38px; font-size: 25px">
              <van-icon @click="$backPage" name="arrow-left" />
            </div>
          </template>
          <template #action>
            <van-button
              @click="onSearch(keyword)"
              color="linear-gradient(to right, #ff6034, #ee0a24)"
              round
              size="small"
              >搜索</van-button
            >
          </template>
        </van-search>
      </div>
    </van-sticky>
    <van-tabs @click="changeSearch" title-active-color="red" line-height="0">
      <van-tab name="0">
        <template #title> 默认 </template>
      </van-tab>
      <van-tab name="1">
        <template #title>
          <span>价格</span>
          <div style="position: absolute; left: 70px; top: 8px">
            <van-icon
              :color="priceOrder == 'desc' ? 'gray' : ''"
              style="font-weight: bold"
              name="arrow-up"
            />
            <van-icon
              :color="priceOrder == 'asc' ? 'gray' : ''"
              style="
                font-weight: bold;
                position: absolute;
                left: 0;
                bottom: -5px;
              "
              name="arrow-down"
            />
          </div>
        </template>
      </van-tab>
      <van-tab name="2">
        <template #title
          ><div>
            <span>销量</span>
            <div style="position: absolute; left: 70px; top: 8px">
              <van-icon
                :color="salesOrder == 'desc' ? 'gray' : ''"
                style="font-weight: bold"
                name="arrow-up"
              />
              <van-icon
                :color="salesOrder == 'asc' ? 'gray' : ''"
                style="
                  font-weight: bold;
                  position: absolute;
                  left: 0;
                  bottom: -5px;
                "
                name="arrow-down"
              />
            </div>
          </div>
        </template>
      </van-tab>
      <van-tab name="3">
        <template #title> 新品 </template>
      </van-tab>
    </van-tabs>
    <div style="padding: 5px 8px">
      <van-row gutter="8">
        <van-col
          @click="$router.push('/productDetails?id=' + item.id)"
          style="margin-bottom: 6px"
          v-for="(item, index) in productData"
          :key="index"
          span="12"
        >
          <div class="shadow-box good-card">
            <div>
              <van-image
                width="100%"
                height="180px"
                :src="$baseUrl + item.image"
              />
            </div>
            <div class="title">
              <div>
                {{ item.store_name }}
              </div>
            </div>
            <div>
              <font
                color="#f10404"
                style="margin-left: 5px; font-size: 20px; font-weight: 500"
              >
                <font size="3">￥</font>{{ item.price.toFixed(2) }}</font
              >
            </div>
            <div class="price">
              <div style="margin-top: 5px">
                <font
                  style="
                    margin-top: 2px;
                    margin-left: 5px;
                    font-size: 14px;
                    color: gray;
                  "
                >
                  <s>¥{{ item.ot_price.toFixed(2) }}</s></font
                >
                <font style="float: right; margin-right: 10px; color: gray"
                  >累计售出{{ item.sales }}件</font
                >
              </div>
            </div>
          </div></van-col
        >
      </van-row>
    </div>
    <van-empty
      v-if="productData.length == 0"
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无商品，去看点别的吧"
    />
    <div
      @click="more"
      style="
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
      "
      v-if="hasNext"
    >
      <span>点击加载更多</span>
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
import { Search } from "@/api/search.js";
export default {
  data() {
    return {
      active: 0,
      keyword: "",
      productData: [],
      isIntegral: false,
      priceOrder: null,
      isNew: null,
      salesOrder: null,
      page: 1,
      limit: 10,
      hasNext: false,
      loading: false,
      cid: null,
    };
  },
  created() {
    this.keyword = this.$route.query.keyword ?? "";
    this.cid = this.$route.query.cid;
  },
  mounted() {
    this.Search();
  },

  methods: {
    //点击加载更多
    more() {
      this.loading = true;
      this.page++;
      this.Search();
    },
    //切换触发
    changeSearch(n, o) {
      this.page = 1;
      this.limit = 10;
      if (n == 0) {
        this.priceOrder = null;
        this.salesOrder = null;
        this.isNew = null;
        this.productData = [];
      }
      //价格
      else if (n == 1) {
        this.salesOrder = null;
        this.isNew = null;
        this.productData = [];
        if (this.priceOrder == "asc") {
          this.priceOrder = "desc";
        } else {
          this.priceOrder = "asc";
        }
      }
      //销量
      else if (n == 2) {
        this.priceOrder = null;
        this.isNew = null;
        this.productData = [];
        if (this.salesOrder == "asc") {
          this.salesOrder = "desc";
        } else {
          this.salesOrder = "asc";
        }
      }
      //新品
      else if (n == 3) {
        this.priceOrder = null;
        this.salesOrder = null;
        this.productData = [];
        this.isNew = true;
      }
      //搜索
      this.Search();
    },

    //搜索
    Search() {
      Search({
        keyword: this.keyword,
        priceOrder: this.priceOrder,
        isIntegral: this.isIntegral,
        isNew: this.isNew,
        salesOrder: this.salesOrder,
        page: this.page,
        limit: this.limit,
        cid: this.cid,
      }).then((resp) => {
        this.productData.push(...resp.Data.Data);
        this.hasNext = resp.Data.HasNext;
        this.loading = false;
      });
    },
    //搜索触发
    onSearch(value) {
      this.productData = [];
      this.priceOrder = null;
      this.isNew = null;
      this.keyword = value;
      this.Search();
    },
  },
};
</script>

<style scoped lang="scss">
.good-card {
  background: white;
  .price {
    padding-top: 5px;
    margin: 0px 5px;
    font-size: 12px;
    height: 40px;
  }
  .title {
    font-size: 15px;
    font-weight: 400;
    padding: 0 11px;
    min-height: 25px;

    > div {
      margin: 10px 0;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .tip {
    width: 190px;
    line-height: 30px;
    background: #f6f2ea;
    font-size: 12px;
    font-weight: 400;
    color: #a8700d;
    padding: 0 11px;
  }
  border-radius: 10px;
  /deep/ .van-image {
    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
}
.van-search {
  .van-search__content {
    border: 1px solid #ff4c1b;
  }
  .van-button {
    font-size: 15px;
    width: 56px;
  }
  /deep/ .van-search__action {
    line-height: 0;
    padding: 5px 8px;
  }
}
</style>