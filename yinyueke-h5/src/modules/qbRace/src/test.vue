<template>
  <div class="page">
    <button style="font-size:30px;margin-top:150px" @click="test">跳转</button>
  </div>
</template>
<script>
import { getQueryVariable, xStyle } from "../../../common/util.js";
import { Toast } from "vant";

export default {
  data() {
    return {
     
    };
  },
  created() {
   console.log(navigator)
  },
 
  methods: {
    test(){
        var originUrl = encodeURIComponent('https://shop43817630.m.youzan.com/wscgoods/detail/27bfs5j5yomue');
        let url = `open://webBrowser?url=${originUrl}`
        console.log(url)
        location.href = url;
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
