<template>
  <div class="container">
    <div class="wrapper shadow-box">
      <div class="welcome">注册</div>
      <div class="input-content">
        <van-form @submit="onSubmit">
          <van-field
            v-model="nickName"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="tel"
            type="tel"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="rePassword"
            type="password"
            name="重复密码"
            label="重复密码"
            placeholder="重复密码"
          />
          <van-field
            v-model="sms"
           
            center
            clearable
            label="短信验证码"
          >
            <template #button>
              <div class="btn"  :style="{ backgroundColor: fobidden ? '#bababa' : '#5695f9' }" @click="registerCode">{{ code }}</div>
            </template>
          </van-field>
          <div style="margin: 16px">
            <van-button round block type="danger" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
    <div class="register-section">
      已有账号?
      <span style="color: #3535ff" @click="go('/login')">点击登录</span>
    </div>
  </div>
</template>
<script>
import { registerCode, register } from "@/api/login.js";
export default {
  data() {
    return {
      nickName: "",
      tel: "",
      rePassword: "",
      sms: "",
      password: "",
      code: "发送验证码",
      fobidden: false,
    };
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    registerCode() {
      //60秒防抖检测
      if (this.fobidden) {
        return;
      } else {
        this.fobidden = true;
      }
      if (this.tel.length == 0) {
        this.$toast.fail("请输入手机号码");
        return;
      }
      if (this.tel.length != 11) {
        this.$toast.fail("手机号码格式错误");
        return;
      }
      registerCode({
        phone: this.tel,
      })
        .then((res) => {
          //60秒倒计时开始
          this.TimeStart(60);
          this.$toast.success("动态验证码为" + res.Data);
        })
        .catch((e) => {
          let time = e.Msg.substr(3, 2);
          //倒计时开始
          this.TimeStart(parseInt(time));
          this.fobidden = true;
          this.code = e.Msg;
        });
    },
    TimeStart(time) {
      //开始倒计时
      let interval = setInterval(() => {
        //开启60秒防抖
        this.fobidden = true;
        time--;
        if (time == 0) {
          clearInterval(interval);
          //关闭防抖
          this.fobidden = false;
          this.code = "发送验证码";
          return;
        }
        this.code = "请等待" + time + "秒";
      }, 1000);
    },
    onSubmit() {
      if (this.rePassword != this.password) {
        this.$toast.fail("两次密码不一致");
        return;
      }
      register({
        username: this.nickName,
        password: this.rePassword,
        phone: this.tel,
        vertity: this.sms,
      }).then((res) => {
        if (res.Code == 200) {
          this.$toast.success("注册成功,请登录");
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "uni.scss";

.container {
  width: 100%;
  padding-top: 115px;
  position: absolute;
  height: 82.5%;
  overflow: hidden;
  background: #fff;
}

.wrapper {
  position: relative;
  z-index: 90;
  background: #fff;
  padding-bottom: 20px;
}

.btn {
  background-color: #5695f9;
  color: #fff;
  padding: 3px;
  border-radius: 2px;
}

.back-btn {
  position: absolute;
  left: 20px;
  z-index: 9999;
  padding-top: 0px;
  top: 20px;
  font-size: 20px;
  color: #303133;
}

.left-top-sign {
  font-size: 60px;
  color: #f8f8f8;
  position: relative;
  left: -8px;
}

.right-top-sign {
  position: absolute;
  top: 40px;
  right: -15px;
  z-index: 95;

  &:before,
  &:after {
    display: block;
    content: "";
    width: 200px;
    height: 40px;
    background: #b4f3e2;
  }

  &:before {
    webkit-transform: rotate(50deg);
    transform: rotate(50deg);
    border-radius: 0 50px 0 0;
  }

  &:after {
    position: absolute;
    right: -99px;
    top: 0;
    -webkit-transform: rotate(-50deg);
    transform: rotate(-50deg);
    border-radius: 50px 0 0 0;
    /* background: pink;
			/* background: pink; */
  }
}

.left-bottom-sign {
  position: absolute;
  left: -135px;
  bottom: -160px;
  border: 50px solid #d0d1fd;
  border-radius: 50%;
  padding: 90px;
}

.welcome {
  position: relative;
  left: 25px;
  top: -45px;
  font-size: 23px;
  color: #555;
  // text-shadow: 1px 0px 1px rgb(0 0 0 / 30%);
}

.input-content {
  padding: 0 30px;
}

.input-item {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: start;
  align-items: flex-start;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 0 15px;
  background: #f8f6fc;
  height: 60px;
  border-radius: 4px;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }

  .tit {
    height: 25px;
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }

  input {
    height: 30px;
    font-size: 15px;
    color: #303133;
    width: 100%;
  }
}

.confirm-btn {
  width: 315px;
  height: 38px;
  line-height: 38px;
  border-radius: 50px;
  margin-top: 35px;
  background: #fa436a;
  color: #fff;
  font-size: 16px;
  margin-left: 7%;

  &:after {
    border-radius: 100px;
  }
}

.forget-section {
  font-size: 13px;
  color: #4399fc;
  text-align: center;
  margin-top: 20px;
}

.register-section {
  position: absolute;
  left: 0;
  bottom: 25px;
  width: 100%;
  font-size: 13px;
  color: #606266;
  text-align: center;

  text {
    color: $font-color-spec;
    margin-left: 10px;
  }
}
</style>
