<template>
  <div class="nav" :style="{paddingTop:isIphonex?'40px':'0px'}">
    <div class="left" @click="$router.go(-1)">
      <img src="../assets/img/back.png" alt>
      {{leftText}}
    </div>
    <div class="main">{{title}}</div>
  </div>
</template>
<script>
import { isIphonex } from "../utils/util.js";
export default {
  props: {
    title: {
      default: "标题"
    },
    leftText: {
      default: "xxx"
    }
  },
  data() {
    return {
      isIphonex: false
    };
  },
  created() {
    this.isIphonex = isIphonex();
  },
};
</script>

<style lang="less" scoped>
.left {
  position: absolute;
  width: 200px;
  font-size: 24px;
  left: 10px;
  img {
    width: 30px;
  }
  line-height: 80px;
  display: flex;
  align-items: center;
}
.main {
  font-size: 26px;
  line-height: 80px;
}
.nav {
  text-align: center;
  height: 80px;
}
</style>

