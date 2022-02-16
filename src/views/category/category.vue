<template>
  <div class="flx">
    <div>
      <van-sidebar
        v-model="activeKey"
        style="display: inline-block"
        @change="onChange"
      >
        <van-sidebar-item
          :key="index"
          v-for="(e, index) in cateData"
          :title="e.cate_name"
        />
      </van-sidebar>
    </div>
    <div style="flex: 1">
      <van-grid square :gutter="1" :column-num="3">
        <van-grid-item
        :to="{name:'ProductList',query:{
            cid:value.id
        }}"
          v-for="(value, index) in cateChildData"
          :key="index"
          :icon="$baseUrl + value.pic"
          :text="value.cate_name"
        />
      </van-grid>
    </div>
  </div>
</template>
<script>
import { getCategory } from "@/api/category";
export default {
  data() {
    return {
      activeKey: 0,
      cateData: [],
      cateChildData: [],
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      getCategory().then((resp) => (this.cateData = resp.Data, this.cateChildData = this.cateData[0].categories));
    },
    onChange(index) {
      this.cateChildData = this.cateData[index].categories;
    },
  },
};
</script>
<style lang="scss" scoped>
.flx {
  display: flex;
}
/deep/ .van-icon__image {
  width: 2em;
  height: 2em;
  object-fit: contain;
}
</style>