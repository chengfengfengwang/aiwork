<template>
  <div class="page">
    <div class="wrapper">
      <div class="book">
        <div class="book_name">《器乐王国之旅》</div>
        <div>课程及精美教材</div>
      </div>
      <div class="address_info">填写下方信息，确认无误后，点击提交就可以坐等收货啦!</div>
      <div class="form">
        <div class="input_wrapper">
          <div class="label">收货人：</div>
          <input v-model="form.name" placeholder="请输入您的姓名" type="text">
        </div>
        <div class="input_wrapper">
          <div class="label">电话：</div>
          <input v-model="form.phone" placeholder="请输入您的电话" type="text">
        </div>
        <div class="input_wrapper">
          <div class="label">所在地区：</div>
          <div class="my_cell" @click="selectAddressShow=true">
            <div class="my_cell_value">
              <span :style="{color:location==='选择 (省/市/区)'?'#999':'#323233'}">{{location}}</span>
              <!-- <span>{{location}}</span> -->
            </div>
          </div>
        </div>
        <div class="input_wrapper textarea">
          <div class="label">收货地址：</div>
          <textarea v-model="form.address" placeholder="请填写您的收货地址"></textarea>
        </div>
        <div @click="submit" class="reg_btn">点击提交</div>
      </div>
    </div>

    <van-popup v-model="selectAddressShow" position="bottom">
      <van-area @cancel="selectAddressShow=false" @confirm="addressConfirm" :area-list="areaList"/>
    </van-popup>
    <!-- <img src="../../../assets/img/regist/rd1.png" alt class="d1">
    <img src="../../../assets/img/regist/rd2.png" alt class="d2">
    <img src="../../../assets/img/regist/rd3.png" alt class="d3">-->
  </div>
</template>
<script>
import { testWeixin, getQueryVariable } from "../../../common/util.js";
import { Area, Popup } from "vant";

import AreaJson from "../../../common/area.js";
export default {
  data() {
    return {
      vcodeText: "获取验证码",
      vCode: "",
      selectedCourse: "",
      form: {
        phone: "",
        code: "",
      },
      courseList: [],
      areaList: AreaJson,
      selectAddressShow: false,
      location: "选择 (省/市/区)"
    };
  },
  components: {
    vanArea: Area,
    vanPopup: Popup
  },
  created() {
    if (!getQueryVariable("code") && testWeixin()) {
      let originUrl = `${location.origin}${location.pathname}#/poster`;
      let encodedUrl = encodeURIComponent(originUrl);
      let scope = "snsapi_base";
      console.log(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxebd76dff6ca15a2a&redirect_uri=${encodedUrl}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
      );
      location.replace(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxebd76dff6ca15a2a&redirect_uri=${encodedUrl}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
      );
    } else {
      this.wxCode = getQueryVariable("code");
      sessionStorage.setItem("code", getQueryVariable("code"));
    }
    let sessionCode = sessionStorage.getItem("code");
    //后退到了没有code的链接
    if (sessionCode && !getQueryVariable("code")) {
      this.wxCode = sessionCode;
    }
    console.log("---------");
    console.log(getQueryVariable("code"));
    console.log(sessionStorage.getItem("code"));
    console.log("---------");
  },
  mounted() {
    this.inputevent();
  },
  methods: {
    inputevent() {
      var inputArr = document.querySelectorAll("input");
      inputArr.forEach(function(ele) {
        let scrollTop;
        ele.addEventListener("focus", function() {
          scrollTop = document.body.scrollTop;
        });
        ele.addEventListener("blur", function() {
          //document.body.scrollTop = scrollTop;
          window.scrollTo(0, 0);
        });
      });
    },
    submit() {
      this.form.code = this.wxCode;
      this.form.zone = this.location;
      console.log(this.form);
      //return
      this.axios
        .post(`58.87.125.111:55555/v1/share/upload_address/`, this.form)
        .then(res => {
          if (!res.error) {
            let data = res.data;
            if (data instanceof Array && data.length == 0) {
              this.$router.push("/download");
            } else if (data instanceof Array && data.length != 0) {
              localStorage.setItem("multiCourse", JSON.stringify(data));
              this.$router.push("/selectCourse");
            } else if (data instanceof Object) {
              location.href = data.url;
            }
          }
        });
    },
  
    addressConfirm(arr) {
      this.selectAddressShow = false;
      //console.log(arr);
      this.location = arr
        .map(e => {
          return e.name;
        })
        .join(" ");
      console.log(this.location);
    }
  }
};
</script>
<style lang="less">
@import url("./../../../common/common.less");
.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 0 30px;
  background: url("../../../assets/img/shareAc413/bg.png") no-repeat top
    center/100%;

  background-color: #fff8df;
}
.wrapper {
  position: absolute;
  left: 0;
  top: 22%;
  //top: 220px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    top: 26%;
  }
  width: 100%;
  padding: 0 30px;
  .book {
    margin-bottom: 30px;
    text-align: center;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(203, 121, 11, 1);
    .book_name {
      font-family: PingFangSC-Semibold;
      font-size: 36px;
    }
  }
  .address_info {
    margin-bottom: 14px;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(223, 138, 24, 1);
  }
}
.form {
  input {
    border: none;
    background-color: transparent;
    outline: none;
    left: 22%;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    width: 70%;
    height: 40px;
  }
  textarea {
    border: none;
    outline: none;
    resize: none;
  }
  input,
  textarea {
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
  }
  input::placeholder,
  textarea::placeholder,
  select:invalid,
  .my_cell_value {
    padding-left: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  select {
    border: none;
    background-color: transparent;
    outline: none;
    //color: #fff;
    left: 17%;
    top: 2%;
    position: absolute;
    width: 80%;
    height: 40px;
    font-size: 16px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .input_wrapper {
    position: relative;
    width: 100%;
    height: 44px;
    margin-bottom: 15px;
    border-radius: 10px;
    //border: 1px solid rgba(51, 51, 51, 0.2);
    padding-left: 17px;
    background-color: #fff !important;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .input_wrapper.textarea {
    padding: 13px 0 0 17px;
    height: 80px;
    align-items: flex-start;
    textarea {
      width: 70%;
    }
  }
  .reg_btn {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 335px;
    height: 44px;
    margin-left: auto;
    margin-right: auto;
    background: rgba(255, 116, 43, 0.7);
    border-radius: 25px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    text-align: center;
  }
}
.d1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 90px;
}
</style>

