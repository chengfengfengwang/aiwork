<template>
  <div id="main">
    <Loading v-show="loadingShow"/>
    <div v-show="!swiperShow" class="poster_container noswiper">
      <div id="posterContainer">
        <img v-if="resultBase64Show" class="poster" :src="resultBase64" alt>
        <div v-else>
          <div class="nick_name">宝贝 {{nickName}}</div>
          <img :src="qrSrc" alt class="qr">
          <img v-show="posterSrc" class="poster" :src="posterSrc" alt>
          <img
            v-show="!posterSrc"
            class="poster"
            src="../../../assets/img/promote/ou_poster/poster1.png"
            alt
          >
        </div>
      </div>
    </div>
    <div v-show="swiperShow" class="poster_container swiper">
      <div class="remark_container wrapper">
        <div id="remarkSwiper" class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in remarkArr" :key="index">
              <div class="nick_name">宝贝 {{nickName}}</div>
              <img :src="qrSrc" alt class="qr">
              <img @click="previewRemark(index)" :src="item" alt>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="btn_wrapper">
      <div class="share_btn" @click="shareToFriends" v-show="true">分享海报给好友</div>
    </div>
  </div>
</template>
<script>
// var eruda = require("eruda");
// eruda.init();
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { ImagePreview } from "vant";
import { openInApp, getQueryVariable, platForm } from "../../../common/util.js";
import html2canvas from "html2canvas";
import Loading from "./../../../components/Loading";
const QRCode = require("qrcode");
export default {
  data() {
    return {
      remarkArr: [],
      loadingShow: true,
      openInApp,
      maskShow: false,
      rewardData: {
        total: 0,
        amount: 0,
        reg_count: 0,
        number: 0
      },
      posterSrc: "",
      qrSrc: "",
      nickName: getQueryVariable("nick_name"),
      resultBase64:'',
      resultBase64Show: false,
      swiperShow: false,
    };
  },
  created() {
    if (this.swiperShow) {
      for (var i = 4; i < 10; i++) {
        var str = require(`../../../assets/img/promote/ou_poster/poster1.png`);
        this.remarkArr.push(str);
      }
      this.$nextTick(() => {
        this.initRemarkSwiper();
      });
    }

    this.nickName = decodeURIComponent(this.nickName);
    this.getQrUrl();
  },
  components: {
    Loading,
    ImagePreview
  },

  mounted() {
    //this.readyAll();
  },
  methods: {
    previewRemark(index) {
      ImagePreview({
        images: this.remarkArr,
        startPosition: index
      });
    },
    initRemarkSwiper() {
      this.mySwiper = new Swiper("#remarkSwiper", {
        direction: "horizontal",
        initialSlide: 1,
        //loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 0
        // slidesOffsetBefore : -30,
        // slidesOffsetAfter : -30,
        //watchOverflow:true
      });
    },
    getQrUrl() {
      this.axios
        .post(`http://api.yinji.immusician.com/v1/share/qrcode_url/`, {
          share_stall: 0,
          phone: getQueryVariable("user_phone"),
          share_id: getQueryVariable("share_id"),
        })
        .then(res => {
          this.qrUrl = res.data.url;
          this.readyAll();
        });
    },
    readyAll() {
      let pArr = [];
      pArr.push(this.createQr());
      pArr.push(this.posterTo64());
      Promise.all(pArr).then(res => {
        console.log("--");
        setTimeout(() => {
          this.getResult64();
        }, 350);
      });
    },
    createQr() {
      return new Promise((resolve, reject) => {
        QRCode.toDataURL(this.qrUrl, {
          margin: 2
        }).then(res => {
          console.log("qr ready");
          this.qrSrc = res;
          resolve();
        });
      });
    },
    posterTo64() {
      return new Promise((resolve, reject) => {
        let url = require(`../../../assets/img/promote/ou_poster/poster1.png`);
        // if(this.isFree===0){
        //   url = require("../../../assets/img/yiqiac/poster2.png")
        // }else{
        //   url = require("../../../assets/img/yiqiac/poster1.png")
        // }
        this.imgToBase64(url).then(res => {
          console.log("poster64 ready");
          this.posterSrc = res;
          this.loadingShow = false;
          resolve();
        });
      });
    },
    imgToBase64(url) {
      var url = url + "?" + new Date().valueOf();
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "Anonymous");
        img.src = url;
        img.onload = function() {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var base64 = canvas.toDataURL("image/png");
          //console.log(base64);
          resolve(base64);
          //document.querySelector('#test').src = base64
        };
      });
    },
    createResultImg() {
      this.imgToBase64(this.userInfo.avatar).then(res => {
        this.avatarBase64 = res;
        document.querySelector(".page.p6").classList.add("visi");
        html2canvas(document.querySelector(".result_wrapper"), {
          backgroundColor: "transparent"
          //allowTaint: true
        }).then(canvas => {
          document.querySelector(".page.p6").classList.remove("visi");
          //return
          //把画好的canvas转成base64
          document.querySelector(".result_wrapper").innerHTML = "";
          var img = new Image();
          img.classList.add("resultImg");
          img.src = canvas.toDataURL("image/png");
          img.onload = function() {
            document.querySelector(".page.p6 .result_wrapper").appendChild(img);
          };
        });
      });
    },
    getResult64() {
      this.loadingShow = false;
      console.log(document.querySelector("#posterContainer"));
      console.log("----开始截取------");
      html2canvas(document.querySelector("#posterContainer"), {
        //backgroundColor: "transparent"
        onclone: function(document) {
          document.querySelector("#posterContainer img.poster").style.border =
            "none";
          document.querySelector(
            "#posterContainer img.poster"
          ).style.borderRadius = 0;
        },
        scale: 3,
        allowTaint: true
      }).then(canvas => {
        //return
        //把画好的canvas转成base64
        console.log("----截取完成------");
        // var img = new Image();
        // img.classList.add("resultImg");
        // img.src = canvas.toDataURL("image/png");
        // img.onload = function() {
        //   document.body.appendChild(img);
        // };
        this.resultBase64 = canvas.toDataURL("image/png");
        this.resultBase64Show = true;
        // console.log("----------");
        // console.log(this.resultBase64);
        // console.log("----------");
      });
    },
    shareToFriends() {
      if (platForm == "IOS") {
        webkit.messageHandlers.shareWebImage.postMessage({
          data: this.resultBase64
        });
      } else {
        PayFeedBack.shareWebImage(this.resultBase64);
      }
    }
  }
};
</script>
<style lang="less" scoped>
#main {
  position: relative;
  min-height: 100vh;
}
.top {
  img {
    width: 100%;
  }
}
.rule_btn {
  position: absolute;
  top: 20px;
  right: 0;
  width: 80px;
  height: 28px;
  img {
    width: 100%;
  }
}
.reward {
  position: absolute;
  top: 172px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;

  background-size: cover;
  text-align: center;
  img.top_bg {
    width: 100%;
  }
  .top_main {
    padding-top: 80px;
    position: absolute;
    left: 0;
    top: 20px;
    width: 100%;
    .current {
      // margin-top: 80px;
      .label_text {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(252, 225, 57, 1);
      }
      .num {
        // position: relative;
        // top: -5px;
        margin-top: -5px;
        font-size: 44px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
    }
    .detail {
      margin-top: 0px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-evenly;
      .detail_item {
        width: 33.333%;
        flex-grow: 1;
        .label_text {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(134, 35, 0, 1);
        }
        .num {
          font-size: 24px;
          font-family: SF UI Text;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .detail_link {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(252, 225, 57, 1);
      img {
        margin-left: 3px;
        margin-top: 1px;
        width: 9px;
      }
    }
  }
}
.poster_container.swiper {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding-bottom: 120px;
  overflow: hidden;
  #posterContainer {
    margin: auto;
    width: 270px;
    //height: 473px;
  }
  .nick_name {
    position: absolute;
    left: 6%;
    bottom: 17.5%;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(255, 240, 150, 1);
    //text-decoration: underline;
    z-index: 9;
  }
  .qr {
    position: absolute;

    right: 5%;
    bottom: 3%;
    width: 56px !important;
    height: 56px;
    z-index: 9;
  }
  img.poster {
    position: relative;
    z-index: 8;
    width: 320px;
    border-radius: 15px;
  }
}
.poster_container.noswiper {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  .nick_name {
    position: absolute;
    left: 6%;
    bottom: 17.5%;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(255, 240, 150, 1);
    //text-decoration: underline;
    z-index: 9;
  }
  .qr {
    position: absolute;

    right: 5%;
    bottom: 3%;
    width: 56px !important;
    height: 56px;
    z-index: 9;
  }
  img.poster {
    position: relative;
    z-index: 8;
    width: 320px;
    border-radius: 15px;
  }
}
#remarkSwiper.swiper-container {
  z-index: 9;
  position: relative;
  width: 100%;
  margin: 0 auto;
  .swiper-slide {
    width: 70%;
    text-align: center;
    font-size: 18px;
    overflow: hidden;
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 300ms;
    img {
      //width: 200%;

      width: 100%;
      background-color: #fbf7f1;
    }
  }

  .swiper-slide:not(.swiper-slide-active) {
    transform: scale(0.85);
  }
}
.btn_wrapper {
  z-index: 9;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 246, 235, 1);
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  .reward_detail_btn {
    width: 160px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid rgba(246, 105, 52, 1);

    background: rgba(255, 246, 235, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(246, 105, 52, 1);
  }
  .share_btn {
    width: 160px;
    height: 40px;
    background: linear-gradient(
      0deg,
      rgba(254, 147, 13, 1) 0%,
      rgba(252, 247, 67, 1) 100%
    );
    box-shadow: 0px 6px 7px 0px rgba(255, 255, 255, 0.86);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(230, 24, 11, 1);
  }
}
</style>
