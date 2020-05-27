<template>
  <div id="main">
    hello
  </div>
</template>
<script>
import { getDate1} from "../../common/util.js";
import html2canvas from "html2canvas";
import Loading from "../../components/Loading";
export default {
  data() {
    return {
      name: 'qq',
      course: 'asdf',
      loadingShow: true,
      resultBase64:'',
      resultBase64Show: false,
      bgSrc: "",
      date:""
    };
  },
  created() {
   
  },
  components: {
    Loading
  },
  mounted() {
    
  },
  methods: {
    readyAll() {
      let pArr = [];
      pArr.push(this.posterTo64());
      Promise.all(pArr).then(res => {
        this.$nextTick(() => {
          setTimeout(() => {
            console.log('---getResult64---')
             this.getResult64();
          }, 200);
        //this.getResult64();
        });
      });
    },

    posterTo64() {
      return new Promise((resolve, reject) => {
        this.imgToBase64(this.posterUrl).then(res => {
          this.bgSrc = res;
          resolve();
        });
      });
    },
    imgToBase64(url) {
      var url = url + "?" + new Date().valueOf();
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "Anonymous");
        img.src = url;
        img.onload = function() {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var base64 = canvas.toDataURL("image/png");
          //console.log(base64);
          resolve(base64);
          //document.querySelector('#test').src = base64
        };
      });
    },
    getResult64() {
      console.log('开始调用getResult64');
      html2canvas(document.querySelector("#posterContainer"), {
        //backgroundColor: "transparent"
        //allowTaint: true
      }).then(canvas => {
        //return
        //把画好的canvas转成base64
        this.loadingShow = false;
        console.log(canvas);
        console.log('调用getResult64成功');
        // var img = new Image();
        // img.classList.add("resultImg");
        // img.src = canvas.toDataURL("image/png");
        // img.onload = function() {
        //   console.log("onload");
        //   document.body.appendChild(img);
        // };
        this.resultBase64 = canvas.toDataURL("image/png");
        this.resultBase64Show = true;
        // console.log("----------");
        // console.log(this.resultBase64);
        // console.log("----------");
      }).catch(err=>{
        console.log(err)
      });
    }
  }
};
</script>
<style lang="less">
#main{
  height: 100vh;
  position: relative;
}
body{
    overflow: hidden;
}
#posterContainer{
    position: absolute;
    left: 0;
    top:1000px;
    width: 100%;
}
.poster_wrapper {
  position: absolute;
  left: 0;
  top:50%;
  width: 100%;
  transform: translateY(-60%);
  .bg {
    width: 100%;
  }
  .name {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 117px;
    left: 50%;
    transform: translateX(-50%);
    font-family: "PingFangSC-Semibold";
    font-size: 17px;
    font-weight: 500;
    .name_text{
      color:rgba(53,32,28,1);
    }
  }
  .course {
    position: absolute;
    top: 185px;
    width: 100%;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    //font-family: "PingFangSC-Semibold";
    font-size: 14px;
    color:rgba(53,32,28,1);
    .course_text{
      color:rgba(201,145,71,1);
      font-weight: 500;
    }
  }
  .date{
    position: absolute;
    bottom: 20px;
    right: 32px;
    font-size: 10px;
    color:rgba(53,32,28,1);
  }
}

.share_btn {
  position: absolute;
  right: 15px;
  top: 25px;
  width: 88px;
  height: 30px;
  line-height: 30px;
  background: rgba(255, 203, 21, 1);
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  font-family: "PingFang SC";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.tips {
  position: absolute;
  bottom: 20px;
  right: 8px;
  writing-mode: vertical-rl;
  font-size: 11px;
  font-family: "PingFang SC";
  font-weight: 400;
  color: rgba(57, 57, 57, 1);
  -webkit-text-stroke: 1px undefined;
}
.tips.nofree {
  bottom: 28px;
  right: 2px;
}
</style>
