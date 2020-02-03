<template>
  <div v-show="show" id="backTop" @click="backToTop">
    <div class="back_wrapper">
      <img src="./../../assets/img/arrow.png" alt>
    </div>
    <!-- <span>返回顶部</span> -->
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
        
        var oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
       if(oTop>300){
           console.log('zzz')
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
  bottom: 150px;
  right: 20px;
  text-align: center;
  z-index: 8000;
  text-align: center;
  .back_wrapper {
    position: relative;
    width: 44px;
    height: 44px;
    margin: 0 auto 4px auto;
    background: #ffffff;
    border-radius: 22px;
    box-shadow: 0px 5px 15px 0px rgba(255, 170, 6, 0.22);
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 9px;
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
  font-family: PingFangSC-Regular;
  font-size: 10px;
  color: #333333;
}
</style>

