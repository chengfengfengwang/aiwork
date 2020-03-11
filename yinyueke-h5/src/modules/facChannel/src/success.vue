<template>
  <div id="main">
    <div class="main_wrapper">
      <img class="bg" src="../../../assets/img/facChannel/suc_bg.png" alt />
      <img class="bottom" src="../../../assets/img/facChannel/suc_bottom.png" alt />
      <div class="content_main">
        <div class="text">
          <div class="text_item" v-for="(item,index) in courses" :key="index">
            <img src="../../../assets/img/facChannel/star.png" alt />
            <div>{{item}}</div>
          </div>
        </div>
        <div class="qr_section">
          <img class="qr_bg" src="../../../assets/img/facChannel/suc_qr.png" alt />
          <img
            src="../../../assets/img/facChannel/qr.jpg"
            alt
            class="qr"
          />
        </div>
      </div>
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
    this.courses = JSON.parse(sessionStorage.getItem("acCourse"));
  },
  mounted() {},
  methods: {
    toPoster() {
      this.$router.push("/poster");
    }
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
