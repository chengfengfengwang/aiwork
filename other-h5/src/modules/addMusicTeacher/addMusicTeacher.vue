
import { Promise } from 'q';
<template>
  <div id="addMusicTeacher">
    <img id="bg" src="./../../assets/img/add_music_teacher.png" alt>
    <img v-show="qrShow" id="qr" :src="previewSrc" alt>
  </div>
</template>
<style lang="less" scoped>
#addMusicTeacher {
  max-width: 600px;
  margin: auto;

  position: relative;
  font-size: 0;
  #bg {
    width: 100%;
  }
  #qr {
    position: absolute;
    width: 40%;
    top: 49%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
<script>
export default {
  data() {
    return {
      previewSrc: "",
      qrShow: false
    };
  },
  mounted() {
    this.axios
      .get("http://58.87.125.111:55555/v1/operate/teacher_show/")
      .then(res => {
        //console.log(res)
        this.previewSrc = res.data.link;
      });
    var img = document.querySelector("#bg");
    var imgLoad = new Promise((resolve, reject) => {
      img.onload = () => {
        resolve("true");
      };
    });
    imgLoad.then(() => {
      this.qrShow = true;
    });
  }
};
</script>


