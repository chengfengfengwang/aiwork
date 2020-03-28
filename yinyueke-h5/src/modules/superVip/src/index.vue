<template>
  <div class="page">
    <img v-for="(myimg,index) in imgArr" :key="index" :src="myimg" alt />
    <div class="next_btn_wrapper">
      <div class="next_btn" @click="goNext">立即购买</div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable, platForm } from "../../../common/util.js";
export default {
  data() {
    return {
      imgArr: []
    };
  },
  created() {
    for (var i = 1; i < 17; i++) {
      this.imgArr.push(require("../../../assets/img/superVip/" + i + ".jpg"));
    }
    if (getQueryVariable("from") === "banner") {
      this.urlParams = {
        goodsId: getQueryVariable("goodsId"),
        share_channel: getQueryVariable("share_channel"),
        address: getQueryVariable("address"),
        phone: getQueryVariable("phone"),
        uid: getQueryVariable("uid"),
        token: getQueryVariable("token"),
        coupon_id: getQueryVariable("coupon_id")
      };
      this.getVipPayUrl();
    }
  },
  mounted() {
    console.log(localStorage.getItem("vip_youzan_url"));
  },
  methods: {
    goNext() {
      if (getQueryVariable("from") === "banner") {
        console.log(this.resultUrl);
        //return;
        location.href = this.resultUrl;
      } else {
        console.log(localStorage.getItem("vip_youzan_url"));
        location.href = localStorage.getItem("vip_youzan_url");
      }
    },
    getVipPayUrl() {
      this.axios
        .get(
          `${process.env.VUE_APP_COURSE_DETAIL}/v1/goods/detail?id=${this.urlParams.goodsId}`
        )
        .then(res => {
          let e = res.data;
          if (e.buy_url) {
            this.resultUrl = e.buy_url;
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
            var host =
              "http://cdn.kids.immusician.com/web/music-base-h5/index.html";
            this.toPayUrl = `${host}?${str}#/`;
            this.resultUrl = this.toPayUrl;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./../../../common/common.less");
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
html,
body {
  width: 100%;
  height: 100%;
}
.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 0 0px;
  img {
    width: 100%;
  }
}
.next_btn_wrapper {
  z-index: 999;

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.05);
  padding: 15px 0;

  text-align: center;
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
</style>

