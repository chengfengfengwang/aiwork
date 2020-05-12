<template>
  <div id="success">
    <div class="main">
      <img src="../../../assets/img/success/success_icon.png" alt class="success_icon">
      <div class="title1">恭喜您已兑换成功</div>
      <div class="title2">快来下载APP开启你的音乐之旅吧</div>
      <div class="btn btn1" v-show="status=='instrument' && need_vip">去激活会员卡</div>
      <div class="btn btn1" v-show="status=='vip' && need_instrument">去兑换乐器</div>
      <div @click="toLearn" class="btn btn2">去学习</div>
      <a class="express" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIxMTA1ODIwMQ==&scene=124#wechat_redirect">查看物流信息</a>
      <img src="../../../assets/img/success/cloud.png" alt class="cloud">
      <img src="../../../assets/img/success/bottom.png" alt class="bottom">
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      need_instrument:false,
      need_vip:false
    }
  },
  created(){
    this.need_instrument = sessionStorage.setItem("need_instrument", res.need_instrument);
    this.need_vip = sessionStorage.setItem("need_vip", res.need_vip);
  },
  methods:{
    toLearn(){
      this.$router.push('/download')
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
