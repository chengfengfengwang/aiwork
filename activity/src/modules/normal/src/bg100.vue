<template>
  <div id="wrapper">
    <img v-show="kalimbaSvipShow" class="imgw100" src="../../../assets/img/normal/normal/kalimbaSvip.jpg" alt>
    <img v-show="pianoSvipShow" class="imgw100" src="../../../assets/img/normal/normal/pianoSvip.jpg" alt>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";

export default {
  data() {
    return {
      kalimbaSvipShow:false,
      pianoSvipShow:false,
    };
  },
  created(){
      this.kalimbaSvipShow = getQueryVariable('show')==='kalimbaSvip';
      this.pianoSvipShow = getQueryVariable('show')==='pianoSvip';
  }
};
</script>
<style lang="less" scoped>
#wrapper{
    font-size: 0
}
</style>
