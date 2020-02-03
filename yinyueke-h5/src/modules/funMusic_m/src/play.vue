<template>
  <div id="instrumentWrapper">
    <img
      v-show="status=='pause'"
      @click="play"
      src="../../../assets/img/instrument/play.jpeg"
      alt
      class="play"
    >
    <img
      v-show="status=='playing'"
      @click="pause"
      src="../../../assets/img/instrument/pause.jpeg"
      alt
      class="pause"
    >
    <!-- <div class="audio_wrapper">
      <audio class="audio" controls :src="src"></audio>
    </div>-->
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";

export default {
  data() {
    return {
      audioIndex: "",
      src: "",
      status: "pause"
    };
  },
  created() {
    this.audioIndex = getQueryVariable("s");
    //https://s.immusician.com/web/h5/assets/1-节奏型1.mp3
    const baseUrl = "//s.immusician.com/web/h5/assets/";
    document.title = decodeURIComponent(getQueryVariable("title"));
    var src = baseUrl + getQueryVariable("title");
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
@import url("./../../../common/common.less");
.box {
  width: 100px;
  height: 100px;
  border: 1px solid #333;
}
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
  background: url("../../../assets/img/funMusic_m/bg.png") no-repeat center
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

