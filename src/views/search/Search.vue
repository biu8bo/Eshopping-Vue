<template>
  <div>
    <!-- 搜索 -->
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
    <div>
      <div>
        <p class="title">历史搜索</p>
        <div>
          <van-tag round color="#e4e4e4" type="primary" size="large">
            <span style="color: #5b5b5b; padding: 3px">标签</span>
          </van-tag>
        </div>
      </div>
      <div>
        <p class="title">热门搜索</p>
        <div>
          <van-tag
            @click="onSearch(item.title)"
            round
            color="#e4e4e4"
            :key="index"
            v-for="(item, index) in hotData"
            type="primary"
            size="large"
          >
            <span style="color: #5b5b5b; padding: 3px">{{ item.title }}</span>
          </van-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { hotSearch } from "@/api/search.js";
export default {
  data() {
    return {
      hotData: [],
      keyword: "",
    };
  },
  created() {
    this.getHotSearch();
  },
  methods: {
    getHotSearch() {
      hotSearch().then((resp) => {
        this.hotData = resp.Data;
      });
    },
    onSearch(value) {
      this.$router.push({
        name: "ProductList",
        query: {
          keyword: value,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.van-tag {
  margin: 5px;
}
.title {
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 550;
  margin-left: 10px;
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