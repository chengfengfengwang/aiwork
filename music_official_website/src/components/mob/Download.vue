<template>
  <div class="download" v-show="downloadShow" :style="{paddingBottom:isIphonex?'20px':'10px'}">
    <div class="icon_area">
      <img src="./../../assets/mob_assets/img/appicon.png" alt>
    </div>
    <div class="download_main">
      <div class="main_title">下载音乐壳APP</div>
      <div class="sub_title">让孩子爱上音乐</div>
    </div>
    <div class="down_load_btn" id="downloadButton">立即下载</div>
    <div class="close_icon" @click="closeDownload">
      <img src="./../../assets/img/close.png" alt>
    </div>
  </div>
</template>
<script>
import { isIphonex, isWebview } from "./../../assets/util.js";
export default {
  data() {
    return {
      downloadShow: true,
      isIphonex: false
    };
  },
  created() {
    this.isIphonex = isIphonex();
    this.downloadShow =
      sessionStorage.getItem("closedDownloadShow") !== "true" && !isWebview();
      this.initShareInstall()
  },
  mounted() {},
  methods: {
    closeDownload() {
      this.downloadShow = false;
      sessionStorage.setItem("closedDownloadShow", "true");
    },
    initShareInstall() {
      var data = ShareInstall.parseUrlParams(); //shareinstall.js中提供的工具函数，解析url中的所有查询参数
      data.channel = data.channel ? data.channel : "index_mob";
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
              button = document.getElementById("downloadButton");
            button.style.visibility = "visible";

            //用户点击某个按钮时(假定按钮id为downloadButton)，安装app
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

<style lang="less" scoped>
.download {
  box-sizing: border-box;
  font-size: 12px;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(222, 222, 222, 0.75);
  border-radius: 5px;
  padding: 10px 15px;
  position: fixed;
  z-index: 999;
  width: 93%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  .icon_area {
    //box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.07);
    margin-right: 8px;
    border-radius: 6px;
    line-height: 40px;
    height: 40px;
    img {
      width: 40px;
    }
  }
  .download_main {
    flex: 1;
    .main_title {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
    }
    .sub_title {
      font-family: PingFangSC-Light;
      font-size: 10px;
      color: #666666;
      letter-spacing: 1.1px;
    }
  }
  .down_load_btn {
    position: absolute;
    right: 30px;
    top: 50%;
    margin-top: -15px;
    background: #ffaa06;
    border-radius: 15px;
    width: 76px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
  }
  .close_icon {
    position: absolute;
    right: 0;
    top: 0;
    padding: 3px 5px;
    img {
      width: 10px;
    }
  }
}
</style>
