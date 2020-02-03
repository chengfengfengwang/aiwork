<template>
  <footer>
    <div class="wrapper footer_wrapper">
      <div class="footer_logo">
        <img class="logo_yyk" src="./../assets/img/logo_footer_yyk.png" alt>
        <span class="line" v-show="aiLogoShow"></span>
        <img class="logo_ai" v-show="aiLogoShow" src="./../assets/img/logo_AI.png" alt>
      </div>
      <div class="footer_main">
        <div class="other_links">
          <ul class="link_row">
            <li class="row_title">
              <a href="javascript:;">首页</a>
            </li>
            <li>
              <a href="javascript:;">产品特色</a>
            </li>
            <li>
              <a href="javascript:;">用户评论</a>
            </li>
            <li>
              <a href="javascript:;">我们向您承诺</a>
            </li>
            <li>
              <a href="javascript:;">战略合作伙伴</a>
            </li>
          </ul>
          <ul class="link_row">
            <li class="row_title">
              <a href="javascript:;">课程</a>
            </li>
            <li>
              <a href="javascript:;">课程简介</a>
            </li>
            <li>
              <a href="javascript:;">课程大纲</a>
            </li>
            <li>
              <a href="javascript:;">课程特色</a>
            </li>
            <li>
              <a href="javascript:;">教研团队</a>
            </li>
          </ul>
          <ul class="link_row">
            <li class="row_title">
              <a href="javascript:;">关于我们</a>
            </li>
            <li>
              <a href="javascript:;">公司简介</a>
            </li>
            <li>
              <a href="javascript:;">联系方式</a>
            </li>
          </ul>
        </div>
        <div class="copyright">Copyright©Immusician.All rights reserved.版权所有音悦荚 湘ICP备15000754号-1</div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props:{
    aiLogoShow:{
      default:true
    }
  }
}
</script>

<style lang="less" scoped>
footer {
  position: relative;
  background: #fbf7f1;
  padding: 50px 0;
  .footer_wrapper {
    display: flex;
    justify-content: flex-start;
  }

  .footer_logo {
    position: absolute;
    left: 145px;
    top:50%;
    transform: translateY(-50%);
    //margin-right: 145px;
    display: flex;
    align-items: center;
    .line {
      //display: inline-block;
      margin: 0 20px 0 26px;
      //position: absolute;
      width: 1px;
      background-color: #e4e4e4;
      height: 60px;
      //top:50%;
      //left: 0;
      //transform: translateY(-50%);
    }
    .logo_ai {
    }
  }
  .footer_main {
    margin-left: 408px;
    .other_links {
      //display: inline-block;
      display: flex;
      & > ul > li > a {
        font-family: SourceHanSansCN-Normal;
        font-size: 12px;
        color: #ffaf14;
      }
      & > ul > li.row_title > a {
        font-size: 16px;
        color: #ffaa06;
      }
      .link_row {
        margin-right: 100px;
      }
    }
    .copyright {
        margin-top:17px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
