<template>
  <div class="page">
    <img v-for="(myimg,index) in imgArr" :key="index" :src="myimg" alt />
    <div class="next_btn_wrapper">
      <div class="next_btn" @click="goNext">立即购买</div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
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
    console.log(localStorage.getItem('vip_youzan_url'))
  },
  methods: {
    goNext(){
        var originUrl = encodeURIComponent(this.curCard.buy_url);
        let url = `open://webBrowser?url=${originUrl}`
        console.log(url)
        location.href = url;

        //location.href = localStorage.getItem('vip_youzan_url')
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
  padding:15px 0;

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

