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
          <div style="color:gray">我的余额</div>
          <div class="num">0</div>
        </div>
        <div>
          <div style="color:gray">当前积分</div>
          <div class="num">0</div>
        </div>
        <div>
          <div style="color:gray">优惠券</div>
          <div class="num">0</div>
        </div>
      </div>

      <div class="display-order shadow-box">
        <van-cell title="我的订单" value="全部订单" is-link>
          <template>
            <div class="order-type">

            </div>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      User: {},
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
  
      .num{
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
  .display-order{
    margin-top: 10px;
    .order-type{
      
    }
  }
}
</style>