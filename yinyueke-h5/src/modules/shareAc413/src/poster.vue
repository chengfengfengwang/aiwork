<template>
  <div id="main">
    <Loading v-show="loadingShow"/>
    <div
      v-show="!resultBase64Show"
      id="posterContainer"
      :class="{absolute_style:absoluteStyle}"
      class="poster_wrapper"
    >
      <img class="bg" :src="bgSrc" alt>
      <img v-show="!loadingShow" :src="qrSrc" alt class="qr">
    </div>
    <div v-show="resultBase64Show" :class="{absolute_style:absoluteStyle}" class="poster_wrapper">
      <img class="bg" :src="resultBase64" alt>
    </div>
    <!-- <div v-show="!loadingShow && openInApp" @click="share" class="share_btn">分享给好友</div>
    <div v-show="!loadingShow" class="tips">长按保存图片</div>-->
  </div>
</template>
<script>
// var eruda = require("eruda");
// eruda.init();
import {
  testWeixin,
  openInApp,
  getQueryVariable,
  platForm
} from "../../../common/util.js";
import html2canvas from "html2canvas";
import Loading from "./../../../components/Loading";
const QRCode = require("qrcode");
export default {
  data() {
    return {
      qrSrc: "",
      bgSrc: "",
      wxMaterial: "",
      loadingShow: true,
      resultBase64Show: false,
      resultBase64: "",
      openInApp,
      absoluteStyle: false
    };
  },
  created() {
    if (!getQueryVariable("code") && testWeixin()) {
      let originUrl = `${location.origin}${location.pathname}${location.hash}`;
      let encodedUrl = encodeURIComponent(originUrl);
      let scope = "snsapi_base";
      console.log(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxebd76dff6ca15a2a&redirect_uri=${encodedUrl}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
      );
      location.replace(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxebd76dff6ca15a2a&redirect_uri=${encodedUrl}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
      );
    } else {
      this.wxCode = getQueryVariable("code");
      sessionStorage.setItem("code", getQueryVariable("code"));
    }
    let sessionCode = sessionStorage.getItem("code");
    //后退到了没有code的链接
    if (sessionCode && !getQueryVariable("code")) {
      this.wxCode = sessionCode;
    }
    console.log("---------");
    console.log(getQueryVariable("code"));
    console.log(sessionStorage.getItem("code"));
    console.log("---------");
    // this.getSignInfo().then(param => {
    //   this.shareReady(param);
    // });
    this.getAbsoluteStyle()
  },

  components: {
    Loading
  },
  mounted() {
    this.getWx();
  },
  methods: {
    getAbsoluteStyle() {
      let sWidth = window.innerWidth;
      let sHeight = window.innerHeight;
      let sRatio = sWidth / sHeight;
      let posterRatio = 375 / 574;
      if (sRatio < posterRatio) {
        this.absoluteStyle = true;
      } else {
        this.absoluteStyle = false;
      }
    },
    getWx() {
      //app里没有填写手机号，从url上面拿
      //非app从上一步用户填写的自己手机号 里面拿
      this.axios
        //.post(`${process.env.VUE_APP_LIEBIAN}/v1/wechat/share_qrcode/`,{
        .post(`http://api.yinji.immusician.com/v1/wechat/share_qrcode/`, {
          share_stall: 0,
          code: this.wxCode,
          share_id: 8
        })
        .then(res => {
          this.wxMaterial = res.url;
          this.readyAll();
          //this.courseList.unshift({ id: "-1", name: "全部" });
        });
    },
    readyAll() {
      let pArr = [];
      pArr.push(this.createQr());
      pArr.push(this.posterTo64());
      Promise.all(pArr).then(res => {
        setTimeout(() => {
          this.getResult64();
        }, 100);
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
        let url = require(`../../../assets/img/shareAc413/poster2.jpg`);
        // if(this.isFree===0){
        //   url = require("../../../assets/img/yiqiac/poster2.png")
        // }else{
        //   url = require("../../../assets/img/yiqiac/poster1.png")
        // }
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
      html2canvas(document.querySelector("#posterContainer"), {
        //backgroundColor: "transparent"
        //allowTaint: true
      }).then(canvas => {
        //return
        //把画好的canvas转成base64
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
#main {
  min-height: 100vh;
}
.poster_wrapper {
  .bg {
    width: 100%;
  }
  .qr {
    position: absolute;
    top: 239px;
    left: 144px;
    width: 88px;
    border-radius: 3px;
  }
}
.absolute_style {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
}
</style>
