<template>
  <!-- <div class="page_wrapper">
    <Loading v-show="loadingShow"/>
    <Nav title="支付" left-text="返回" left-arrow/>
    <div class="section1 item_wrapper">
      <div class="item px1-bottom-ddd">
        <div class="item_left">
          <div class="item_title">{{this.courseInfo.name}}</div>
        </div>
        <div class="item_right price">¥{{courseInfo.price/100}}</div>
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
          v-show="courseInfo.price/100>=item.limit_money"
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
      <div :class="{'px1-bottom-ddd':!openInxxYYJ}" class="item" @click="payMethod = 'zfbPay'">
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
      <div class="item" @click="payMethod = 'wxPay'" v-show="!openInxxYYJ">
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
    <div class="bottom_pay_bar">
      <div class="bar_main">
        <span>¥ {{courseInfo.price/100 - this.discount}}</span>
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
    <div class="tip">温馨提示：优惠券与奖学金卡不能叠加使用，在支付前请您根据需要进行优惠方式的选择，选择后如若想更改请点击返回按钮，奖学金卡如果激活即视为生效，不能再次使用。</div>
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
        <img :src="good_img" alt>
      </div>
      <div class="right">
        <div class="goods_name">{{courseInfo.name}}</div>
        <div class="people">{{courseInfo.user_count}}人参加</div>
      </div>
      <div class="price">¥ {{courseInfo.price/100}}</div>
    </div>
    <div class="box box2">
      <div v-show="!hideJxj" class="item px1-bottom-f1" @click="couponsShow=!couponsShow">
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
          v-show="(courseInfo.price/100)>=item.limit_money"
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
      <div v-show="!hideYhq" class="item" @click="modalShow=true">
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
        @click="payMethod = 'hbfqPay'"
        v-if="hbfqList && hbfqList.length>0"
      >
        <div class="item_left">
          <div class="item_title">
            <img src="./../assets/img/icon_pay_hbfq.png" alt class="item_left_icon">花呗分期
          </div>
        </div>
        <div class="item_right">
          <img
            v-show="payMethod!='hbfqPay'"
            src="./../assets/img/new_pay/nochose.png"
            alt
            class="item_select_status"
          >
          <img
            v-show="payMethod=='hbfqPay'"
            src="./../assets/img/new_pay/chose.png"
            alt
            class="item_select_status"
          >
        </div>
      </div>
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
    <div class="pay_btn" @click="createOrder">立即支付 ¥ {{courseInfo.price/100 - this.discount}}</div>
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
    <div class="n_mask" @click="hbfqMaskShow=false" v-show="hbfqMaskShow"></div>
    <div :class="[hbfqMaskShow?'up':'down']" class="hbmask pop_wrapper new">
      <div class="hbmask_title">请选择分期</div>
      <div class="item_wrapper">
        <div @click="hbfqIndex=index" class="item" v-for="(item,index) in hbfqList" :key="index">
          <div class="item_left">
            <div
              class="money"
            >¥ {{showHbPeriodFee(courseInfo.price/100 - discount,item.rate,item.hb_fq_num)}}<span class="icon_multi"> &#215; </span>{{item.hb_fq_num}}期</div>
            <div
              class="money_tip"
            >手续费{{showHbServiceFee(courseInfo.price/100 - discount,item.rate,item.hb_fq_num)}}/期,费率{{showHbRate(item.rate)}}%</div>
          </div>
          <div class="item_right">
            <img
              v-show="hbfqIndex!=index"
              src="./../assets/img/new_pay/nochose.png"
              alt
              class="item_select_status"
            >
            <img
              v-show="hbfqIndex==index"
              src="./../assets/img/new_pay/chose.png"
              alt
              class="item_select_status"
            >
          </div>
        </div>
      </div>
      <div @click="createOrder" class="next_btn">下一步</div>
    </div>
  </div>
