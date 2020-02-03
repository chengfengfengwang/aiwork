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
  padding-left: 6px;
  margin: 15px 0 20px 0;
}
.title::before {
  content: "";
  position: absolute;
  left: -1px;
  top: 54%;
  height: 35%;
  width: 4px;
  background-color: #ffaa06;
  transform: translateY(-38%);
}
.title_zh {
  font-size: 18px;
  color: #333333;
  font-weight: 500
}
.title_en {
    //margin-left:5px;
  font-size: 10px;
  color: #333333;
}
</style>

