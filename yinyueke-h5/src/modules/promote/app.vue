<template>
  <div>
    <router-view />
  </div>
</template>
<script>
import { getQueryVariable, isIphonex } from "../../common/util.js";
export default {
  data() {
    return {
      isIphonex: false,

      loadingShow: false
    };
  },
  components: {},
  created() {
    console.log('vvv')
    this.isIphonex = isIphonex();
  },
  methods: {
    toggleLoading(status) {
      this.loadingShow = status;
    }
  }
};
</script>
<style lang="less">
@import url("./../../common/common.less");
.font-size(@sizeValue:16) {
  @vw: 16 / 375 * 100;
  @result: @sizeValue / 16 * @vw;
  font-size: ~"@{result}vw";
}
html {
  .font-size(16);
}
html,
body {
  width: 100%;
  height: 100%;
  font-family: PingFang SC, Microsoft Yahei,Helvetica Neue,Helvetica,Arial;
}

* {
  box-sizing: border-box;
}
#main {
  position: relative;
  font-size: 0;
}

html {
  @media screen and (min-width: 1025px) {
    font-size: 20px;
    height: 580px !important;
    width: 400px;
    margin: auto;
    .page{
       min-height: 580px !important;
       max-height: 580px !important
    }
  }
}
.ac_rule {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 325px;
  padding: 36px 20px 20px 20px;
  background-color: #fff;
  border: 6px solid #facb9f;
  border-radius: 20px;
  font-size: 13px;
  font-family: PingFangSC-Regular;
  color: #666666;
  .rule_title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 213px;
    height: 36px;
    top: -11px;
    background: url(../../assets/img/promote/poster/rule_title.png) no-repeat
      center/cover;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(142, 49, 18, 1);
    text-align: center;
    padding-top: 6px;
    // img{
    //   width: 100%;
    // }
  }
  .close_icon {
    position: absolute;
    bottom: -76px;
    left: 50%;
    padding: 20px;
    transform: translateX(-50%);
    img {
      width: 32px;
      height: 32px;
    }
  }
  .rule_item {
    position: relative;
    margin-bottom: 10px;
    padding-left: 20px;
    .item_index {
      position: absolute;
      left: -4px;
      top: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: rgba(240, 144, 87, 1);
      border-radius: 50%;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .rule_lab {
      font-family: PingFangSC-Semibold;
      font-weight: 600;
    }
    .color {
      color: #f54815;
    }
  }
  .rule_bottom {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    text-align: center;
  }
}
</style>

