<template>
  <footer>
    <div class="left" v-bind:class="{no_show_ai_logo:!aiLogoShow,show_ai_logo:aiLogoShow}">
      <img class="logo_yyk" src="./../../assets/mob_assets/img/footer_logo.png" alt>
      <span class="line" v-show="aiLogoShow"></span>
      <img class="logo_ai" v-show="aiLogoShow" src="./../../assets/mob_assets/img/ai_logo.png" alt>
    </div>
    <div class="right">
      <div class="nav">
        <a class="nav_item active" href="index_mob.html">首页</a>
        <a class="nav_item" href="course_mob.html">中国音乐学院课程</a>
        <a class="nav_item" href="about_mob.html">关于我们</a>
      </div>
      <div class="copy_right">Copyright©Immusician.All rights reserved.版权所有音悦荚 湘ICP备15000754号-1</div>
    </div>
  </footer>
</template>
<style lang="less" scoped>
footer {
  padding: 5px 15px 5px 30px;
  background-color: #fbf7f1;
  display: flex;
  align-items: center;
  .left.show_ai_logo{
    width: 100px;
    margin-right: 15px;
  }
  .left.no_show_ai_logo{
    //width: 100px;
    margin-right: 25px;
  }
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .logo_yyk {
      width: 26px;
    }
    .logo_ai {
      width: 38px;
    }
    .line {
      //margin: 0 20px 0 26px;
      width: 1px;
      background-color: #e4e4e4;
      height: 30px;
    }
  }
  .right {
    .nav {
      width: 90%;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      .nav_item {
        font-size: 12px;
        color: #666666;
      }
    }
    .copy_right {
      font-size: 7px;
      color: #999999;
    }
  }
}
</style>
<script>
export default {
  props: {
    aiLogoShow: {
      default: true
    }
  }
};
</script>
