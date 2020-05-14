<template>
  <div>
    <Loading v-show="loadingShow" />
    <router-view />
    <!-- <div class="outside_pay" v-show="haveOutsideGoods">
      <div class="pay_item" :class="{active:payIndex===1}" @click="payIndex=1">单买课程</div>
      <div
        class="pay_item"
        :class="{active:payIndex===2}"
        @click="payIndex=2"
      >{{outsideInfo.goods_name}}</div>
    </div>
    <div v-show="payIndex===2" class="section_pay" :style="{paddingBottom:isIphonex?'20px':'10px'}">
      <div class="left">
        <div class="left_top">
          <span class="pay_label">限时特价</span>
          <span class="money_icon">¥</span>
          <span class="price_num">{{outsideInfo.goods_price/100}}</span>
          <span class="old_price_num">{{outsideInfo.goods_old_price/100}}</span>
        </div>
        <div class="left_bottom">{{courseInfo.user_count}}人参加</div>
      </div>
      <div class="right" @click="toYouzan">立即购买</div>
    </div>
    <div v-show="payIndex===1" class="section_pay" :style="{paddingBottom:isIphonex?'20px':'10px'}">
      <div class="left">
        <div class="left_top">
          <span class="pay_label">限时特价</span>
          <span class="money_icon">¥</span>
          <span class="price_num">{{courseInfo.price/100}}</span>
          <span class="old_price_num">{{courseInfo.old_price/100}}</span>
        </div>
        <div class="left_bottom">{{courseInfo.user_count}}人参加</div>
      </div>
      <div class="right" @click="toPay">立即购买</div>
    </div>-->
    <div v-if="!newCardPay" class="section_pay" :style="{paddingBottom:isIphonex?'20px':'10px'}">
      <div class="left">
        <div class="left_top">
          <span class="pay_label">限时特价</span>
          <span class="money_icon">¥</span>
          <span class="price_num">{{courseInfo.price/100}}</span>
          <span class="old_price_num">{{courseInfo.old_price/100}}</span>
        </div>
        <div class="left_bottom">{{courseInfo.user_count}}人参加</div>
      </div>
      <div class="right" @click="toPay">立即购买</div>
    </div>
    <div v-if="newCardPay" class="section_pay">
      <div class="pay_btn" @click="showPop">立即购买</div>
    </div>
    <popup v-model="popShow" position="bottom" :style="{ height: popHeight }">
      <div class="pop_wrapper">
        <div class="card_wrapper">
          <div
            v-show="card.default !== 0"
            v-for="(card,index) in cardDataArr"
            :key="index"
            :class="{selected:curCardIndex===index,vip:card.isVip}"
            class="card"
            @click="selectCard(index)"
          >
            <div class="vip_type" v-show="card.isVip">{{card.name}}</div>
            <div v-show="!card.isVip" class="coco">
              <img src="../../assets/img/courseDetail/common/coco.png" alt />
            </div>
            <div v-show="card.isVip" class="vip_coco">
              <img
                v-show="card.vip_type==='vip_inf_5'"
                src="../../assets/img/courseDetail/common/vip_coco.png"
                alt
              />
              <img
                v-show="card.vip_type==='vip_inf'"
                src="../../assets/img/courseDetail/common/super_vip.png"
                alt
              />
              <div class="dis_text" :class="{m:(card.discount+'').length>1}">
                <span class="num">{{card.discount}}</span>
                <span class="dis">折</span>
              </div>
            </div>
            <div v-if="!card.isVip" class="course">
              <div class="course_title">{{card.name}}</div>
              <div class="course_intro">
                <div>有趣的AI智能互动课程</div>
                <div>购课添加辅导老师微信，专业老师辅导</div>
              </div>
            </div>

            <div v-if="card.isVip" class="course">
              <div v-show="card.isVip && card.vip_type==='vip_inf_5'" class="course_title">购会员解锁全部课程（买5年送2年）</div>
              <div v-show="card.isVip && card.vip_type==='vip_inf'" class="course_title"> 购会员解锁全部课程</div>
              <div class="course_intro">
                <div>包含音乐素养、非洲鼓、尤克里里三大品类所有课程（含</div>
                <div>未来上线的AI智能互动课程</div>
              </div>
              <div class="course_date">
                <span v-show="card.isVip && card.vip_type==='vip_inf_5'">共7年有效期</span>
                <span v-show="card.isVip && card.vip_type==='vip_inf'">终身有效</span>
                <span @click="goVipDetail(index)" class="right">查看权益>></span>
              </div>
            </div>
            <div class="price">
              <div class="origin_price">
                <span class="oi">￥</span>
                <span class="onum">{{card.price/100}}</span>
              </div>
              <div class="price_dis">
                <span class="price_dis_o">原价￥{{card.old_price/100}}</span>
                <span>共节省了￥{{(card.old_price-card.price)/100}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="next_btn_wrapper">
          <div class="next_btn" @click="goNext">下一步</div>
        </div>
      </div>
    </popup>
    <div class="n_mask" @click="maskShow=false" v-show="maskShow">
      
    </div>
    <div :class="[maskShow?'up':'down']"  class="pop_wrapper new">
        <div class="card_wrapper">
          <div
            v-show="card.isVip"
            v-for="(card,index) in cardDataArr"
            :key="index"
            :class="{selected:curCardIndex===index,vip:card.isVip}"
            class="card"
            @click="selectCard(index)"
          >
            <div class="vip_type" v-show="card.isVip">{{card.name}}</div>
            <div v-show="!card.isVip" class="coco">
              <img src="../../assets/img/courseDetail/common/coco.png" alt />
            </div>
            <div v-show="card.isVip" class="vip_coco">
              <img
                v-show="card.vip_type==='vip_inf_5'"
                src="../../assets/img/courseDetail/common/vip_coco.png"
                alt
              />
              <img
                v-show="card.vip_type==='vip_inf'"
                src="../../assets/img/courseDetail/common/super_vip.png"
                alt
              />
              <div class="dis_text" :class="{m:(card.discount+'').length>1}">
                <span class="num">{{card.discount}}</span>
                <span class="dis">折</span>
              </div>
            </div>
            <div v-if="!card.isVip" class="course">
              <div class="course_title">{{card.name}}</div>
              <div class="course_intro">
                <div>有趣的AI智能互动课程</div>
                <div>购课添加辅导老师微信，专业老师辅导</div>
              </div>
            </div>

            <div v-if="card.isVip" class="course">
              <div v-show="card.isVip && card.vip_type==='vip_inf_5'" class="course_title">购会员解锁全部课程（买5年送2年）</div>
              <div v-show="card.isVip && card.vip_type==='vip_inf'" class="course_title"> 购会员解锁全部课程</div>
              <div class="course_intro">
                <div>包含音乐素养、非洲鼓、尤克里里三大品类所有课程（含</div>
                <div>未来上线的AI智能互动课程</div>
              </div>
              <div class="course_date">
                <span v-show="card.isVip && card.vip_type==='vip_inf_5'">共7年有效期</span>
                <span v-show="card.isVip && card.vip_type==='vip_inf'">终身有效</span>
                <span @click="goVipDetail(index)" class="right">查看权益>></span>
              </div>
            </div>
            <div class="price">
              <div class="origin_price">
                <span class="oi">￥</span>
                <span class="onum">{{card.price/100}}</span>
              </div>
              <div class="price_dis">
                <span class="price_dis_o">原价￥{{card.old_price/100}}</span>
                <span>共节省了￥{{(card.old_price-card.price)/100}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="next_btn_wrapper">
          <div class="next_btn" @click="vipGoNext">下一步</div>
        </div>
      </div>
  </div>
</template>
<script>
//超级会员 vip_inf
//十年会员： vip_inf_5
import Loading from "./../../components/Loading";
import { Popup } from "vant";

import { getQueryVariable, isIphonex, platForm } from "../../common/util.js";
export default {
  data() {
    return {
      payIndex: 1,
      isIphonex: false,
      courseInfo: {
        //name: "测试课程中",
        // old_price: 1000,
        // user_count: 12,
        // price: 900
      },
      outsideInfo: {},
      haveOutsideGoods: false,
      loadingShow: false,
      popShow: false,
      curCardIndex: 0,
      cardDataArr: [],
      popHeight: 0,
      newCardPay: true,
      maskShow: false
    };
  },
  components: {
    Loading,
    Popup
  },
  created() {
    this.isIphonex = isIphonex();
    this.urlParams = {
      goodsId: getQueryVariable("goodsId"),
      share_channel: getQueryVariable("share_channel"),
      address: getQueryVariable("address"),
      phone: getQueryVariable("phone"),
      uid: getQueryVariable("uid"),
      token: getQueryVariable("token"),
      coupon_id: getQueryVariable("coupon_id")
    };
    if (getQueryVariable("qr_mode") == "1") {
      console.log("是优学派");
      this.urlParams.from = "youxuepai";
    }
    localStorage.setItem("urlParams", JSON.stringify(this.urlParams));
    this.axios.defaults.headers.common["token"] = this.urlParams.token;
    this.axios.defaults.headers.common["uid"] = this.urlParams.uid;
    this.getCourseInfo();

    this.popHeight = (533 / window.innerHeight) * 100 + 5 + "%";
  },
  mounted() {},
  methods: {
    goVipDetail(index) {
      this.curCardIndex = index;
      let card =  this.cardDataArr[this.curCardIndex];
      localStorage.setItem("vip_youzan_url", this.getVipPayUrl());
      let d = new Date().valueOf();
      console.log(card)
      if(card.vip_type==='vip_inf'){
          location.href = `superVip.html?t=${d}#/`;
      }else if(card.vip_type==='vip_inf_5'){
        location.href = `superVip.html?t=${d}#/vip10`;
      } 
      return
      location.href = `superVip.html?t=${d}`;
    },
    vipGoNext(){
      location.href = this.getVipPayUrl();
    },
    goNext() {
      this.curCard = this.cardDataArr[this.curCardIndex];
      if (this.curCard.isVip) {
        this.maskShow = true;
      } else if (this.curCard.buy_url) {
        // if (platForm !== "IOS") {
        //   console.log("andriod");
        //   var originUrl = encodeURIComponent(this.curCard.buy_url);
        //   let url = `open://webBrowser?url=${originUrl}`;
        //   console.log(url);
        //   location.href = url;
        // } else {
        //   console.log("ios");
        //   location.href = this.curCard.buy_url;
        // }

        location.href = this.curCard.buy_url;
      } else {
        this.toPay();
      }
    },
    selectCard(index) {
      this.curCardIndex = index;
    },
    showPop() {
      this.popShow = true;
    },
    toYouzan() {
      location.href = this.outsideInfo.goods_url;
    },
    getVipPayUrl() {
      let e = this.cardDataArr[this.curCardIndex];
      if (e.buy_url) {
        return e.buy_url;
      } else {
        this.urlParams.goodsId = e.goods_id;
        this.urlParams.good_img = e.good_img;
        this.urlParams.user_count = e.user_count;
        var urlParams = this.urlParams;
        var str = "";
        var t = Date.now();
        for (var key in urlParams) {
          str += `${key}=${urlParams[key]}&`;
        }
        str += `name=${e["name"]}&price=${e["price"]}&hasParam=true&hideYhq=1&hideJxj=1&t=${t}&node=vertical`;
        if (process.env === "production") {
          this.callApp();
        }
        if(process.env.NODE_ENV === "development"){
        var host = "http://192.168.2.25:8090"; 
        }else{
          var host = "http://cdn.kids.immusician.com/web/music-base-h5/index.html";
        }
        this.toPayUrl = `${host}?${str}#/`;
        //return;
        return this.toPayUrl;
      }
    },
    toPay() {
      localStorage.setItem("courseInfo", JSON.stringify(this.courseInfo));
      var courseInfo = this.courseInfo;
      var urlParams = this.urlParams;
      var str = "";
      var t = Date.now();
      for (var key in urlParams) {
        str += `${key}=${urlParams[key]}&`;
      }
      str += `name=${courseInfo["name"]}&price=${courseInfo["price"]}&hasParam=true&t=${t}&node=vertical`;
      if (process.env === "production") {
        this.callApp();
      }
      // if (process.env.NODE_ENV === "development") {
      //   var host = "http://192.168.1.85:8090";
      // } else {
      //   var host =
      //     "http://cdn.kids.immusician.com/web/music-base-h5/index.html";
      // }
      if(process.env.NODE_ENV === "development"){
        var host = "http://localhost:8090";
      }else{
        var host = "http://cdn.kids.immusician.com/web/music-base-h5/index.html";
      }
      this.toPayUrl = `${host}?${str}#/`;
      // console.log(this.toPayUrl);
      // return;
      location.href = this.toPayUrl;
    },
    callApp() {
      // 由于对象映射，所以调用hello对象等于调用Android映射的对象
      // AndroidJS.hello("js调用了android中的hello方法");
      console.log("--- js调用了原生app中的方法 ---");
      var isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        window.webkit.messageHandlers.onBuyClick.postMessage({
          onBuyClick: "ture"
        });
      } else {
        PayFeedBack.onBuyClick("true");
      }
    },
    getCourseInfo() {
      //5c764f0e9a5f77d3be85c727
      //5c764fe99a5f77d3be85c729
      this.loadingShow = true;
      this.axios
        .get(
          `${process.env.VUE_APP_COURSE_DETAIL}/v1/goods/detail?id=${this.urlParams.goodsId}`
        )
        .then(res => {
          console.log("zzz");
          this.loadingShow = false;
          console.log(this.loadingShow);
          this.courseInfo = res.data;
          localStorage.setItem("courseInfo", JSON.stringify(this.courseInfo));
          this.urlParams.good_img = res.data.good_img;
          this.urlParams.user_count = res.data.user_count;

          if (
            this.courseInfo.vip_goods &&
            this.courseInfo.vip_goods.length === 0
          ) {
            this.newCardPay = false;
          } else {
            this.newCardPay = true;
          }

          //cardDataArr数据处理
          let youzanArr = [];
          let vipArr = [];

          if (
            this.courseInfo.vip_goods &&
            this.courseInfo.vip_goods.length > 0
          ) {
            vipArr = this.courseInfo.vip_goods.map(e => {
              return {
                isVip: true,
                name: e.name,
                price: e.price,
                old_price: e.old_price,
                discount: e.discount,
                user_count: e.user_count,
                goods_id: e.goods_id,
                good_img: e.good_img,
                buy_url: e.buy_url,
                vip_type: e.vip_type,
                default:e.default
              };
            });
          }
          if (
            this.courseInfo.outside_goods_info &&
            this.courseInfo.outside_goods_info.length > 0
          ) {
            youzanArr = this.courseInfo.outside_goods_info.map(e => {
              return {
                isVip: false,
                isYouzan: true,
                name: e.goods_name,
                price: e.goods_price,
                old_price: e.goods_old_price,
                buy_url: e.goods_url
              };
            });
          }
          this.curCardIndex = vipArr.length;
          this.cardDataArr = vipArr;
          if (this.courseInfo.online) {
            this.cardDataArr.push({
              isVip: false,
              name: this.courseInfo.name,
              price: this.courseInfo.price,
              old_price: this.courseInfo.old_price
            });
          }
          this.cardDataArr = this.cardDataArr.concat(youzanArr);
        });
    }
  },
  watch: {
    popShow() {
      if (this.popShow) {
        this.$nextTick(() => {
          this.popHeight =
            document.querySelector(".pop_wrapper").offsetHeight + "px";
        });
      }
    },
    maskShow(){
      if(!this.maskShow){
        this.curCardIndex = 0;
      }
    }
  }
};
</script>
<style lang="less">
.van-popup {
  //position: relative;
  border-radius: 20px 20px 0 0;
}
@import url("./../../common/common.less");
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
  @media screen and (min-width: 480px) {
    .font-size(13);
  }
}
.n_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
}
// .bottom_wrapper {
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   background-color: #fff;
//   z-index: 1999;
// }
// .bottom_pay_bar {
//   height: 50px;
//   display: flex;
//   box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
//   background-color: #fff;
//   .bar_main {
//     //display: flex;
//     flex-direction: column;
//     //justify-content: center;
//     background-color: #fff;
//     flex-grow: 0;
//     width: 61%;
//     //justify-content: space-around;
//     padding: 7px 7px;
//     .bar_main_top {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       line-height: 15px !important;
//       .course_title {
//         flex-grow: 0;
//         font-family: PingFangSC-Regular;
//         font-size: 13px;
//         color: #333333;
//         line-height: normal;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         //width: 76%;
//         margin-right: 2px;
//       }
//       .origin_price {
//         font-family: PingFangSC-Regular;
//         font-size: 11px;
//         color: #999999;
//         text-decoration: line-through;
//       }
//     }
//     .bar_main_bottom {
//       display: flex;
//       align-items: center;
//       font-size: 11px;
//       .buy_num {
//         flex-grow: 1;
//         font-size: 11px;
//         color: #999999;
//       }
//       .now_price {
//         .text {
//           font-size: 11px;
//           color: #333333;
//         }
//         .num {
//           font-family: PingFangSC-Semibold;
//           font-size: 14px;
//           color: #ec545e;
//         }
//       }
//     }
//   }
//   .bar_btn {
//     background: #ee525b;
//     width: 39%;
//     font-family: PingFangSC-Medium;
//     font-size: 16px;
//     color: #ffffff;
//     letter-spacing: 0;
//     text-align: center;
//     line-height: 50px;
//   }
// }
.outside_pay {
  * {
    box-sizing: border-box;
  }

  position: fixed;
  bottom: 60px;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: #fff;
  padding: 12px 10px;
  border-bottom: 1px solid #f1f1f1;
  .pay_item {
    box-sizing: border-box;
    min-width: 50px;
    display: inline-block;
    padding: 0 12px;
    height: 30px;
    line-height: 30px;
    background: #f4f4f4;
    border-radius: 17px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    &:first-child {
      margin-right: 20px;
    }
  }
  .pay_item.active {
    background: #fff9f9;
    border: 1px solid rgba(255, 116, 43, 1);
    color: rgba(255, 116, 43, 1);
  }
}
.section_pay {
  z-index: 999;
  background-color: #fff;
  box-sizing: border-box !important;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  //height: 120px;
  padding: 10px 8px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.05);
  .left {
    flex-grow: 1;
    display: flex;
    align-items: center;
    .left_top {
      margin-right: 20px;
      line-height: 20px;
      .pay_label {
        font-size: 14px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .money_icon {
        margin: 0 2px 0 5px;
        font-size: 12px;
        font-family: PingFang-SC-Medium;
        font-weight: 400;
        color: rgba(255, 38, 38, 1);
      }
      .price_num {
        margin: 0 5px 0 0px;
        font-size: 20px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 38, 38, 1);
      }
      .old_price_num {
        font-size: 14px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        text-decoration: line-through;
      }
    }
    .left_bottom {
      font-size: 12px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .right {
    flex-grow: 0;
    width: 120px;
    height: 40px;
    background-color: #ff742b;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    border-radius: 20px;
  }
}
.pay_btn {
  margin: 0 auto;
  width: 260px;
  height: 40px;
  background: #fd752a;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  border-radius: 20px;
  text-align: center;
}
.pop_wrapper {
  position: relative;
}

.card_wrapper {
  min-height: 280px;
  max-height: 80vh;
  overflow: scroll;
  padding-bottom: 70px;
  // @media (max-width: 400px) and (min-height: 700px) {
  //    height: 630px;
  //   }
}
.card {
  position: relative;
  margin: 13px auto;
  width: 357px;
  box-sizing: content-box;
  box-shadow: 0px 2px 6px 0px rgba(229, 229, 229, 0.72);
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid transparent;
  .vip_type {
    position: absolute;
    left: 0;
    top: 0;
    //width: 80px;
    padding: 0 10px;
    height: 24px;
    line-height: 24px;
    background: rgba(255, 116, 43, 1);
    border-radius: 15px 0px 15px 0;
    font-size: 13px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 243, 0, 1);
    text-align: center;
  }
  .coco {
    position: absolute;
    z-index: 2;
    right: 0;
    bottom: -5px;
    width: 130px;
    img {
      width: 100%;
    }
  }
  .vip_coco {
    position: absolute;
    z-index: 2;
    right: 0;
    bottom: -5px;
    width: 130px;
    img {
      width: 100%;
    }
    .dis_text {
      position: absolute;
      left: 14px;
      bottom: 50px;
      color: rgba(255, 245, 38, 1);
      .dis {
        display: inline-block;
        transform: rotate(-8deg);
        font-family: PingFangSC-Regular, PingFang SC;

        font-size: 9px;
      }
      .num {
        display: inline-block;
        transform: rotate(-8deg);
        font-size: 22px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        position: relative;
        top: 3px;
      }
    }
    .m.dis_text .num {
      font-size: 16px;
    }
    .m.dis_text {
      left: 9px;
      bottom: 55px;
    }
  }
  .course {
    background-color: #fff7df;
    padding: 20px;
    .course_title {
      margin-bottom: 10px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 116, 43, 1);
    }
    .course_intro {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(159, 86, 5, 1);
      position: relative;
      z-index: 5;
    }
    .course_date {
      margin-top: 3px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(159, 86, 5, 1);
      .right {
        margin-left: 20px;
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: rgba(160, 87, 7, 1);
      }
    }
  }
  .price {
    background: rgba(255, 255, 255, 1);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    .origin_price {
      margin-right: 27px;
      font-size: 11px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 38, 38, 1);
      .onum {
        font-size: 20px;
      }
    }
    .price_dis {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;
      padding: 0 10px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(192, 143, 89, 1);
      background: rgba(241, 241, 241, 0.47);
      border-radius: 13px;
      height: 24px;
      .price_dis_o {
        margin-right: 10px;
        text-decoration: line-through;
      }
    }
  }
}
.card.selected {
  border: 2px solid rgba(255, 116, 43, 1);
}
.card.vip {
  .course {
    padding: 40px 20px 20px 18px;
  }
}
.next_btn_wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  text-align: center;
  //position: relative;
  //top: -20px;
  padding: 10px 0;
  z-index: 9;
}
.next_btn {
  display: inline-block;
  width: 260px;
  height: 40px;
  background: #fd752a;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  border-radius: 20px;
  text-align: center;
}
.pop_wrapper.new {
  position: fixed;
  left: 0;
  bottom: -100vh;
  width: 100%;
  background-color: #fff;
  transition: all .5s;
  border-radius: 15px;
  z-index: 100000;
}
.pop_wrapper.down {
  bottom: -100vh;
}
.pop_wrapper.up {
  bottom: 0;
}
</style>