</template>
<script>
import Loading from "./../components/Loading";
import Nav from "../components/Nav";
import QRCode from "qrcode";
import {
  getQueryVariable,
  dateCount,
  toPayString,
  testPlat,
  openInxxYYJ,
  openApp,
  isIphonex
} from "./../utils/util.js";
export default {
  data() {
    return {
      hbfqMaskShow: false,
      payMethod: "hbfqPay",
      modalShow: false,
      couponsArr: [],
      selectedCoupons: "",
      couponsShow: false,
      courseInfo: {},
      loadingShow: false,
      urlParams: {},
      ipInfo: {
        ip: "暂未获取到"
      },
      //discount: 0,
      couponsDiscount: 0,
      bonusCode: "",
      bonusDiscount: "",
      openInxxYYJ: openInxxYYJ,
      qrSrc: "",
      qrModalShow: false,
      isIphonex: false,
      good_img: "",
      hideYhq: false,
      hideJxj: false,
      hbfqList: [],
      hbfqIndex: 0,
      hbfqUseConfig: {}
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
    //document.documentElement.style.fontSize = (16 / 375) * 100 + "vw";
    // if(window.innerWidth>600){
    //   document.documentElement.style.fontSize = (24 / 375) * 100 + "vw";
    // }else{
    //   document.documentElement.style.fontSize = (16 / 375) * 100 + "vw";
    // }
    console.log("-----1-----");
    this.hideYhq = getQueryVariable("hideYhq") === "1" ? true : false;
    this.hideJxj = getQueryVariable("hideJxj") === "1" ? true : false;
    this.good_img = getQueryVariable("good_img")
      ? getQueryVariable("good_img")
      : localStorage.getItem("good_img");
    this.isIphonex = isIphonex();
    console.log("-----2-----");
    if (openApp() === "yinji-school") {
      this.host = process.env.YINJISCHOOL + "/v2";
    } else {
      this.host = process.env.JINKANG + "/v1";
    }
    console.log("-----3-----");
    //获取花呗分期配置
    console.log("-----开始请求-----");
    this.getHbConfig(getQueryVariable('goodsId'))
    //this.getHbConfig("5e82dfe1521b200e2b476293");
  },
  mounted() {
    //this.qrModalShow = true
    if (window.innerWidth > 600) {
      document.documentElement.style.fontSize = (13 / 375) * 100 + "vw";
    } else {
      document.documentElement.style.fontSize = (16 / 375) * 100 + "vw";
    }
    if (getQueryVariable("hasParam")) {
      var courseInfo = {};
      courseInfo.name = decodeURI(getQueryVariable("name"));
      courseInfo.price = getQueryVariable("price");
      var urlParams = {};
      [
        "goodsId",
        "share_channel",
        "address",
        "phone",
        "uid",
        "token",
        "coupon_id",
        "user_count"
      ].forEach(e => {
        urlParams[e] = getQueryVariable(e);
      });
      this.courseInfo = courseInfo;
      this.urlParams = urlParams;
      if (!this.courseInfo.user_count) {
        this.courseInfo.user_count = this.urlParams.user_count;
      }

      this.axios.defaults.headers.common["token"] = this.urlParams.token;
      this.axios.defaults.headers.common["uid"] = this.urlParams.uid;
    } else {
      this.courseInfo = JSON.parse(localStorage.getItem("courseInfo"));
      this.urlParams = JSON.parse(localStorage.getItem("urlParams"));
      if (!this.courseInfo.user_count) {
        this.courseInfo.user_count = this.urlParams.user_count;
      }
    }
    this.getCoupons();
    this.getIp();
    this.downKeyBord();
  },
  methods: {
    getQueryVariable: getQueryVariable,
    showHbPeriodFee(total, rate, num) {
      let result = ((total * (1 + rate)) / num);
      return Math.floor(result * 100) / 100

    },
    showHbServiceFee(total, rate, num) {
      let result = ((total * rate) / num);
      return Math.floor(result * 100) / 100
    },
    showHbRate(num) {
      let result =  (num * 100);
      return Math.floor(result * 10) / 10
    },
    getHbConfig(id) {
      //5e82dfe1521b200e2b476293
      this.axios
        .get(`http://58.87.125.111:55555/v1/goods/ex_info/?id=${id}`)
        .then(res => {
          console.log('--getHbConfig-')
          console.log(res)
          if (!res.error) {
            this.hbfqUseConfig.used_coupon = res.data.used_coupon;
            this.hbfqUseConfig.used_promo = res.data.used_promo;
            this.hbfqList = res.data.config;
          }
        });
    },
    goBack() {
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
          `${this.host}/code_check?code=${this.bonusCode}&goods_id=${
            this.urlParams.goodsId
          }&type=1`
        )
        .then(res => {
          if (!res.error) {
            this.bonusDiscount = res.data.amount;
            this.selectedCoupons = "";
            this.couponsDiscount = 0;
          }
        });
    },
    ifCoupons() {
      var coupon_id = this.urlParams.coupon_id;
      if (coupon_id) {
        this.couponsArr.forEach((e, i) => {
          if (coupon_id === e._id) {
            this.couponsShow = true;
            this.selectCoupon(i);
          }
        });
      }
    },
    dateCount: dateCount,
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
      console.log(this.urlParams)
      this.axios
        .get(
          `${this.host}/web_buy_coupon?id=${
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
        console.log("---ip---");
        this.ipInfo = res;
        console.log(res);
        console.log("---ip---");
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
        instrument_type: this.courseInfo.instrument_type
      };

      if (
        (getQueryVariable("from") === "youxuepai" ||
          getQueryVariable("qr_mode") == 1) &&
        this.payMethod == "wxPay"
      ) {
        params.qr_mode = 1;
      }
      //是否使用优惠券 是否使用奖学金
      if (this.selectedCoupons !== "") {
        params.coupon_id = this.couponsArr[this.selectedCoupons]._id;
        params.promo = "";
      } else if (this.bonusDiscount !== "" || this.bonusDiscount !== 0) {
        params.promo = this.bonusCode.trim();
        params.coupon_id = "";
      }
      if (this.payMethod === "wxPay") {
        params.channel = "wx";
      } else if (this.payMethod === "zfbPay") {
        params.channel = "alipay";
      } else if (this.payMethod === "hbfqPay") {
        if (this.hbfqMaskShow) {
          //花呗分期优惠券和奖学金逻辑
          if (!this.hbfqUseConfig.used_promo && params.promo) {
            this.$dialog.alert({
              message: "该商品暂不支持花呗分期和奖学金同时使用"
            });
            return;
          }
          if (!this.hbfqUseConfig.used_coupon && params.coupon_id) {
            this.$dialog.alert({
              message: "该商品暂不支持花呗分期和优惠券同时使用"
            });
            return;
          }
          let curHbItem = this.hbfqList[this.hbfqIndex];
          params.channel = "alipay";
          params.hb_fq_seller_percent = curHbItem.hb_fq_seller_percent;
          params.hb_fq_num = curHbItem.hb_fq_num;
        } else {
          this.hbfqMaskShow = true;
          return;
        }
      }
      params.goods = `${this.urlParams.goodsId},课程,1`;
      console.log(params);
      //return;
      var that = this;
      console.log("--------------");
      console.log(window.navigator.userAgent);
      console.log("--------------");
      this.axios.post(`${this.host}/payment/create/`, params).then(res => {
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
    countHbfqMaskShow(){
      this.axios
        .get(`http://58.87.125.111:55555/v1/payment/clicked/?goods_id=${getQueryVariable('goodsId')}&uid=${getQueryVariable('uid')}`)
        .then(res => {
          console.log('--getHbConfig-')
          console.log(res)
          if (!res.error) {
            this.hbfqUseConfig.used_coupon = res.data.used_coupon;
            this.hbfqUseConfig.used_promo = res.data.used_promo;
            this.hbfqList = res.data.config;
          }
        });
    }
  },
  watch:{
    hbfqMaskShow(){
      if(this.hbfqMaskShow){
        this.countHbfqMaskShow()
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./../assets/css/common.less");
@import url("./../assets/css/pay.less");
// .tip {
//   margin-top: 30px;
//   padding: 0 15px;
//   font-family: PingFangSC-Regular;
//   font-size: 22px;
//   color: #999999;
//   letter-spacing: 1.17px;
//   line-height: 33px;
// }
////
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
  box-sizing: border-box;
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
        transition: transform 0.15s;
        width: 10px;
        height: 20px;
      }
      .item_right_value {
        margin-right: 20px;
        font-family: PingFangSC-Medium;
        font-size: 22px;
        color: #ee525b;
      }
      .item_right_value.no_value {
        font-size: 28px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
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
//花呗弹窗
.n_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
}
.pop_wrapper.new {
  position: fixed;
  left: 0;
  bottom: -100vh;
  width: 100%;
  background-color: #fff;
  transition: all 0.5s;
  border-radius: 15px 15px 0 0;
  z-index: 100000;
}
.pop_wrapper.down {
  bottom: -100vh;
}
.pop_wrapper.up {
  bottom: 0;
}
.hbmask {
  .hbmask_title {
    margin: 16px 0;
    text-align: center;
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(160, 87, 6, 1);
  }
  .item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    .icon_multi{
      //display: inline-block;
      position: relative;
      top:-2px;
      //margin-bottom: 2px;
    }
    .money {
      font-size: 36px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .money_tip {
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .item_select_status {
      width: 48px !important;
      height: 48px !important;
    }
    .item_select_status.no_sel_div {
      width: 48px !important;
      height: 48px !important;
      border: 2px solid rgba(204, 204, 204, 1);
      border-radius: 50%;
    }
  }
  .next_btn {
    margin: 40px auto 60px auto;
    width: 420px;
    height: 88px;
    line-height: 88px;
    border-radius: 44px;
    background-color: #ffe649;
    text-align: center;
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 38, 38, 1);
  }
}
</style>


