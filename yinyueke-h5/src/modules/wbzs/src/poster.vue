<template>
  <div id="main">
    <Loading v-show="loadingShow" />
    <div v-show="!resultBase64Show" id="posterContainer" class="poster_wrapper">
      <img class="bg" :src="bgSrc" alt />
      <img v-show="!loadingShow" :src="qrSrc" alt class="qr" :class="{nofree:posterId!=1}" />
    </div>
    <!-- <div v-show="resultBase64Show" class="poster_wrapper">
      <img class="bg" :src="resultBase64" alt />
    </div> -->
    <div v-show="!loadingShow && openInApp" @click="share" class="share_btn">分享给好友</div>
    <div v-show="!loadingShow" class="tips" :class="{nofree:posterId!=1}">长按保存图片</div>
  </div>
</template>
<script>
// var eruda = require("eruda");
// eruda.init();
import { openInApp, getQueryVariable, platForm } from "../../../common/util.js";
import html2canvas from "html2canvas";
import Loading from "./../../../components/Loading";
const QRCode = require("qrcode");
export default {
  data() {
    return {
      name: localStorage.getItem("zsName")
    };
  },
  created() {},
  components: {
    Loading
  },
  mounted() {
    //this.readyAll();
  },
  methods: {
    readyAll() {
      let pArr = [];
      //pArr.push(this.createQr());
      pArr.push(this.posterTo64());
      Promise.all(pArr).then(res => {
        this.$nextTick(() => {
          this.getResult64();
        });
      });
    },
    createQr() {
      return new Promise((resolve, reject) => {
        QRCode.toDataURL(this.wxMaterial, {
          margin: 1
        }).then(res => {
          console.log("qr ready");
          this.qrSrc = res;
          resolve();
        });
      });
    },
    posterTo64() {
      return new Promise((resolve, reject) => {
        let url = require(`../../../assets/img/wbzs/zs.png`);
        this.imgToBase64(url).then(res => {
          console.log("poster64 ready");
          this.bgSrc = res;
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
      console.log(document.querySelector("#posterContainer"));
      html2canvas(document.querySelector("#posterContainer"), {
        //backgroundColor: "transparent"
        //allowTaint: true
      }).then(canvas => {
        //return
        //把画好的canvas转成base64
        console.log(canvas);
        // var img = new Image();
        // img.classList.add("resultImg");
        // img.src = canvas.toDataURL("image/png");
        // img.onload = function() {
        //   console.log("onload");
        //   document.body.appendChild(img);
        // };
        this.resultBase64 = canvas.toDataURL("image/png");
        this.resultBase64Show = true;
        // console.log("----------");
        // console.log(this.resultBase64);
        // console.log("----------");
      });
    },
    share() {
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
<style lang="less">
.poster_wrapper {
  .bg {
    width: 100%;
  }
  .qr {
    position: absolute;
    bottom: 15px;
    right: 31px;
    width: 90px;
    border-radius: 3px;
  }
  .qr.nofree {
    bottom: 20px;
    right: 22px;
  }
}

.share_btn {
  position: absolute;
  right: 15px;
  top: 25px;
  width: 88px;
  height: 30px;
  line-height: 30px;
  background: rgba(255, 203, 21, 1);
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.tips {
  position: absolute;
  bottom: 20px;
  right: 8px;
  writing-mode: vertical-rl;
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(57, 57, 57, 1);
  -webkit-text-stroke: 1px undefined;
  text-stroke: 1px undefined;
}
.tips.nofree {
  bottom: 28px;
  right: 2px;
}
</style>
