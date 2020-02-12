<template>
  <!-- 开学活动 -->
  <div id="pageWrapper">
    <img src="../../assets/img/liveVideo/bg.png" alt class="bg" />
    <div class="list">
      <div @click="goDetail" v-for="(item,index) in liveList" :key="index" class="item">
        <img class="text_img" :src="item.imgSrc" alt />
        <img v-show="item.videoUrl" src="../../assets/img/liveVideo/play.png" alt class="play" />
        <div v-show="!item.videoUrl" class="num">{{index+1}}</div>
      </div>
    </div>
    <!-- <video src="https://www.w3school.com.cn/i/movie.ogg"></video> -->
  </div>
</template>
<script>
import { getQueryVariable, testWeixin } from "../../common/util.js";

export default {
  data() {
    return {
      isWatch: 0,
      liveList: [
        {
          imgSrc: "",
          videoUrl: "123"
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
    this.getCode();
    this.liveList.forEach((e, index) => {
      console.log(
        require("../../assets/img/liveVideo/" + (index + 1) + ".png")
      );
      e.imgSrc = require("../../assets/img/liveVideo/" + (index + 1) + ".png");
    });
  },
  mounted() {
    this.wxCode = getQueryVariable("code");
    this.getList()
  },
  methods: {
      goDetail(url){

      },
    getCode() {
      var ruri = encodeURIComponent(
        "http%3A%2F%2Fcdn.kids-web.immusician.com/liveVideo.html"
      );
      if (!getQueryVariable("code")) {
        location.replace(
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx79d1426d8dc6654a&redirect_uri=${ruri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        );
      }
    },
    getList() {
      console.log(location.href);
      if (this.wxCode) {
        this.axios
          .post('http://api.yinji.immusician.com/v1/wechat/live_list', {
            code: this.wxCode
          })
          .then(res => {});
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
    }
  }
}
</style>

