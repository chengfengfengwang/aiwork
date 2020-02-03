<template>
  <!-- <div class="page_wrapper">
    <Loading v-show="loadingShow"/>
    <div class="section1 item_wrapper" :style="{paddingTop:isIphonex?'20px':'0px'}">
      <div class="item px1-bottom-ddd">
        <div class="item_left">
          <div class="item_title">{{this.urlParams.name}}</div>
        </div>
        <div class="item_right price">¥{{this.urlParams.price/100}}</div>
      </div>
      <div class="item px1-bottom-ddd" @click="couponsShow=!couponsShow">
        <div class="item_left">
          <div class="item_title">优惠券</div>
        </div>
        <div class="item_right">
          <span class="item_right_value" v-show="selectedCoupons!==''">-¥{{couponsDiscount}}</span>
          <img
            src="./../assets/img/icon_common_more.png"
            alt
            :class="{rotate:couponsShow}"
            class="item_arrow"
          >
        </div>
      </div>
      <div class="coupons_container" v-show="couponsShow">
        <div v-show="couponsArr.length==0" class="no-coupons">暂无优惠券</div>
        <div
          class="coupons"
          v-for="(item,index) in couponsArr"
          v-show="(urlParams.price/100)>=item.limit_money"
          :key="index"
          @click="selectCoupon(index)"
        >
          <div class="coupons_left">¥{{item.coupon_value}}</div>
          <div class="coupons_right">
            <div class="coupons_right_info">
              <div class="coupons_name">{{item.name}}</div>
              <div class="coupons_use_area">{{item.describe}}</div>
              <div class="coupons_left_time">{{dateCount(item.end_time)}}</div>
            </div>
            <div class="coupons_select">
              <img v-show="selectedCoupons===index" src="./../assets/img/coupons_select.png" alt>
              <img v-show="selectedCoupons!==index" src="./../assets/img/coupons_no_select.png" alt>
            </div>
          </div>
        </div>
      </div>
      <div class="item" @click="modalShow=true">
        <div class="item_left">
          <div class="item_title">奖学金</div>
        </div>
        <div class="item_right">
          <span class="item_right_value" v-show="bonusDiscount">-¥{{bonusDiscount}}</span>
          <img src="./../assets/img/icon_common_more.png" alt class="item_arrow">
        </div>
      </div>
    </div>
    <div class="section2 item_wrapper">
      <div :class="{'px1-bottom-ddd':!openInxxYYJ}" class="item px1-bottom-ddd" @click="payMethod = 'zfbPay'">
        <div class="item_left">
          <div class="item_title">
            <img src="./../assets/img/icon_pay_alypay.png" alt class="item_left_icon">支付宝
          </div>
        </div>
        <div class="item_right">
          <img
            v-show="payMethod!='zfbPay'"
            src="./../assets/img/icon_common_select_nm.png"
            alt
            class="item_select_status"
          >
          <img
            v-show="payMethod=='zfbPay'"
            src="./../assets/img/icon_common_select_act.png"
            alt
            class="item_select_status"
          >
        </div>
      </div>
      <div v-show="!openInxxYYJ" class="item" @click="payMethod = 'wxPay'">
        <div class="item_left">
          <div class="item_title">
            <img src="./../assets/img/icon_pay_wechat.png" alt class="item_left_icon">微信支付
          </div>
        </div>
        <div class="item_right">
          <img
            v-show="payMethod!='wxPay'"
            src="./../assets/img/icon_common_select_nm.png"
            alt
            class="item_select_status"
          >
          <img
            v-show="payMethod=='wxPay'"
            src="./../assets/img/icon_common_select_act.png"
            alt
            class="item_select_status"
          >
        </div>
      </div>
    </div>
    <div class="tip">温馨提示：优惠券与奖学金卡不能叠加使用，在支付前请您根据需要进行优惠方式的选择，选择后如若想更改请点击返回按钮，奖学金卡如果激活即视为生效，不能再次使用。</div>
    <div class="bottom_pay_bar">
      <div class="bar_main">
        <span>¥ {{this.urlParams.price/100 - this.discount}}</span>
        <span class="discount" v-show="discount!==0">已优惠 ¥{{this.discount}}</span>
      </div>
      <div class="bar_btn" @click="createOrder">立即支付</div>
    </div>
    <div ref="mask" class="mask" v-show="modalShow"></div>
    <div ref="modal" class="modal" v-show="modalShow">
      <div class="close_icon" @click="modalShow=false">
        <img src="./../assets/img/icon_toaster_close.png" alt>
      </div>
      <div class="modal_title">奖学金</div>
      <div class="modal_tip">可在官方渠道合作处获取奖学金</div>
      <input ref="myInput" v-model="bonusCode" @blur="onBlur" type="text" placeholder="请输入奖学金码">
      <div class="modal_btn" @click="closeModal">完成</div>
    </div>
    <div class="mask" v-show="qrModalShow"></div>
    <div class="modal" v-show="qrModalShow">
      <div class="close_icon" @click="qrModalShow=false">
        <img src="./../assets/img/icon_toaster_close.png" alt>
      </div>
      <div class="modal_title">扫码支付</div>
      <div>
        <img :src="qrSrc" alt="" class="qr">
      </div>
      <div class="modal_btn" @click="paySuccess">支付完成</div>
    </div>
  </div>-->
  <div class="page">
    <Loading v-show="loadingShow"/>
    <div class="nav" :style="{marginTop:isIphonex?'20px':'0px'}">
      <div @click="goBack" class="back_icon">
        <img src="../assets/img/new_pay/back.jpg" alt>
      </div>
      <div class="nav_text">支付</div>
    </div>
    <div class="curve">
      <img src="../assets/img/new_pay/curve.png" alt>
    </div>
    <div class="box box1">
      <div class="left">
        <img :src="urlParams.good_img" alt>
      </div>
      <div class="right">
        <div class="goods_name">{{this.urlParams.name}}</div>
        <div class="people">{{urlParams.user_count}}人参加</div>
      </div>
      <div class="price">¥ {{this.urlParams.price/100}}</div>
    </div>
    <div class="box box2">
      <div class="item px1-bottom-f1" @click="couponsShow=!couponsShow">
        <div class="item_left">
          <div class="item_title">优惠券</div>
        </div>
        <div class="item_right">
          <span v-show="couponsArr.length==0" class="item_right_value no_value">暂无优惠券</span>
          <span class="item_right_value" v-show="selectedCoupons!==''">-¥{{couponsDiscount}}</span>
          <img
            src="./../assets/img/icon_common_more.png"
            alt
            :class="{rotate:couponsShow}"
            class="item_arrow"
          >
        </div>
      </div>
      <div class="coupons_container" v-show="couponsShow">
        <div v-show="couponsArr.length==0" class="no-coupons">暂无优惠券</div>
        <div
          class="coupons"
          v-for="(item,index) in couponsArr"
          v-show="(urlParams.price/100)>=item.limit_money"
          :key="index"
          @click="selectCoupon(index)"
        >
          <div class="coupons_left">¥{{item.coupon_value}}</div>
          <div class="coupons_right">
            <div class="coupons_right_info">
              <div class="coupons_name">{{item.name}}</div>
              <div class="coupons_use_area">{{item.describe}}</div>
              <div class="coupons_left_time">{{dateCount(item.end_time)}}</div>
            </div>
            <div class="coupons_select">
              <img v-show="selectedCoupons===index" src="./../assets/img/coupons_select.png" alt>
              <img v-show="selectedCoupons!==index" src="./../assets/img/coupons_no_select.png" alt>
            </div>
          </div>
        </div>
      </div>
      <div class="item" @click="modalShow=true">
        <div class="item_left">
          <div class="item_title">奖学金</div>
        </div>
        <div class="item_right">
          <span class="item_right_value" v-show="bonusDiscount">-¥{{bonusDiscount}}</span>
          <img src="./../assets/img/icon_common_more.png" alt class="item_arrow">
        </div>
      </div>
    </div>
    <div class="box box3">
      <div
        :class="{'px1-bottom-ddd':!openInxxYYJ}"
        class="item px1-bottom-f1"
        @click="payMethod = 'zfbPay'"
      >
        <div class="item_left">
          <div class="item_title">
            <img src="./../assets/img/icon_pay_alypay.png" alt class="item_left_icon">支付宝
          </div>
        </div>
        <div class="item_right">
          <img
            v-show="payMethod!='zfbPay'"
            src="./../assets/img/new_pay/nochose.png"
            alt
            class="item_select_status"
          >
          <img
            v-show="payMethod=='zfbPay'"
            src="./../assets/img/new_pay/chose.png"
            alt
            class="item_select_status"
          >
        </div>
      </div>
      <div v-show="!openInxxYYJ" class="item" @click="payMethod = 'wxPay'">
        <div class="item_left">
          <div class="item_title">
            <img src="./../assets/img/icon_pay_wechat.png" alt class="item_left_icon">微信支付
          </div>
        </div>
        <div class="item_right">
          <img
            v-show="payMethod!='wxPay'"
            src="./../assets/img/new_pay/nochose.png"
            alt
            class="item_select_status"
          >
          <img
            v-show="payMethod=='wxPay'"
            src="./../assets/img/new_pay/chose.png"
            alt
            class="item_select_status"
          >
        </div>
      </div>
    </div>
    <div class="tip">
      <div class="tip_icon">
        <img src="../assets/img/new_pay/tip.png" alt>
      </div>
      <div
        class="tip_content"
      >温馨提示：优惠券与奖学金卡不能叠加使用，在支付前请您根据需要进行优惠方式的选择，选择后如若想更改请点击返回按钮，奖学金卡如果激活即视为生效，不能再次使用。</div>
    </div>
    <div class="pay_btn" @click="createOrder">立即支付 ¥ {{this.urlParams.price/100 - this.discount}}</div>
    <div ref="mask" class="mask" v-show="modalShow"></div>
    <div ref="modal" class="modal" v-show="modalShow">
      <div class="close_icon" @click="modalShow=false">
        <img src="./../assets/img/icon_toaster_close.png" alt>
      </div>
      <div class="modal_title">奖学金</div>
      <div class="modal_tip">可在官方渠道合作处获取奖学金</div>
      <input ref="myInput" v-model="bonusCode" @blur="onBlur" type="text" placeholder="请输入奖学金码">
      <div class="modal_btn" @click="closeModal">完成</div>
    </div>
    <div class="mask" v-show="qrModalShow"></div>
    <div class="modal" v-show="qrModalShow">
      <div class="close_icon" @click="qrModalShow=false">
        <img src="./../assets/img/icon_toaster_close.png" alt>
      </div>
      <div class="modal_title">扫码支付</div>
      <div>
        <img :src="qrSrc" alt class="qr">
      </div>
      <div class="modal_btn" @click="paySuccess">支付完成</div>
    </div>
  </div>
