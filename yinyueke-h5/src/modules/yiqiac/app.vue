<template>
  <div>
    <router-view />
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
  components: {},
  created() {
    console.log('vvv')
    this.isIphonex = isIphonex();
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
html,
body {
  width: 100%;
  height: 100%;
}

* {
  box-sizing: border-box;
}
#main {
  position: relative;
  font-size: 0;
}

html {
  @media screen and (min-width: 1025px) {
    font-size: 20px;
    height: 580px !important;
    width: 400px;
    margin: auto;
    .page{
       min-height: 580px !important;
       max-height: 580px !important
    }
  }
}
</style>

