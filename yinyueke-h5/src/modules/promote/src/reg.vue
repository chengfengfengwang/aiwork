<template>
  <div id="main">
    <Loading v-show="loadingShow" />
    <img src="../../../assets/img/promote/reg/bg.png" alt class="bg" />
    <div @click="maskShow=true" class="rule_btn">活动规则</div>
    <div class="form">
      <div class="input_wrapper phone">
        <input v-model="form.phone" placeholder="请输入手机号" type="text" />
      </div>
      <div class="input_wrapper v_code">
        <input v-model="form.code" placeholder="请输入验证码" type="text" />
        <div class="v_code_btn" @click="getVCode">{{vcodeText}}</div>
      </div>
      <div @click="reg" class="reg_btn">领取福利</div>
    </div>
    <div v-show="maskShow" class="mask">
      <div class="ac_rule">
        <div class="close_icon" @click="maskShow=false">
          <img src="../../../assets/img/promote/poster/close.png" alt />
        </div>
        <div class="rule_title"></div>
        <div class="rule_container">
          <div class="rule_item">
            <div class="item_index">1</div>
            <div class="item_title">新人专享注册好礼有什么？</div>
            <div class="sub_title">1、300元音乐壳超级会员优惠券</div>
            <div>限在音乐壳购买超级会员使用。</div>
            <div class="item_content">
              每个音乐壳超级会员老用户可邀请多个新用户注册；
              <span
                class="color"
              >每个超级会员老用户邀请的新用户中，每月（每月1日0点起开始计时）前2名下单者可使用300元优惠券购买超级会员，其它新用户的300元优惠券会失效。</span>
              <span>失效后，系统会自动补发一张50元优惠券给新用户，用于购买音乐壳app所有课程。</span>
            </div>
            <div class="sub_title">2、购买大牌乐器8折卡</div>
            <div class="item_content">
              <span class="scolor">购买音乐壳会员后，即可拥有购买大牌乐器8折卡。</span>
              <span>限在音乐壳购买乐器使用。如需在音乐壳购买乐器等硬件，</span>
              <span class="color">可向对应的辅导老师截图自己的会员头像展示会员身份，即可享受折购买乐器权益。</span>
            </div>
            <div>
              如有其他问题，添加后方微信：
              <span class="wx_color">YXYMIUSIC</span>
            </div>
          </div>
          <div class="rule_item">
            <div class="item_index">2</div>
            <span class="item_title">新人专享好礼领取规则？</span>
            <div class="item_content">仅限扫码音乐壳老用户海报，并在本页注册的新用户领取；每个用户（手机号）限领1次。</div>
          </div>
          <div class="rule_item">
            <div class="item_index">3</div>
            <span class="item_title">新人专享好礼如何查看和使用？</span>
            <div class="item_content">
              下载音乐壳app，登录您的账号，点击“我的”—“优惠券”即可查看。如有其它问题，添加后方微信咨询:
              <span class="wx_color">YXYMIUSIC</span>
            </div>
          </div>
          <!-- <div class="rule_bottom">— 本次活动最终解释权归音乐壳所有 —</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// var eruda = require("eruda");
