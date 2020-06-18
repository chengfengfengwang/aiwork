<template>
  <div id="app" :class="{xPadding:isX}">
    <router-view/>
  </div>
</template>
<script>
import { getQueryVariable, isIphonex } from "common/util.js";
export default {
  data() {
    return {
      isLogin: false,
      test: "testt",
      isX: isIphonex()
    };
  },
  components: {},
  created() {
    document.title = "求谱";
    this.axios.defaults.headers.common["token"] = getQueryVariable("token");
    this.axios.defaults.headers.common["uid"] = getQueryVariable("uid");
    this.instrument_type = getQueryVariable("instrument_type");
    if (getQueryVariable("uid") && getQueryVariable("token")) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    toggleLoading(status) {
      this.loadingShow = status;
    }
  }
};
</script>
<style lang="less">
.xPadding {
  padding-top: 20px;
}

</style>