</template>
<script>
import { isIphonex, openInxxYYJ, openInXYB } from "../utils/util.js";
import Loading from "./../components/Loading";
import Nav from "../components/Nav";
import QRCode from "qrcode";
import {
  getQueryVariable,
  dateCount,
  toPayString,
  testPlat
} from "./../utils/util.js";
export default {
  data() {
    return {
      payMethod: "zfbPay",
      modalShow: false,
      couponsArr: [],
      selectedCoupons: "",
      couponsShow: false,
      loadingShow: false,
      urlParams: {},
      ipInfo: {
        ip: "暂未获取到"
      },
      isIphonex: false,
      couponsDiscount: 0,
      bonusCode: "",
      bonusDiscount: "",
      openInxxYYJ: openInxxYYJ,
      qrSrc: "",
      qrModalShow: false
    };
  },
  components: {
    Loading,
    Nav
  },
  computed: {
    discount() {
      return Number(this.bonusDiscount) + Number(this.couponsDiscount);
    }
  },
  created() {
    this.isIphonex = isIphonex();
  },
  mounted() {
    //   goodsId: 题库商品id
    //   share_channel: 支付参数share_channel
    //   address: 支付参数address
    //   phone: 支付参数phone
    //   uid:
    //   token:
    //   instrument_type: 乐器类型
    //   name: 题库名称
    //   price: 价格，单位分
    console.log("--" + location.href + "--");
    //console.log(getQueryVariable("user_count"))
    this.urlParams = {
      goodsId: getQueryVariable("goodsId"),
      share_channel: getQueryVariable("share_channel"),
      address: getQueryVariable("address"),
      phone: getQueryVariable("phone"),
      uid: getQueryVariable("uid"),
      token: getQueryVariable("token"),
      instrument_type: getQueryVariable("instrument_type"),
      name: decodeURI(getQueryVariable("name")),
      price: getQueryVariable("price"),
      coupon_id: getQueryVariable("coupon_id"),
      user_count: getQueryVariable("user_count"),
      good_img:localStorage.getItem('good_img')
    };
    this.axios.defaults.headers.common["token"] = this.urlParams.token;
    this.axios.defaults.headers.common["uid"] = this.urlParams.uid;
    this.getCoupons();
    this.getIp();
    this.downKeyBord();
  },
  methods: {
    dateCount: dateCount,
    goBack(){
      history.go(-1);
    },
    paySuccess() {
      var isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        window.webkit.messageHandlers.onBuyClick.postMessage({
          onBuyClick: "ture"
        });
      } else {
        PayFeedBack.onPaySuccess(this.paySuccessMsg);
      }
      this.qrModalShow = false;
    },
    downKeyBord() {
      this.$refs.modal.addEventListener("touchstart", e => {
        //console.log("click出发");
        if (e.target.tagName === "INPUT") {
          return;
        }
        setTimeout(() => {
          this.$refs.myInput.blur();
        }, 100);
      });
      this.$refs.mask.addEventListener("touchstart", e => {
        setTimeout(() => {
          this.$refs.myInput.blur();
        }, 100);
      });
    },
    onBlur() {
      window.scroll(0, 0);
    },
    closeModal() {
      this.modalShow = false;
      this.axios
        .get(
          `${process.env.XIAOPO}/v1/code_check?code=${
            this.bonusCode
          }&goods_id=${this.urlParams.goodsId}&type=1`
        )
        .then(res => {
          if (!res.error) {
            this.bonusDiscount = res.data.amount;
            this.selectedCoupons = "";
            this.couponsDiscount = 0;
          } else {
            this.bonusDiscount = 0;
            this.selectedCoupons = "";
            this.couponsDiscount = 0;
          }
        });
    },
    selectCoupon(index) {
      if (this.selectedCoupons === index) {
        this.selectedCoupons = "";
      } else {
        this.selectedCoupons = index;
      }
      if (this.selectedCoupons === "") {
        this.couponsDiscount = 0;
      } else {
        this.couponsDiscount = this.couponsArr[
          this.selectedCoupons
        ].coupon_value;
        this.bonusDiscount = 0;
      }
    },
    getCoupons() {
      this.loadingShow = true;
      this.axios
        .get(
          `${process.env.JINKANG}/v1/web_buy_coupon?id=${
            this.urlParams.goodsId
          }&coupon_type=0`
        )
        .then(res => {
          this.loadingShow = false;
          this.couponsArr = res.data;
          this.ifCoupons();
          //this.couponsArr.concat(JSON.parse(JSON.stringify(res.data)));
        });
    },
    getIp() {
      this.axios.get("http://ipinfo.io").then(res => {
        this.ipInfo = res;
      });
    },
    createOrder() {
      var params = {
        bundle_id: "com.immusician.musiclass",
        phone: this.urlParams.phone,
        goods: "",
        address: decodeURI(this.urlParams.address),
        promo: "", //奖学金
        coupon_id: "", //优惠券ID
        channel: "", //支付方式
        message: "", //备注信息
        client_ip: this.ipInfo ? this.ipInfo.ip : "暂未获取到", //ip
        share_channel: this.urlParams.share_channel, //合作厂商
        platform: testPlat(),
        instrument_type: this.urlParams.instrument_type
      };
      if (this.payMethod === "wxPay") {
        params.channel = "wx";
      } else {
        params.channel = "alipay";
      }
      if (
        (getQueryVariable("from") === "youxuepai" ||
          getQueryVariable("qr_mode") == 1) &&
        this.payMethod == "wxPay"
      ) {
        params.qr_mode = 1;
      }
      //是否使用优惠券
      if (this.selectedCoupons !== "") {
        params.coupon_id = this.couponsArr[this.selectedCoupons]._id;
        params.promo = "";
      } else if (this.bonusDiscount !== "" || this.bonusDiscount !== 0) {
        params.promo = this.bonusCode.trim();
        params.coupon_id = "";
      }
      params.goods = `${this.urlParams.goodsId},教材,1`;
      console.log(params);
      //return;
      var that = this;
      if (openInXYB) {
        var payUrl = `http://api.school.immusician.com/v2/payment/create/`;
      } else {
        var payUrl = `${process.env.JINKANG}/v1/payment/create/`;
      }

      this.axios.post(payUrl, params).then(res => {
        console.log("----订单信息-----");
        console.log(res.data);
        if (res.error) {
          //alert(res.msg);
          that.$dialog.alert({ message: res.msg });
          return;
        }
        if (
          (getQueryVariable("from") === "youxuepai" ||
            getQueryVariable("qr_mode") == 1) &&
          that.payMethod == "wxPay"
        ) {
          that.paySuccessMsg = `0-${res.data.amount}-${
            res.data.channel
          }-${getQueryVariable("goodsId")}-1`;
          QRCode.toDataURL(res.data.credential.wx_pub_qr, {
            margin: 1,
            width: 120
          })
            .then(url => {
              that.qrSrc = url;
              that.qrModalShow = true;
            })
            .catch(err => {
              console.error(err);
            });
          return;
        } else {
          console.log("=----to location");
          window.location.href =
            "pay://" +
            toBase64.btoa(encodeURI(encodeURI(JSON.stringify(res.data))));
        }
      });
    },
    ifCoupons() {
      var coupon_id = this.urlParams.coupon_id;
      if (coupon_id) {
        this.couponsArr.forEach((e, i) => {
          if (coupon_id === e._id) {
            console.log("qwq");
            this.couponsShow = true;
            this.selectCoupon(i);
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./../assets/css/common.less");
@import url("./../assets/css/pay.less");
* {
  box-sizing: border-box;
}
// .tip {
//   margin-top: 30px;
//   padding: 0 15px;
//   font-family: PingFangSC-Regular;
//   font-size: 22px;
//   color: #999999;
//   letter-spacing: 1.17px;
//   line-height: 33px;
// }
///////
.page {
  background-color: #78cf7b;
  min-height: 100vh;
}
.box,
.tip {
  top: -10px;
}
.nav {
  box-sizing: content-box;
  position: relative;
  z-index: 1;
  background-color: #fffcef;
  .back_icon {
    position: absolute;
    left: 30px;
    top: 30px;
    img {
      width: 80px;
    }
  }
  padding-bottom: 20px;
  height: 130px;
  line-height: 130px;
  text-align: center;
  font-size: 40px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(160, 87, 6, 1);
}
.curve {
  position: absolute;
  width: 100%;
  left: 0;
  top: 10px;
  z-index: 0;
  img {
    width: 100%;
  }
  background-color: #78cf7b;
}
.box {
  position: relative;
  width: 700px;
  margin: 0 auto 20px auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
}
.box1 {
  // margin-top: 200px;
  display: flex;
  align-items: center;
  padding: 32px;
  .price {
    position: absolute;
    right: 40px;
    top: 40px;
    font-size: 32px;
    font-family: PingFangSC-Semibold;
    font-weight: 500;
    color: rgba(255, 38, 38, 1);
  }
  .left {
    flex-grow: 0;
    margin-right: 32px;
    img {
      width: 160px;
      height: 160px;
      border-radius: 12px;
    }
  }
  .right {
    .goods_name {
      margin-bottom: 10px;
      font-size: 32px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-right: 120px;
    }
    .people {
      font-size: 24px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
}
.box {
  .item {
    display: flex;
    align-items: center;
    margin-left: 32px;
    padding: 30px 30px 30px 0;
    //.px1-bottom-ddd;
    .item_left {
      flex-grow: 1;
      .item_title {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .item_left_icon {
        width: 64px;
        height: 64px;
        margin-right: 24px;
      }
    }
    .item_right {
      display: flex;
      align-items: center;
      .item_arrow {
        transition: transform 0.2s;
        width: 10px;
        height: 20px;
      }
      .item_right_value {
        margin-right: 20px;
        font-family: PingFangSC-Medium;
        font-size: 22px;
        color: #ee525b;
      }
      .item_right_value.no_value{
        font-size:28px;
        font-family:PingFang-SC-Regular,PingFang-SC;
        font-weight:400;
        color:rgba(153,153,153,1);
      }
      .item_select_status {
        width: 48px;
        height: 48px;
      }
      .item_select_status.no_sel_div {
        border: 2px solid rgba(204, 204, 204, 1);
        border-radius: 50%;
      }
    }

    .sub_info {
      margin-top: 20px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      letter-spacing: 0;
      line-height: 24px;
    }
  }
}
.tip {
  width: 700px;
  margin: 0 auto 20px auto;
  position: relative;
  display: flex;
  .tip_icon {
    margin: 2px 10px 0 3px;
    flex-grow: 0;
    img {
      width: 32px;
      height: 32px;
    }
  }
  .tip_content {
    font-size: 24px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(37, 145, 41, 1);
    line-height: 36px;
  }
}
.pay_btn {
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: 60px;
  width: 686px;
  height: 88px;
  background: rgba(255, 230, 73, 1);
  border-radius: 44px;
  text-align: center;
  line-height: 88px;
  font-size: 36px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: rgba(255, 38, 38, 1);
}
</style>