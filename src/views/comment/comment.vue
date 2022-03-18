<template>
  <div>
    <UserComment
      :key="index"
      v-for="(item, index) in CommentData"
      :commentData="item"
    ></UserComment>

      <van-loading
      v-if="loading"
      color="#0094ff"
      size="20px"
      style="display: inline-block; position: none"
      type="spinner"
    />
  </div>
</template>
<script>
import { getProductReply } from "@/api/replay.js";
import UserComment from "@/components/UserComment";
export default {
  components: { UserComment },
  data() {
    return {
      page: 1,
      limit: 10,
      loading:false,
      CommentData: [],
      pid: this.$route.query.pid,
      HasNext:false
    };
  },
  created() {
    let vm = this;
    this.getProductReply();
    window.onscroll = function () {
      //scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight >= scrollHeight) {
        //到了这个就可以进行业务逻辑加载后台数据了
        vm.more();
      }
    };
  },
  methods: {
    more() {
     if (this.HasNext) {
      this.loading = true;
      this.page++;
      this.getProductReply();
     }
    },
    getProductReply() {
      getProductReply({
        pid: this.pid,
        page: this.page,
        limit: this.limit,
      }).then((resp) => {
          this.HasNext = resp.Data.HasNext
        resp.Data.Data.forEach((e) => {
          if (e.productInfo != null) {
            e.productInfo.cart_info = JSON.parse(e.productInfo.cart_info);
          }
        });
        this.CommentData.push(...resp.Data.Data);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>