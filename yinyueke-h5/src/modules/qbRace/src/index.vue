<template>
  <div class="page">
    <div class="count">开赛倒计时：0时10分56秒</div>
    <img @click="toQbRace" class="enbtn breath" src="../../../assets/img/qbRace/enterBtn.png" alt />
    <img src="../../../assets/img/qbRace/1.jpg" alt class="bg" />
    <img src="../../../assets/img/qbRace/2.jpg" alt class="bg" />
    <img src="../../../assets/img/qbRace/3.jpg" alt class="bg" />
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
import { Toast } from "vant";

export default {
  data() {
    return {
      btnActive: false
    };
  },
  created() {
    //this.getInstruments();
  },
  mounted() {
    console.log(getQueryVariable('countdown'))
  },
  methods: {
    
    toQbRace() {
      let url = `open://mock?question_bank=${getQueryVariable(
        "question_bank"
      )}&type=${getQueryVariable("type")}&mock_id=${getQueryVariable(
        "mock_id"
      )}`;
      console.log(url);
      location.href = url;
    }
  },
  watch: {}
};
</script>
<style lang="less">
@import url("./../../../common/common.less");
.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #710fd4;
  font-size: 0;
}
.bg {
  width: 100%;
}
.count {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 19%;
  left: 0;
  //left: 30%;
  font-size: 13px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.enbtn {
  position: absolute;
  width: 222px;
  top: 16.1%;
  left: 50%;
  transform: translateX(-50%);
}

.breath {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: pulse;
  animation-iteration-count: infinite;
}
@keyframes pulse {
  0% {
    transform: translateX(-50%) scaleX(1);
  }

  50% {
    transform: translateX(-50%) scale3d(1.05, 1.05, 1.05);
  }
  100% {
    transform: translateX(-50%) scaleX(1);
  }
}
</style>
