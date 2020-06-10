<template>
  <div>
    <div class="mask" v-show="maskShow">
      <div class="content_wrapper">
        <div class="title">想要获取更多优质音乐？</div>
        <div class="content">
          <div>下载app，畅享全部课程配套音乐，</div>
          <div>还可享受部分免费课程~</div>
        </div>
        <div  @click="download();toCount()" class="btn">点击下载</div>
      </div>
    </div>
  </div>
</template>
<script>
import {initShareInstall, isIphonex} from 'common/util.js'

export default {
   props:{
    countCallBack:{
      type:Function
    }
  },
  data() {
    return {
      maskShow: true,
      qr: ""
    };
  },
  created() {
    this.getQr();
  },
  mounted(){
      initShareInstall()
  },
  methods: {
    download(){
      location.href = "http://api.yinji.immusician.com/download/?channel=cocodt"
    },
    toCount(){
      if(typeof this.countCallBack === 'function'){
        this.countCallBack()
      }
    },
    getQr() {
      this.axios
        .get(
          `http://58.87.125.111:55555/v1/operate/activity_qr/?activity_type=anniversary_vip`
        )
        //.get(`http://58.87.125.111:55555/v1/operate/activity_qr/?activity_type=`)
        .then(res => {
          if (!res.error) {
            this.qr = res.data;
          }
        });
    }
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

.content_wrapper {
  padding: 24px 0;
  width: 325px;
  border-radius: 20px;
  background-color: #fff;
  position: fixed;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  text-align: center;
  text-align: center;
  .title {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
  .content {
    margin: 20px auto;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .btn {
    width: 140px;
    height: 40px;
    line-height: 40px;
    border: 1px solid rgba(218, 94, 28, 1);
    border-radius: 20px;
  }
}
</style>

