<template>
  <div class="page">
    <Loading v-show="loadingShow"/>
    <div @click="closePage" class="close">
      <img src="../../../assets/img/teachingPlan/close.png" alt>
    </div>
    <div @click="toggleScreen" class="fullscreen">
      <img src="../../../assets/img/teachingPlan/fullscreen.png" alt>
    </div>
    <div class="title">{{title}}</div>
    <div id="result" ref="result" class="result" v-html="content">
      <!-- <div>1.通过打招呼游戏熟悉所有小朋友</div>
      <ul>
        <li>
          线下游戏：打招呼。老师解释如何按照节奏跟
          <br>
        </li>
        <li>线下游戏：打招呼。老师解释如何按照节奏跟</li>
      </ul>
      <p>
        <img
          @click="open"
          src="http://image.yinji.immusician.com/material/6b8280fc47a879107c7d9e79b8682f75.jpeg"
          style="max-width:30%;"
        >
        <br>
      </p>
      <p>2.通过打招呼游戏熟悉所有小朋友2</p>
      <p>
        <video controls>
          <source
            src="http://cdn.kids.immusician.com/media/index_music_base.6080e676.mp4"
            type="audio/mp4"
          >
        </video>
      </p>
      <p>
        <br>
      </p>-->
    </div>
    <div @click="imgMaskShow=false" v-show="imgMaskShow" class="mask">
      <img class="big_img" :src="tempImgSrc" alt>
    </div>
    <!-- <button style="margin-right:20px" @click="open">全屏</button>
    <button @click="close">关闭</button> -->
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
import Loading from "../../../components/Loading";

export default {
  data() {
    return {
      loadingShow: false,
      tempImgSrc: "",
      imgMaskShow: false,
      title: "",
      content: "",
      isFullscreen: false
    };
  },
  created() {},
  components: {
    Loading
  },
  mounted() {
    // var video = document.querySelector("video");
    // video.onfullscreenchange = function() {
    //   console.log("onfullscreenchange");
    // };
    // Document.onfullscreenchange = function() {
    //   console.log("xxx");
    // };
    this.getTeachingPlan();
    this.initImgMethods();
  },
  methods: {
    closePage(){
      window.location.href = "uniwebview://close";
    },
    toggleScreen() {
      this.isFullscreen = !this.isFullscreen;
      
      if (this.isFullscreen) {
        console.log('关闭全屏')
        window.location.href = "uniwebview://screen?full_screen=0";
      } else {
        console.log('打开全屏')
        window.location.href = "uniwebview://screen?full_screen=1";
      }
    },
    initImgMethods() {
      var that = this;
      var result = document.getElementById('result');
      result.addEventListener("click", e => {
        var target = e.target;
        if (target.tagName === "IMG") {
          that.tempImgSrc = target.src;
          that.imgMaskShow = true;
        }
      });
    },
    getTeachingPlan() {
      this.loadingShow = true;
      this.axios
        .get(
          `http://api.yinji.immusician.com/v1/materials/pre_guides/${getQueryVariable(
            "id"
          )}`
        )
        .then(res => {
          //this.courseList = res.data;
          this.loadingShow = false;
          this.title = res.data.title;
          this.content = res.data.data;
          //this.$refs.result.innerHTML = res.data.data;
          //this.$refs.result.innerHtml = `<p>hello</p>`
        });
    }
  }
};
</script>
<style lang="less">
@import url("./../../../common/common.less");
.font-size(@sizeValue:16) {
  @vw: 16 / 375 * 100;
  @result: @sizeValue / 16 * @vw;
  font-size: ~"@{result}vw";
}
html {
  .font-size(39);
}
html {
  // @media screen and (max-width: 320px) {
  //   .font-size(29);
  // }
  // @media screen and (min-width: 480px) {
  //   .font-size(29);
  // }
}
html,
body {
  width: 100%;
  height: 100%;
}
.title {
  text-align: center;
  margin: 5px auto;
  width: 60px;
  height: 14px;
  line-height: 14px;
  background: rgba(255, 189, 40, 1);
  border-radius: 7px;
  font-size: 8px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.result {
  padding: 0 10px;
  video {
    width: 64% !important;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
    border-radius: 6px;
  }
  img {
    width: 80px !important;
    max-width: 80px !important;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
    border-radius: 6px;
  }
  p,
  div {
    margin-top: 8px;
    font-size: 7px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(144, 82, 82, 1);
  }
  ul > li {
    margin: 2px 0;
    font-size: 6px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(167, 108, 108, 1);
  }
  li {
    position: relative;
    list-style: disc inside;
  }
  // li::after {
  //   content: "";
  //   position: absolute;
  //   left: -5px;
  //   top: 7px;
  //   width: 3px;
  //   height: 3px;
  //   background: rgba(167, 108, 108, 1);
  //   border-radius: 50%;
  // }
}
.big_img {
  max-width: 90%;
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
}
.close{
  position: fixed;
  left: 6px;
  top: 3px;
  width: 14px;
  img {
    width: 100%;
  }
}
.fullscreen {
  position: fixed;
  right: 10px;
  top: 0;
  width: 9px;
  img {
    width: 100%;
  }
}
</style>

