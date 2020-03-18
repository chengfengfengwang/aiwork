<template>
  <div id="main">
    <Loading v-show="loadingShow" />
    <img src="../../../assets/img/promote/reg/bg.png" alt class="bg" />
    <div class="rule_btn">活动规则</div>
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
        <div class="rule_item">
          <div class="item_index">1</div>
          <span class="rule_lab">邀请对象：</span>
          <span>您邀请的好友必须是从未注册过音乐壳的新用户，且必须成功购买音乐壳超级会员。</span>
        </div>
        <div class="rule_item">
          <div class="item_index">2</div>
          <span class="rule_lab">邀请方法：</span>
          <span>您必须生成自己的专属海报邀请好友，我们将依据您的邀请记录发放奖励。</span>
        </div>
        <div class="rule_item">
          <div class="item_index">3</div>
          <span class="rule_lab">邀请人奖励：</span>
          <span>每成功邀请1个好友注册并购买音乐壳超级会员，您可享受好友实付金额的20%作为现金奖励。您获得的现金奖励，可在每月10日申请提现。申请提现后，系统会在10个工作日内审核并发放。</span>
        </div>
        <div class="rule_item">
          <div class="item_index">4</div>
          <span class="rule_lab">被邀请人奖励：</span>
          <span>
            您邀请的好友注册后，即可领取一张300元音乐壳超级会员专享券和
            <span class="color">购买大牌乐器8折卡</span>
          </span>
        </div>
        <div class="rule_item">
          <div class="item_index">5</div>
          <span>
            您邀请的好友中，每月月初起，最先下单的2个可使用300元优惠购买音乐壳会员 ;
            <br />2个好友支付成功后，其它好友获得的300元优惠券会立即失效。
          </span>
        </div>
        <div class="rule_item">
          <span>其他问题，添加后方微信咨询：yxymiusic</span>
        </div>
        <div class="rule_bottom">— 本次活动最终解释权归音乐壳所有 —</div>
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
      maskShow: false,
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
    //this.getWx();
    //this.readyAll();
  },
  methods: {
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
</style>
