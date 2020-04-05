<template>
  <div class="page">
    <img v-show="conIphoneStyle" class="bg" src="../../../assets/img/imgbg/0405/1.png" alt />
    <img v-show="!conIphoneStyle" class="bg" src="../../../assets/img/imgbg/0405/1x.png" alt />
  </div>
</template>
<script>
import { conIphoneStyle } from "../../../common/util.js";
export default {
  data() {
    return {
      conIphoneStyle: conIphoneStyle
    };
  },
  created() {
  },
  mounted() {
    console.log(conIphoneStyle);
  },
  methods: {}
};
</script>
<style lang="less" scoped>
img.bg {
  width: 100%;
}
.page {
  font-size: 0;
  // min-height: 100vh;
  // background: url('../../../assets/img/imgbg/0405/1.png') no-repeat center;
  // background-size: contain;
}
</style>

