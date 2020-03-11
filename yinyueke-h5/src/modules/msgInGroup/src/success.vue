<template>
  <div id="main">
    <div class="main_wrapper">
      <img class="bg" src="../../../assets/img/msgInGroup/bg.png" alt />
      <img class="bottom" src="../../../assets/img/facChannel/suc_bottom.png" alt />
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {
      courses: []
    };
  },
  created() {
  },
  mounted() {
     this.axios
        .get(`http://58.87.125.111:6363/v1/txsms/tongji?key=msg311`)
        .then(res => {
         
        });
  },
  methods: {
    
  }
};
</script>
<style lang="less">
#main {
  font-size: 0;
  background-color: #540FA7;
  min-height: 100vh;
}
.main_wrapper {
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // width: 100%;
    background-color: #540FA7;
  min-height: 100vh;
  position: relative;
  .content_main {
    position: absolute;
    width: 100%;
    //top: 20%;
    top:113px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
  .text {
    //position: absolute;
    // top: 19%;
    // left: 50%;
    // transform: translateX(-50%);
    margin: auto;
    //min-width: 55%;
    display: inline-block;
    margin-bottom: 25px;
    .text_item {
       min-width: 55%;
      display: flex;
      align-items: center;
      //justify-content: center;
      margin-bottom: 5px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      img {
        width: 12px;
        margin-right: 3px;
      }
    }
  }
  .bg {
    width: 100%;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9;
  }
  .qr_section {
     position: absolute;
    top: 94px;
    left: 0%;
    //position: relative;
    width: 100%;
    .qr_bg {
      width: 100%;
    }
    .qr {
      position: absolute;
      width: 116px;
      height: 116px;
      top: 24%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
