<template>
  <!-- 开学活动 -->
  <div id="pageWrapper">
    <div class="round"></div>
    <!-- <img src="../../../assets/img/liveMaterial/round.png" alt="" class="round"> -->
    <div class="title">《{{liveName}}》</div>
    <div class="author">{{liveAuthor}}</div>
    <div class="content" v-if="liveIndex===0">
      <div class="audio">
        <div class="audio_title">
          <img src="../../../assets/img/liveMaterial/audio_title.png" alt />
        </div>
        <div v-for="(item,index) in xAudioArr" :key="index">
          <div class="audio_item">
            <div class="audio_index">{{index+1 }}</div>
            <div class="audio_name">{{item.name}}</div>
            <div class="audio_icon" @click="playOrPause(index)">
              <img
                v-show="playingIndex!==index"
                src="../../../assets/img/liveMaterial/play.png"
                alt
              />
              <img
                v-show="playingIndex===index"
                src="../../../assets/img/liveMaterial/pause.png"
                alt
              />
            </div>
          </div>
          <audio :src="item.src"></audio>
        </div>
      </div>
    </div>
    <div class="content" v-if="liveIndex===1">
      <div class="audio">
        <div class="audio_title">
          <img src="../../../assets/img/liveMaterial/audio_title.png" alt />
        </div>
        <div v-for="(item,index) in sxAudioArr" :key="index">
          <div class="audio_item">
            <div class="audio_index">{{index+1 }}</div>
            <div class="audio_name">{{item.name}}</div>
            <div class="audio_icon" @click="playOrPause(index)">
              <img
                v-show="playingIndex!==index"
                src="../../../assets/img/liveMaterial/play.png"
                alt
              />
              <img
                v-show="playingIndex===index"
                src="../../../assets/img/liveMaterial/pause.png"
                alt
              />
            </div>
          </div>
          <audio :src="item.src"></audio>
        </div>
      </div>
      <div class="qupu">
        <div class="qupu_title">
          <img src="../../../assets/img/liveMaterial/img_title.png" alt />
        </div>
        <img src="http://cdn.kids.immusician.com/live/1%E3%80%81%E6%98%A5%E6%99%93.png" alt />
        <img src="http://cdn.kids.immusician.com/live/2.%E9%9D%99%E5%A4%9C%E6%80%9D.png" alt />
        <img src="http://cdn.kids.immusician.com/live/3.%E5%92%8F%E9%B9%85.png" alt />
      </div>
    </div>
    <div class="content" v-if="liveIndex===2">
      <div class="audio">
        <div class="audio_title">
          <img src="../../../assets/img/liveMaterial/audio_title.png" alt />
        </div>
        <div v-for="(item,index) in liveXtAudio" :key="index">
          <div class="audio_item">
            <div class="audio_index">{{index+1 }}</div>
            <div class="audio_name">{{item.name}}</div>
            <div class="audio_icon" @click="playOrPause(index)">
              <img
                v-show="playingIndex!==index"
                src="../../../assets/img/liveMaterial/play.png"
                alt
              />
              <img
                v-show="playingIndex===index"
                src="../../../assets/img/liveMaterial/pause.png"
                alt
              />
            </div>
          </div>
          <audio :src="item.src"></audio>
        </div>
      </div>
    </div>
    <div class="content" v-if="liveIndex===3">
      <div class="audio">
        <div class="audio_title">
          <img src="../../../assets/img/liveMaterial/audio_title.png" alt />
        </div>
        <div v-for="(item,index) in liveWhlAudio" :key="index">
          <div class="audio_item">
            <div class="audio_index">{{index+1 }}</div>
            <div class="audio_name">{{item.name}}</div>
            <div class="audio_icon" @click="playOrPause(index)">
              <img
                v-show="playingIndex!==index"
                src="../../../assets/img/liveMaterial/play.png"
                alt
              />
              <img
                v-show="playingIndex===index"
                src="../../../assets/img/liveMaterial/pause.png"
                alt
              />
            </div>
          </div>
          <audio :src="item.src"></audio>
        </div>
      </div>
    </div>
    <div class="content" v-if="liveIndex===4">
      <div class="audio">
        <div class="audio_title">
          <img src="../../../assets/img/liveMaterial/audio_title.png" alt />
        </div>
        <div v-for="(item,index) in liveTyAudio" :key="index">
          <div class="audio_item">
            <div class="audio_index">{{index+1 }}</div>
            <div class="audio_name">{{item.name}}</div>
            <div class="audio_icon" @click="playOrPause(index)">
              <img
                v-show="playingIndex!==index"
                src="../../../assets/img/liveMaterial/play.png"
                alt
              />
              <img
                v-show="playingIndex===index"
                src="../../../assets/img/liveMaterial/pause.png"
                alt
              />
            </div>
          </div>
          <audio :src="item.src"></audio>
        </div>
      </div>
    </div>
    <div class="content" v-if="liveIndex===5">
      <div class="audio">
        <div class="audio_title">
          <img src="../../../assets/img/liveMaterial/audio_title.png" alt />
        </div>
        <div v-for="(item,index) in liveXwAudio" :key="index">
          <div class="audio_item">
            <div class="audio_index">{{index+1 }}</div>
            <div class="audio_name">{{item.name}}</div>
            <div class="audio_icon" @click="playOrPause(index)">
              <img
                v-show="playingIndex!==index"
                src="../../../assets/img/liveMaterial/play.png"
                alt
              />
              <img
                v-show="playingIndex===index"
                src="../../../assets/img/liveMaterial/pause.png"
                alt
              />
            </div>
          </div>
          <audio :src="item.src"></audio>
        </div>
      </div>
    </div>
    <div class="content" v-if="liveIndex===6">
      <div class="audio">
        <div class="audio_title">
          <img src="../../../assets/img/liveMaterial/audio_title.png" alt />
        </div>
        <div v-for="(item,index) in livelTAudio" :key="index">
          <div class="audio_item">
            <div class="audio_index">{{index+1 }}</div>
            <div class="audio_name">{{item.name}}</div>
            <div class="audio_icon" @click="playOrPause(index)">
              <img
                v-show="playingIndex!==index"
                src="../../../assets/img/liveMaterial/play.png"
                alt
              />
              <img
                v-show="playingIndex===index"
                src="../../../assets/img/liveMaterial/pause.png"
                alt
              />
            </div>
          </div>
          <audio :src="item.src"></audio>
        </div>
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
      liveIndex: 1,
      liveName: "",
      liveAuthor: "",
      isWatch: 1,
      playingIndex: 999,
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
      sxAudioArr: ["春晓", "静夜思", "咏鹅"],
      //王红丽
      liveWhlAudio: [
        {
          name: "猜猜我有多爱你",
          src:
            "http://cdn.kids.immusician.com/live/%E7%8C%9C%E7%8C%9C%E6%88%91%E6%9C%89%E5%A4%9A%E7%88%B1%E4%BD%A0--%E7%81%B5%E6%82%89.mp3"
        }
      ],
      //小涛
      liveXtAudio: [
        {
          name: "两只老虎",
          src:
            "http://cdn.kids.immusician.com/live/%E4%B8%A4%E5%8F%AA%E8%80%81%E8%99%8E%EF%BC%88%E5%81%A5%E5%BA%B7%E6%AD%8C%EF%BC%89.mp3"
        }
      ],
      //田园
      liveTyAudio: [
        {
          name: "幽兰键-always with me",
          src:
            "http://cdn.kids.immusician.com/live/%E5%B9%BD%E8%93%9D%E9%94%AE%20-%20Always%20with%20Me%20%28%E9%92%A2%E7%90%B4%E6%9B%B2%29.mp3"
        },
        {
          name: "久石让-Sumer(菊次郎的夏天)",
          src:
            "http://cdn.kids.immusician.com/live/%E4%B9%85%E7%9F%B3%E8%AE%A9%20-%20Summer%28%E8%8F%8A%E6%AC%A1%E9%83%8E%E7%9A%84%E5%A4%8F%E5%A4%A9%29%20%28PIANO%20VER.%29.mp3"
        },
        {
          name: "李云迪-彩云追月",
          src:
            "http://cdn.kids.immusician.com/live/%E6%9D%8E%E4%BA%91%E8%BF%AA%20-%20%E5%BD%A9%E4%BA%91%E8%BF%BD%E6%9C%88.mp3"
        }
      ],
      //欣慰
      liveXwAudio: [
        {
          name: "鸿雁 ZSwans",
          src:
            "http://cdn.kids.immusician.com/live/1.mp3"
        },
        {
          name: "London BLKOWridge",
          src:
            "http://cdn.kids.immusician.com/live/2.mp3"
        },
        {
          name: "敖包相会",
          src:
            "http://cdn.kids.immusician.com/live/3.mp3"
        },
        {
          name: "晚安晚安Goodnight Song ",
          src:
            "http://cdn.kids.immusician.com/live/4.mp3"
        },
        {
          name: "暖暖 (新编儿歌版)",
          src:
            "http://cdn.kids.immusician.com/live/5.mp3"
        },
        {
          name: "Animaal Crackers",
          src:
            "http://cdn.kids.immusician.com/live/6.mp3"
        },
        {
          name: "TwwcFsinkle, Twinkle, Little Star",
          src:
            "http://cdn.kids.immusician.com/live/7.mp3"
        },
      ],
      //李添
      livelTAudio: [
        {
          name: "Bingo",
          src:
            "http://cdn.kids.immusician.com/live/lt1.mp3"
        },
        {
          name: "who took the cookie?",
          src:
            "http://cdn.kids.immusician.com/live/lt2.mp3"
        },
        {
          name: "who took the cookie?(sing-along)",
          src:
            "http://cdn.kids.immusician.com/live/lt3.mp3"
        }
      ],
    };
  },
  created() {
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
    this.liveIndex = Number(localStorage.getItem("liveIndex"));
    this.liveName = localStorage.getItem("name");
    this.liveAuthor = localStorage.getItem("author");
    console.log(localStorage.getItem("isWatch"));
    if (localStorage.getItem("isWatch") != 1) {
      console.log("执行跳转");
      var ruri = encodeURIComponent(
        "http://cdn.kids-web.immusician.com/yinji/liveMaterial.html"
      );
      //正式
      var appId = "wxebd76dff6ca15a2a";
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${ruri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
    }
    window.addEventListener("popstate", function() {
      var ruri = encodeURIComponent(
        "http://cdn.kids-web.immusician.com/yinji/liveMaterial.html"
      );
      //正式
      var appId = "wxebd76dff6ca15a2a";
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${ruri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
    });
  },
  mounted() {
    console.log("进入页面");
    this.audioMethods();
  },
  methods: {
    audioMethods() {
      let audios = document.querySelectorAll("audio");
      let that = this;
      audios.forEach(e => {
        e.addEventListener("ended", function() {
          that.playingIndex = 999;
        });
      });
    },
    playOrPause(index) {
      console.log(index);
      let audios = document.querySelectorAll("audio");

      if (this.playingIndex === index) {
        ///点击了已经在播放状态的曲目
        audios[index].pause();
        this.playingIndex = 999;
      } else {
        ///点击了其他曲目
        if (audios[this.playingIndex]) {
          audios[this.playingIndex].pause();
        }
        audios[index].play();
        this.playingIndex = index;
      }
    },
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
    }
  }
};
</script>
<style lang="less" scoped>
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
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #ff9d18;
  padding: 16px;
  .round {
    position: absolute;
    top: -160px;
    right: -160px;
    width: 320px;
    height: 320px;
    background-color: #ff9211;
    border-radius: 50%;
    z-index: 1;
  }
  .title {
    position: relative;
    z-index: 2;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #ffffff;
    text-align: center;
    margin-top: 60px;
  }
  .author {
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .content {
    padding: 16px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    .audio {
      .audio_title {
        margin: 10px 0 15px 0;
        text-align: center;
        img {
          width: 83px;
        }
      }
      .audio_item {
        display: flex;
        align-items: center;
        .audio_index {
          margin-right: 16px;
          background-color: #eee;
          text-align: center;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .audio_name {
          flex-grow: 1;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .audio_icon {
          width: 40px;
          height: 40px;
          margin-top: 3px;
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
    .qupu {
      .qupu_title {
        margin: 30px 0 15px 0;
        text-align: center;
        img {
          width: 83px;
        }
      }
      text-align: center;
      img {
        width: 100%;
      }
    }
  }
}
</style>