// eruda.init();
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { ImagePreview } from "vant";
import { openInApp, getQueryVariable, platForm } from "../../../common/util.js";
import html2canvas from "html2canvas";
import Loading from "./../../../components/Loading";
const QRCode = require("qrcode");
export default {
  data() {
    return {
      loadingShow: false,
      openInApp,
      maskShow: true,
      form: {
        phone: "",
        code: "",
        share_id: getQueryVariable("share_id"),
        share_phone: getQueryVariable("share_phone"),
        is_proxy: 0,
        share_stall: getQueryVariable("c")
      },
      vcodeText: "获取验证码",
      vCode: ""
    };
  },
  created() {},
  components: {
    Loading,
    ImagePreview
  },
  mounted() {
    //this.countPageData();
  },
  methods: {
    countPageData() {
      this.axios
        .get(
          `${
            process.env.VUE_APP_LIEBIAN
          }/v1/share/save_scan_data/?share_id=6&share_phone=${getQueryVariable(
            share_phone
          )}&share_stall=${getQueryVariable(share_stall)}`
        )
        .then(res => {});
    },
    reg() {
      localStorage.setItem("loginPhone", this.form.phone);
      this.axios
        .post(`${process.env.VUE_APP_LIEBIAN}/v1/user/share_reg/`, this.form)
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
    getVCode() {
      if (this.vcodeText === "重新获取" || this.vcodeText === "获取验证码") {
        if (this.vcodeText === "获取验证码") {
          this.vCode = "";
        }
        this.axios
          .post(`${process.env.VUE_APP_SMS}/v1/user/tx_sms/`, {
            phone: this.form.phone
          })
          .then(res => {
            console.log(res);
          });
      } else {
        return;
      }
      var count = 59;
      this.vcodeText = count + "s";
      var timer = setInterval(() => {
        this.vcodeText = --count + "s";
        if (count === 0) {
          clearInterval(timer);
          this.vcodeText = "重新获取";
        }
      }, 1000);
    },
    share() {
      if (platForm == "IOS") {
        webkit.messageHandlers.shareWebImage.postMessage({
          data: this.resultBase64
        });
      } else {
        PayFeedBack.shareWebImage(this.resultBase64);
      }
    }
  }
};
</script>
<style lang="less" scoped>
#main {
  position: relative;
  min-height: 100vh;
  background-color: #f52722;
}
.top {
  img {
    width: 100%;
  }
}

.bg {
  width: 100%;
}
.form {
  position: absolute;
  left: 0;
  //top: 65%;
  top: 439px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    top: 66%;
  }
  width: 100%;
  padding: 0 46px;
  input {
    border: none;
    background-color: transparent;
    outline: none;
    color: rgba(51, 51, 51, 1);
    left: 17%;
    top: 2%;
    position: absolute;
    width: 70%;
    height: 40px;
    font-size: 14px;
  }
  input::placeholder,
  select:invalid {
    font-size: 14px;
    font-family: PingFang-SC-Regular, PingFang-SC;
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
    font-size: 14px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .input_wrapper {
    position: relative;
    width: 100%;
    height: 44px;
    margin-bottom: 12px;
    border-radius: 22px;
    //border: 1px solid rgba(51, 51, 51, 0.2);

    background-color: #fff !important;
  }

  .phone {
    background: url("../../../assets/img/yiqiac/phone.png") no-repeat left 4.7%
      center/5.7% 54%;
  }
  .v_code {
    background: url("../../../assets/img/yiqiac/safe.png") no-repeat left 4.7%
      center/7% 54%;
    .v_code_btn {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 106px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(255, 87, 38, 1);
      //border-left: 1px solid #f1f1f1;
    }
  }

  .reg_btn {
    width: 234px;
    height: 80px;
    position: absolute;
    left: 50%;
    top: 92%;
    padding-top: 20px;
    transform: translateX(-50%);
    background: url("../../../assets/img/promote/reg/reg_btn.png") no-repeat
      center;
    background-size: cover;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(243, 47, 34, 1);
    text-align: center;
  }
}
.ac_rule {
  padding: 36px 20px 10px 20px;
  .rule_container {
    max-height: 460px;
    overflow: auto;
  }
  .rule_item {
    .item_index {
      position: absolute;
      left: -2px;
      top: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: rgba(255, 241, 230, 1);
      border-radius: 50%;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(232, 180, 139, 1);
    }
    .item_title {
      margin-top: 16px;
      margin-bottom: 10px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(215, 101, 0, 1);
    }
    .sub_title {
      margin-bottom: 7px;
      color: rgba(0, 0, 0, 1);
    }
    .item_content {
      margin: 7px 0;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .scolor {
      font-family: PingFangSC-Semibold;
      color: #ff2d0b;
    }
    .wx_color {
      font-family: PingFangSC-Semibold;
    }
  }
}
.rule_btn {
  position: absolute;
  top: 20px;
  right: 0;
  width: 80px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  padding-left: 4px;
  background: linear-gradient(
    0deg,
    rgba(255, 143, 22, 1) 0%,
    rgba(255, 203, 113, 1) 100%
  );
  border-radius: 14px 0px 0px 14px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(128, 51, 0, 1);
}
.rule_title {
  background: url("../../../assets/img/promote/reg/rule_title.png") no-repeat
    center/cover;
}
</style>
