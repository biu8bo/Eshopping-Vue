<template>
  <div>
    <div class="top">
      <div>
        <van-image
          fit="cover"
          round
          width="64"
          height="64"
          :src="$baseUrl + '/file/' + User.avatar"
        />
      </div>
      <div class="right">
        <div class="setting">
          <van-icon name="setting-o" />
        </div>
        <div style="color: #fff; font-size: 18px">{{ User.username }}</div>
        <div style="color: rgb(196 196 196); font-size: 14px">
          ID: <span> {{ User.uid }} </span> <van-icon size="17" name="edit" />
        </div>
      </div>
    </div>
    <div class="warpper">
      <div class="display-info shadow-box">
        <div>
          <div style="color: gray">我的余额</div>
          <div class="num">0</div>
        </div>
        <div>
          <div style="color: gray">当前积分</div>
          <div class="num">0</div>
        </div>
        <div>
          <div style="color: gray">优惠券</div>
          <div class="num">0</div>
        </div>
      </div>

      <div class="display-order shadow-box">
        <van-cell class="radius-top" title="我的订单" value="全部订单">
          <template #right-icon>
            <div style="color: #969799">
              <van-icon
                size="18"
                style="margin-top: 2px"
                name="arrow"
                class="arrow"
              />
            </div>
          </template>
        </van-cell>
        <div class="order-type radius-bottom">
          <van-grid square :border="false" :column-num="5">
            <van-grid-item class="rd" :icon="dfk" text="待付款" />
            <van-grid-item :icon="dfh" text="待发货" />
            <van-grid-item :icon="dsh" text="待收货" />
            <van-grid-item :icon="dpj" text="待评价" />
            <van-grid-item class="rd" :icon="sh" text="售后/退款" />
          </van-grid>
        </div>
      </div>

      <van-cell-group class="shadow-box bottom" style="margin-top:8px">
        <van-cell :icon="zj" class="radius-top" title="我的足迹" is-link></van-cell>
        <van-cell :icon="yhq" title="优惠券" is-link></van-cell>
        <van-cell :icon="sc" title="收藏商品" is-link></van-cell>
        <van-cell :icon="dz" title="地址管理" is-link></van-cell>
        <van-cell  :icon="ye" title="我的余额" is-link></van-cell>
        <van-cell :icon="sc" class="radius-bottom" title="砍价记录" is-link></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
//待付款
import dfk from "@/views/user/img/dfk.png";
//待发货
import dfh from "@/views/user/img/dfh.png";
//待收货
import dsh from "@/views/user/img/dsh.png";
//待评价
import dpj from "@/views/user/img/dpj.png";
//售后
import sh from "@/views/user/img/sh.png";
//足迹
import zj from "@/views/user/img/zj.png";
//优惠券
import yhq from "@/views/user/img/yhq.png";

//收藏
import sc from "@/views/user/img/sc.png";
//地址
import dz from "@/views/user/img/dz.png";
//余额
import ye from "@/views/user/img/ye.png";

export default {
  data() {
    return {
      User: {},
      dfk,
      dfh,
      dsh,
      dpj,
      sh,
      zj,
      yhq,
      sc,
      dz,ye
    };
  },
  created() {
    this.User = JSON.parse(sessionStorage.user);
  },
};
</script>
<style lang="scss" scoped>
.top {
  background-color: #eb3729;
  display: flex;
  padding: 15px;
  .right {
    flex: 1;
    margin-left: 15px;
    .setting {
      float: right;
      font-size: 21px;
      color: white;
    }
    > div {
      margin-top: 10px;
    }
  }
  .van-image {
    border: 1px solid white;
  }
}
.warpper {
  .display-info {
    display: flex;
    text-align: center;
    padding: 10px;
    font-size: 15px;
    // 每个单元
    > div {
      .num {
        margin-top: 10px;
        font-size: 20px;
      }
      flex: 1px;
      &:nth-child(1) {
        border-right: 1px solid #eeeeee;
      }
      &:nth-child(2) {
        border-right: 1px solid #eeeeee;
      }
    }
  }
  .display-order {
    margin-top: 8px;
    .van-cell__title {
      font-size: 16px;
    }
    .order-type {
      .rd {
        /deep/ .van-grid-item__content {
          border-radius: 5px;
        }
      }
    }
  }

  .bottom{
    .van-icon{
      .van-icon__image{
        width: 19px;
        height: 19px;
        margin-top: 2px;
      }

    }
  }
}
</style>