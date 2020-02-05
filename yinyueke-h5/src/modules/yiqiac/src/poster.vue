<template>
  <div id="main">
    <div class="poster_wrapper">
      <img class="bg" src="../../../assets/img/yiqiac/poster.png" alt />
      <img :src="qrSrc" alt class="qr" />
    </div>
    <div @click="getShare64" class="share_btn">分享</div>
    <div class="tips">长按保存图片</div>
    
  </div>
</template>
<script>
var eruda = require('eruda');
eruda.init();
import { getQueryVariable, platForm } from "../../../common/util.js";
import html2canvas from "html2canvas";
const QRCode = require("qrcode");
let resultBase64;
export default {
  data() {
    return {
      qrSrc: ""
    };
  },
  created() {
    document.title = "疫期不孤单，爱心赠好课";
  },
  mounted() {
    QRCode.toDataURL("I am a pony!", {
      margin: 1
    }).then(res => {
      this.qrSrc = res;
    });

    this.openTest()
  },
  methods: {
    openTest() {
      var src = "//cdn.jsdelivr.net/npm/eruda";
      console.log('111')
    
      document.write("<scr" + 'ipt src="' + src + '"></scr' + "ipt>");
      document.write("<scr" + "ipt>eruda.init();</scr" + "ipt>");
       console.log('222')
    },
    imgToBase64(url) {
      var url = url + "?" + new Date().valueOf();
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "Anonymous");
        img.src = url;
        console.log(url);
        console.log("------");
        console.log(img.complete);
        img.onload = function() {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var base64 = canvas.toDataURL("image/png");
          console.log("------");
          //console.log(base64);
          resolve(base64);
          //document.querySelector('#test').src = base64
        };
      });
    },
    createResultImg() {
      console.log("开始画图");
      this.imgToBase64(this.userInfo.avatar).then(res => {
        console.log("base64生成完成");
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
            console.log("onload");
            document.querySelector(".page.p6 .result_wrapper").appendChild(img);
          };
          //document.querySelector(".page.p6 .result").appendChild(canvas);
          //canvas.toDataURL("image/png");
        });
      });
    },
    getShare64() {
      html2canvas(document.querySelector(".poster_wrapper"), {
        backgroundColor: "transparent"
        //allowTaint: true
      }).then(canvas => {
        //return
        //把画好的canvas转成base64
        var img = new Image();
        img.classList.add("resultImg");
        resultBase64 = canvas.toDataURL("image/png");
        img.src = canvas.toDataURL("image/png");
        img.onload = function() {
          console.log("onload");
          document.body.appendChild(img);
        };
        console.log(resultBase64)
        this.share()
        //document.querySelector(".page.p6 .result").appendChild(canvas);
        //canvas.toDataURL("image/png");
      });
    },
    share() {
      if (platForm == "IOS") {
        webkit.messageHandlers.shareWebImage.postMessage({
          data: resultBase64
        });
      } else {
        PayFeedBack.shareWebImage(resultBase64);
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
