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
      <div v-if="historyData.length!=0">
        <p class="title">历史搜索</p>
        <div>
          <van-tag
            :key="index"
            v-for="(item, index) in historyData"
            @click="onSearch(item)"
            round
            color="#e4e4e4"
            type="primary"
            size="large"
          >
            <span style="color: #5b5b5b; padding: 3px">{{ item }}</span>
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
      historyData: [],
    };
  },
  created() {
    this.getHotSearch();
    this.getUserSearchHistory();
  },
  methods: {
    //设置搜索记录
    setUserSearchHistory(key) {
      let user = this.getUser();
      //登录了就拿用户名做键 获取搜索记录
      if (user) {
        let result = JSON.parse(localStorage.getItem(user.username));
        //拿不到 设置空
        if (!result) {
          localStorage.setItem(user.username, "[]");
        }
        //拿到了
        else {
          this.historyData.push(key);
          //过滤重复
          this.historyData = this.historyData.filter((e) => e != key);
          //设置
          this.historyData.unshift(key);

          localStorage.setItem(user.username, JSON.stringify(this.historyData));
        }
      }
      //没有就用 -1代替未登录用户
      else {
        let result = JSON.parse(localStorage.getItem("-1"));
        //拿不到 设置空
        if (!result) {
          localStorage.setItem("-1", "[]");
        }
        //拿到了
        else {
          this.historyData.push(key);
          //过滤重复
          this.historyData = this.historyData.filter((e) => e != key);
          this.historyData.unshift(key);
          //设置
          localStorage.setItem("-1", JSON.stringify(this.historyData));
        }
      }
    },
    //获取当前用户的搜索记录
    getUserSearchHistory() {
      let user = this.getUser();
      //登录了就拿用户名做键 获取搜索记录
      if (user!=null) {
        console.log(1111111);
        let result = JSON.parse(localStorage.getItem(user.username));
        //拿不到 设置空
        if (!result) {
          localStorage.setItem(user.username, "[]");
        }
        //拿到了
        else {
          this.historyData = result;
        }
      }
      //没有就用 -1代替未登录用户
      else {
        let result = JSON.parse(localStorage.getItem("-1"));
        //拿不到 设置空
        if (!result) {
          localStorage.setItem("-1", "[]");
        }
        //拿到了
        else {
          this.historyData = result;
        }
      }
    },
    //获取登录用户 没有的的话返回null
    getUser() {
      return JSON.parse(localStorage.getItem("user")) ?? null;
    },
    getHotSearch() {
      hotSearch().then((resp) => {
        this.hotData = resp.Data;
      });
    },
    onSearch(value) {
      this.setUserSearchHistory(value);
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