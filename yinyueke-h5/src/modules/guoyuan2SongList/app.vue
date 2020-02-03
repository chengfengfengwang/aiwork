<template>
  <div>
    <keep-alive include="home,test">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import { getQueryVariable, isIphonex } from "../../common/util.js";
export default {
  data() {
    return {
      isIphonex: false,

      loadingShow: false
    };
  },
  components: {
    
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
    
  },
  methods: {
    toggleLoading(status) {
      this.loadingShow = status;
    }
  }
};
</script>
<style lang="less">
// @import url("./../../common/common.less");
// .font-size(@sizeValue:16) {
//   @vw: 16 / 375 * 100;
//   @result: @sizeValue / 16 * @vw;
//   font-size: ~"@{result}vw";
// }
// html {
//   .font-size(16);
// }
// html {
//   @media screen and (max-width: 320px) {
//     .font-size(16);
//   }
//   @media screen and (min-width: 480px) {
//     .font-size(13);
//   }
// }

*{
  box-sizing: border-box;
}
</style>

