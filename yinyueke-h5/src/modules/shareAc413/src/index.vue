<template>
  <div id="main">
    <img class="bg" src="../../../assets/img/shareAc413/index_bg.jpg" alt />
    <div @click="toPoster" class="btn_wrapper">
      <img class="btn" src="../../../assets/img/shareAc413/index_btn.jpg" alt />
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {
    };
  },
  created() {
    //document.title = "疫期不孤单，爱心赠好课";
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
  bottom: -7px;
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
