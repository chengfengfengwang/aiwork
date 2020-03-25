<template>
  <div class="page">
    <div id="container">
      <div id="one"></div>
      <div id="two"></div>
      <div id="three"></div>
      <div id="four"></div>
      <div id="five"></div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
import { Toast } from "vant";

export default {
  data() {
    return {
      btnActive: false
    };
  },
  created() {
    //this.getInstruments();
  },
  mounted() {},
  methods: {
    toQbRace() {
      console.log("跳转");
      location.href = `open://mock?question_bank=13&type=1&mock_id=5dfc786106981e000a60132b`;
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
@keyframes yuying1 {
  0% {
    height: 0%;
  }
  20% {
    height: 50%;
  }
  50% {
    height: 100%;
  }
  80% {
    height: 50%;
  }
  100% {
    height: 0%;
  }
}

#container {
  width: 200px;
  height: 50px;
  margin: 200px auto;
}
#container #one {
  animation: yuying1 0.6s infinite 0.1s;
}
#container #two {
  animation: yuying1 0.6s infinite 0.2s;
}
#container #three {
  animation: yuying1 0.6s infinite 0.3s;
}
#container #four {
  animation: yuying1 0.6s infinite 0.4s;
}
#container #five {
  animation: yuying1 0.6s infinite 0.5s;
}

#one,
#two,
#three,
#four,
#five {
  width: 6px;
  height: 100%;
  margin-left: 10px;
  border-radius: 50px;
  background-color: #999;
  vertical-align: middle;
  display: inline-block;
}
</style>
