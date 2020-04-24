<template>
  <div class="page">
    <img src="../../../assets/img/facChannel/bg331.jpg" alt class="bg" />
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
import { Toast } from "vant";

export default {
  data() {
    return {
     
    };
  },
  created() {
    //this.getInstruments();
  },
  mounted() {
    if(getQueryVariable('from')==1){
      this.count('vendor_andelu_dx0424')
    }else{
      this.count('vendor_andelu_dx')
    }
  },
  methods:{
    count(key) {
      this.axios
        .get(`http://58.87.125.111:6363/v1/txsms/tongji?key=${key}`)
        .then(res => {});
    },
  }
};
</script>
<style lang="less">
@import url("./../../../common/common.less");
.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #ee4025;
  font-size: 0;
}
.bg {
  width: 100%;
}

</style>

