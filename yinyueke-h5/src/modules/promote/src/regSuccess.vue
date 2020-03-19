<template>
  <div id="main">
    <div class="main_wrapper">
      <img class="bg" src="../../../assets/img/promote/regSuccess/bg.png" alt />
      <!-- <img class="bottom" src="../../../assets/img/yiqiac/download_bottom.png" alt=""> -->
      <div id="download">立即使用</div>
    </div>
    <!-- <img class="bg" src="../../../assets/img/yiqiac/download.png" alt />
    <div id="download">立即下载</div>-->
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {
      topText: "趣味乐理启蒙配套教材音频（上）"
    };
  },
  created() {
    document.title = "疫期不孤单，爱心赠好课";
  },
  mounted() {
    //this.initShareInstall()
  },
  methods: {
    toPoster() {
      this.$router.push("/poster");
    },
    initShareInstall() {
      var data = ShareInstall.parseUrlParams(); //shareinstall.js中提供的工具函数，解析url中的所有查询参数
      data.channel = data.channel ? data.channel : "liebian-defu";
      console.log("---channel----");
      console.log(data.channel);
      console.log("---channel----");
      new ShareInstall(
        {
          appKey: "2KBKKFAK2E26FF",
          //可选项，微信中打开自定义遮罩层
          //shadow : function(){
          //  return "<div id='shareinstall_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
          // },
          /*可选参数，是否优先考虑下载app，以牺牲唤醒为代价*/
          //preferInstall:true,
          /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
          //preferWakeup:true,
          /*可选参数，微信中直接跳下载*/
          //weChatdownload:true,
          onready: function() {
            //shareinstall已成功回调
            console.log("shareinstall已成功回调");
            var m = this,
              button = document.getElementById("download");
            button.style.visibility = "visible";

            //用户点击某个按钮时(假定按钮id为download)，安装app
            button.onclick = function() {
              m.install();
            };
          }
        },
        data
      );
    }
  }
};
</script>
<style lang="less">
#main {
  //background-color: #78ce7d;
  min-height: 100vh;
}
.main_wrapper {
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // width: 100%;
  background-color: #FE3714;
  min-height: 100vh;
  position: relative;
  .bg {
    width: 100%;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  #download {
    position: absolute;
        top: 521px;
    left: 50%;
    transform: translateX(-50%);
    width: 315px;
    height: 54px;
    line-height: 54px;
    text-align: center;
    background: linear-gradient(
      0deg,
      rgba(254, 147, 13, 1) 0%,
      rgba(252, 247, 67, 1) 100%
    );
    box-shadow: 0px 11px 22px 0px rgba(171, 21, 5, 0.29),
      0px 6px 7px 0px rgba(223, 52, 52, 0.86);
    border-radius: 27px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(230, 24, 11, 1);
  }
}
</style>
