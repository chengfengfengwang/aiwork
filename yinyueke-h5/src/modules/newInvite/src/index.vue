<template>
  <div id="main">
    qwerdf
    <img class="bg" src="../../../assets/img/yiqiac/bg1.png" alt />
    <div @click="toPoster" class="btn_wrapper">
      <div class="text">生成我的专属海报</div>
      <img  class="btn" src="../../../assets/img/yiqiac/btn1.png" alt />
    </div>
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
  position: relative;
  font-size: 0
}
.bg {
  width: 100%;
}
.btn_wrapper {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  .text {
    position: absolute;
    width: 100%;
    top:26px;
    text-align: center;
    left: 50%;
    transform: translateX(-56%);
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .btn {
    width: 290px;
  }
}
</style>
