<template>
    <div class="page">
        <img class="bg" src="../../assets/img/courseAc/bg.png" alt="">
        <div class="form">
            <div class="input_wrapper phone">
                <input v-model="phone" placeholder="请输入手机号" type="text">
            </div>
            <div class="input_wrapper v_code">
                <input v-model="vCode" placeholder="请输入验证码" type="text">
                <div class="v_code_btn" @click="getVCode">{{vcodeText}}</div>
            </div>
            <div class="input_wrapper ac_code">
                <input v-model="activeCode" placeholder="请输入激活码" type="text">
            </div>
        </div>
        <img @click="toAc" class="ac_btn" src="../../assets/img/courseAc/ac_btn.png" alt="">
    </div>
</template>
<script>
import { getQueryVariable, testWeixin } from '../../common/util.js'
export default {
  data() {
    return {
      vcodeText: "获取验证码",
      phone: "",
      activeCode: "",
      vCode: ""
    };
  },
  created(){
    if(!getQueryVariable('code') && testWeixin()){
      location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxebd76dff6ca15a2a&redirect_uri=http%3A%2F%2Fkids.immusician.com%2Fweb%2Fh5%2FcourseAc.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect')
    }
  },
  mounted() {
    console.log(location.href);
    this.wxCode = getQueryVariable('code')
  },
  methods: {
    toAc() {
      var url = `http://api.yinji.immusician.com:55555/v1/active_code_ex`;
      //var url = 'http://192.168.1.102:55555/v1/active_code_ex';
      this.axios
        .post(url, {
          active_code: this.activeCode,
          phone: this.phone,
          code: this.vCode,
          wx_code: this.wxCode,
          redirect_uri: 'http%3A%2F%2Fkids.immusician.com%2Fweb%2Fh5%2FcourseAc.html'
        })
        .then(res => {
          if (res.error == 1) {
            return;
          } else {
            location.href = `http://kids.immusician.com/web/h5/acSuccess.html?v=${new Date().valueOf()}`;
          }
        });
    },
    getVCode() {
      if (this.vcodeText === "重新获取" || this.vcodeText === "获取验证码") {
        if (this.vcodeText === "获取验证码") {
          this.vCode = "";
        }
        this.axios
          .get(
            `http://api.yinji.immusician.com:55555/v1/user/tx_sms/?phone=${
              this.phone
            }`
          )
          .then(res => {
            console.log(res);
          });
      } else {
        return;
      }
      var count = 59;
      this.vcodeText = count;
      var timer = setInterval(() => {
        this.vcodeText = --count;
        if (this.vcodeText === 0) {
          clearInterval(timer);
          this.vcodeText = "重新获取";
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less">
@import url("./../../common/common.less");
.font-size(@sizeValue:16) {
  @vw: 16 / 375 * 100;
  @result: @sizeValue / 16 * @vw;
  font-size: ~"@{result}vw";
}
html {
  .font-size(16);
}
html {
  @media screen and (max-width: 320px) {
    .font-size(16);
  }
  @media screen and (min-width: 480px) {
    .font-size(13);
  }
}
.btn {
}
.ac_btn {
  position: absolute;
  left: 50%;
  top: 50.5%;
  width: 250px;
  transform: translateX(-50%);
}
.page {
  position: relative;
  font-size: 0;
}
.bg {
  width: 100%;
}
.form {
  position: absolute;
  left: 0;
  top: 32.5%;
  width: 100%;
  padding: 0 20px;
  margin: auto;
  input {
    border: none;
    background-color: transparent;
    outline: none;
    color: #fff;
    left: 14%;
    top: 10%;
    position: absolute;
    width: 70%;
    height: 40px;
    font-size: 16px;
  }
  input::placeholder {
    font-size: 15px;
    color: rgba(255, 255, 255, 1);
  }
  .input_wrapper {
    position: relative;
    //width: 335px;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
  }
  .phone {
    background: url("../../assets/img/courseAc/phone.png") no-repeat
      center/cover;
  }
  .v_code {
    background: url("../../assets/img/courseAc/v.png") no-repeat center/cover;
    .v_code_btn {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 106px;
      height: 34px;
      text-align: center;
      line-height: 34px;
      border-radius: 17px;
      color: #d67726;
      //color: #000;
      background-color: #fff;
      font-size: 14px;
    }
  }
  .ac_code {
    background: url("../../assets/img/courseAc/ac.png") no-repeat center/cover;
  }
}
</style>

