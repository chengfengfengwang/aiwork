<template>
  <!-- 开学活动 -->
  <div id="pageWrapper">
    <div v-show="isWatch==1">
      <h3 class="live_name">《亲子国际体态律动游戏》——谢呈</h3>
      <h4 class="live_item_name" style="text-align:'center'">歌单</h4>
      <div v-for="(item,index) in xAudioArr" :key="index">
        <div class="audio_name">{{index+1 }}. {{item.name}}</div>
        <audio controls :src="item.src"></audio>
      </div>

      <h3 class="live_name">《奥尔夫打击乐趣味表演课》——李姗姗</h3>
      <h4 class="live_item_name" style="text-align:'center'">歌单</h4>
      <div v-for="(item,index) in sxAudioArr" :key="item.name">
        <div class="audio_name">{{index+1 }}. {{item.name}}</div>
        <audio controls :src="item.src"></audio>
      </div>
      <h4 class="live_item_name" style="text-align:'center'">曲谱</h4>
      <div class="qupu">
        <img src="http://cdn.kids.immusician.com/live/1%E3%80%81%E6%98%A5%E6%99%93.png" alt />
        <img src="http://cdn.kids.immusician.com/live/2.%E9%9D%99%E5%A4%9C%E6%80%9D.png" alt />
        <img src="http://cdn.kids.immusician.com/live/3.%E5%92%8F%E9%B9%85.png" alt />
      </div>
    </div>
     <div v-show="isWatch==0">
      <div class="no_watch">
        <img src="../../../assets/img/liveVideo/no_watch.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable, testWeixin } from "../../../common/util.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      isWatch: 1,
      xAudioArr: [
        "Alviverde",
        "千尋のワルツ (千寻的华尔兹)",
        "Oya (Primitive Fire)",
        "Drop It Low",
        "MV Mambo No.5",
        "Red's Boogie",
        "Aloha Heja He",
        "energy flow",
        "MV I Will Survive",
        "火红的萨日朗"
      ],
      sxAudioArr: ["春晓", "静夜思", "咏鹅"]
    };
  },
  created() {
    //this.getCode(); 
    //this.getList();
    this.xAudioArr = this.xAudioArr.map((e, index) => {
      return {
        name: e,
        src:
          "http://cdn.kids.immusician.com/live/" +
          (index + 1) +
          "." +
          e +
          ".mp3"
      };
    });
    this.sxAudioArr = this.sxAudioArr.map((e, index) => {
      return {
        name: e,
        src:
          "http://cdn.kids.immusician.com/live/" +
          (index + 1) +
          "." +
          e +
          ".mp3"
      };
    });
    console.log("---z");
    console.log(this.sxAudioArr);
  },
  mounted() {
    console.log("进入页面");
  },
  methods: {
    getCode() {
      var ruri = encodeURIComponent(
        "http://cdn.kids-web.immusician.com/yinji/liveMaterial.html"
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
        this.axios
          .post("http://api.yinji.immusician.com/v1/wechat/live_list", {
            code: this.wxCode
          })
          .then(res => {
            this.isWatch = res.isWatch;
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
  font-size: 16px;
  //   background: url("../../assets/img/liveVideo/bg.png");
  //   background-size: cover;
  //   background-position: 0 0;
  .bg {
    width: 100%;
  }
}
.live_name {
  text-align: center;
  margin: 20px 0;
}
.audio_name {
  margin: 10px 10px;
}
.live_item_name {
  text-align: center;
  margin: 10px 10px;
}
.qupu {
  text-align: center;
  img {
    width: 80%;
  }
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

