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
  padding-left: 8px;
  margin: 15px 0;
}
.title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 55.5%;
  height: 16px;
  width: 4px;
  background-color: #ffaa06;
  transform: translateY(-24%);
}
.title_zh {
  font-size: 18px;
  font-weight: 500;
  color: #333333;
}
.title_en {
    margin-left:5px;
  font-size: 10px;
  color: #333333;
}
</style>

