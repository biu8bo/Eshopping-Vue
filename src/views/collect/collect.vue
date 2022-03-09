<template>
  <div>
    <van-sticky :offset-top="0">
      <van-nav-bar left-arrow @click-left="$router.go(-1)">
        <template #title>
          {{ $route.meta.title }}
        </template>
        <template #right>
          <div @click="delBatch">
            <van-icon
              v-if="ListData.length != 0"
              @click="editIcon = !editIcon"
              v-show="editIcon"
              color="gray"
              size="20"
              name="edit"
              ><span style="font-size: 16px">管理</span></van-icon
            >
            <van-icon
              v-if="ListData.length != 0"
              @click="editIcon = !editIcon"
              v-show="!editIcon"
              size="20"
              name="edit"
              ><span style="font-size: 16px">管理</span></van-icon
            >
          </div>
        </template>
      </van-nav-bar>
    </van-sticky>
    <van-row style="margin: 3px" gutter="6">
      <van-checkbox-group
        ref="checkboxGroup"
        icon-size="23"
        v-model="checkBoxResult"
      >
        <van-col
          style="margin-bottom: 7px; position: relative"
          v-for="(item, index) in ListData"
          :key="index"
          span="12"
        >
          <van-checkbox
            v-show="showDel"
            class="checkbox"
            :name="item.pid"
          ></van-checkbox>
          <div
            @click.stop="$router.push('/productDetails?id=' + item.pid)"
            class="good-card shadow-box"
          >
            <div>
              <van-image
                width="100%"
                height="180px"
                :src="$baseUrl + item.image"
              />
            </div>
            <div class="tip">
              {{ item.storeInfo }}
            </div>
            <div class="title">
              <div>
                {{ item.storeName }}
              </div>
            </div>
            <div class="price">
              <div style="height: 25px; line-height: 25px">
                <font color="#f10404" style="margin-left: 5px; font-size: 16px">
                  <font size="2">￥</font>{{ item.price.toFixed(2) }}</font
                >
              </div>
            </div>
          </div>
        </van-col>
      </van-checkbox-group>
    </van-row>
    <van-submit-bar v-show="showDel" @submit="onSubmit">
      <template #button>
        <div>
          <van-button round style="width: 80px" type="danger" @click="onSubmit"
            >删除</van-button
          >
        </div>
      </template>
      <template>
        <div style="position: absolute; left: 10px; top: 18px">
          <van-checkbox v-model="checkAllState" @click="checkAllMethod"
            >全选</van-checkbox
          >
        </div>
      </template>
    </van-submit-bar>
    <div
      @click="more"
      style="
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
      "
      v-if="hashNext"
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
    <van-empty
      v-if="ListData.length == 0"
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无商品，去看点别的吧"
    />
  </div>
</template>
<script>
import { getCollect, delCollectBatch } from "@/api/collect";

export default {
  data() {
    return {
      ListData: [],
      type: "foot",
      page: 1,
      limit: 10,
      editIcon: false,
      hashNext: false,
      showDel: false,
      checkAll: false,
      loading: false,
      checkAllState: false,
      checkBoxResult: [],
    };
  },
  watch: {
    checkBoxResult(n, o) {
      if (n.length == this.ListData.length) {
        this.checkAllState = true;
      } else {
        this.checkAllState = false;
      }
    },
  },
  created() {

    if (this.$route.meta.title == "我的足迹") {
      this.type = "foot";
    } else {
      this.type = "collect";
    }
    this.getCollect();
  },
  methods: {
    //点击加载更多
    more() {
      this.loading = true;
      this.page++;
      //刷新数据
      this.getCollect();
    },
    //批量删除勾选
    delBatch() {
      this.showDel = !this.showDel;
      this.checkBoxResult = [];
    },
    //全选
    checkAllMethod() {
      this.checkAll = !this.checkAll;
      this.$refs.checkboxGroup.toggleAll(this.checkAll);
    },
    //提交批量删除
    onSubmit() {
      delCollectBatch({
        pid: this.checkBoxResult,
        type: this.type,
      }).then((resp) => {
        if (resp.IsSuccess) {
          //刷新数据
          this.page = 1;
          this.limit = 10;
          this.checkBoxResult = [];
          this.ListData = [];
          this.checkAllState = false;
          this.checkAll = false;
          this.editIcon = false;
          this.showDel = false;
          this.getCollect();
          this.$toast.success("删除成功！");
        }
      });
    },
    getCollect() {
      getCollect({
        type: this.type,
        page: this.page,
        limit: this.limit,
      }).then((resp) => {
        this.ListData.push(...resp.Data.Data);
        this.hashNext = resp.Data.HasNext;
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.van-submit-bar__bar {
  position: relative;
}
.checkbox {
  position: absolute;
  z-index: 1;
  background: #fff;
  border-radius: 50%;
  margin: 3px 3px;
}
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
    min-height: 40px;
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
</style>