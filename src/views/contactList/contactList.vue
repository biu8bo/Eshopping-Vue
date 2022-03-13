<template>
  <div class="warpper">
    <van-radio-group v-model="radio">
      <van-cell center v-for="(item, index) in list" :key="index">
        <template #icon>
          <van-radio :name="item.id" checked-color="#ee0a24"></van-radio>
        </template>
        <template #title>
          <span>{{ item.name }}</span>
          <span class="custom-title">{{ item.tel }}</span>
          <van-tag type="danger" v-if="radio == item.id">默认</van-tag>
        </template>
        <template #label>
          <span class="">{{ item.address }}</span>
        </template>
        <template #right-icon>
          <van-icon name="edit" size="20" @click="onEdit(item.id)" />
        </template>
      </van-cell>
    </van-radio-group>
    <div class="btn">
      <van-button type="danger" round @click="onAdd()">新增联系人</van-button>
    </div>
    <van-divider v-if="list.length > 9" @click="move()"
      >点击加载更多</van-divider
    >
  </div>
</template>

<script>
import { getAddress, setDefualt } from "@/api/address.js";
export default {
  data() {
    return {
      radio: 0,
      chosenAddressId: "1",
      list: [],
      limit: 0,
    };
  },
  created() {
    this.getList();
  },
  watch: {
    radio(n, o) {
      this.$toast({
        type: "loading",
        forbidClick: true,
        duration: 0, // 持续展示 toast
      });
      setDefualt({
        id: n,
      }).then((e) => {
        this.$toast.clear();
      });
    },
  },
  methods: {
    move() {
      this.limit += 10;
      this.getList(this.limit);
    },
    //获取地址列表
    getList(limit) {
      getAddress({}).then((res) => {
        this.list = [];
        res.Data.forEach((rs) => {
          let list = {};
          list.id = rs.id;
          list.tel = rs.phone;
          list.address = rs.province+" "+ rs.city+" " + rs.district+" " + rs.detail;
          list.name = rs.real_name;
          if (rs.is_default == 1) {
            this.radio = rs.id;
          }
          this.list.push(list);
        });
      });
    },
    onAdd() {
      this.$router.push("/newContact");
    },
    onEdit(id) {
      this.$router.push({
        name: "NewContact",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style scoped>
.warpper {
  margin-top: 7px;
  padding: 5px;
}

.custom-title {
  margin: 5px;
}

.van-cell__title {
  margin-left: 10px;
}

.btn button {
  width: 100%;
}

.btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  background-color: #ffffff;
}
</style>
