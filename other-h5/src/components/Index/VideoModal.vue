
<template>
  <div class="vd-modal-box" v-if="modalShow">
    <div class="btn-close" @click="modalShow=false"></div>
    <div class="modal-body">
      <video autoplay controls="controls" id="modal-video">
        <source :src="video" type="video/mp4">
      </video>
      <!-- <div class="vd-cover" style="display: block;">
        <img src="http://s.immusician.com/static/imgs/teachers_cover.png" alt>
        <div class="vd-modal">
          <a href="javascript:void(0);" class="icon-modal-play"></a>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
    props:{
        video:{
            type:String
        }
    },
  data() {
    return {
      modalShow: false
    };
  },
  methods:{
      show(){
          this.modalShow = true
      }
  }
};
</script>
<style lang="less" scoped>
.vd-modal-box {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  .btn-close {
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
    right: 60px;
    top: 60px;
    background: url(http://s.immusician.com/static/website/imgs/btn-close.png)
      no-repeat center center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .modal-body{
      top: 50%;
    left: 50%;
    position: absolute;
    width: 700px;
    height: 392px;
    background: #000;
    margin-top: -196px;
    margin-left: -350px;
  }
}
.vd-modal-box video{
    width: 700px;
}
</style>


    