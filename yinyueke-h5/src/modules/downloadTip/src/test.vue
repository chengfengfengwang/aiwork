<template>
  <div class="page">
    <!-- <img class="bg" v-for="(myimg,index) in imgArr" :key="index" :src="myimg" alt /> -->
    <!-- <img src="../../../assets/img/imgbg/327/1.jpg" alt="" class="bg"> -->
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
    // for (var i = 1; i < 17; i++) {
    //   this.imgArr.push(require("../../../assets/img/superVip/" + i + ".jpg"));
    // }
  },
  mounted() {
    console.log(localStorage.getItem('vip_youzan_url'))
  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
img.bg{
  width: 100%;
}
.page{
    min-height: 100vh;
    background: url('../../../assets/img/imgbg/327/1.jpg') no-repeat center;
    background-size: contain;
}
</style>

