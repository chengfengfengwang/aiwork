<template>
  <div class="title">
    <span class="title_zh">
      <slot name="title_zh"></slot>
    </span>
    <span class="title_en">
      <slot name="title_en"></slot>
    </span>
  </div>
</template>
<style lang="less" scoped>
.title {
  position: relative;
  padding-left: 20px;
  margin: 50px 0;
}
.title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  height: 44px;
  width: 6px;
  background-color: #ffaa06;
  transform: translateY(-50%);
}
.title_zh {
  font-size: 48px;
  color: #333333;
}
.title_en {
  font-size: 20px;
  color: #333333;
}
</style>

