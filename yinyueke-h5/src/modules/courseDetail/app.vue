<template>
  <div>
    <Loading v-show="loadingShow"/>
    <router-view/>
    <!-- <div class="bottom_wrapper" :style="{paddingBottom:isIphonex?'10px':'0px'}">
      <div class="bottom_pay_bar">
        <div class="bar_main">
          <div class="bar_main_top">
            <div class="course_title">{{courseInfo.name}}</div>
            <div class="origin_price">¥{{courseInfo.old_price/100}}</div>
          </div>
          <div class="bar_main_bottom">
            <div class="buy_num">{{courseInfo.user_count}}人参与</div>
            <div class="now_price">
              <span class="text">限时特价</span>
              <span class="num">¥{{courseInfo.price/100}}</span>
            </div>
          </div>
        </div>
        <div class="bar_btn" @click="toPay">立即购买</div>
      </div>
    </div>-->
    <div class="outside_pay" v-show="haveOutsideGoods">
      <div class="pay_item" :class="{active:payIndex===1}" @click="payIndex=1">单买课程</div>
      <div class="pay_item" :class="{active:payIndex===2}" @click="payIndex=2">{{outsideInfo.goods_name}}</div>
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
    </div>
  </div>
</template>
<script>
import Loading from "./../../components/Loading";
import { getQueryVariable, isIphonex } from "../../common/util.js";
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
      outsideInfo:{

      },
      haveOutsideGoods:false,
      loadingShow: false
    };
  },
  components: {
    Loading
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
    console.log(this.urlParams);
    localStorage.setItem("urlParams", JSON.stringify(this.urlParams));
    this.axios.defaults.headers.common["token"] = this.urlParams.token;
    this.axios.defaults.headers.common["uid"] = this.urlParams.uid;
    this.getCourseInfo();
  },
  methods: {
    toYouzan(){
      location.href = this.outsideInfo.goods_url;
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
      str += `name=${courseInfo["name"]}&price=${
        courseInfo["price"]
      }&hasParam=true&t=${t}&node=vertical`;
      if (process.env === "production") {
        this.callApp();
      }
      if(process.env.NODE_ENV==='development'){
        var host = "http://192.168.1.85:8090";
      }else{
        var host = "http://cdn.kids.immusician.com/web/music-base-h5/index.html";
      }
      
      
      this.toPayUrl = `${host}?${str}#/`;
      console.log(this.toPayUrl);
      //return;
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
          `${process.env.VUE_APP_COURSE_DETAIL}/v1/goods/detail?id=${
            this.urlParams.goodsId
          }`
        )
        .then(res => {
          console.log("zzz");
          this.loadingShow = false;
          console.log(this.loadingShow);
          this.courseInfo = res.data;
          this.urlParams.good_img = res.data.good_img;
          this.urlParams.user_count = res.data.user_count;
          if(this.courseInfo.outside_goods_info && this.courseInfo.outside_goods_info.online){
            this.haveOutsideGoods = true;
            this.outsideInfo = this.courseInfo.outside_goods_info;
          }
        });
    }
  }
};
</script>
<style lang="less">
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
  padding: 10px 16px;
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
</style>

