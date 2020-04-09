<template>
  <div class="page">
    <!-- <img class="bg" v-for="(myimg,index) in imgArr" :key="index" :src="myimg" alt /> -->
    <!-- <img src="../../../assets/img/imgbg/327/1.jpg" alt="" class="bg"> -->
    点击右上角，选择在浏览器打开链接
    <div>
      <a href="http://s.alhh.fun/smart_app/app-1.0.apk">下载</a>
    </div>
  </div>
</template>
<script>
import { testWeixin, getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {
      imgArr: [],
      isWx: false
    };
  },
  created() {
    // for (var i = 1; i < 17; i++) {
    //   this.imgArr.push(require("../../../assets/img/superVip/" + i + ".jpg"));
    // }
    this.isWx = testWeixin();
  },
  mounted() {
    console.log(localStorage.getItem("vip_youzan_url"));
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.page{
  text-align: center
}
img.bg {
  width: 100%;
}
</style>

