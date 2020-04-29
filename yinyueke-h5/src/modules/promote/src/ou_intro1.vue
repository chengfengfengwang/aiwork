<template>
  <div id="main">
    <Loading v-show="loadingShow"/>
    <img src="../../../assets/img/promote/ou_intro/bg.png" alt class="bg">
    <div class="top">
      <div class="top_title">
        <div class="text">我的奖励</div>
        <img src="../../../assets/img/promote/ou_intro1/top_title.png" alt class="top_bg">
      </div>

      <div class="top_main">
        <div class="current">
          <div class="label_text">当前收益(元)</div>
          <div class="num">{{rewardData.total/100}}</div>
        </div>
        <div class="detail">
          <div class="detail_item">
            <div class="label_text">已注册</div>
            <div class="num">{{rewardData.reg_count}}</div>
          </div>
          <div class="detail_item">
            <div class="label_text">付费人数</div>
            <div class="num">{{rewardData.number}}</div>
          </div>
          <div class="detail_item">
            <div class="label_text">付费金额(元)</div>
            <div class="num">{{rewardData.amount/100}}</div>
          </div>
        </div>
        <div class="detail_link" @click="toRewardDetail">
          查看奖励明细
          <img class="arrow" src="../../../assets/img/promote/ou_intro1/arrow.png" alt />
        </div>
      </div>
    </div>
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
      maskShow: false,
      rewardData: {
        total: 0,
        amount: 0,
        reg_count: 0,
        number: 0
      }
    };
  },
  created() {
    document.title = '推广有礼 高额返现';
    this.getMyAccountData();
  },
  components: {
    Loading,
    ImagePreview
  },
  mounted() {},
  methods: {
    toRewardDetail() {
      this.$router.push("/ou_reward");
    },
    toGetCash() {
      this.$router.push("/getCash");
    },
    getMyAccountData() {
      this.loadingShow = true;
      this.axios
        .get(
          `http://58.87.125.111:55555/v1/account/get_my_account/`,{
            headers:{
              uid:getQueryVariable('uid'),
              token:getQueryVariable('token')
            }
          }
        )
        .then(res => {
          this.loadingShow = false;
          let rewardData = res.data.stats;
          if (rewardData.total) {
            rewardData.total = rewardData.total.toFixed(2);
          }
          this.rewardData = rewardData;
          this.recordItem = res.data.flow;
          this.recordItem.forEach(e => {
            e.phone = formatePhone(e.phone);
          });
          console.log(this.recordItem);
        });
    },
    toPoster() {
      this.$router.push("/ou_poster1");
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
  top: 73%;
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
  background-color: #f32c11;
  z-index: 999;
}
.top {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 45%;
  width: 335px;
  margin: auto;
  //background: url("../../../assets/img/reward/top_bg.png") no-repeat center;
  background-size: cover;
  text-align: center;
  border: 5px solid #ffe170;
  border-radius: 30px;
  background-color: #fff;

  .top_title {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    img.top_bg {
      width: 220px;
    }
    .text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 248, 230, 1);
    }
  }
  .top_main {
    padding-top: 50px;
    width: 100%;

    .current {
      // margin-top: 80px;
      .label_text {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(240, 147, 0, 1);
      }
      .num {
        // position: relative;
        // top: -5px;
        margin-top: -5px;
        font-size: 44px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 72, 23, 1);
      }
    }
    .detail {
      margin-top: 0px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-evenly;
      .detail_item {
        width: 33.333%;
        flex-grow: 1;
        .label_text {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(240, 147, 0, 1);
        }
        .num {
          font-size: 24px;
          font-family: SF UI Text;
          font-weight: 400;
          color: rgba(255, 72, 23, 1);
        }
      }
    }
    .detail_link {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color:rgba(240,147,0,1);
      img {
        margin-left: 3px;
        margin-top: 1px;
        width: 9px;
      }
    }
  }
}
</style>
