<template>
  <div id="appmain">
    <router-view/>
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
  provide() {
    return {
      status: getQueryVariable("status")
    };
  },
  components: {},
  created() {
    this.isIphonex = isIphonex();
    this.axios.defaults.headers.common["token"] = localStorage.getItem("token");
    this.axios.defaults.headers.common["uid"] = localStorage.getItem("uid");
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
// html {
//   @media screen and (max-width: 320px) {
//     .font-size(16);
//   }
//   @media screen and (min-width: 480px) {
//     .font-size(13);
//   }
// }

* {
  box-sizing: border-box;
}
#appmain {
  min-height: 100vh;
  background:rgba(248,248,248,1);
}
</style>

