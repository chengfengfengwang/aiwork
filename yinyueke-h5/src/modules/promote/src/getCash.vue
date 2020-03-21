<template>
  <div id="main">
    <Loading v-show="loadingShow" />

    <div class="top">
      <img src="../../../assets/img/promote/get_cash/top_bg.png" alt class="top_bg" />
      <div class="top_main">
        <div class="current">
          <div class="label_text">累计收益(元)</div>
          <div class="num">{{wData.total/100}}</div>
        </div>
        <div class="detail">
          <div class="detail_item">
            <div class="label_text">已经提现(元)</div>
            <div class="num">{{wData.withdrawal/100}}</div>
          </div>
          <div class="detail_item">
            <div class="label_text">可提现(元)</div>
            <div class="num">{{wData.balance/100}}</div>
          </div>
        </div>
        <div class="cash_section">
          <div class="cash_section_title">
            <div class="title_text">提现金额</div>
          </div>
          <div class="input_wrapper">
            <input v-model.number="cashNum" placeholder="大于50元时可申请提现" type="text" />
          </div>
          <div @click="goWidthDraw" class="cash_btn">申请提现</div>
        </div>
      </div>
    </div>
    <div class="record">
      <img src="../../../assets/img/promote/get_cash/tips_title.png" alt class="record_title" />
      <div class="rule_item">
        <div class="item_index">1</div>
        <span>收到您的提现申请后，系统会在10个工作日内审核并发放。</span>
      </div>
      <div class="rule_item">
        <div class="item_index">2</div>
        <span>现金奖励，大于50元时可申请提现。如不够50元，可顺延到下次申请。</span>
      </div>
      <div class="rule_item">
        <div class="item_index">3</div>
        <span>当前显示可提现金额，本月10日前，统计的是上个月1日到上月月底，新用户购课产生的对应奖励金额。本月11日起，统计的是本月1日截止到当前，新用户购课产生的对应奖励金额。%作为现金奖励。您获得的现金奖励，可在每月10日申请提现。申请提现后，系统会在10个工作日内审核并发放。</span>
      </div>
      <div class="rule_item">
        <div class="item_index">4</div>
        <span>若新用户退费，则不计入奖励。</span>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "./../../../components/Loading";

import { getQueryVariable, formatePhone } from "../../../common/util.js";
export default {
  data() {
    return {
      wData: {
        total: 0,
        balance: 0,
        withdrawal: 0
      },
      recordItem: [],
      loadingShow: false,
      cashNum: ""
    };
  },
  components: {
    Loading
  },
  created() {
    this.getWidthDrawData();
  },

  methods: {
    goWidthDraw() {
      if (this.cashNum) {
        sessionStorage.setItem('cashNum',this.cashNum);
        this.$router.push("/writeCardInfo");
      }
    },
    getWidthDrawData() {
      this.loadingShow = true;
      this.axios
        .get(`http://58.87.125.111:55555/v1/account/get_my_withdrawal/?god=${getQueryVariable('uid')}`)
        .then(res => {
          this.loadingShow = false;
          let wData = res.data.stats;
          if (wData.total) {
            wData.total = wData.total.toFixed(2);
          }
          this.wData = wData;
        });
    }
  }
};
</script>
<style lang="less" scoped>
#main {
  min-height: 100vh;
  padding-bottom: 40px;
  background: linear-gradient(
    0deg,
    rgba(249, 127, 56, 1) 0%,
    rgba(251, 218, 131, 1) 100%
  );
}
.top {
  position: relative;
  width: 350px;
  margin: auto;
  //background: url("../../../assets/img/reward/top_bg.png") no-repeat center;
  background-size: cover;
  text-align: center;
  img.top_bg {
    width: 100%;
  }
  .top_main {
    padding-top: 80px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    .current {
      // margin-top: 80px;
      .label_text {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(252, 225, 57, 1);
      }
      .num {
        // position: relative;
        // top: -5px;
        margin-top: -5px;
        font-size: 44px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
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
          color: rgba(134, 35, 0, 1);
        }
        .num {
          font-size: 24px;
          font-family: SF UI Text;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
.record {
  position: relative;
  width: 335px;
  margin: 20px auto 0px auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 46px 20px 10px 20px;
  .record_title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 207px;
    top: -5px;
  }
  .record_item_title {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    height: 30px;
    background: rgba(251, 190, 108, 0.1);
    border-radius: 15px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(251, 190, 108, 1);
    // .user {
    //   padding-left: 10px;
    // }
    padding: 0 10px;
  }

  .rule_item {
    position: relative;
    margin-bottom: 10px;
    padding-left: 20px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    .item_index {
      position: absolute;
      left: -4px;
      top: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: rgba(240, 144, 87, 1);
      border-radius: 50%;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.cash_section {
  margin-top: 32px;
  .cash_section_title {
    text-align: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(252, 225, 57, 1);
    .title_text {
      position: relative;
    }
    .title_text::before {
      content: " ";
      position: absolute;
      left: 36%;
      top: 54%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border: 1px solid rgba(252, 225, 57, 1);
      border-radius: 50%;
    }
    .title_text::after {
      content: " ";
      position: absolute;
      right: 36%;
      top: 54%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border: 1px solid rgba(252, 225, 57, 1);
      border-radius: 50%;
    }
  }
  input {
    text-align: center;
    border: none;
    background-color: transparent;
    outline: none;
    left: 17%;
    top: 2%;
    position: absolute;
    width: 70%;
    height: 40px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  input::placeholder,
  select:invalid {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 0.6);
  }

  .input_wrapper {
    position: relative;
    width: 280px;
    height: 44px;
    margin: 12px auto 16px auto;
    border-radius: 22px;
    background-color: #fff !important;
  }
  .cash_btn {
    margin: auto;
    width: 240px;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(
      0deg,
      rgba(254, 147, 13, 1) 0%,
      rgba(252, 247, 67, 1) 100%
    );
    //box-shadow: 0px 6px 7px 0px rgba(255, 255, 255, 0.86);
    border-radius: 20px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(142, 49, 18, 1);
  }
}
</style>
