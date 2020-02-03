<template>
  <div class="page_wrapper">
    <Loading v-show="loadingShow"/>
    <Nav title="支付" left-text="返回" left-arrow/>
    <div class="section1 item_wrapper">
      <div class="item px1-bottom-ddd">
        <div class="item_left">
          <div class="item_title">{{this.courseInfo.name}}</div>
          <!-- <div class="sub_info">N7老师，共10课时</div> -->
        </div>
        <div class="item_right price">¥{{courseInfo.price/100}}</div>
      </div>
      <div class="item px1-bottom-ddd" @click="couponsShow=!couponsShow">
        <div class="item_left">
          <div class="item_title">优惠券</div>
        </div>
        <div class="item_right">
          <span class="item_right_value" v-show="selectedCoupons!==''">-¥{{couponsDiscount}}</span>
          <!-- <span class="tag" v-show="couponsArr.length!=0">{{couponsArr.length}}个可用</span> -->
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
      <div v-show="addressShow" class="item" @click="$router.push('/Address')">
        <div class="item_left">
          <div class="item_title">{{receiver}} {{phone}}</div>
          <div class="address">{{location + ' '}}{{detailAddress}}</div>
        </div>
        <div class="item_right">
          <img src="./../assets/img/icon_common_more.png" alt class="item_arrow">
        </div>
      </div>
      <div v-show="!addressShow" class="no_address" @click="$router.push('/Address')">
        <img src="./../assets/img/add.png" alt>
        <div>添加收货信息</div>
      </div>
      <!-- <div class="item" @click="modalShow=true">
        <div class="item_left">
          <div class="item_title">奖学金</div>
        </div>
        <div class="item_right">
          <img src="./../assets/img/icon_common_more.png" alt class="item_arrow">
        </div>
      </div>-->
    </div>
    <div class="section2 item_wrapper">
      <div class="item px1-bottom-ddd" @click="payMethod = 'zfbPay'">
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
      <div class="item" @click="payMethod = 'wxPay'">
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
    <div class="mask" v-show="modalShow"></div>
    <div class="modal" v-show="modalShow">
      <div class="close_icon" @click="modalShow=false">
        <img src="./../assets/img/icon_toaster_close.png" alt>
      </div>
      <div class="modal_title">奖学金</div>
      <div class="modal_tip">可在官方渠道合作处获取奖学金</div>
      <input type="text" placeholder="请输入奖学金码">
      <div class="modal_link">
        <a href="#">
          <img src="./../assets/img/icon_toaster_howto.png" alt> 如歌获取
        </a>
      </div>
      <div class="modal_btn">完成</div>
    </div>
  </div>
</template>
<script>
import Loading from "./../components/Loading";
import Nav from "../components/Nav";
import { dateCount, toPayString, testPlat } from "./../utils/util.js";
export default {
  data() {
    return {
      payMethod: "zfbPay",
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
      receiver: "",
      phone: "",
      location: "",
      detailAddress: "",
      addressShow:false,
      discount: 0,
      couponsDiscount:0
    };
  },
  components: {
    Loading,
    Nav
  },
  created() {
    this.getLocalAddress();
  },
  mounted() {
    this.courseInfo = JSON.parse(localStorage.getItem("courseInfo"));
    this.urlParams = JSON.parse(localStorage.getItem("urlParams"));
    this.getCoupons();
    if (process.env.NODE_ENV === "production") {
        this.getIp();
      }
  },
  methods: {
    getLocalAddress() {
      var obj = {};
      if (localStorage.getItem("addressInfo")) {
        obj = JSON.parse(localStorage.getItem("addressInfo"));
        this.addressShow = true;
      }else{
        this.addressShow = false;
      }
      this.receiver = obj.receiver;
      this.phone = obj.phone;
      this.location = obj.location;
      this.detailAddress = obj.detailAddress;
    },
    dateCount: dateCount,
    selectCoupon(index) {
      if (this.selectedCoupons === index) {
        this.selectedCoupons = "";
      } else {
        this.selectedCoupons = index;
      }
      if (this.selectedCoupons === "") {
        this.discount = 0;
      } else {
        this.discount = this.couponsArr[this.selectedCoupons].coupon_value;
        this.couponsDiscount = this.couponsArr[this.selectedCoupons].coupon_value;
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
          this.couponsArr.concat(JSON.parse(JSON.stringify(res.data)));
          this.ifCoupons()
        });
    },
    getIp() {
      this.axios.get("http://ipinfo.io").then(res => {
        this.ipInfo = res;
      });
    },
    ifCoupons(){
      var coupon_id = this.urlParams.coupon_id;
      if(coupon_id){
        this.couponsArr.forEach((e,i)=>{
          if(coupon_id === e._id){
            this.couponsShow = true;
            this.selectCoupon(i)
          }
        })
      }
    },
    createOrder() {
      var params = {
        bundle_id: "com.immusician.musiclass",
        phone: this.phone,
        location:this.location,
        receiver:this.receiver,
        goods: "",
        address: this.detailAddress,
        promo: "", //奖学金
        coupon_id: "", //优惠券ID
        channel: "", //支付方式
        message: "", //备注信息
        client_ip: this.ipInfo ? this.ipInfo.ip : "暂未获取到", //ip
        share_channel: this.urlParams.share_channel, //合作厂商
        platform: testPlat(),
        instrument_type: this.courseInfo.instrument_type
      };
      if (this.payMethod === "wxPay") {
        params.channel = "wx";
      } else {
        params.channel = "alipay";
      }
      //是否使用优惠券
      if (this.selectedCoupons !== "") {
        params.coupon_id = this.couponsArr[this.selectedCoupons]._id;
      } 
      params.goods = `${this.urlParams.goodsId},教材,1`;
      console.log('--参数---')
      console.log(params);
      console.log('--参数---')
      if(!params.address){
        //alert('请点击地址栏填写地址');
        this.$dialog.alert({message: '请点击地址栏填写地址'});
        return
      }else if(!params.receiver){
        //alert('请点击地址栏填写收件人');
        this.$dialog.alert({message: '请点击地址栏填写收件人'});
        return
      }else if(!params.phone){
        //alert('请点击地址栏填写收件电话');
        this.$dialog.alert({message: '请点击地址栏填写收件电话'});
        return
      }
      //return;
      this.axios
        .post(`${process.env.JINKANG}/v1/payment/create/`, params)
        .then(res => {
          console.log("----订单信息-----");
          console.log(res.data);
          if(res.error){
            //alert(res.msg);
            this.$dialog.alert({message: res.msg});
            return
          }
          //return
          window.location.href =
            "pay://" +
            toBase64.btoa(encodeURI(encodeURI(JSON.stringify(res.data))));
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./../assets/css/common.less");
@import url("./../assets/css/pay.less");
.no_address{
  text-align: center;
}
</style>


