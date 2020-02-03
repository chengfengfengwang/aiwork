<template>
  <div id="instrumentWrapper">
    <img v-show="status=='pause'" @click="play" src="../../assets/img/instrument/play.jpeg" alt="" class="play">
    <img v-show="status=='playing'" @click="pause" src="../../assets/img/instrument/pause.jpeg" alt="" class="pause">
    <!-- <div class="audio_wrapper">
      <audio class="audio" controls :src="src"></audio>
    </div> -->
  </div>
</template>
<script>
import { getQueryVariable } from "../../common/util.js";
const audios = [
  "1.萨克斯.mp3",
  "2.长笛.mp3",
  "3.巴松.mp3",
  "4.单簧管.mp3",
  "5.双簧管.mp3",
  "6.吉他.mp3",
  "7.小提琴.mp3",
  "8.中提琴.mp3",
  "9.大提琴.mp3",
  "10.低音提琴.mp3",
  "11.竖琴.mp3",
  "12.尤克里里.mp3",
  "13.小号.mp3",
  "14.长号mp3.mp3",
  "15.大号.mp3",
  "16.圆号.mp3",
  "17.非洲鼓.mp3",
  "18.铃鼓.mp3",
  "19.沙槌.mp3",
  "20.三角铁.mp3",
  "21.木琴.mp3",
  "22.钟琴.mp3",
  "23.三角钢琴.mp3",
  "24.立式钢琴.mp3"
];
export default {
  data() {
    return {
      audioIndex: "",
      src: "",
      audioNameArr: audios,
      status:'pause'
    };
  },
  created() {
    this.audioIndex = getQueryVariable("s");
    //http://cdn.kids.immusician.com/web/h5/assets/18.%E9%93%83%E9%BC%93.mp3
    const baseUrl = "http://cdn.kids.immusician.com/web/h5/assets/";
    document.title = this.audioNameArr[this.audioIndex - 1].split(".")[1];
    var src = baseUrl + this.audioNameArr[this.audioIndex - 1];
    //console.log(src)
    this.src = src;
    this.audio = new Audio();
    this.audio.src = src;
    this.audio.addEventListener('ended', ()=> {  
        this.status='pause';
    }, false);
  },
  methods:{
    play(){
      this.status='playing';
      this.audio.play();
    },
    pause(){
      this.status='pause';
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
  background: url("../../assets/img/instrument/bg.jpeg") no-repeat center
    top/cover;
  overflow: hidden;
  .play,.pause{
    border-radius: 50%;
    width: 85px;
    position: absolute;
    // top:10px;
    // right: 10px;
    // width: 70px;
    // padding: 10px
    left: 50%;
    transform: translateX(-50%);
    top:33%;
  }
}

</style>

