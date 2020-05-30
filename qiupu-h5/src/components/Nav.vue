<template>
  <div class="nav">
    <span class="title">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.nav {
  padding: 10px 15px;
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
</style>

