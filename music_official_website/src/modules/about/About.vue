<template>
  <div id="about">
    <Header></Header>
    <div class="banner"></div>
    <section class="wrapper main" id="about_us">
      <div class="section_title">
        <span class="title_zh">关于我们</span>
        <span class="title_en">ABOUT US</span>
      </div>
      <div class="company">
        <div class="title">北京音悦荚科技有限责任公司</div>
        <div class="introduction">
          <p>2016年公司成立于北京，</p>
          <p>致力于汇集业内优质教师资源，结合人工智能技术实现公平、高效的音乐普及教育，让人人学会用音乐去表达！</p>
          <p>产品“AI音乐学院”快速成长为国内最有影响力的吉他/尤克里里在线教学平台；</p>
          <p>2019年得到资本的青睐，获得数千万A轮融资；</p>
          <p>2019年6月正式上线3-12岁少儿在线音乐教育产品“音乐壳”；</p>
          <p>逐步形成音乐素养（亲子音乐启蒙、音基考级、器乐王国）、尤克里里、非洲鼓、吉他等的产品内容矩阵；</p>
          <p>已与172个知名品牌达成合作，覆盖全国636个城市，助力30万+学员完成在线学习；</p>
          <p>未来我们将基于智能互动技术不断加码在线音乐普及教育，并布局线下，与幼儿园、培训中心、校园等深度合作打造国内在线音乐教育的优质品牌！</p>
        </div>
        <div class="contact_way">
          <div>
            <div class="label"><img src="./../../assets/img/icon_phone.png" alt>联系电话：010-81708781</div>
          </div>
          <div>
            <div class="label"><img src="./../../assets/img/icon_email.png" alt>联系邮箱：service@immusician.com</div>
          </div>
          <div>
            <div class="label"><img src="./../../assets/img/icon_address.png" alt>联系地址：北京市昌平区回龙观西大街龙冠商务中心</div>
          </div>
          <div class="contact_row">
            <!-- <div class="label"><img style="width:12px" src="./../../assets/img/contact.png" alt>商务合作：</div> -->
            
            <div>
              <img class="qr" src="./../../assets/img/contact_qr_z.jpg" alt="">
            </div>
            <div style="margin-left:23px;margin-top:-5px">
              商务合作
            </div>
          </div>
          <span class="block"></span>
        </div>
        <div class="logo">
            <img src="./../../assets/img/logo_yyj.png" alt="">
        </div>
      </div>
    </section>
    <BackTop></BackTop>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import BackTop from "./../../components/BackTop";
export default {
  name: "About",
  components: {
    Header,
    BackTop,
    Footer
  }
};
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 650px;
  background: url("../../assets/img/about_banner.png") no-repeat center;
  background-size: cover;
}
.main {
  margin: 120px auto;
}
.section_title {
  position: relative;
  padding-left: 16px;
  margin-bottom: 80px;
  .title_zh {
      margin-right: 7px;
    font-size: 48px;
    color: #333333;
  }
  .title_en {
    font-size: 20px;
    color: #333333;
  }
}
.section_title::before {
  content: " ";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 6px;
  height: 70%;
  background-color: #ffaa06;
}
.company {
    position: relative;
  .title {
      margin-bottom: 10px;
    font-size: 28px;
    color: #333333;
  }
  .introduction {
    font-size: 14px;
    color: #666666;
    margin-bottom: 40px;
    &>p{
      margin: 5px 0;
    }
  }
  .contact_way {
    position: relative;
    font-size: 16px;
    color: #333333;
    line-height: 28px;
    .label{
        display: flex;
        align-items: center;
        img{
          width: 9px;
            margin-right:5px;
        }
    }
    .contact_row{
      margin-top: 15px;
      //display: flex;
      align-items: center;
      .qr{
        width: 120px;
      }
    }
    
    .block{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 46px;
      height: 8px;
      background: #FFAA06;
    }
  }
  .logo{
      position: absolute;
      right: 0;
      top:5%;
      img{
          width: 253px;
      }
  }
}
</style>