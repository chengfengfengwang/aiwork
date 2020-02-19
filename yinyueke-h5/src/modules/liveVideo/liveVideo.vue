<template>
  <!-- 开学活动 -->
  <div id="pageWrapper">
    <div v-show="isWatch==1">
      <img src="../../assets/img/liveVideo/bg1.png" alt class="bg" />
      <div class="list">
        <div
          @click="goDetail(item.videoUrl)"
          v-for="(item,index) in liveList"
          :key="index"
          class="item"
          :class="{canplay:item.videoUrl}"
        >
          <div v-if="item.videoUrl" class="line"></div>
          <img class="text_img" :src="item.imgSrc" alt />
          <img v-show="item.videoUrl" src="../../assets/img/liveVideo/play.png" alt class="play" />
          <div v-show="!item.videoUrl" class="num">{{index+1}}</div>
        </div>
      </div>
    </div>
    <div v-show="isWatch==0">
      <div class="no_watch">
        <img src="../../assets/img/liveVideo/no_watch.png" alt />
      </div>
    </div>
    <!-- <video src="https://www.w3school.com.cn/i/movie.ogg"></video> -->
  </div>
</template>
<script>
import { getQueryVariable, testWeixin } from "../../common/util.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      isWatch: 1,
      liveList: [
        {
          imgSrc: "",
          videoUrl: ""
        },
        {
          imgSrc: "",
          videoUrl: ""
        },
        {
          videoUrl: ""
        },
        {
          videoUrl: ""
        },
        {
          videoUrl: ""
        },
        {
          videoUrl: ""
        },
        {
          videoUrl: ""
        },
        {
          videoUrl: ""
        },
        {
          videoUrl: ""
        }
      ]
    };
  },
  created() {
    if (process.env.NODE_ENV !== "development") {
      this.getCode();
      this.getList();
    }
    this.liveList.forEach((e, index) => {
      e.imgSrc = require("../../assets/img/liveVideo/" + (index + 1) + ".png");
    });
  },
  mounted() {
    console.log("进入页面");
  },
  methods: {
    updateStyle() {
      var canplayList = document.querySelectorAll(".item .line");
      canplayList[canplayList.length - 1].style.display = "none";
    },
    goDetail(url) {
      if (url) {
        location.href = url;
      } else {
        Toast({
          message: "直播还未开始或暂无视频回放",
          duration: 1000
        });
      }
    },
    getCode() {
      var ruri = encodeURIComponent(
        "http://cdn.kids-web.immusician.com/yinji/liveVideo.html"
      );
      //正式
      var appId = "wxebd76dff6ca15a2a";
      //测试
      //var appId = "wx79d1426d8dc6654a";

      if (!getQueryVariable("code")) {
        location.replace(
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${ruri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        );
      }
    },
    getList() {
      this.wxCode = getQueryVariable("code");
      console.log(this.wxCode);
      if (this.wxCode) {
        console.log("请求接口");
         history.pushState(null, null, document.URL);
        window.addEventListener("popstate", function() {
          history.pushState(null, null, document.URL);
        });
        this.axios
          .post("http://api.yinji.immusician.com/v1/wechat/live_list", {
            code: this.wxCode
          })
          .then(res => {
            res.liveList.forEach((e, index) => {
              this.liveList[index].videoUrl = e.videoUrl;
            });
            console.log(res);
            this.isWatch = res.isWatch;
            this.$nextTick(() => {
              this.updateStyle();
            });
          });
      }
    }
  }
};
</script>
<style lang="less">
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
  //   @media screen and (min-width: 480px) {
  //     .font-size(13);
  //   }
}
#pageWrapper {
  min-height: 100vh;
  position: relative;
  font-size: 0;
  //   background: url("../../assets/img/liveVideo/bg.png");
  //   background-size: cover;
  //   background-position: 0 0;
  .bg {
    width: 100%;
  }
}

.list {
  position: absolute;
  left: 55%;
  transform: translateX(-50%);
  top: 25%;
  width: 80%;
  .item {
    position: relative;
    img.play {
      position: absolute;
      width: 16%;
      left: -13%;
      top: 46%;
      transform: translateY(-50%);
      z-index: 3;
    }
    img.text_img {
      width: 100%;
    }
    .num {
      position: absolute;
      width: 13%;
      left: -10%;
      top: 46%;
      transform: translateY(-50%);
      text-align: center;
      color: #fff;
      background: #ffc633;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }
  }
  .item .line {
    content: "";
    width: 1px;
    background-color: #fff;
    opacity: 0.3;
    height: 80%;
    position: absolute;
    left: -5%;
    top: 60%;
    z-index: 2;
    //transform: translateX(-50%);
  }
  // .item.canplay:last-of-type{
  //   background-color: #000;
  // }
}
.no_watch {
  position: absolute;
  left: 0;
  top: 0;
  img {
    width: 100%;
  }
}
</style>

