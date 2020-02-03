<template>
  <div class="bottom enter_float">
    <img class="enter_float" src="../assets/img/mytrip/p1/enter-page-arrow.png" alt>
  </div>
</template>
<script>
export default {
  name: "Bottom",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 300px;
  width: 100%;
  text-align: center;
  img {
    position: absolute;
    bottom: 56px;
    left: 50%;
    margin-left: -26px;
    width: 52px;
  }
}
</style>
