<template>
  <div class="page">
    <img src="../../../../assets/img/jxj_ac/login_bg.png" alt class="bg">
    <div class="main_wrapper">
      <div class="gift_content">
        <div class="item">
          <div class="index">
            <img src="../../../../assets/img/jxj_ac/index1.png" alt>
          </div>解锁47节初级课程，零基础轻松学
          (18节初级+17节进阶课程+12节琶音课程）
        </div>
        <div class="item">
          <div class="index">
            <img src="../../../../assets/img/jxj_ac/index2.png" alt>
          </div>赠送一年名师互动课
        </div>
        <div class="item">
          <div class="index">
            <img src="../../../../assets/img/jxj_ac/index3.png" alt>
          </div>入群领取300首电子曲谱，专业老师辅导
        </div>
      </div>
      <div class="qr_content">
        <div class="tips1">
          扫描下方二维码，入群领取300首电子曲谱
          <br>群内更有专业老师辅导
        </div>
        <img class="arrow" src="../../../../assets/img/jxj_ac/arrow.png" alt>

        <div class="qr">
          <img src="../../../../assets/img/jxj_ac/login_bg.png" alt>
        </div>
        <div class="tips2">
          将二维码截图保存至手机 打开微信扫一扫
          <br>扫码即可进入班级群
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../../common/util.js";
import { Toast, Dialog } from "vant";

export default {
  data() {
    return {};
  },
  created() {
    //this.countPage(key);
  },
  mounted() {},
  methods: {
    countPage(key) {
      this.axios
        .get(`http://58.87.125.111:6363/v1/txsms/tongji?key=${key}`)
        .then(res => {});
    }
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
.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #53058e;
  font-size: 0;
}
.bg {
  width: 100%;
}
.main_wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 188px;
}
.gift_content {
  border: 5px solid #cd7ee5;
  width: 343px;

  background-color: #fff;
  padding: 10px;
  border-radius: 12px;
  .item {
    margin-bottom: 6px;
    padding-left: 24px;
    position: relative;
    .index {
      position: absolute;
      left: 0;
      top: 2px;
      width: 16px;
      height: 16px;
      img {
        width: 100%;
      }
    }
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.qr_content {
  margin-top: 20px;
  width: 343px;
  // position: absolute;
  // left: 50%;
  // transform: translateX(-50%);
  // top: 188px;
  padding: 10px;
  border-radius: 12px;
  text-align: center;
  .tips1 {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .arrow {
    width: 22px;
    margin: 10px auto;
  }
  .qr {
    img {
      width: 110px;
      height: 110px;
    }
  }
  .tips2 {
    margin-top: 15px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>

