<template>
  <div
    id="instrumentWrapper"
    :style="{background: 'url(' + playBg + ') no-repeat center top/cover'}"
  >
    <img
      v-show="status=='pause' && !isLoading"
      @click="play"
      src="../../../assets/img/songList/play.jpeg"
      alt
      class="play"
    >
    <img
    v-show="isLoading"
            src="../../../assets/img/svgloaders/puff.svg"
            alt
            class="play_icon loading"
          >
    <img
      v-show="status=='playing' && !isLoading"
      @click="pause"
      src="../../../assets/img/songList/pause.jpeg"
      alt
      class="pause"
    >
    <radioDialog v-show="popShow"/>
  </div>
</template>
<script>
import { getQueryVariable } from "common/util.js";
import radioDialog from "components/radioDialog";

export default {
  name: "play",
  data() {
    return {
      audioIndex: "",
      src: "",
      playBg: "",
      status: "pause",
      title: "",
      popShow: false,
      isLoading: false
    };
  },
  computed: {
    // bgStyle(){
    //   let bg = 'url("'+ require(this.playBg) +'") no-repeat center top/cover'
    //   return{
    //     //../../../assets/img/songList/bg.jpeg
    //     background: bg
    //   }
    // }
  },
  components: {
    radioDialog
  },
  created() {
    this.title = decodeURIComponent(getQueryVariable("title"));
    this.src = decodeURIComponent(getQueryVariable("url"));

    let playBg = decodeURIComponent(getQueryVariable("playBg"));
    if (playBg) {
      this.playBg = playBg;
    } else {
      this.playBg = require("../../../assets/img/songList/bg.jpeg");
    }
    console.log(this.playBg);
    document.title = this.title;
    this.audio = new Audio();
    this.audio.src = this.src;
    this.audio.addEventListener(
      "ended",
      () => {
        this.status = "pause";
      },
      false
    );
    this.audio.addEventListener("loadstart", ()=> {
        this.isLoading = true;
      });
     this.audio.addEventListener(
        "canplaythrough",
        () => {
          setTimeout(() => {
              this.isLoading = false;
          }, 1000);
        },
        false
      );
    this.audio.addEventListener("timeupdate", this.audioTimer, false);
  },
  methods: {
    play() {
      this.status = "playing";
      this.audio.play();
    },
    pause() {
      this.status = "pause";
      this.audio.pause();
    },
    audioTimer() {
      //监听音频播放的实时时间事件
      let timeDisplay;
      //用秒数来显示当前播放进度
      timeDisplay = Math.floor(this.audio.currentTime); //获取实时时间
      if (timeDisplay == 60) {
        this.popShow = true;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.audio.pause();
    this.audio.removeEventListener("timeupdate", this.audioTimer, false);
    next();
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
// .font-size(@sizeValue:16) {
//   @vw: 16 / 375 * 100;
//   @result: @sizeValue / 16 * @vw;
//   font-size: ~"@{result}vw";
// }
// html {
//   .font-size(16);
// }
// html {
//   @media screen and (max-width: 320px) {
//     .font-size(16);
//   }
//   @media screen and (min-width: 480px) {
//     .font-size(13);
//   }
// }
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
  background: url("../../../assets/img/songList/bg.jpeg") no-repeat center
    top/cover;
  overflow: hidden;
  .play,
  .pause ,.loading{
    border-radius: 50%;
    width: 85px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 33%;
  }
  .loading{

  }
}
</style>

