<template>
  <footer>
    <div class="wrapper footer_wrapper">
      <!-- <div class="footer_logo">
        <img class="logo_yyk" src="./../assets/img/logo_footer_yyk.png" alt>
        <span class="line" v-show="aiLogoShow"></span>
        <img class="logo_ai" v-show="aiLogoShow" src="./../assets/img/logo_AI.png" alt>
      </div> -->
      <div class="copyright"><img class="logo_ai" src="./../assets/img/logo_AI.png" alt=""> Copyright©2016 Immusician.All rights reserved.版权所有音悦荚 <a href="http://www.miit.gov.cn/">京ICP备16047852号-2</a> </div>
      <!-- <div class="footer_main">
        <div class="other_links">
          <ul class="link_row">
            <li class="row_title">
              <a href="index.html">首页</a>
            </li>
            <li>
              <a href="index.html#productIntro">产品介绍</a>
            </li>
            <li>
              <a href="index.html#studentsVideo">学员风采</a>
            </li>
            <li>
              <a href="index.html#remark">用户评论</a>
            </li>
            <li>
              <a href="index.html#promise">服务承诺</a>
            </li>
          </ul>
          <ul class="link_row">
            <li class="row_title">
              <a href="course.html">课程</a>
            </li>
            <li>
              <a href="course.html#introduction">课程简介</a>
            </li>
            <li>
              <a href="course.html#outline">课程大纲</a>
            </li>
            <li>
              <a href="course.html#catalogue">课程目录</a>
            </li>
            <li>
              <a href="course.html#remark">用户评论</a>
            </li>
          </ul>
          <ul class="link_row">
            <li class="row_title">
              <a href="about.html">关于我们</a>
            </li>
            <li>
              <a href="about.html#about_us">公司简介</a>
            </li>
            <li>
              <a href="about.html#about_us">联系方式</a>
            </li>
          </ul>
        </div>
        <div class="copyright">Copyright©Immusician.All rights reserved.版权所有音悦荚 湘ICP备15000754号-1</div>
      </div>-->
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    aiLogoShow: {
      default: true
    }
  }
};
</script>

<style lang="less" scoped>
footer{
  margin-top:30px;
  position: relative;
  background: #fbf7f1;
   padding: 50px 0;
}
.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 60px;
    margin-right:20px;
  }
  text-align: center;
  margin-top: 17px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #999999;
  padding-left: 50px;
  a{
    color: #999999;
  }
}
.footer_logo {
  position: absolute;
  left: 25%;
  top: 50%;
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
  .logo_yyk{
    width: 50px;
  }
  .logo_ai {
    width: 80px;
  }
}
// footer {
//   position: relative;
//   background: #fbf7f1;
//   padding: 50px 0;
//   .footer_wrapper {
//     display: flex;
//     justify-content: flex-start;
//   }

//   .footer_logo {
//     position: absolute;
//     left: 145px;
//     top: 50%;
//     transform: translateY(-50%);
//     //margin-right: 145px;
//     display: flex;
//     align-items: center;
//     .line {
//       //display: inline-block;
//       margin: 0 20px 0 26px;
//       //position: absolute;
//       width: 1px;
//       background-color: #e4e4e4;
//       height: 60px;
//       //top:50%;
//       //left: 0;
//       //transform: translateY(-50%);
//     }
//     .logo_ai {
//     }
//   }
//   .footer_main {
//     margin-left: 408px;
//     .other_links {
//       //display: inline-block;
//       display: flex;
//       & > ul > li > a {
//         font-family: SourceHanSansCN-Normal;
//         font-size: 12px;
//         color: #ffaf14;
//       }
//       & > ul > li.row_title > a {
//         font-size: 16px;
//         color: #ffaa06;
//         margin-bottom: 3px;
//         display: inline-block;
//       }
//       .link_row {
//         margin-right: 100px;
//       }
//     }
//     .copyright {
//       margin-top: 17px;
//       font-family: PingFangSC-Regular;
//       font-size: 12px;
//       color: #999999;
//     }
//   }
// }
</style>
