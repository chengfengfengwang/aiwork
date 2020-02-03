<template>
  <header class="wrapper">
    <div class="logo" @click="goIndex">
      <img src="./../assets/img/logo_AI.png" alt>
    </div>
    <ul class="nav_list">
      <li>
        <router-link to="/" v-bind:class="{active:fullPath==='/'}">首页</router-link>
      </li>
      <li>
        <router-link to="/MusicBank" v-bind:class="{active:fullPath==='/MusicBank'}">乐库</router-link>
      </li>
      <li>
        <router-link to="/Singer" v-bind:class="{active:fullPath==='/Singer'}">歌手</router-link>
      </li>
      <li>
        <router-link to="/MusicFee" v-bind:class="{active:fullPath==='/MusicFee'}">有偿服务</router-link>
      </li>
      <li>
        <router-link to="/About" v-bind:class="{active:fullPath==='/About'}">关于我们</router-link>
      </li>
    </ul>
    <div class="contact">
      <span v-show="userName">{{userName}}</span>
      <span v-show="userName" @click="logout" style="margin-left:15px">退出登录</span>
      <router-link v-show="!userName" to="/Login/login" class="login">登录</router-link>
      <router-link v-show="!userName" to="/Login/register" class="regist">注册</router-link>
    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      fullPath: this.$router.currentRoute.fullPath,
      userName:''
    };
  },
  mounted(){
    this.userName = localStorage.getItem('myUserName')
  },
  methods: {
    logout(){
      localStorage.clear();
      this.$router.push('/Login/login')
    },
    goIndex(){
      location.href = 'index.html'
    },
    goWeibo(){
      window.open('https://weibo.com/u/7073381403')
    }
    // showWechat(){
    //   console.log('zzz')
    // }
  }
};
</script>
<style lang="less" scoped>
header {
  height: 68px;
  line-height: 68px;
  position: relative;
  font-size: 16px;
  .logo {
    position: absolute;
    left: 36px;
    top: 0px;
    display: flex;
    height: 100%;
    align-items: center;
    cursor: pointer;
    img {
      width: 53px;
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
    .login{
      margin: 0 10px;
    }
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
    bottom: -110px;
    z-index: 1000;
    //padding: 5px;
    background-color: #fff;
    border-radius: 6px;
    width: 120px;
  }
}
</style>


