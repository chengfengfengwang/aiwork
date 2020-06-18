<template>
  <div class="page">
    
  </div>
</template>
<script>
import { getQueryVariable } from "../../../../common/util.js";
export default {
  data() {
    return {
      vcodeText: "获取验证码",
      vCode: "",
      selectedCourse: "",
      form: {
        real_name: "",
        phone: "",
        code: "",
        share_id: getQueryVariable("share_id"),
        share_phone: "",
        is_proxy: 1,
        share_stall: getQueryVariable("c")
      },
      courseList: [],
      hasPhone: false
    };
  },
  created() {
    if (getQueryVariable("p")) {
      this.hasPhone = true;
      this.form.share_phone = getQueryVariable("p");
    }
  },
  mounted() {
    this.inputevent();
  },
  methods: {
   
  }
};
</script>
<style lang="less">
@import url("../../../../common/common.less");
.font-size(@sizeValue:16) {
  @vw: 16 / 375 * 100;
  @result: @sizeValue / 16 * @vw;
  font-size: ~"@{result}vw";
}
html {
  .font-size(16);
}
html {
  @media screen and (max-width: 320px) {
    .font-size(16);
  }
  @media screen and (min-width: 480px) {
    .font-size(13);
  }
}
html,
body {
  width: 100%;
  height: 100%;
}
.page {
  width: 100%;
  min-height: 100vh;
}

</style>

