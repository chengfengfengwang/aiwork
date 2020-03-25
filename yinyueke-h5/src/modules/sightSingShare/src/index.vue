<template>
  <div class="page">
    <img class="bg" src="../../../assets/img/sightSingShare/top.png" alt />
    <img class="bg round" src="../../../assets/img/sightSingShare/round.png" alt />
    <img class="bottom" src="../../../assets/img/sightSingShare/bottom.png" alt />
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
      <div class="intro_wrapper">
        <div class="intro">我刚刚用音乐壳学会了一条新的视唱</div>
        <div class="intro">快来听听我的作品吧</div>
      </div>
      <div class="audio_section">
        <div class="audio_play">
          <div class="one"></div>
          <div class="two"></div>
          <div class="three"></div>
          <div class="four"></div>

          <div class="one"></div>
          <div class="two"></div>
          <div class="three"></div>
          <div class="four"></div>

          <div class="one"></div>
          <div class="two"></div>
          <div class="three"></div>
          <div class="four"></div>
          <!-- <div class="two"></div>
          <div class="one"></div>
          <div class="four"></div>
          <div class="three"></div>
          <div class="five"></div> -->

        </div>
      </div>
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
  background-color: #fff2cc;
  font-size: 0;
}
.bg {
  width: 100%;
}
.round {
  position: relative;
  top: -40px;
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
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
.audio_play .one {
  animation: play 0.8s infinite 0.1s;
}
.audio_play .two {
  animation: play 0.8s infinite 0.2s;
}
.audio_play .three {
  animation: play 0.8s infinite 0.3s;
}
.audio_play .four {
  animation: play 0.8s infinite 0.4s;
}
.audio_play .five {
  animation: play 0.8s infinite 0.5s;
}
.audio_play.pause{
  div{
    animation-play-state:paused;
  }
}
@keyframes play {
  0% {
    height: 10%;
  }
  20% {
    height: 50%;
  }
  50% {
    height: 100%;
  }
  80% {
    height: 50%;
  }
  100% {
    height: 10%;
  }
}
.main {
  //margin-top: 100px;
  position: absolute;
  left: 50%;
  top: 18%;
  //top:145px;
  transform: translateX(-50%);
  border-radius: 25px;
  width: 335px;
  height: 478px;
  padding-top: 50px;
  margin: auto;
  background: rgba(255, 255, 255, 0.96);
  text-align: center;
  .avatar {
    position: absolute;
    top: -37px;
    left: 50%;
    transform: translateX(-50%);
    width: 75px;
    height: 75px;
    border: 3px solid rgba(252, 246, 232, 1);
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    margin-bottom: 10px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
  }
  .rank {
    display: inline-block;
    padding: 3px 15px;
    background: rgba(255, 216, 54, 1);
    border-radius: 13px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .intro_wrapper {
    margin: 23px 0 12px 0;
    .intro {
      margin-bottom: 5px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .audio_section {
    position: relative;
    margin: 14px auto 23px auto;
    width: 190px;
    height: 36px;
    background: rgba(255, 147, 54, 1);
    border-radius: 20px;
    .audio_play {
      //width: 80px;
      width: 100%;
      height: 18px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      div {
        width: 3px;
        height: 100%;
        margin-left: 5px;
        border-radius: 50px;
        background-color: #fff;
        vertical-align: middle;
        display: inline-block;
      }
    }
  }
  .learn_wrapper {
    margin-bottom: 28px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    .learn_item {
      display: inline-block;
      width: 33.33%;
    }
    .num {
      font-size: 30px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(71, 181, 60, 1);
    }
  }
  .qr_section {
    .qr {
      width: 84px;
      height: 84px;
      margin-bottom: 8px;
    }
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
</style>
