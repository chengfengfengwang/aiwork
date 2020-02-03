<template>
  <div id="app">
    hello yiy
    <div id="qrcode"></div>
  </div>
</template>

<script>
const QRCode = require('qrcode')

export default {
  name: 'app',
  mounted(){
    //console.log(QRCode)
    //new QRCode(document.getElementById("qrcode"), "http://www.runoob.com");  // 设置要生成二维码的链接
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
