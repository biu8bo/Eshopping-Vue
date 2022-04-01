<!-- 评论显示组件 -->
<template>
 <div>
    <van-cell>
    <template #title>
      <div>
        <van-row :gutter="6">
          <van-col>
            <van-image
              round
              width="40"
              height="40"
              fit="cover"
              :src="$baseUrl+ commentData.commentInfo.avatar"
            ></van-image
          ></van-col>
          <van-col>
            <div style="font-weight: 500; font-size: 15px; height: 20px">
              {{ commentData.commentInfo.nickname }}
            </div>
            <div style="color: gray; font-size: 13px">{{ showTime }}  <span style="padding-left:10px"> 规格：</span><span v-if="commentData.productInfo==null">无</span> <span v-else>{{commentData.productInfo.cart_info.attrInfo.sku}}</span></div>
          </van-col>
          <van-col>
          </van-col>
        </van-row>
      </div>
    </template>
    <template #label>
      <div>
        <!-- 评论内容 -->
        <div style="color: black; font-size: 15px">
          {{ commentData.commentInfo.comment }}
        </div>
        <!-- 图片 -->
        <div style="margin-top: 10px">
          <van-image
           :class="{'border-radius':images.length==1,'border-radius-left':images.length>1&&index==0,'border-radius-right':index==images.length-1}"
            style="margin-right:3px"
            @click="(showPreview = true), (previewIndex = index)"
            :key="index"
            v-for="(item, index) in images"
            width="80px"
            height="80px"
            fit="cover"
            :src="$baseUrl+item"
          />
        </div>
        <van-image-preview
          v-model="showPreview"
          :images="images"
          @change="onChange"
        >
          <template #index>{{ previewIndex+1 }} / {{images.length}}</template>
        </van-image-preview>
      </div>
    </template>
  </van-cell>
 </div>
</template>

<script>
import { formatTime } from "@/utils";
export default {
  data() {
    return {
      showTime: "",
      showPreview: false,
      previewIndex: 0,
      images: [],
    };
  },
  created() {
    this.showTime = formatTime(
      new Date(this.commentData.commentInfo.createTime),
      "{y}-{m}-{d}"
    );
    this.images = this.$options.filters.separate(this.commentData.commentInfo.pics)
  },
  methods: {
    onChange(index) {
      this.previewIndex = index;
    },
  },
  props: ["commentData"],
  filters: {
    separate(value) {
        if (!value.trim()) {
            return []
        }
      return value.split(",");
    },
  },
};
</script>

<style scoped lang="scss">


.border-radius /deep/ img{
    border-radius: 8px;
}
.border-radius-left /deep/ img{
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.border-radius-right /deep/ img{
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}
</style>