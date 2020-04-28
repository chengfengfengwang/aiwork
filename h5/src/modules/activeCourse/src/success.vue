<template>
  <div class="success_page">
    <div class="main">
      <img class="success" src="./../../../assets/img/regist/success.png" alt>
      <div class="text1">注册成功</div>
      <div class="text2">恭喜您即将和我们一起学习，一起成长</div>
    </div>
    <div class="btn">去登录体验吧</div>
    <img src="../../../assets/img/regist/sd1.png" alt="" class="d1">
    <img src="../../../assets/img/regist/sd2.png" alt="" class="d2">
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.success_page {
  height: 100vh;
  
  background: url("../../../assets/img/regist/tree.png") no-repeat bottom 
      center/100%;
      background-color: rgba(255, 203, 62, 1);
}
.main {
  position: absolute;
  top: 27%;
  left: 0;
  width: 100%;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  img.success {
    width: 88px;
    margin-bottom: 20px;
  }
  .text1 {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 10px
  }
  .text2 {
    font-size: 16px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
.btn {
  position: absolute;
  left: 50%;
  top: 67%;
  transform: translateX(-50%);
  width: 315px;
  height: 44px;
  line-height: 44px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 22px;
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 87, 38, 1);
}
.d1{
  position: absolute;
  right: 0;
  top:0;
  width: 35px;
}
.d2{
  position: absolute;
  left: 0;
  top:33%;
  width: 73px;
}
</style>

