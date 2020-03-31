<template>
  <div class="page">
    <img v-for="(myimg,index) in imgArr" :key="index" :src="myimg" alt />
    
  </div>
</template>
<script>
import { getQueryVariable, platForm } from "../../../common/util.js";
import { Toast } from "vant";
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
    
  },
  mounted() {
  },
  methods: {
    
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
  font-size: 0;
}

</style>

