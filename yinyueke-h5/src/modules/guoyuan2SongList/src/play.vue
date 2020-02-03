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
const audios = [
  "1-1-1",
  "1-1-2",
  "1-1-3",
  "1-1-4",
  "1-2-1",
  "1-2-2",
  "1-2-3",
  "1-2-4",
  "1-3-1",
  "1-3-2",
  "1-3-3",
  "1-3-4",
  "2-1-1",
  "2-1-2",
  "2-1-3",
  "2-1-4",
  "2-1-5",
  "2-2-1",
  "2-2-2",
  "2-2-3",
  "2-2-4",
  "2-2-5",
  "3-1-1",
  "3-1-2",
  "3-1-3",
  "3-1-4",
  "3-1-5",
  "3-2-1",
  "3-2-2",
  "3-2-3",
  "3-2-4",
  "3-2-5",
  "4-1-1",
  "4-1-2",
  "4-1-3",
  "4-1-4",
  "4-2-1",
  "4-2-2",
  "4-2-3",
  "4-2-4",
  "4-3-1",
  "4-3-2",
  "4-3-3",
  "4-3-4",
  "5-1-1",
  "5-1-2",
  "5-1-3",
  "5-1-4",
  "5-1-5",
  "5-2-1",
  "5-2-2",
  "5-2-3",
  "5-2-4",
  "5-2-5",
  "6-1-1",
  "6-1-2",
  "6-1-3",
  "6-1-4",
  "6-1-5",
  "6-2-1",
  "6-2-2",
  "6-2-3",
  "6-2-4",
  "6-2-5",
  "7-1-1",
  "7-1-2",
  "7-1-3",
  "7-1-4",
  "7-2-1",
  "7-2-2",
  "7-2-3",
  "7-2-4",
  "7-3-1",
  "7-3-2",
  "7-3-3",
  "7-3-4",
  "8-1-1",
  "8-1-2",
  "8-1-3",
  "8-1-4",
  "8-2-1",
  "8-2-2",
  "8-2-3",
  "8-2-4",
  "8-3-1",
  "8-3-2",
  "8-3-3",
  "8-3-4",
  "18课-考点1-1伴奏",
  "18课-考点1-1范唱",
  "18课-考点1-2伴奏",
  "18课-考点1-2范唱",
  "18课-考点1-3伴奏",
  "18课-考点1-3范唱",
  "18课-考点1-4伴奏",
  "18课-考点1-4范唱",
  "18课-考点1-5伴奏",
  "18课-考点1-5范唱",
  "18课-考点2-6伴奏",
  "18课-考点2-6范唱",
  "18课-考点2-7伴奏",
  "18课-考点2-7范唱",
  "18课-考点2-8伴奏",
  "18课-考点2-8范唱",
  "18课-考点2-9伴奏",
  "18课-考点2-9范唱",
  "18课-考点2-10伴奏",
  "18课-考点2-10范唱",
  "模拟真题试卷—练耳—第1题",
  "模拟真题试卷—练耳—第2题",
  "模拟真题试卷—练耳—第3题",
  "模拟真题试卷—练耳—第4题",
  "模拟真题试卷—练耳—第5题",
  "模拟真题试卷—练耳—第6题",
  "模拟真题试卷—练耳—第7题",
  "模拟真题试卷—练耳—第8题",
  "模拟真题试卷—练耳—第9题",
  "模拟真题试卷—练耳—第10题",
  "模拟真题试卷—视唱"
];
export default {
  name:'play',
  data() {
    return {
      audioIndex: "",
      src: "",
      audioNameArr: audios,
      status: "pause"
    };
  },
  created() {
    this.audioName = getQueryVariable("title");
    const baseUrl = "//s.immusician.com/web/h5/assets/";
    document.title = decodeURIComponent(getQueryVariable("title")) ; 
    this.audio = new Audio();
    this.audio.src = baseUrl + this.audioName + ".mp3";
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
  },
  beforeRouteLeave(to, from, next)  {
    this.audio.pause();
    next()
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
  background: url("../../../assets/img/dashSongList/newBg1.jpg") no-repeat center
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

