 
 <template>

  <div ref="myVideo" class="video_box">
    <div v-show="videoShow">
      <slot  name="video"></slot>
    </div>
    
    <div v-show="!videoShow" class="video_cover" @click="play">
      <img class="play"  src="./../../assets/img/play.png" alt>
      <slot name="cover"></slot>
     </div>
   </div>
 </template>
 <script>
 export default {

   data() {
     return {
      videoShow: false
     };
   },

  methods: {
    play() {
      this.videoShow = true;
      this.$refs.myVideo.querySelector("video").play();
    }
   }
 };
 </script>
 <style lang="less" scoped>

.video_box {
  position: relative;
  width: 660px;
  display: flex;
  align-items: center;
  video {
     display: block;
    width: 100%;
    //height: 350px;
    border: none;
    outline: none;
   }


  .video_cover {
     position: absolute;

    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    .play {
      position: absolute;
      top: 50%;
      left: 50%;
      cursor: pointer;
      transform: translate(-50%, -50%);
      z-index: 3
    }
    .cover{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .video_cover.music_basis {
    background: url("./../../assets/img/course_music_basis.png") no-repeat
      center;
    background-size: cover;
  }
  .video_cover.djembe {
    background: url("./../../assets/img/course_djembe.png") no-repeat center;
    background-size: cover;
  }
  .video_cover.ukulele {
    background: url("./../../assets/img/course_ukulele.jpeg") no-repeat center;
    background-size: cover;
    height: 101%;
    top: -2px;
   }
 }
 </style>
