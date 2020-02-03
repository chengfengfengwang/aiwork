<template>
  <div class="common_title_section">
    <div class="common_title"><slot></slot></div>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  
};
</script>
<style lang="less" scoped>
.common_title_section {
    text-align: center;
    margin-top: 60px;
    margin-bottom: 70px;
  .common_title {
    font-family: SourceHanSansCN-Medium;
    font-size: 48px;
    color: #333333;
  }
  .line {
    margin: 0 auto;
    width: 100px;
    height: 4px;
    background: #ffaa06;
    border-radius: 1px;
  }
}
</style>

