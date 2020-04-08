<template>
  <div id="main">
    <Loading v-show="loadingShow" />
    <img src="../../../assets/img/promote/reg/bg.png" alt class="bg" />
    <div @click="maskShow=true" class="rule_btn">活动规则</div>
   
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
            <div class="sub_title" style="color:#FF2D0B">1、免费领取3天音乐壳超级会员权益</div>
            <div class="sub_title" style="color:#FF2D0B">2、每月每个会员老用户邀请的新用户中，前2名下单者可获得音乐壳永久超级会员权益</div>
            <div class="item_content">
              每个音乐壳超级会员老用户可邀请多个新用户注册；
              <span
                class="color"
              >每个超级会员老用户邀请的新用户中，每月（每月1日0点起开始计时）最先购买音乐壳会员的2个用户获得音乐壳永久超级会员权益；</span>其它购买音乐壳会员的新用户，可获得10年的音乐壳超级会员权益。
            </div>
            <div class="sub_title">3、购买大牌乐器8折卡</div>
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
import { ImagePreview, Dialog } from "vant";
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
     
    };
  },
  created() {},
  components: {
    Loading,
    ImagePreview
  },
  mounted() {
  },
  methods: {
   
   
   
   
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
.ac_rule {
  padding: 36px 20px 10px 10px;
  .rule_container {
    max-height: 460px;
    overflow: auto;
  }
  .rule_item {
    .item_index {
      position: absolute;
      left: -0px;
      top: 4px;
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
  width: 32px;
  height: 90px;
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
