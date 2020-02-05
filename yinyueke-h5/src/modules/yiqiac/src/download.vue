<template>
  <div id="main">
    <div class="main_wrapper">
      <img class="bg" src="../../../assets/img/yiqiac/download.png" alt />
      <img class="bottom" src="../../../assets/img/yiqiac/download_bottom.png" alt="">
      <div id="download">立即下载</div>
    </div>
    <!-- <img class="bg" src="../../../assets/img/yiqiac/download.png" alt />
    <div id="download">立即下载</div>-->
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {
      topText: "趣味乐理启蒙配套教材音频（上）"
    };
  },
  created() {
    document.title = "疫期不孤单，爱心赠好课";
  },

  methods: {
    toPoster() {
      this.$router.push("/poster");
    }
  }
};
</script>
<style lang="less">
#main {
  //background-color: #78ce7d;
  min-height: 100vh;
}
.main_wrapper {
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // width: 100%;
  background-color: #FFF6E1;
  min-height: 100vh;
  position: relative;
  .bg {
    width: 100%;
  }
  .bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  #download {
    position: absolute;
    top: 495px;
    left: 50%;
    transform: translateX(-50%);
    width: 270px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    background: rgba(255, 116, 43, 1);
    border-radius: 25px;
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
