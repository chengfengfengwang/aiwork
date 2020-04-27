<template>
  <div id="main" :class="[isWatchWechat?'watched':'nowatch']">
    <!-- {{book}} -->
    <div class="play_section">
      <img :src="bookCover" alt class="bg">
      <div class="book">
        <div class="book_cover">
          <img :src="bookCover" alt>
          <img
            @click="togglePlay"
            v-show="!isPlaying"
            src="../../../assets/img/book417/play.png"
            alt
            class="play_icon"
          >
          <img
            @click="togglePlay"
            v-show="isPlaying"
            src="../../../assets/img/book417/pause.jpg"
            alt
            class="play_icon"
          >
        </div>
        <div class="book_name">《{{book.title}}》</div>
      </div>
      <div
        @click="showModal();countPage('页面内扫码按钮')"
        v-show="!isWatchWechat"
        class="scan_btn"
      >点击扫码，听完整版</div>
    </div>
    <div class="content_section" :class="[isShowAll?'':'hideshow']">
      <img class="cover" :src="bookCover" alt>
      <div class="cover_item_wrapper" v-show="book.coverItem">
        <div class="cover_item" v-for="(item,index) in book.coverItem" :key="index">{{item}}</div>
      </div>
      <div class="content">
        <div class="content_all">{{book.content}}</div>
      </div>
    </div>
    <div v-show="!isShowAll" @click="isShowAll = true" class="showall_section">
      <div class="gradient"></div>
      <div class="showall_btn">
        <img src="../../../assets/img/book417/showall.jpg" alt>
      </div>
    </div>
    <div class="catalog_section">
      <div class="catalog_header">
        <div class="left">
          <img :src="bookCover" alt>
        </div>
        <div class="middle">
          <div class="middle_title">《{{book.title}}》</div>
          <div class="middle_info">
            <span class="sub">{{clickTotal}}订阅</span>
            <span class="all_num">{{bookDir.length-1}}集</span>
          </div>
        </div>
        <div @click="showModal();countPage('页面内收听按钮')" v-show="!isWatchWechat" class="right">
          <div class="icon">
            <img src="../../../assets/img/book417/headset.png" alt>
          </div>
          <div>收听</div>
        </div>
      </div>
      <div class="catalog_item_wrapper">
        <div
          @click="goBook(index)"
          v-for="(item,index) in bookDir"
          :key="index"
          class="catalog_item"
        >
          <div class="play_icon">
            <img src="../../../assets/img/book417/itemplay.png" alt>
          </div>
          <div class="name">0{{index+1}}.{{item.title}}</div>
          <div @click.stop="showModal" v-show="!isWatchWechat" class="more_icon">
            <img src="../../../assets/img/book417/more.png" alt>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!isWatchWechat" class="watch_section">
      <div class="left_before">
        <img src="../../../assets/img/book417/logo.png" alt>
      </div>
      <div class="left">
        <div class="left_top">
          <img src="../../../assets/img/book417/logo_text.png" alt>
        </div>
        <div class="left_bottom">扫码关注，免费收听</div>
      </div>
      <div @click="showModal();countPage('页面内关注按钮')" class="right">关注</div>
    </div>
    <van-popup v-model="modalShow">
      <div class="pop_contnet">
        <img
          @click="closeModal"
          src="../../../assets/img/book417/close_icon.png"
          alt
          class="close_icon"
        >
        <div class="tl1">已更新至{{bookDir.length-1}}期</div>
        <div class="qr_wrapper">
          <img :src="qrSrc" alt class="qr">
        </div>
        <div class="tl2">好专辑不要错过哦</div>
        <div class="tl3">长按扫码关注公众号收听</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { getQueryVariable, testWeixin } from "../../../common/util.js";
