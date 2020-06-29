<template>
  <div class="page">
      <div class="success_title">
          <img src="../../../../assets/img/jxj_ac/success_title.png" alt="">
      </div>
    <div class="gift_wrapper">
      <div class="gift_box">
        <div class="gift_title">
          <span class="text">福利一</span>
        </div>
        <div class="gift_content">
          <!-- <div class="item" v-for="(item,index) in popInfo.context" :key="index">
            <div class="index">{{index+1}}</div>
            {{item[1]}}
            <span class="remark">({{item[2]}})</span>
          </div>-->
          <div class="item">
            <div class="index">
              <img src="../../../../assets/img/jxj_ac/index2.png" alt>
            </div>赠送一年名师互动课
            <span class="remark">（课程时效：1年）</span>
          </div>
          <div class="item">
            <div class="index">
              <img src="../../../../assets/img/jxj_ac/index2.png" alt>
            </div>赠送一年名师互动课
            <span class="remark">（课程时效：1年）</span>
          </div>
        </div>
      </div>
      <div class="gift_box">
        <div class="gift_title">
          <span class="text">福利二</span>
        </div>
        <!-- <div class="yhq_wrapper">
          <div class="yhq" v-for="(item,index) in popInfo.coupons" :key="index">
            <div class="left">
              <div class="yhq_num">{{item.coupon_value}}</div>
              <div>奖学金(元)</div>
            </div>
            <div class="right">
              <div class="yhq_content">{{item.describe}}</div>
              <div class="yhq_time">{{item.time_txt}}</div>
            </div>
          </div>
        </div>-->
        <div class="yhq_title">
          <img src="../../../../assets/img/jxj_ac/round1.png" alt class="round">
          <span class="text">优惠券</span>
          <img src="../../../../assets/img/jxj_ac/round1.png" alt class="round">
        </div>
        <div class="yhq_wrapper">
          <div class="yhq">
            <div class="left">
              <div class="yhq_num">50</div>
              <div>奖学金(元)</div>
            </div>
            <div class="right">
              <div class="yhq_content">谁告诉对方个杀人犯谁告诉对方个杀人犯</div>
              <div class="yhq_time">谁告诉对方个杀人犯谁告诉对方个杀人犯</div>
            </div>
          </div>
        </div>
        <div class="use_btn btn">立即使用</div>
      </div>
      <div class="gift_box">
        <div class="gift_title">
          <span class="text">福利三</span>
        </div>
        <div class="group first">
          <div class="group_index">(一)</div>
          <div class="group_content">入群领取300首电子曲谱</div>
        </div>
        <div class="group">
          <div class="group_index">(二)</div>
          <div class="group_content">专业老师学习辅导</div>
        </div>
        <div class="add_btn btn">去添加</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../../common/util.js";

export default {
  data() {
    return {
      v1: "open://"
    };
  },
  methods: {
    go() {
      location.href = this.v1;
    },
    getCodeInfo() {
      this.axios
        .get(
          `${process.env.VUE_APP_XIAOPO}/v3/new_active_code/exchange`,
          {
            params: {
              ab_type: 1,
              code: getQueryVariable("code"),
              instrument_type: getQueryVariable("instrument_type")
            }
          },
          {
            headers: {
              uid: getQueryVariable("uid"),
              token: getQueryVariable("token")
            }
          }
        )
        .then(res => {
          if (!res.error) {
            this.popShow = true;
            this.popInfo = res.data.code_data;
            // Dialog.alert({ message: "课程领取成功，下载APP学习" }).then(res => {
            //   location.href =
            //     "http://s.immusician.com/static/html/channel_page_auto.html?channel=&channel=andelu7tianrumen";
            // });
            // sessionStorage.setItem("acInstrument", this.form.instrument);
            // sessionStorage.setItem("acCourse", JSON.stringify(res.data.words));
            //this.$router.push("/success");
          }
        });
    }
  }
};
</script>
<style lang="less">
.page {
  min-height: 100vh;
  background: url("./../../../../assets/img/jxj_ac/success_bg.png") no-repeat
    left top/100%;
  background-color: #4e048b;
  overflow: hidden;
}
.success_title{
    margin-top: 28px;
    text-align: center;
    img{
        width: 256px;
    }
}
.gift_wrapper {
  position: absolute;
  left: 0;
  top: 100px;
  padding-top: 20px;
  padding: 20px 10px 0 10px;
  width: 100%;
  display: flex;
  overflow: scroll;
}
.gift_box {
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 300px;
  height: 230px;
  background-color: #fff;
  border-radius: 12px;
  margin: 0 10px;
  .gift_title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -4px;
    width: 150px;
    height: 32px;
    background: url("./../../../../assets/img/jxj_ac/gift_title.png") no-repeat
      left top/100%;
    .text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 5px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.gift_content {
  width: 276px;
//   position: absolute;
//   left: 50%;
//   transform: translateX(-48%);
  top: 114px;
  margin-top: 56px;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  .item {
    padding-left: 24px;
    position: relative;
    margin-bottom: 30px;
    .index {
      position: absolute;
      left: 0;
      top: 2px;
      width: 16px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      font-size: 11px;
      color: #ff712d;
      background-color: #ffc345;
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    .remark {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
}
.yhq_title {
  margin-top: 40px;
  .round {
    vertical-align: middle;
    width: 8px;
    height: 8px;
  }
  .text {
    margin: 0 6px;
    vertical-align: middle;
  }
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(252, 107, 47, 1);
}
.yhq_wrapper {
  //   position: absolute;
  //   left: 50%;
  //   transform: translateX(-48%);
  //   top: 209px;
  .yhq {
    margin: 8px auto 12px auto;
    width: 276px;
    height: 75px;
    margin-bottom: 5px;
    background: url(../../../../assets/img/jxj_ac/yhq.png) no-repeat center/100%
      100%;
    display: flex;
    align-items: center;
    padding: 10px 0;
    .left {
      width: 130px;
      text-align: center;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(249, 60, 7, 1);
      .yhq_num {
        margin-top: -5px;
        font-size: 32px;
        font-family: SFUIDisplay-Heavy, SFUIDisplay;
        font-weight: 800;
        color: rgba(249, 60, 7, 1);
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 3px;
      .yhq_content {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(74, 51, 11, 1);
      }
      .yhq_time {
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(74, 51, 11, 0.5);
      }
    }
  }
}
.use_btn {
  width: 250px;
  height: 44px;
  background-color: #ff712d;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}
.group {
  margin-bottom: 16px;
  text-align: center;
  &.first{
      margin-top: 40px;
  }
  .group_index {
      margin-bottom: 3px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(252, 107, 47, 1);
  }
  .group_content {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.add_btn {
  width: 250px;
  height: 44px;
  border: 1px solid #fc6b2f;
}
</style>

