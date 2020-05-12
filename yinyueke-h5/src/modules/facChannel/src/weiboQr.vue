<template>
  <div class="page">
    <img src="../../../assets/img/facChannel/weiboqr.jpg" alt class="w100" />
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
import { Toast } from "vant";

export default {
  data() {
    return {};
  },
  created() {
  },
  mounted() {
    this.count();
  },
  methods:{
    count() {
      this.axios
        .get(`http://58.87.125.111:6363/v1/txsms/tongji?key=weibo_qr`)
        .then(res => {});
    },
  },
 
};
</script>
<style lang="less">
.page{
    font-size: 0
}
</style>

