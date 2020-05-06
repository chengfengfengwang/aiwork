<template>
  <div>
    <Loading v-on:toggleLoading="toggleLoading" v-show="loadingShow"/>
    <router-view/>
  </div>
</template>
<script>
import Loading from "./../../components/Loading";
import { getQueryVariable, isIphonex } from "../../common/util.js";
export default {
  data() {
    return {
      isIphonex: false,

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
    document.title='北师大高参小巡演欣赏歌单'
  },
  methods: {
    toggleLoading(status) {
      this.loadingShow = status;
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

.bottom_wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1999;
}
.bottom_pay_bar {
  height: 50px;
  display: flex;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  .bar_main {
    //display: flex;
    flex-direction: column;
    //justify-content: center;
    background-color: #fff;
    flex-grow: 0;
    width: 61%;
    //justify-content: space-around;
    padding: 7px 7px;
    .bar_main_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 15px !important;
      .course_title {
        flex-grow: 0;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #333333;
        line-height: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        //width: 76%;
        margin-right: 2px;
      }
      .origin_price {
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #999999;
        text-decoration: line-through;
      }
    }
    .bar_main_bottom {
      display: flex;
      align-items: center;
      font-size: 11px;
      .buy_num {
        flex-grow: 1;
        font-size: 11px;
        color: #999999;
      }
      .now_price {
        .text {
          font-size: 11px;
          color: #333333;
        }
        .num {
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #ec545e;
        }
      }
    }
  }
  .bar_btn {
    background: #ee525b;
    width: 39%;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    line-height: 50px;
  }
}
</style>

