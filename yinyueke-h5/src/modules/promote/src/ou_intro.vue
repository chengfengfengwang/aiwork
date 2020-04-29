<template>
  <div id="main">
    <Loading v-show="loadingShow"/>
    <img src="../../../assets/img/promote/ou_intro/bg.png" alt class="bg">
    <img src="../../../assets/img/promote/ou_intro/reward1.png" alt class="reward1">
    <img src="../../../assets/img/promote/ou_intro/reward2.png" alt class="reward2">
    <div @click="maskShow=true" class="rule_btn">活动规则</div>
    <div @click="toPoster" class="invite_btn">立即邀请</div>
    <div v-show="maskShow" class="mask">
      <div class="ac_rule">
        <div class="close_icon" @click="maskShow=false">
          <img src="../../../assets/img/promote/poster/close.png" alt>
        </div>
        <div class="rule_title"></div>
        <div class="rule_container">                        
          <div class="rule_item">
            <div class="item_index">1</div>
            <div class="item_content">
              你邀请的首个好友注册后，系统自动随机奖励你2-5元现金。
            </div>
          </div>
          <div class="rule_item">
            <div class="item_index">2</div>
            <div class="item_content">
              你邀请的好友付费且7天内未退费。好友购课实付金额的20%，是你获得的现金奖励。
            </div>
          </div>
          <div class="rule_item">
            <div class="item_index">3</div>
            <div class="item_content">
              你获得的现金奖励，可在每月10日申请提现。申请提现后，系统会在10个工作日内审核并发放。
            </div>
          </div>
          <div class="rule_item">
            <div class="item_index">4</div>
            <div class="item_content">
              你获得的现金奖励，大于50元时可申请提现。如不够50元，可顺延到下次申请。
            </div>
          </div>
          <div class="rule_item">
            <div class="item_index">5</div>
            <div class="item_content">
              若发现作弊、刷单等行为，取消获赠奖励资格
            </div>
          </div>
          <div class="rule_item">
            <div class="item_index">6</div>
            <div class="item_content">
              审核未通过或其他问题，添加后方微信咨询：yxymiusic
            </div>
          </div>
          <div class="rule_bottom">— 本次活动最终解释权归音乐壳所有 —</div>
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
      maskShow: false
    };
  },
  created() {
    document.title = '推广有礼 高额返现'
  },
  components: {
    Loading,
    ImagePreview
  },
  mounted() {},
  methods: {
    toPoster(){
      this.$router.push('/ou_poster1')
    },
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
  top: 100px;
  right: 0;
  width: 32px;
  height: 90px;
  line-height: 28px;
  text-align: center;
  padding-left: 4px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 20px 0px rgba(225, 138, 14, 1);
  border-radius: 14px 0px 0px 14px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(255, 126, 0, 1);
  writing-mode: vertical-lr;
}
.rule_title {
  background: url("../../../assets/img/promote/reg/rule_title.png") no-repeat
    center/cover;
}
.reward1 {
  width: 335px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 43.5%;
}
.reward2 {
  width: 335px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 70%;
}
.invite_btn {
  position: fixed;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  bottom: 0px;
    background-color: #F32C11;
    z-index: 999;
}
</style>
