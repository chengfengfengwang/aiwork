<template>
  <div class="hover_play_box">
    <slot></slot>
    <div @click="showVideoModal" class="play_mask">
      <div class="song_info">
        <div class="name">{{name}}</div>
        <div class="author">{{author}}</div>
        <div class="time">{{time}}</div>
      </div>
    </div>
    <img @click="showVideoModal" class="learning_play_icon" src="./../../assets/img/learning_play.png" alt>
    <VideoModal :video="video" ref="videoBox"></VideoModal>
  </div>
</template>
<script>
import VideoModal from './../../components/Index/VideoModal'
export default {
  props: {
    width: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      default: ""
    },
    time: {
      type: String,
      default: ""
    },
    video: {
      type: String,
      default: ""
    }
  },
  components:{
    VideoModal
  },
  data() {
    return {};
  },
  methods:{
      showVideoModal(){
          console.log('开始')
          this.$refs.videoBox.show()
          //console.log(this.$refs.videoBox)
      }
  }
};
</script>
<style lang="less" scoped>
.hover_play_box {
  position: relative;
  background: no-repeat center;
  background-size: cover;
  cursor: pointer;
  font-size: 0;
  //margin: 10px;
  .play_cover {
    width: 100%;
  }
}

.play_mask {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(-180deg, #ffa342 0%, #ff9a29 100%);
  .song_info {
    position: absolute;
    right: 30px;
    bottom: 20px;
    text-align: right;
    color: #fff;
    .name {
      font-size: 16px;
      margin-right: -0.5em;
      margin-bottom: 10px;
    }
    .author {
      font-size: 12px;
    }
    .time {
      font-size: 12px;
    }
  }
}
.learning_play_icon {
  display: none;
  z-index: 3;
  position: absolute;
  width: 77px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.hover_play_box:hover .play_mask,
.hover_play_box:hover .learning_play_icon {
  display: block;
}

.hover_play_box{
    margin-bottom: 10px;
    &:last-child{
        //margin-bottom: 0
    }
}
</style>

