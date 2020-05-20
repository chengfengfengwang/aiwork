<template>
  <div id="success">
    <div class="main">
      <img src="../../../assets/img/success/success_icon.png" alt class="success_icon">
      <div class="title1">{{successText}}</div>
      <div class="title2">快来下载APP开启你的音乐之旅吧</div>
      <div class="btn btn1" v-show="status=='instrument' && need_vip" @click="toVip">去激活会员卡</div>
      <div class="btn btn1" v-show="status=='vip' && need_instrument" @click="toInstrument">去兑换乐器</div>
      <div @click="toLearn" class="btn btn2">去学习</div>
      <div v-show="status=='vip'" class="qr_group">
        <div  class="qr_box"><img src="../../../assets/img/anvs/qr_group.jpg" alt class="qr"></div>
        <br>
        <img src="../../../assets/img/anvs/group_tip.png" alt class="qr_tip">
      </div>
      <a
        class="express"
        href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIxMTA1ODIwMQ==&scene=124#wechat_redirect"
      >查看物流信息</a>
      <img src="../../../assets/img/success/cloud.png" alt class="cloud">
      <img src="../../../assets/img/success/bottom.png" alt class="bottom">
    </div>
  </div>
</template>
<script>
export default {
  inject: ["status"],
  data() {
    return {
      need_instrument: false,
      need_vip: false,
      successText:'恭喜您已兑换成功'
    };
  },
  created() {
    this.need_instrument =
      sessionStorage.getItem("need_instrument") === "true" ? true : false;
    this.need_vip =
      sessionStorage.getItem("need_vip") === "true" ? true : false;
      if(this.status=='instrument'){
        document.title='兑换成功';
        this.successText = '恭喜您已兑换成功'
      }else if(this.status=='vip'){
        document.title='激活成功';
        this.successText = '恭喜您已激活成功'
      }
      
  },
  methods: {
    toVip(){
      location.href = `${location.origin}${location.pathname}?status=vip#/active`;
    },
    toInstrument(){
      location.href = `${location.origin}${location.pathname}?status=instrument#/active`;
    },
    toLearn() {
      this.$router.push("/download");
    }
  }
};
</script>
<style lang="less">
#success {
  overflow: hidden;
  min-height: 100vh;
  background-color: #ffcb3e;
  .main {
    margin-top: 100px;
    text-align: center;
    .success_icon {
      width: 88px;
      margin-bottom: 26px;
    }
    .title1 {
      margin-bottom: 10px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
    .title2 {
      margin-bottom: 30px;
      font-size: 14px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .btn1 {
      margin-bottom: 12px;
      background: rgba(255, 255, 255, 1);
      font-family: PingFangSC-Semibold, PingFang SC;
      color: rgba(255, 87, 38, 1);
    }
    .btn2 {
      background: rgba(255, 203, 62, 1);
      border: 1px solid rgba(255, 255, 255, 1);
      font-family: PingFang-SC-Regular, PingFang-SC;
      color: rgba(255, 255, 255, 1);
    }
    .cloud {
      position: absolute;
      left: 0;
      top: 130px;
      width: 87px;
    }
    .bottom {
      position: absolute;
      left: 0;
      bottom: 0px;
      width: 100%;
    }
    .qr_group{
      text-align: center;
      .qr_box{
        display: inline-block;
        background-color: #fff;
        margin: 30px auto 8px auto;
        padding: 4px 4px 2px 4px;
        border-radius: 3px;
      }
      .qr{
        width: 100px;
      }
      .qr_tip{
        width: 100px;
      }
    }
    .express {
      z-index: 9;
      position: absolute;
      left: 0;
      bottom: 30px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
