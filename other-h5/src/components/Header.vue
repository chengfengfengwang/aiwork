<template>
  <header class="wrapper">
    <div class="logo">
      <img src="./../assets/img/logo_yyk.png" alt>
    </div>
    <ul class="nav_list">
      <li>
        <a v-bind:class="{active:pathname.indexOf('index.html')!=-1}" href="index.html">首页</a>
      </li>
      <li>
        <a v-bind:class="{active:pathname.indexOf('course.html')!=-1}" href="course.html">课程</a>
      </li>
      <li>
        <a v-bind:class="{active:pathname.indexOf('about.html')!=-1}" href="about.html">关于我们</a>
      </li>
    </ul>
    <div class="contact">
      <img
        @mouseleave="wechatShow = false"
        @mouseenter="wechatShow = true"
        class="contact_wechat"
        src="./../assets/img/wecheat.png"
        alt
      >
      <img class="contact_weibo" src="./../assets/img/weibo.png" alt>
      <img
      @mouseleave="wechatShow = false"
        @mouseenter="wechatShow = true"
        class="wechat_qr"
        v-show="wechatShow"
        src="http://s.immusician.com/static/website/imgs/banner-code.png"
      >
    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      pathname: location.pathname,
      wechatShow: false
    };
  },
  methods: {
    // showWechat(){
    //   console.log('zzz')
    // }
  }
};
</script>
<style lang="less" scoped>
header {
  font-family: SourceHanSansCN-Regular;
  height: 68px;
  line-height: 68px;
  position: relative;
  .logo {
    position: absolute;
    left: 36px;
    top: 0px;
    display: flex;
    height: 100%;
    align-items: center;
    cursor: pointer;
    img {
      width: 104px;
    }
  }
  .nav_list {
    font-size: 16px;
    margin: 0 auto;
    width: 500px;
    display: flex;
    justify-content: space-between;
    & > li > a {
      display: inline-block;
      text-align: center;
      width: 100px;
      height: 68px;
      line-height: 68px;
    }
    & > li > a:hover {
      background: #fff4dd;
    }
    & > li > a.active {
      background-color: #ffaf06;
      color: #fff;
    }
  }
  .contact {
    position: absolute;
    right: 26px;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    .contact_wechat {
      width: 24px;
      margin-right: 20px;
      padding: 20px;
    }
    .contact_weibo {
      width: 24px;
    }
  }
  .wechat_qr {
    position: absolute;
    right: 12px;
    bottom: -113px;
    z-index: 1000;
  }
}
</style>