import { Popup } from "vant";
import bookDir from "../bookDir.js";
export default {
  data() {
    return {
      bookDir: bookDir,
      bookIndex: getQueryVariable("index"),
      book: "",
      bookCover: "",
      qrSrc: "",
      bookAudio: "",
      modalShow: false,
      isWatchWechat: false,
      isPlaying: false,
      isShowAll: false,
      clickTotal: ""
    };
  },
  components: {
    "van-popup": Popup
  },
  created() {
    this.initBookInfo();
    this.stopGoBack();
    if (sessionStorage.getItem("openid")) {
      this.openid = sessionStorage.getItem("openid");
    }
    if (sessionStorage.getItem("isWatchWechat") === "true") {
      this.isWatchWechat = true;
    }
    this.getCode();
    this.getClickData();
  },
  mounted() {},
  methods: {
    getClickData() {
      let oUrl = `http://cdn.kids-web.immusician.com/yinji/book417.html?index=${
        this.bookIndex
      }`;

      this.axios
        .get(
          `http://api.yinji.immusician.com/v1/operate/show_page_visit?url=${encodeURIComponent(
            oUrl
          )}`
        )
        .then(res => {
          this.clickTotal = res.data.total;
        });
    },
    stopGoBack() {
      // history.pushState(null, null, document.URL);
      //   window.addEventListener("popstate", function() {
      //     history.pushState(null, null, document.URL);
      //   });
      window.history.pushState("", "", location.href);
      window.addEventListener("popstate", function() {
        history.go(-2);
      });
    },
    initBookInfo() {
      this.book = bookDir[this.bookIndex];
      this.bookCover = require(`../../../assets/img/book417/${
        this.bookIndex
      }.png`);
      this.qrSrc = require(`../../../assets/img/book417/qr/${
        this.bookIndex
      }.png`);
    },
    getWechatInfo() {
      if (this.openid && this.isWatchWechat) {
        this.initAudio();
        return;
      }
      this.axios
        .get(
          `http://api.yinji.immusician.com/v1/wechat/is_watch/?code=${
            this.wxCode
          }`
        )
        .then(res => {
          this.isWatchWechat = Boolean(res.isWatch);
          this.openid = res.open_id;
          this.initAudio();
          sessionStorage.setItem("isWatchWechat", this.isWatchWechat);
          sessionStorage.setItem("openid", this.openid);
          this.countPage("页面访问");
        });
    },
    countPage(key) {
      //http://api.yinji.immusician.com/v1/wechat/live_list
      let postUrl = `${location.origin}${
        location.pathname
      }?index=${getQueryVariable("index")}`;
      this.axios
        .post(
          "http://api.yinji.immusician.com/v1/operate/collect_page_visit/",
          {
            url: postUrl,
            key,
            uid: this.openid
          }
        )
        .then(res => {});
    },
    getCode() {
      var ruri = encodeURIComponent(
        `http://cdn.kids-web.immusician.com/yinji/book417.html?index=${getQueryVariable(
          "index"
        )}`
      );
      //正式
      var appId = "wxebd76dff6ca15a2a";
      //测试
      //var appId = "wx79d1426d8dc6654a";

      if (!getQueryVariable("code") && testWeixin()) {
        location.replace(
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${ruri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        );
      } else {
        sessionStorage.setItem("wxcode", getQueryVariable("code"));
        this.wxCode = getQueryVariable("code");
        this.getWechatInfo();
      }
      let sessionCode = sessionStorage.getItem("wxcode");
      //后退到了没有code的链接
      if (sessionCode && !getQueryVariable("code")) {
        this.wxCode = sessionCode;
      }
    },
    goBook(index) {
      //location.href = `book417.html?index=${index}`;
      var ruri = encodeURIComponent(
        `http://cdn.kids-web.immusician.com/yinji/book417.html?index=${index}`
      );
      location.replace(
        `http://api.yinji.immusician.com/v1/operate/redirect_code_url?url=${ruri}`
      );
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },
    initAudio() {
      let bookName;
      if (this.book.title === "儿童古典音乐绘本") {
        bookName = "四季";
      } else {
        bookName = this.book.title;
      }

      let audioSrc = "";
      if (this.isWatchWechat) {
        audioSrc = `http://7xloms.com5.z0.glb.clouddn.com/${encodeURIComponent(
          bookName
        )}.mp3`;
      } else {
        audioSrc = `http://7xloms.com5.z0.glb.clouddn.com/${encodeURIComponent(
          bookName + " 试听"
        )}.mp3`;
      }
      this.audio = new Audio();
      this.audio.src = audioSrc;
      this.audio.addEventListener(
        "timeupdate",
        ()=> {
          //监听音频播放的实时时间事件
          let timeDisplay;
          //用秒数来显示当前播放进度
          timeDisplay = Math.floor(this.audio.currentTime); //获取实时时间
          if(timeDisplay==30 && !this.isWatchWechat){
            this.modalShow = true
          }
        },
        false
      );
    },
    showModal() {
      if (!this.isWatchWechat) {
        this.modalShow = true;
      }
    },
    closeModal() {
      this.modalShow = false;
    }
  }
};
</script>
<style lang="less">
#main {
  position: relative;
  font-size: 16px;
}
#main.nowatch {
  padding-bottom: 50px;
}
.play_section {
  position: relative;
  overflow: hidden;
  text-align: center;
  img.bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    filter: blur(15px);
    z-index: -1;
  }
  .book {
    margin-top: 30px;
    margin-bottom: 28px;
    .book_cover {
      position: relative;
      margin: 0 auto 15px auto;
      width: 115px;
      height: 115px;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.5);
      border-radius: 11px;
      overflow: hidden;
      img {
        width: 100%;
      }
      .play_icon {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 25%;
        width: 48px;
      }
    }
    .book_name {
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .scan_btn {
    display: inline-block;
    width: 243px;
    height: 44px;
    margin-bottom: 28px;
    line-height: 44px;
    background: rgba(255, 183, 17, 1);
    border-radius: 22px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
}
.content_section {
  position: relative;
  padding: 15px 15px 0 18px;
  img.cover {
    width: 100%;
  }
  .cover_item_wrapper {
    margin: 30px 0;
    .cover_item {
      padding-left: 6px;
      position: relative;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .cover_item:before {
      content: "";
      position: absolute;
      left: -2px;
      top: 7px;
      //transform: translateY(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      overflow: hidden;
      background: rgba(255, 193, 24, 1);
    }
  }
  .content {
    margin: 30px 0;
    .content_all {
      text-indent: 2em;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
.content_section.hideshow {
  overflow: hidden;
  height: 509px;
}
.showall_section {
  // position: absolute;
  // left: 0;
  // bottom: 0;
  position: relative;
  width: 100%;
  height: 60px;
  .gradient {
    position: absolute;
    top: -79px;
    left: 0;
    height: 80px;
    width: 100%;
    background-image: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0),
      #fff
    );
    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0), #fff);
  }
  .showall_btn {
    text-align: center;
    img {
      width: 20px;
    }
  }
}
.catalog_section {
  .catalog_header {
    padding: 11px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    .left {
      margin-right: 5px;
      width: 45px;
      height: 45px;
      background: rgba(216, 216, 216, 1);
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .middle {
      .middle_title {
        margin-bottom: 3px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .middle_info {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        .sub {
          padding-left: 6px;
        }
        .all_num {
          padding-right: 16px;
          float: right;
        }
      }
    }
    .right {
      flex-grow: 1;
      text-align: right;
      img {
        width: 20px;
        margin-bottom: 2px;
      }
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 183, 17, 1);
    }
  }
  .catalog_item_wrapper {
    margin-bottom: 35px;
    .catalog_item {
      display: flex;
      align-items: center;
      padding: 16px 14px 9px 0px;
      margin-left: 12px;
      border-bottom: 1px solid #eeeeee;
      .play_icon {
        margin-right: 14px;
        width: 22px;
        height: 22px;
        img {
          width: 100%;
        }
      }
      .name {
        flex-grow: 1;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .more_icon {
        img {
          width: 16px;
        }
      }
    }
  }
}
.watch_section {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -2px 9px 0px rgba(58, 58, 58, 0.2);
  padding: 12px 15px;
  .left_before {
    margin-right: 8px;
    width: 33px;
    height: 33px;
    img {
      width: 100%;
    }
  }
  .left {
    flex-grow: 1;
    .left_top {
      font-size: 0;
      margin-bottom: 2px;
      img {
        width: 43px;
      }
    }
    .left_bottom {
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
  .right {
    width: 65px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(255, 183, 17, 1);
    border-radius: 15px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
.pop_contnet {
  width: 290px;
  padding: 40px 0;
  background: rgba(255, 255, 255, 1);
  border-radius: 15px;
  text-align: center;
  .close_icon {
    position: absolute;
    right: 0;
    top: 0;
    padding: 16px;
    width: 48px;
  }
  .tl1 {
    position: relative;
    margin-bottom: 13px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .tl1::before {
    content: " ";
    position: absolute;
    width: 3px;
    height: 3px;
    background: rgba(102, 102, 102, 1);
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    left: 95px;
  }
  .tl1::after {
    content: " ";
    position: absolute;
    width: 3px;
    height: 3px;
    background: rgba(102, 102, 102, 1);
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    right: 95px;
  }
  .qr_wrapper {
    width: 146px;
    height: 146px;
    margin: 10px auto;
    img {
      width: 100%;
    }
  }
  .tl2 {
    margin-bottom: 3px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #333333;
  }
  .tl3 {
    font-family: PingFangSC-Regular, PingFang SC;
    color: #ff9500;
    font-size: 15px;
  }
}
.van-popup {
  border-radius: 15px;
}
</style>
