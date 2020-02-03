<template>
  <div class="nav">
    <div class="left" @click="$router.go(-1)">
      <img src="../assets/img/back.png" alt>
      {{leftText}}
    </div>
    <div class="main">{{title}}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: "标题"
    },
    leftText: {
      default: "xxx"
    }
  }
};
</script>

<style lang="less" scoped>
.left {
  position: absolute;
  width: 200px;
  font-size: 24px;
  left: 10px;
  img {
    width: 30px;
  }
  line-height: 70px;
  display: flex;
  align-items: center;
}
.main {
  font-size: 26px;
  line-height: 70px;
}
.nav {
  text-align: center;
  height: 70px;
}
</style>

