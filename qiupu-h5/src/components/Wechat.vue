<template>
  <div>
    <div class="we_icon" @click="maskShow=true">
      <img src="../assets/img/login/wechat.png" alt>
    </div>
    <div class="mask" v-show="maskShow">
      <div class="content_wrapper">
        <div class="qr_wrapper">
          <img class="qr" :src="qr" alt>
        </div>
        <div class="text_area">
        <div class="text">扫码关注“音乐壳”公众号</div>
        <div class="text">添加老师微信</div>
        </div>
        
        <img @click="maskShow=false" src="../assets/img/common/close1.png" alt class="close_icon">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      maskShow: false,
      qr:''
    };
  },
  created(){
    this.getQr()
  },
  methods:{
    getQr(){
      this.axios
        .get(`http://58.87.125.111:55555/v1/operate/activity_qr/?activity_type=anniversary_vip`)
        //.get(`http://58.87.125.111:55555/v1/operate/activity_qr/?activity_type=`)
        .then(res => {
          if(!res.error){
            this.qr = res.data;
          }
        });
    },
  }
};
</script>

<style lang="less">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.7);
}
.we_icon {
  position: fixed;
  right: 7px;
  top: 418px;
  width: 63px;
  height: 63px;
  img {
    width: 100%;
  }
}
.content_wrapper {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.qr_wrapper {
  margin: auto;
  width: 240px;
  height: 240px;
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  .qr {
    width: 200px;
  }
}
.text_area {
  margin: 16px 0 0 0;
  font-size: 14px;
  font-family: PingFang-SC-Regular, PingFang-SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.close_icon {
  margin-top: 16px;
  width: 35px;
  padding: 6px;
}
</style>

