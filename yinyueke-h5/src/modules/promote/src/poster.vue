<template>
  <div id="main">
    <Loading v-show="loadingShow" />
    <div @click="maskShow=true" class="rule_btn">
      <img src="../../../assets/img/promote/poster/rule_btn.png" alt />
    </div>
    <div class="top">
      <img src="../../../assets/img/promote/poster/top.png" alt />
    </div>
    <div class="reward">
      <img src="../../../assets/img/promote/poster/reward_bg.png" alt class="top_bg" />
      <div class="top_main">
        <div class="current">
          <div class="label_text">当前收益(元)</div>
          <div class="num">{{rewardData.total/100}}</div>
        </div>
        <div class="detail">
          <div class="detail_item">
            <div class="label_text">已注册</div>
            <div class="num">{{rewardData.reg_count/100}}</div>
          </div>
          <div class="detail_item">
            <div class="label_text">付费人数</div>
            <div class="num">{{rewardData.number/100}}</div>
          </div>
          <div class="detail_item">
            <div class="label_text">付费金额(元)</div>
            <div class="num">{{rewardData.amount/100}}</div>
          </div>
        </div>
        <div class="detail_link" @click="toRewardDetail">
          查看奖励明细
          <img class="arrow" src="../../../assets/img/promote/poster/arrow.png" alt />
        </div>
      </div>
    </div>
    <div class="poster_container">
      <div id="posterContainer">
        <!-- <div class="nick_name">宝贝 琪琪</div> -->
        <div class="nick_name">宝贝 {{nickName}}</div>
        <img :src="qrSrc" alt class="qr" />
        <img v-show="posterSrc" class="poster" :src="posterSrc" alt />
        <img
          v-show="!posterSrc"
          class="poster"
          src="../../../assets/img/promote/poster/poster1.png"
          alt
        />
      </div>

      <img src="../../../assets/img/promote/poster/poster_bottom.png" alt class="poster_bottom" />
    </div>
    <!-- <div class="remark_container wrapper">
      <div id="remarkSwiper" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in remarkArr" :key="index">
            <img @click="previewRemark(index)" :src="item" alt />
          </div>
        </div>
      </div>
    </div>-->
    <div class="btn_wrapper">
      <div class="reward_detail_btn" @click="toRewardDetail">查看奖励明细</div>
      <div class="share_btn" @click="shareToFriends" v-show="openInApp">分享海报给好友</div>
    </div>
    <div class="mask" v-show="maskShow">
      <div class="ac_rule">
        <div class="rule_title">活动规则</div>
        <div class="close_icon" @click="maskShow=false">
          <img src="../../../assets/img/promote/poster/close.png" alt />
        </div>
        <div class="rule_item">
          <div class="item_index">1</div>
          <span class="rule_lab">邀请对象：</span>
          <span>您邀请的好友必须是从未注册过音乐壳的新用户，且必须成功购买音乐壳超级会员。</span>
        </div>
        <div class="rule_item">
          <div class="item_index">2</div>
          <span class="rule_lab">邀请方法：</span>
          <span>您必须生成自己的专属海报邀请好友，我们将依据您的邀请记录发放奖励。</span>
        </div>
        <div class="rule_item">
          <div class="item_index">3</div>
          <span class="rule_lab">邀请人奖励：</span>
          <span>每成功邀请1个好友注册并购买音乐壳超级会员，您可享受好友实付金额的20%作为现金奖励。您获得的现金奖励，可在每月10日申请提现。申请提现后，系统会在10个工作日内审核并发放。</span>
        </div>
        <div class="rule_item">
          <div class="item_index">4</div>
          <span class="rule_lab">被邀请人奖励：</span>
          <span>
            您邀请的好友注册后，即可领取一张300元音乐壳超级会员专享券和
            <span class="color">购买大牌乐器8折卡</span>
          </span>
        </div>
        <div class="rule_item">
          <div class="item_index">5</div>
          <span>
            您邀请的好友中，每月月初起，最先下单的2个可使用300元优惠购买音乐壳会员 ;
            <br />2个好友支付成功后，其它好友获得的300元优惠券会立即失效。
          </span>
        </div>
        <div class="rule_item">
          <span>其他问题，添加后方微信咨询：yxymiusic</span>
        </div>
        <div class="rule_bottom">— 本次活动最终解释权归音乐壳所有 —</div>
      </div>
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
      nickName: getQueryVariable('nick_name')
    };
  },
  created() {
    // for (var i = 4; i < 10; i++) {
    //   var str = require(`../../../assets/img/promote/poster/poster1.png`);
    //   this.remarkArr.push(str);
    // }
    // this.$nextTick(() => {
    //   this.initRemarkSwiper();
    // });

    this.getMyAccountData();
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
    getMyAccountData() {
      this.axios
        .get(`http://58.87.125.111:55555/v1/account/get_my_account/?god=${getQueryVariable('uid')}`)
        .then(res => {
          let rewardData = res.data.stats;
          if (rewardData.total) {
            rewardData.total = rewardData.total.toFixed(2);
          }
          this.rewardData = rewardData;
        });
    },
    toRewardDetail() {
      this.$router.push("/reward");
    },
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
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 15
      });
    },
    getQrUrl() {
      this.axios
        .post(`http://api.yinji.immusician.com/v1/share/qrcode_url/`, {
          share_stall: 0,
          phone: getQueryVariable("user_phone"),
          share_id: 6
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
        let url = require(`../../../assets/img/promote/poster/poster1.png`);
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
          // width: 270 * 2 + 'px',
          // height: 473 * 2 + 'px',
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
        //this.resultBase64Show = true;
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
  background-color: #faaf78;
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
.poster_container {
  margin-top: -20px;
  position: relative;
  text-align: center;
  padding-bottom: 120px;
  overflow: hidden;
  #posterContainer {
    margin: auto;
    width: 270px;
    height: 473px;
  }
  .nick_name {
    position: absolute;
    left: 20%;
    bottom: 29%;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(255, 240, 150, 1);
    //text-decoration: underline;
    z-index: 9;
    &::after{
      content: '';
      position: absolute;
      width: 100%;
      left: 0;
      bottom: -4px;
      height: 2px;
      background-color: rgba(255, 240, 150, 1);
    }
  }
  .qr {
    position: absolute;

    right: 20%;
    bottom: 24%;
    width: 56px;
    height: 56px;
    z-index: 9;
  }
  img.poster {
    position: relative;
    z-index: 8;
    width: 270px;
    border-radius: 15px;
    border: 4px solid #fff;
  }
  .poster_bottom {
    z-index: 3;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -81px;
    width: 660px;
  }
}
#remarkSwiper.swiper-container {
  width: 100%;
  margin: 0 auto;
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 300ms;
    img {
      width: 200%;
      background-color: #fbf7f1;
    }
  }
  .swiper-slide:not(.swiper-slide-active) {
    transform: scale(0.8);
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
