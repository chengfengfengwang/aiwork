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
  "1-节奏型1.mp3",
  "2-节奏型2.mp3",
  "3-节奏型3.mp3",
  "4-节奏型4.mp3",
  "5-节奏型5.mp3",
  "6-节奏型6.mp3",
  "7-节奏型7.mp3",
  "8-节奏型8.mp3?1",
  "9-do.mp3",
  "10-re.mp3",
  "11-mi.mp3",
  "12-fa.mp3",
  "13-sol.mp3",
  "14-la.mp3",
  "15-si.mp3",
  "16-高音do.mp3",
  "17-do.mp3",
  "18-do mi.mp3",
  "19-sol la.mp3",
  "20-sol 高音do.mp3",
  "21-fa re.mp3",
  "22-re do.mp3",
  "23-sol mi.mp3",
  "24-sol do.mp3",
  "25-fa mi.mp3"
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
    document.title = this.audioNameArr[this.audioIndex - 1].split("-")[1].split('.')[0];
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

