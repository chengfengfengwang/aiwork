<template>
  <div id="main">
    <Loading v-show="loadingShow" />
    <div v-show="!resultBase64Show" class="poster_wrapper">
      <!-- <img class="bg" src="../../../assets/img/yiqiac/poster.png" alt /> -->
      <img class="bg" :src="bgSrc" alt />
      <img v-show="!loadingShow" :src="qrSrc" alt class="qr" />
    </div>
    <div v-show="resultBase64Show" class="poster_wrapper">

    </div>
    <div v-show="!loadingShow" @click="share" class="share_btn">分享</div>
    <div v-show="!loadingShow" class="tips">长按保存图片</div>
  </div>
</template>
<script>
var eruda = require("eruda");
eruda.init();
import { getQueryVariable, platForm } from "../../../common/util.js";
import html2canvas from "html2canvas";
import Loading from "./../../../components/Loading";
const QRCode = require("qrcode");
export default {
  data() {
    return {
      qrSrc: "",
      bgSrc: "",
      loadingShow: true,
      resultBase64Show:false,
      resultBase64:''
    };
  },
  created() {
    document.title = "疫期不孤单，爱心赠好课";
  },
  components: {
    Loading
  },
  mounted() {
    this.readyAll();
  },
  methods: {
    readyAll() {
      let pArr = [];
      pArr.push(this.createQr());
      pArr.push(this.posterTo64());
      console.log(pArr)
      Promise.all(pArr).then(res=>{
        console.log('--')
          this.getResult64()
      })
    },
    createQr() {
      return new Promise((resolve, reject) => {
        QRCode.toDataURL("http://weixin.qq.com/q/02Cq_2Ncps9A_1broW1u1c", {
          margin: 1
        }).then(res => {
           console.log('qr ready')
          this.qrSrc = res;
          resolve()
        });
      });
    },
    posterTo64() {
      return new Promise((resolve, reject) => {
        this.imgToBase64(require("../../../assets/img/yiqiac/poster.png")).then(
          res => {
            console.log('poster64 ready')
            this.bgSrc = res;
            this.loadingShow = false;
             resolve()
          }
        );
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
      html2canvas(document.querySelector(".poster_wrapper"), {
        backgroundColor: "transparent"
        //allowTaint: true
      }).then(canvas => {
        //return
        //把画好的canvas转成base64
        var img = new Image();
        img.classList.add("resultImg");
        this.resultBase64 = canvas.toDataURL("image/png");
        img.src = canvas.toDataURL("image/png");
        img.onload = function() {
          console.log("onload");
          document.body.appendChild(img);
        };
        console.log("----------");
        console.log(this.resultBase64);
        console.log("----------");
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
}

.share_btn {
  position: absolute;
  right: 15px;
  top: 25px;
  width: 48px;
  height: 25px;
  line-height: 25px;
  background: rgba(255, 203, 21, 1);
  border-radius: 12px;
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
</style>
