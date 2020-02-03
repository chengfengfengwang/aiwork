<template>
  <div v-show="show" id="backTop" @click="backToTop">
    <div class="back_wrapper">
      <img src="./../assets/img/arrow.png" alt>
    </div>
    <span>返回顶部</span>
  </div>
</template>
<script>
export default {
  data(){
    return{
      show:false
    }
  },
  mounted(){
    this.isShowBackIcon()
  },
  methods: {
    backToTop() {
      var timer = null;

      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        var oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - 180;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    },
    isShowBackIcon() {
      var that = this;
      window.addEventListener("scroll", function() {
       var scrollTop = document.documentElement.scrollTop;
       if(scrollTop>300){
         that.show = true;
       }else{
         that.show = false;
       }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#backTop {
  position: fixed;
  bottom: 118px;
  right: 230px;
  text-align: center;
  z-index: 88;
  .back_wrapper {
    position: relative;
    width: 60px;
    height: 60px;
    margin-bottom: 8px;
    background: #ffffff;
    border-radius: 30px;
    box-shadow: 0px 5px 15px 0px rgba(255, 170, 6, 0.22);
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 15px;
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
  font-family: PingFangSC-Regular;
  font-size: 10px;
  color: #333333;
}
</style>

