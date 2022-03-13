<template>
  <div class="warpper">
    <van-field
      v-model="real_name"
      label="联系人"
      required
      placeholder="请输入"
    />
    <van-field
      v-model="phone"
      type="tel"
      label="手机号"
      required
      placeholder="请输入"
    />
    <van-field
      v-model="address"
      readonly
      label="选择地址"
      placeholder="请选择"
      @focus="addressShow = true"
    />

    <van-popup
      v-model="addressShow"
      round
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-area title="请选择" :area-list="areaList" @confirm="openPopup" />
    </van-popup>
    <van-field
      v-model="detail"
      required
      label="详细地址"
      placeholder="请输入"
    />
    <van-field v-model="post_code" label="收货邮政编码" placeholder="请输入" />
    <van-cell title="设为默认" icon="shop-o" class="checkeds">
      <template #right-icon>
        <van-switch :disabled="isDft" v-model="checked" size="24px" />
      </template>
    </van-cell>
    <div class="btn">
      <van-button type="danger" round block @click="submit">提交</van-button>
      <van-button
        type="warning"
        round
        block
        @click="del()"
        style="margin-top: 15px"
        v-if="show"
        >删除</van-button
      >
    </div>
  </div>
</template>

<script>
import {
  delAddress,
  getAreaList,
  editAddress,
  getAddressData,
  addAddress,
} from "@/api/address.js";
export default {
  data() {
    return {
      addressData: {},
      checked: false,
      address: null,
      addressShow: false,
      areaList: null,
      real_name: null,
      isDft: false,
      phone: null,
      detail: null,
      post_code: null,
      addressList: [],
      editingContact: {},
      show: false,
    };
  },

  created() {
    this.getData();
    this.getList();
  },
  methods: {
    //新增
    getData() {
      if (this.$route.query.id) {
        this.show = true;
        getAddressData({
          id: this.$route.query.id,
        }).then((res) => {
          this.real_name = res.Data.real_name;
          this.phone = res.Data.phone;
          this.detail = res.Data.detail;
          this.post_code = res.Data.post_code;
          this.address =
            res.Data.province + "," + res.Data.city + "," + res.Data.district;
          this.isDft = res.Data.is_default;
          if (res.Data.is_default) {
            this.checked = true;
          }
          this.addressList = [
            {
              name: res.Data.province,
            },
            {
              name: res.Data.city,
            },
            {
              name: res.Data.district,
            },
          ];
        });
      }
    },
    getList() {
      getAreaList().then((res) => {
        this.areaList = res;
      });
    },
    submit() {
      let addressInfo = {
        id: this.$route.query.id == null ? null : this.$route.query.id,
        real_name: this.real_name,
        phone: this.phone,
        detail: this.detail,
        post_code: this.post_code,
        is_default: this.checked,
        district: this.addressList[2].name,
        city: this.addressList[1].name,
        province: this.addressList[0].name,
      };
      if (!addressInfo.real_name) {
        this.$toast("请填写收货人姓名");
        return;
      }
      if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(addressInfo.phone)) {
        this.$toast("请填正确的电话号码");
        return;
      }
      if (!addressInfo.detail) {
        this.$toast("请填写详细地址");
        return;
      }

      if (this.$route.query.id) {
        editAddress(addressInfo).then((res) => {
        
         
            this.$router.back();
			   this.$toast("操作成功！");
       
        });
      } else {
        addAddress(addressInfo).then((res) => {
         
         
            this.$router.back();
            this.$toast("操作成功！");
        });
      }
    },
    del() {
      delAddress({
        id: this.$route.query.id,
      }).then((res) => {
      
       
          this.$router.back();
         this.$toast("操作成功！");
      });
    },
    //选取地址
    openPopup(data) {
      let address = "";
      for (let i = 0; i < data.length; i++) {
        if (i == data.length - 1) {
          address = address + data[i].name;
        } else {
          address = address + data[i].name + ",";
        }
      }
      this.address = address;
      this.addressList = data;
      this.addressShow = false;
    },
    onSave(contactInfo) {},
    onDelete(contactInfo) {},
  },
};
</script>

<style scoped>
.warpper {
  margin-top: 7px;
  padding: 5px;
}

.checkeds {
  margin-top: 10px;
}

.btn {
  width: calc(100% - 20px);
  margin: 30px auto;
}
</style>
