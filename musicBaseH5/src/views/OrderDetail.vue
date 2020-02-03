<template>
  <div id="courseDetail">
    <div class="top_wrapper">
      <div class="goods">
        <div class="goods_img">
          <img
            :src="orderDetail.goods_cover"
            alt
          >
        </div>
        <div>
          <div class="goods_name">{{orderDetail.goods_name}}</div>
          <div class="price">¥{{orderDetail.order_amount / 100}} × {{orderDetail.count}}</div>
        </div>
      </div>
      <div class="money_info phone">
        <div class="row_item">
          <div class="row_label">商品总价</div>
          <div class="row_value">¥{{orderDetail.order_amount * orderDetail.count / 100}}</div>
        </div>
        <div class="row_item px1-bottom-d9">
          <div class="row_label">优惠券</div>
          <div class="row_value">-¥{{orderDetail.coupon_amount / 100}}</div>
        </div>
        <div class="row_item real_price_row">
          <div class="row_label">实际付款</div>
          <div class="row_value real_price">¥{{orderDetail.pay_amount / 100}}</div>
        </div>
      </div>
      <div class="money_info ipad">
        <div class="row_item">
          <div class="row_label">商品总价：</div>
          <div class="row_value">¥{{orderDetail.order_amount * orderDetail.count / 100}}</div>
        </div>
        <div class="row_item">
          <div class="row_label">优惠券：</div>
          <div class="row_value">-¥{{orderDetail.coupon_amount / 100}}</div>
        </div>
        <div class="row_item real_price_row">
          <div class="row_label">实际付款：</div>
          <div class="row_value real_price">¥{{orderDetail.pay_amount / 100}}</div>
        </div>
      </div>
    </div>
    <div class="address">
      <div class="address_wrapper">
        <div class="icon">
          <img src="./../assets/img/address.png" alt>
        </div>
        <div class="address_main">
          <div>
            <span class="name">{{orderDetail.receiver}}</span>
            <span class="phone">{{orderDetail.phone}}</span>
          </div>
          <div class="address_detail">{{orderDetail.location + ' ' + orderDetail.address}}</div>
        </div>
      </div>
    </div>
    <div class="other_info_wrapper">
      <div class="title">订单信息</div>
      <div class="other_info">订单编号：{{orderDetail._id}}</div>
      <div class="other_info">支付方式：{{orderDetail.channel=='alipay'?'支付宝':'微信支付'}}</div>
      <div class="other_info">支付时间：{{orderDetail.pay_time}}</div>
    </div>
  </div>
</template>
<script>
import { setRem } from "./../utils/util.js";
import { getQueryVariable } from "../utils/util.js";

export default {
  data() {
    return {
      urlParams: {},
      id:'',
      orderDetail:{}
    };
  },
  created() {
    if (document.body.clientWidth > 700) {
      document.documentElement.style.fontSize = "22px";
    } else {
      document.documentElement.style.fontSize = "16px";
    }
    this.urlParams = {
      uid: getQueryVariable("uid"),
      token: getQueryVariable("token")
    };
    this.id = getQueryVariable("id");
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      this.axios.get(`${process.env.JINKANG}/v1/payment/orders/?id=${this.id}`,{
        headers:this.urlParams
      }).then(res => {
        this.orderDetail = res.data
      });
    }
  },
  destroyed() {
    setRem();
    //document.documentElement.style.fontSize = "18px";
  }
};
</script>
<style lang="less" scoped>
@media screen and (max-width: 900px) {
  .money_info.ipad {
    display: none;
  }
  .top_wrapper {
    padding-bottom: 0px;
  }
}
@media screen and (min-width: 900px) {
  .money_info.phone {
    display: none;
  }
  .top_wrapper {
    padding-bottom: 80px;
  }
  .real_price_row {
    //font-size: 48px !important
  }
  .row_item {
    padding: 8px 30px !important;
  }
}
.money_info.ipad {
  position: absolute;
  top: 85px;
  right: 30px;
}
.top_wrapper {
  position: relative;
}
.other_info_wrapper {
  padding: 26px 30px 90px 30px;
  .title {
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #333333;
    margin-bottom: 30px;
  }
  .other_info {
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #666666;
    margin-bottom: 16px;
  }
}
#courseDetail {
  padding: 30px 0px 0 0px;
  background-color: #fff;
}
.goods {
  display: flex;
  align-items: center;
  align-content: center;
  margin-bottom: 50px;
  padding: 0 30px;
  .goods_img {
    width: 150px;
    //height: 150px;
    margin-right: 30px;
    //background-color: #000;
    img {
      width: 100%;
    }
  }
  .goods_name {
    font-size: 30px;
    color: #333333;
    font-family: PingFangSC-Medium;
    margin-bottom: 34px;
  }
  .price {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #666666;
  }
}
.row_item {
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
}
.real_price {
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #ec535b;
}
.real_price_row {
  //margin-bottom: 20px;
}
.address {
  overflow: hidden;
  background-color: #f7f7f7;

  .address_wrapper {
    margin: 20px 0;
    padding: 30px;
    display: flex;
    align-items: center;
    background-color: #fff;
  }

  .icon {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .address_main {
    .name {
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #333333;
    }
    .phone {
      font-family: PingFangSC-Regular;
      font-size: 26px;
      color: #666666;
    }
    .address_detail {
      margin-top: 10px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #666666;
    }
  }
}
</style>



