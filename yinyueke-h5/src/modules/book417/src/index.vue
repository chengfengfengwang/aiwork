<template>
  <div id="main">
    {{book}}
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
import bookDir from "../bookDir.js";
export default {
  data() {
    return {
      book:''
    };
  },
  created() {
    console.log(bookDir);
    this.book = bookDir[getQueryVariable('index')]
    console.log(this.book);
  },

  methods: {
    
  }
};
</script>
<style lang="less">
#main {
  position: relative;
  font-size: 16px;
  text-align: center
}
.bg {
  width: 100%;
}
.btn_wrapper {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  .text {
    position: absolute;
    width: 100%;
    top:26px;
    text-align: center;
    left: 50%;
    transform: translateX(-56%);
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .btn {
    width: 290px;
  }
}
</style>
