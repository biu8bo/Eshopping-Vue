<!-- home -->
<template>
  <div>
    <!-- 搜索end -->
    <div class="warpper">
      <van-sticky :offset-top="0">
        <van-search
          shape="round"
          placeholder="请输入搜索关键词"
          @focus="onfocus"
        />
      </van-sticky>

      <!-- 轮播图end -->
      <van-swipe :autoplay="3000" class="my-swipe" style="margin-top: 5px">
        <van-swipe-item v-for="(image, index) in bannerData" :key="index">
          <img v-lazy="imgUrls + image.pic" />
        </van-swipe-item>
      </van-swipe>
      <van-notice-bar
      style="height:35px"
        left-icon="volume-o"
        text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
      />
      <!-- 菜单 -->
      <div style="background-color: #ffffff; margin-top: 5px">
        <div style="margin-top: 5px">
          <van-grid :column-num="4" :border="false">
            <template v-for="(item, index) in menus">
              <van-grid-item :key="index" :to="item.url">
                <van-image width="50" height="50" :src="imgUrls + item.pic" />
                <span>
                  <font size="3" color="">{{ item.name }}</font>
                </span>
              </van-grid-item>
            </template>
          </van-grid>
        </div>
      </div>

      <!-- 热门 新品end -->
      <div class="warp">
        <div
          class="shadow-box"
          style="width: 100%; background-color: #ffffff; margin-top: 8px"
        >
          <div style="height: 28px; line-height: 35px; padding: 5px">
            <font size="3" style="margin-left: 5px">限时秒杀</font>
            <font size="2" class="float-left"
              >秒杀专区<van-icon name="arrow"
            /></font>
          </div>
          <div style="margin-top: 10px">
            <van-grid square :column-num="4" :border="false">
              <van-grid-item
                v-for="(item, index) in guesslikes"
                style="margin-bottom: 10px"
                :key="index"
                :to="'/productDetails?id=' + item.id"
              >
                <div>
                  <van-image :src="imgUrls + item.image" />
                  <div>
                    <font size="3">￥{{ item.price.toFixed(2) }}</font>
                  </div>
                </div>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
        <div
          class="shadow-box"
          style="
            width: 100%;
            background-color: #ffffff;
            margin-top: 8px;
            padding-bottom: 5px;
          "
        >
          <div style="height: 28px; line-height: 35px; padding: 5px">
            <font size="3" style="margin-left: 5px">热门臻选</font>
            <span class="float-left" @click="$router.push({name:'ProductList'})">
              <font size="2" 
                >更多商品<van-icon name="arrow" /></font
            ></span>
          </div>
          <div style="margin-top: 10px">
            <van-card
              @click="goto('/productDetails?id=' + item.id)"
              style="background-color: #fff"
              v-for="(item, index) in hotList"
              :key="index"
              tag="热门"
              :desc="item.store_info"
              :title="item.store_name"
              :thumb="imgUrls + item.image"
              :origin-price="item.ot_price.toFixed(2)"
            >
              <template #price>
                <font color="#EE883B" size="4"
                  >￥{{ item.price.toFixed(2) }}</font
                >
              </template>
            </van-card>
          </div>
        </div>
        <!-- 猜你喜欢end -->
        <div style="height: 32px; line-height: 35px; padding: 5px">
          <div style="position: relative">
            <img style="position: absolute" width="100%" :src="titleImg" />
            <h3
              style="
                text-align: center;
                margin: 0;
                line-height: 43px;
                font-size: 17px;
              "
            >
              猜你喜欢
            </h3>
          </div>
        </div>
        <van-row gutter="8">
          <van-col
            @click="$router.push('/productDetails?id=' + item.id)"
            style="margin-bottom: 8px"
            v-for="(item, index) in guesslikes"
            :key="index"
            span="12"
          >
            <div class="good-card shadow-box">
              <div>
                <van-image
                  width="100%"
                  height="180px"
                  :src="imgUrls + item.image"
                />
              </div>
              <div class="tip">
                {{ item.store_info }}
              </div>
              <div class="title">
                <div>
                  {{ item.store_name }}
                </div>
              </div>
              <div class="price">
              <div style="    height: 25px;
    line-height: 25px;
}">
                  <font color="#f10404" style="margin-left: 5px; font-size: 16px">
                  <font size="2">￥</font>{{ item.price.toFixed(2) }}</font
                >
                <font style="float: right; margin-right: 10px; color: gray"
                  >仅剩：{{ item.stock }}件</font
                >
              </div>
              </div>
            </div></van-col
          >
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import titleImg from "@/assets/title1.png";
import { getMenus, getLike, getHotList, getBanner } from "@/api/home.js";
export default {
  data() {
    return {
      imgUrls: this.$baseUrl,
      menus: [],
      groupLists: [],
      hotList: [],
      bannerData: [],
      guesslikes: [],
      titleImg,
      value: "",
    };
  },

  created() {
    this.getData();
  },
  methods: {
    getData() {
      getMenus().then((res) => {
        this.menus = res.Data;
      });
      getLike().then((res) => {
        this.guesslikes = res.Data.Data;
      });

      getHotList().then((res) => {
        this.hotList = res.Data.Data;
      });
      getBanner().then((res) => {
        this.bannerData = res.Data;
      });
    },
    goto(url) {
      this.$router.push(url);
    },
    onfocus() {
      this.$router.push("/search");
    },
  },
};
</script>
<style lang="scss" scoped>
.warp {
  .good-card {
    .price {
      padding-top: 5px;
      margin: 0px 5px;
      font-size: 12px;
      height: 36px;
    }
    .title {
      font-size: 14px;
      font-weight: 400;
      padding: 0 11px;
      min-height: 45px;
      > div {
        margin: 10px 0;
      }
    }
    .tip {
      line-height: 30px;
      background: #f6f2ea5e;
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
  padding: 0 5px;
  .float-left {
    color: gray;
    float: right;
    margin-right: 5px;
  }
}
.warpper {
  background-color: #f8f8f8;
  padding: 5px;
}

.my-swipe .van-swipe-item img {
  width: 100%;
  height: 200px;
}

.my-swipe {
  margin-top: 5px;
  margin-bottom: 7px;
  height: 180px;
}

// 滚动条
.item {
  margin: 5px;
  width: 31.3%;
  white-space: nowrap;
  display: inline-block;
}

.scroll {
  padding: 5px;
  margin-top: 8px;
  background-color: #fff;
  text-align: center;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
}

::-webkit-scrollbar {
  display: none;
}

// 滚动条
.grid2 /deep/ .van-hairline {
  align-items: flex-start;
}

.grid2 {
  background-color: #f8f8f8;
  margin-top: 8px;
}

.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}

.block {
  display: inline-block;
  margin-left: 8px;
  height: 18px;
  width: 18px;
  color: #fff;
  font-size: 5px;
  text-align: center;
  background-color: #ff8001;
}

.classifys {
  height: 35px;
  line-height: 35px;
  padding: 15px;
}

.activity {
  background-color: #ffffff;
  margin-top: 10px;
  padding: 5px;
}

.activity-col {
  padding: 10px;
  background-color: #ffe3ce;
}
</style>
