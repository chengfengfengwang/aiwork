<template>
  <div class="page">
    <div v-show="countdown=='已开始'" class="count">比赛已开始</div>
    <div v-show="countdown!='已开始'" class="count">开赛倒计时：<span v-show="countdown">{{countdown}}</span></div>
    <img @click="toQbRace" class="enbtn breath" src="../../../assets/img/qbRace/enterBtn.png" alt />
    <img src="../../../assets/img/qbRace/1.jpg" alt class="bg" />
    <img src="../../../assets/img/qbRace/2.jpg" alt class="bg" />
    <img src="../../../assets/img/qbRace/3.jpg" alt class="bg" />
    <img src="../../../assets/img/qbRace/4.jpg" alt class="bg" />
  </div>
</template>
<script>
import { getCountDown, getQueryVariable } from "../../../common/util.js";
import { Toast } from "vant";

export default {
  data() {
    return {
      btnActive: false,
      originCountdown: 0,
      countdown: 0
    };
  },
  created() {
    // this.originCountdown = Number(getQueryVariable("countdown"));
    // this.beginCountDown();
    this.getCourses()
  },
  mounted() {},
  // destroyed() {
  //   clearInterval(this.timer);
  // },
  methods: {
    getCourses() {
      this.axios
        .get(`http://58.87.125.111:55555/v1/operate/activity_match/?uid=${getQueryVariable("uid")}`)
        .then(res => {
            this.res = res.data;
           this.originCountdown = Number(this.res.countdown);
           this.beginCountDown();
        });
    },
    beginCountDown() {
      this.countdown = getCountDown(this.originCountdown--);
      this.timer = setInterval(() => {
        this.countdown = getCountDown(this.originCountdown--);
      }, 1000);
    },
    toQbRace() {
      console.log(this.originCountdown);
      var res = this.res;
      if (res.has_join) {
        Toast({
          message: "亲爱的小朋友，您已经参加过比赛了哦",
          duration: 3000
        });
        return
      }
      if (this.countdown != "已开始") {
        Toast({
          message: "亲爱的用户，比赛还没有正式开始哦，请您耐心等待",
          duration: 3000
        });
      } else {
        
        let url = `open://mock?question_bank=${res.question_bank}&type=${res.type}&mock_id=${res.mock_id}`;
        console.log(url);
        location.href = url;
      }
    }
  },
  watch: {}
};
</script>
<style lang="less">
@import url("./../../../common/common.less");
.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #fff2cc;
  font-size: 0;
}
.bg {
  width: 100%;
}
.count {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 18.97%;
  left: 0;
  //left: 30%;
  font-size: 13px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.enbtn {
  position: absolute;
  width: 222px;
  top: 16.1%;
  left: 50%;
  transform: translateX(-50%);
}

.breath {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: pulse;
  animation-iteration-count: infinite;
}
@keyframes pulse {
  0% {
    transform: translateX(-50%) scaleX(1);
  }

  50% {
    transform: translateX(-50%) scale3d(1.05, 1.05, 1.05);
  }
  100% {
    transform: translateX(-50%) scaleX(1);
  }
}
</style>
