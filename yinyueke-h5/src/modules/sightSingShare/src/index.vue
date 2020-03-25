<template>
  <div class="page">
    <div class="main">
      <div class="avatar">
        <img
          src="https://t7.baidu.com/it/u=2046080325,1937962445&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1585720677&t=66fb57e87c02143807f86762a06e449f"
          alt
        />
      </div>
      <div class="name">小了他</div>
      <div class="rank">
        入选音乐小天才榜单第
        <span style="color:#FF4F1F">50</span>位
      </div>
      <div class="intro">我刚刚用音乐壳学会了一条新的视唱</div>
      <div class="intro">快来听听我的作品吧</div>
      <div class="learn_wrapper">
        <div class="learn_item">
          <div class="label">累计学习</div>
          <div class="num_row">
            <span class="num">90</span>天
          </div>
        </div>
        <div class="learn_item">
          <div class="label">累计学习</div>
          <div class="num_row">
            <span class="num">90</span>天
          </div>
        </div>
        <div class="learn_item">
          <div class="label">累计学习</div>
          <div class="num_row">
            <span class="num">90</span>天
          </div>
        </div>
      </div>
      <div class="qr_section">
        <img
          class="qr"
          src="https://t7.baidu.com/it/u=2046080325,1937962445&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1585720677&t=66fb57e87c02143807f86762a06e449f"
          alt
        />
        <div>邀请您加入音乐壳，与我一起快乐学音乐</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
import { Toast } from "vant";

export default {
  data() {
    return {
      btnActive: false
    };
  },
  created() {
    //this.getInstruments();
  },
  mounted() {},
  methods: {
    toQbRace() {
      console.log("跳转");
      location.href = `open://mock?question_bank=13&type=1&mock_id=5dfc786106981e000a60132b`;
    }
  },
  watch: {}
};
</script>
<style lang="less">
@import url("./../../../common/common.less");
.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #710fd4;
  font-size: 0;
}
.bg {
  width: 100%;
}
.count {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 19%;
  left: 0;
  //left: 30%;
  font-size: 13px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.enbtn {
  position: absolute;
  width: 222px;
  top: 16.1%;
  left: 50%;
  transform: translateX(-50%);
}

.breath {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: pulse;
  animation-iteration-count: infinite;
}
@keyframes pulse {
  0% {
    transform: translateX(-50%) scaleX(1);
  }

  50% {
    transform: translateX(-50%) scale3d(1.05, 1.05, 1.05);
  }
  100% {
    transform: translateX(-50%) scaleX(1);
  }
}
.main {
  position: relative;
  width: 335px;
  height: 478px;
  margin: auto;
  background: rgba(255, 255, 255, 0.96);
  text-align: center;
  .avatar {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 75px;
    height: 75px;
    border: 3px solid rgba(252, 246, 232, 1);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
  }
  .rank {
    padding: 3px 15px;
    background: rgba(255, 216, 54, 1);
    border-radius: 13px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .intro {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .learn_wrapper{
    
  }
}
</style>
