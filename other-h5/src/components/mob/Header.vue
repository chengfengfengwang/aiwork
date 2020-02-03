<template>
  <header>
    <div class="nav_logo">
      <img src="./../../assets/mob_assets/img/nav_logo.png" alt>
    </div>
    <div class="nav">
      <a
        v-bind:class="{active:pathname.indexOf('index_mob')!=-1}"
        class="nav_item"
        href="index_mob.html"
      >首页</a>
      <a class="nav_item" v-bind:class="{active:pathname.indexOf('course_mob')!=-1}" href="course_mob.html">中国音乐学院课程</a>
      <a
        v-bind:class="{active:pathname.indexOf('about_mob')!=-1}"
        class="nav_item"
        href="about_mob.html"
      >关于我们</a>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      pathname: location.pathname
    };
  },
  created() {}
};
</script>
<style lang="less" scoped>
header {
  display: flex;
  align-items: center;
  background-color: #ffaf06;
  padding: 0 15px;
  margin-bottom:10px;
  height: 48px;
  line-height: 48px;
  .nav_logo {
    display: flex;
    align-items: center;
    img {
      width: 22px;
    }
  }
  .nav {
    width: 75%;
    margin-left: 30px;
    display: flex;
    justify-content: space-around;
    a {
      //margin-right: 35px;
      font-size: 14px;
      color: #ffffff;
    }
    a.active {
      position: relative;
      font-size: 15px;
      color: #ffffff;
      letter-spacing: 0;
    }
    a.active::after {
      content: "";
      position: absolute;
      bottom: 9px;
      left: 50%;
      width: 25px;
      height: 2px;
      background-color: #fff;
      border-radius: 2px;
      transform: translateX(-50%);
    }
  }
}
</style>


