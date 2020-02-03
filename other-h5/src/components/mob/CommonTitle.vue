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
  padding-left: 6px;
  margin: 25px 0;
}
.title::before{
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    height: 60%;
    width: 2px;
    background-color: #ffaa06;
    transform: translateY(-50%)
}
</style>

