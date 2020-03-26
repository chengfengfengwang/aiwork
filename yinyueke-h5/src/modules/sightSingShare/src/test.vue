<template>
  <div class="page">
    <img class="bg" src="../../../assets/img/sightSingShare/top.png" alt />
    <img class="bg round" src="../../../assets/img/sightSingShare/round.png" alt />
    <img v-show="!isXStyle" class="bottom" src="../../../assets/img/sightSingShare/bottom.png" alt />
    <img v-show="isXStyle" class="bottom" src="../../../assets/img/sightSingShare/xbottom.png" alt />
    <div class="main" :class="{xStyle:isXStyle}">
          <audio controls id="myaudio" preload src="http://image.yinji.immusician.com/record/6892711291671391724941204957"></audio>

      <img src="../../../assets/img/sightSingShare/coco.png" alt class="coco" />
      <div class="avatar">
        <img :src="info.avatar_url" alt />
      </div>
      <div class="name">{{info.nickname}}</div>
      <div class="rank">
        入选音乐小天才榜单第
        <span style="color:#FF4F1F">{{info.ranking}}</span>位
      </div>
      <div class="intro_wrapper">
        <div class="intro">我刚刚用音乐壳学会了一条新的视唱</div>
        <div class="intro">快来听听我的作品吧</div>
      </div>
      <div class="audio_section" @click="togglePlay">
        <div class="audio_time">{{audioTime}}s</div>
        <div v-show="playing" class="audio_play">
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
        </div>
        <div v-show="!playing" class="audio_play">
          <img src="../../../assets/img/sightSingShare/audio_play.png" alt />
        </div>
      </div>
      <div class="learn_wrapper">
        <div class="learn_item">
          <div class="label">累计学习</div>
          <div class="num_row">
            <span class="num">{{info.study_days}}</span>天
          </div>
        </div>
        <div class="learn_item">
          <div class="label">本周学习</div>
          <div class="num_row">
            <span class="num">{{info.week_days}}</span>天
          </div>
        </div>
        <div class="learn_item">
          <div class="label">累计学习课程</div>
          <div class="num_row">
            <span class="num">{{info.study_lesson}}</span>天
          </div>
        </div>
      </div>
      <div class="qr_section">
        <img class="qr" :src="info.qr_url" alt />
        <div>邀请您加入音乐壳，与我一起快乐学音乐</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable, xStyle } from "../../../common/util.js";
import { Toast } from "vant";

export default {
  data() {
    return {
      btnActive: false,
      isXStyle: false,
      info: {},
      playing: false,
      audioTime: ""
    };
  },
  created() {
    this.isXStyle = xStyle();
    this.getInfo();
  },
  mounted() {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: "", // 必填，公众号的唯一标识
      timestamp: "", // 必填，生成签名的时间戳
      nonceStr: "", // 必填，生成签名的随机串
      signature: "", // 必填，签名
      jsApiList: [] // 必填，需要使用的JS接口列表
    });
    let audio = document.querySelector('#myaudio'); //生成一个audio元素
      console.log(audio)
      audio.play();
    wx.ready(function() {
      let audio = document.querySelector('#myaudio'); //生成一个audio元素
      console.log(audio)
      audio.play();
      //audio.pause();
      console.log("--test-");
      audio.addEventListener("canplay", function() {
        console.log("---");
        console.log(parseInt(audio.duration));
      });
    });
    //this.getAudioDuration();
  },
  methods: {
    togglePlay() {
      this.playing = !this.playing;
      if (this.playing) {
        this.myAudio.play();
        this.countdown();
      } else {
        this.myAudio.pause();
        clearInterval(this.timer);
      }
    },
    countdown() {
      this.timer = setInterval(() => {
        this.audioTime--;
      }, 1000);
    },
    getAudioDuration(src) {
      let audio = new Audio(); //生成一个audio元素
      audio.src = "https://www.runoob.com/try/demo_source/horse.ogg"; //音乐的路径
      audio.play();
      audio.pause();
      
      audio.addEventListener("canplay", function() {
        console.log("---");
        console.log(parseInt(audio.duration));
      });
    },
    getInfo() {
      this.axios
        .get(
          `http://58.87.125.111:55555/v1/students/sing_share/?uid=${getQueryVariable(
            "uid"
          )}`
        )
        .then(res => {
          this.info = res.data;
          this.myAudio = new Audio();
          this.myAudio.src = this.info.video_record_url;
          //this.myAudio.src = 'https://www.runoob.com/try/demo_source/horse.ogg';
          this.myAudio.addEventListener("canplay", () => {
            this.audioTime = parseInt(this.myAudio.duration);
          });
          this.myAudio.addEventListener(
            "ended",
            () => {
              this.playing = false;
              this.audioTime = parseInt(this.myAudio.duration);
              clearInterval(this.timer);
            },
            false
          );
        });
    }
  },
  watch: {}
};
</script>
<style lang="less">
@import url("./../../../common/common.less");
.page {
  width: 100%;
  height: 100vh;
  min-height: 667px;
  //max-height: 100vh;
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
  animation: play 0.8s infinite 0.3s;
}
.audio_play .three {
  animation: play 0.8s infinite 0.5s;
}
.audio_play .four {
  animation: play 0.8s infinite 0.7s;
}
.audio_play .five {
  animation: play 0.8s infinite 0.5s;
}
.audio_play.pause {
  div {
    animation-play-state: paused;
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
.main.xStyle {
  top: 22%;
}
.main {
  //margin-top: 100px;
  position: absolute;
  left: 50%;
  top: 20.5%;
  //top:145px;
  transform: translateX(-50%);
  border-radius: 25px;
  width: 335px;
  height: 478px;
  padding-top: 50px;
  margin: auto;
  background: rgba(255, 255, 255, 0.96);
  text-align: center;
  .coco {
    position: absolute;
    bottom: -30px;
    right: -17px;
    width: 93px;
  }
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
    margin: 18px 0 12px 0;
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
    .audio_time {
      position: absolute;
      top: 48%;
      transform: translateY(-50%);
      right: 16px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .audio_play {
      //width: 80px;
      width: 100%;
      height: 18px;
      position: absolute;
      top: 50%;
      left: 46%;
      transform: translate(-50%, -50%);
      img {
        width: 80px;
      }
      div {
        width: 3px;
        height: 100%;
        margin-left: 3px;
        border-radius: 50px;
        background-color: #fff;
        vertical-align: middle;
        display: inline-block;
        opacity: 0.7;
      }
    }
  }
  .learn_wrapper {
    margin-bottom: 20px;
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
