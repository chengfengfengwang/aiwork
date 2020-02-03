<template>
  <div class="music_base">
    <div class="wrapper">
      <img src="./../../assets/img/music_base_content.png" alt>
      <div class="receive" id="downloadButton1">
        <img src="./../../assets/img/receive_btn.png" alt class="receive_btn">
      </div>

      <div class="video_box first">
        <img
          v-show="playShow1"
          @click="playVideo(1)"
          src="./../../assets/img/play_icon.png"
          alt
          class="play"
        >
        <img v-show="playShow1" class="poster" src="./../../assets/img/course_music_basis.png" alt>
        <video
          controls
          preload="auto"
          ref="myVideo1"
          poster="./../../assets/img/course_music_basis.png"
          src="https://s.immusician.com/web/h5/video/index_music_base_2.mp4?v=1"
        ></video>
      </div>
      <div class="video_box second">
        <img
          v-show="playShow2"
          @click="playVideo(2)"
          src="./../../assets/img/play_icon.png"
          alt
          class="play"
        >
        <img v-show="playShow2" class="poster" src="./../../assets/img/video_cover2.png" alt>
        <video
          controls
          preload="auto"
          ref="myVideo2"
          poster="./../../assets/img/video_cover2.png"
          src="https://s.immusician.com/web/h5/video/music_base_2_2.mp4?v=1"
        ></video>
      </div>
    </div>
    <!-- <div class="add_area">
      <div class="video_box third">
        <img
          v-show="playShow3"
          @click="playVideo(3)"
          src="./../../assets/img/play_icon.png"
          alt
          class="play"
        >
        <img v-show="playShow3" class="poster" src="./../../assets/img/course_music_basis.png" alt>
        <video
          controls
          ref="myVideo3"
          poster="./../../assets/img/course_music_basis.png"
          src="https://s.immusician.com/web/h5/video/music_base_2.mp4"
        ></video>
      </div>
    </div>-->
    <div
      class="download_wrapper"
      v-show="downloadShow"
      :style="{paddingBottom:isIphonex?'10px':'0px'}"
    >
      <div class="download">
        <div class="icon_area">
          <img src="./../../assets/img/appicon.png" alt>
        </div>
        <div class="download_main">
          <div class="main_title">音乐壳</div>
          <div class="sub_title">上音乐壳，让孩子爱上音乐</div>
        </div>
        <div class="down_load_btn" id="downloadButton">点击下载</div>
        <div class="close_icon" @click="closeDownload">
          <img src="./../../assets/img/close.png" alt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      downloadShow: true,
      isIphonex: false,
      playShow1: true,
      playShow2: true,
      playShow3: true
    };
  },
  created() {
    this.isIphonex = this.$util.testIsIphonex();
  },
  mounted() {
    this.initShareInstall();
  },
  methods: {
    playVideo(index) {
      if (index == 1) {
        this.$refs.myVideo1.play();
        this.playShow1 = false;
      } else if (index == 2) {
        this.$refs.myVideo2.play();
        this.playShow2 = false;
      } else if (index == 3) {
        this.$refs.myVideo3.play();
        this.playShow3 = false;
      }
    },
    closeDownload() {
      this.downloadShow = false;
      sessionStorage.setItem("closedDownloadShow", "true");
    },
    initShareInstall() {
      var data = ShareInstall.parseUrlParams(); //shareinstall.js中提供的工具函数，解析url中的所有查询参数
      data.channel = data.channel ? data.channel : "bdtg";
      console.log(data)
      new ShareInstall(
        {
          appKey: "2KBKKFAK2E26FF",
          //可选项，微信中打开自定义遮罩层
          //shadow : function(){
          //  return "<div id='shareinstall_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
          // },
          /*可选参数，是否优先考虑下载app，以牺牲唤醒为代价*/
          //preferInstall:true,
          /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
          //preferWakeup:true,
          /*可选参数，微信中直接跳下载*/
          //weChatdownload:true,
          onready: function() {
            //shareinstall已成功回调
            console.log("shareinstall已成功回调");
            var m = this,
              button = document.getElementById("downloadButton");
            button.style.visibility = "visible";
            var button1 = document.getElementById("downloadButton1");
            //用户点击某个按钮时(假定按钮id为downloadButton)，安装app
            button.onclick = function() {
              m.install();
            };
            button1.onclick = function() {
              m.install();
            };
          }
        },
        data
      );
    }
  }
};
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
img {
  width: 100%;
}
.music_base {
  background-color: #ffe9ac;
  overflow: hidden;
}
.wrapper {
  position: relative;
  //padding-bottom: 300px;
  font-size: 0;
  margin-bottom: 52px;
  .receive {
    position: absolute;
    left: 18%;
    top: 19.2%;
    width: 128px;
    img {
      width: 100%;
    }
  }
}
.add_area {
  position: relative;
  overflow: auto;
  height: 100px;
}
.video_box {
  position: relative;
  width: 70%;
  height: 8%;
  border: 2px solid rgba(0, 0, 0, 1);
  border-radius: 14px;
  position: absolute;
  //background-color: #333;
  .play {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 52px;
    margin-top: -26px;
    margin-left: -26px;
    z-index: 9;
  }
  .poster {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 14px;
    z-index: 8;
    object-fit: cover;
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 14px;
  }
}
.video_box.first {
  top: 32.3%;
  left: 50%;
  transform: translateX(-50%);
}
.video_box.second {
  bottom: 22.7%;
  //top: 87.1%;
  left: 50%;
  transform: translateX(-50%);
}
.video_box.third {
  height: 10%;
  bottom: 5.7%;
  left: 50%;
  transform: translateX(-50%);
}
.download_wrapper {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  background-color: #fff;
}
.download {
  position: relative;
  box-sizing: border-box;
  font-size: 12px;
  background-color: #fff;
  box-shadow: 0 -8px 6px -7px rgba(222, 222, 222, 0.75);
  padding: 10px 15px 10px 75px;
  z-index: 100;
  width: 100%;

  display: flex;
  align-items: center;
  .icon_area {
    position: absolute;
    left: 8px;
    bottom: 4px;
    //width: 168px;
    img {
      width: 58px;
    }
    //box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.07);
    // margin-right: 8px;
    // border-radius: 6px;
    // line-height: 40px;
    // height: 40px;
    // img {
    //   width: 40px;
    // }
  }
  .download_main {
    line-height: 16px;
    flex: 1;
    .main_title {
      font-family: PingFangSC-Regular;

      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #646b80;
    }
    .sub_title {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      color: #9ea7b4;
    }
  }
  .down_load_btn {
    position: absolute;
    right: 30px;
    top: 50%;
    margin-top: -17px;
    border-radius: 18px;
    width: 100px;
    height: 35px;
    background: linear-gradient(to right, #f7d166, #fcad7b);
    //box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.2);
    line-height: 35px;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    color: #ffffff;
  }
  .close_icon {
    position: absolute;
    right: 0;
    top: 0;
    padding: 3px 5px;
    img {
      width: 10px;
    }
  }
}
</style>


