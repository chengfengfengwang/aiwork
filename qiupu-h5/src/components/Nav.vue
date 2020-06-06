<template>
  <div class="nav">
    <img v-show="backShow" @click="goBack" src="../assets/img/nav/back.jpg" alt="" class="back">
    <span class="title">
      <slot></slot>
    </span>
    <img v-show="meShow" @click="toMe" src="../assets/img/nav/me.jpg" alt="" class="me">
  </div>
</template>
<script>
export default {
  props:{
    backShow: {
      default: true
    },
    meShow: {
      default: true
    },
  },
  methods:{
    goBack(){
      console.log('zzz')
      history.go(-1)
    },
    toMe(){
      this.$router.push('/qiupu_me')
    },
  }
};
</script>
<style lang="less" scoped>
.nav {
  position: relative;
  padding: 16px 15px;
  display: flex;
  align-items: center;
}
.title {
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.back{
  position: absolute;
  left: 15px;
  top:50%;
  transform: translateY(-50%);
  width: 24px;
}
.me{
  position: absolute;
  right: 15px;
  top:50%;
  transform: translateY(-50%);
  width: 21px;
}
</style>

