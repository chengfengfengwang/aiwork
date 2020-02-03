<template>
  <div class="title">
    <slot class="title"></slot>
  </div>
</template>
<style lang="less" scoped>
.title {
    position: relative;
  font-size: 18px;
  color: #333333;
  padding-left: 8px;
  margin: 25px 0;
  font-weight: 500
}
.title::before{
    content: "";
    position: absolute;
    left: -1px;
    font-weight: 500;
    top: 52%;
    height: 16px;
    width: 4px;
    background-color: #ffaa06;
    transform: translateY(-50%)
}
</style>

