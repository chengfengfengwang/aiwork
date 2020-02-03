<template>
  <div id="instrumentWrapper">
    <img
      v-show="status=='pause'"
      @click="play"
      src="../../assets/img/instrument/play.jpeg"
      alt
      class="play"
    >
    <img
      v-show="status=='playing'"
      @click="pause"
      src="../../assets/img/instrument/pause.jpeg"
      alt
      class="pause"
    >
    <!-- <div class="audio_wrapper">
      <audio class="audio" controls :src="src"></audio>
    </div>-->
  </div>
</template>
<script>
import { getQueryVariable } from "../../common/util.js";
const audios = [
  "1-第1课-青蛙.mp3",
  "2-听听声音（钢琴）.mp3",
  "3-第1课-知更鸟.mp3",
  "4-第1课-汽车.mp3",
  "5-第1课-高音.mp3",
  "6-第1课-低音.mp3",
  "7-第2课-老鼠短.mp3",
  "8-第2课-老鼠长.mp3",
  "9-第8课-视唱.mp3",
  "10-第9课-视唱.mp3",
  "11-第10课-视唱.mp3",
  "12-第11课-视唱.mp3",
  "12课视唱2.mp3",
  //"13-第12课-视唱.mp3",
  "14-第13课-视唱.mp3",
  "15-第14课-视唱.mp3",
  "16-第15课-do.mp3",
  "17-第15课-re.mp3",
  "18-第15课-mi.mp3",
  "19-第15课-fa.mp3",
  "20-第15课-sol.mp3",
  "21-第15课-视唱.mp3",
  "22-第16课-大提琴弱.mp3",
  "23-第16课-大提琴强.mp3",
  "24-第16课-交响乐快.mp3",
  "25-第16课-交响乐慢.mp3",
  "26-第16课-视唱.mp3"
];
export default {
  data() {
    return {
      audioIndex: "",
      src: "",
      audioNameArr: audios,
      status: "pause"
    };
  },
  created() {
    this.audioIndex = getQueryVariable("s");
    //https://s.immusician.com/web/h5/assets/1-节奏型1.mp3
    const baseUrl = "//s.immusician.com/web/h5/assets/";
    document.title = decodeURIComponent(getQueryVariable("title"));
    var src = baseUrl + this.audioNameArr[this.audioIndex - 1];
    console.log(document.title);
    this.src = src;
    this.audio = new Audio();
    this.audio.src = src;
    this.audio.addEventListener(
      "ended",
      () => {
        this.status = "pause";
      },
      false
    );
  },
  methods: {
    play() {
      this.status = "playing";
      this.audio.play();
    },
    pause() {
      this.status = "pause";
      this.audio.pause();
    }
  }
};
</script>
<style lang="less">
@import url("./../../common/common.less");
.font-size(@sizeValue:16) {
  @vw: 16 / 375 * 100;
  @result: @sizeValue / 16 * @vw;
  font-size: ~"@{result}vw";
}
html {
  .font-size(16);
}
html {
  @media screen and (max-width: 320px) {
    .font-size(16);
  }
  @media screen and (min-width: 480px) {
    .font-size(13);
  }
}
.audio {
  transform: scale(1.2);
}
.audio_wrapper {
  margin-top: 30px;
  text-align: center;
}
#instrumentWrapper {
  position: relative;
  min-height: 100vh;
  background: url("../../assets/img/instrument/bg.jpg") no-repeat center
    top/cover;
  overflow: hidden;
  .play,
  .pause {
    border-radius: 50%;
    width: 85px;
    position: absolute;
    // top:10px;
    // right: 10px;
    // width: 70px;
    // padding: 10px
    left: 50%;
    transform: translateX(-50%);
    top: 33%;
  }
}
</style>

