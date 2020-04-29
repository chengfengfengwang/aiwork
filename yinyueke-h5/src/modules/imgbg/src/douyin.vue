<template>
  <div class="page">
      <div class="tip">
          保存图片到相册，打开抖音即可看到直播间～～
      </div>
    <img src="../../../assets/img/imgbg/douyin/bg.jpg" alt="" class="bg">
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgArr: []
    };
  },
  created() {
    document.title='AI音乐学院抖音直播间'
  },
  mounted() {
  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
.page{
  text-align: center;
}
.tip{
    padding: 6px 0 0px 0;
    font-size: 9px;
    text-align: center
}
img.bg{
  width: 36%;
}
</style>

