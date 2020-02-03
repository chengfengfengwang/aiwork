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
        <div class="introduction">音乐壳隶属于北京音乐荚科技有限公司，因一群热爱音乐、怀揣音乐梦想的人而生！致力于智能互动、数字<br>化在线音乐教学的创新应用。</div>
        <div class="contact_way">
          <div>
            <img src="./../assets/img/icon_phone.png" alt>联系电话：010-81708781
          </div>
          <div>
            <img src="./../assets/img/icon_email.png" alt>联系邮箱：service@immusician.com
          </div>
          <div>
            <img src="./../assets/img/icon_address.png" alt>联系地址：北京市昌平区回龙观西大街龙冠商务中心
          </div>
        </div>
        <div class="logo">
            <img src="./../assets/img/logo_yyj.png" alt=""> 
        </div>
      </div>
    </section>
    <!-- <BackTop></BackTop> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./../components/Header";
import Footer from "./../components/Footer";
// import BackTop from "./../../components/BackTop";
export default {
  name: "About",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 650px;
  background: url("./../assets/img/about_banner.png") no-repeat center;
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
  }
  .contact_way {
    font-size: 16px;
    color: #333333;
    &>div{
        display: flex;
        align-items: center;
        img{
            margin-right:5px;
        }
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