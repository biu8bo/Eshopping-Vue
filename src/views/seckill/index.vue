<template>
  <div>
    <van-tabs
      @click="changeTimeID"
      :swipeable="true"
      line-height="0"
      v-model="active"
    >
      <van-tab
        :key="item.id"
        :title="item.id + ''"
        :name="index"
        v-for="(item, index) in timeData"
      >
        <template slot="title">
          <div class="info-card">
            <div style="font-weight: 600; font-size: 17px">
              {{ item.map.time + ":00" }}
            </div>
            <div style="font-size: 12px !important">
              {{ $options.filters.parseTime(vm, item, index) }}
            </div>
          </div>
        </template>
      </van-tab>
    </van-tabs>
<div class="warpper">
      <van-row gutter="8">
      <van-col
        style="margin-bottom: 8px"
        v-for="(item, index) in PData"
        :key="index"
        span="12"
      >
        <div class="good-card shadow-box">
          <div>
            <van-image
              width="100%"
              height="180px"
              :src="item.info.product.image"
            />
          </div>
          <div class="tip">
            {{ item.info.product.store_info }}
          </div>
          <div class="title">
            <div>
              {{ item.info.product.store_name }}
            </div>
          </div>
          <div class="price">
            <div style="height: 25px; line-height: 25px">
              <font color="#f10404" style="margin-left: 5px; font-size: 16px">
                <font size="2">￥</font>{{ item.info.seckill.price.toFixed(2) }}</font
              >
              <div style="float: right; margin-right: 10px; color: gray">
                <van-button  @click="$router.push({name:'SeckillDetail',query:{sid:item.info.seckill.id}})" size="mini" type="danger">立即抢购</van-button>
                </div
              >
            </div>
          </div>
        </div></van-col
      >
    </van-row>
</div>
        <van-empty
      v-if="PData.length == 0"
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无商品，去看点别的吧"
    />
  </div>
</template>
<script>
import { getSeckillTime, getSeckill } from "@/api/seckill";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      timeData: [],
      active: 0,
      vm: this,
      timeID: "",
      PData: [],
    };
  },
  created() {
    this.getSeckillTime();
  },
  mounted() {},
  filters: {
    parseTime(vm, n, index) {
      //现在时间
      let nowData = new Date().getHours();
      let tipStr = "";
      if (n.map.time <= nowData && n.map.time + n.map.continued > nowData) {
        tipStr = "抢购中";

        if (!vm.timeID) {
          vm.active = index;
          vm.timeID = n.id;
          vm.getSeckill();
        }
      }

      if (nowData < n.map.time) {
        tipStr = "未开始";
      }
      if (n.map.time + n.map.continued <= nowData) {
        tipStr = "已结束";
      }

      return tipStr;
    },
  },
  methods: {
    changeTimeID(n, t) {
      this.timeID = t;
      this.getSeckill();
    },
    getSeckillTime() {
      getSeckillTime().then((e) => {
        this.timeData = e.Data;
      });
    },
    getSeckill() {
      getSeckill({ templateID: this.timeID }).then((e) => {
        this.PData = e.Data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
.van-tabs {
  height: 50px;
  /deep/ .van-tabs__wrap {
    height: 50px;
  }
  /deep/ .van-tabs__nav {
    background: url("../../assets/bg_seckill.png");
    background-size: cover;
  }
  .info-card {
    text-align: center;
  }
  /deep/ .van-tab {
    color: #e9e9e9ba;
  }
  /deep/ .van-tab--active {
    color: #fff !important;
    font-size: 18px;
  }
}
</style>