<template>
  <div>
    <div class="backBg"></div>
    <header>
      <img src="../../../assets/img/songList/photo.jpg">
      <h2>{{title}}</h2>
      <h2></h2>
    </header>
    <div class="list">
      <ul></ul>
    </div>
    <div class="right"></div>
    <div class="playerContainer"></div>
    <div class="download songlist" v-show="downloadShow" :style="{paddingBottom:isIphonex?'20px':'10px'}">
      <div class="icon_area">
        <img src="../../../assets/img/common/logo.png" alt>
      </div>
      <div class="download_main">
        <div class="main_title">下载app,收听全部课程配套音乐</div>
        <div class="sub_title">让孩子爱上音乐</div>
      </div>
      <div class="down_load_btn" id="downloadButton">立即下载</div>
      <div class="close_icon" @click="closeDownload">
        <img src="../../../assets/img/common/close.png" alt>
      </div>
    </div>
  </div>
</template>
<script>
import { initShareInstall, getQueryVariable, isIphonex } from "common/util.js";
import $ from "jquery";
import { close } from "fs";
export default {
  data() {
    return {
      from: "",
      title: "",
      dicArr: [],
      downloadShow: true,
      isIphonex: false
    };
  },
  created() {
    this.isIphonex = isIphonex();
    this.getAudioList(getQueryVariable("listId"));
    initShareInstall();
  },
  components: {},
  mounted() {},
  methods: {
    closeDownload() {
      this.downloadShow = false;
      sessionStorage.setItem("closedDownloadShow", "true");
    },
    getAudioList(id) {
      this.axios
        .get(`http://api.yinji.immusician.com/v1/song/${id}/`)
        .then(res => {
          if (!res.error) {
            this.dicArr = res.data.songs;
            this.title = res.data.title;
            this.playBg = res.data.h5_bg ? res.data.h5_bg : "";
            document.title = res.data.title;
            this.renderItem();
          }
        });
    },
    renderItem() {
      var that = this;

      (function(doc, win) {
        var docEl = doc.documentElement,
          isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
          dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
          dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
          resizeEvt =
            "orientationchange" in window ? "orientationchange" : "resize";
        docEl.dataset.dpr = dpr;
        var recalc = function() {
          var width = docEl.clientWidth;
          if (width / dpr > 750) {
            width = 750 * dpr;
          }
          docEl.dataset.width = width;
          docEl.dataset.percent = 100 * (width / 750);
          docEl.style.fontSize = 100 * (width / 750) + "px";
        };
        recalc();
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
      })(document, window);

      ///////////////////
      $(document).ready(function($) {
        function getParam(strParamName) {
          var strReturn = "";
          var strHref = document.location.href;
          var bFound = false;
          var cmpstring = strParamName + "=";
          var cmplen = cmpstring.length;

          if (strHref.indexOf("?") > -1) {
            var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
            var aQueryString = strQueryString.split("&");
            for (var iParam = 0; iParam < aQueryString.length; iParam++) {
              if (aQueryString[iParam].substr(0, cmplen) == cmpstring) {
                var aParam = aQueryString[iParam].split("=");
                strReturn = aParam[1];
                bFound = true;
                break;
              }
            }
          }
          if (bFound == false) return null;
          return strReturn;
        }
        var isPlaying = false;
        var playIcon = "http://s.immusician.com/static/imgs/play_icon.png";
        var pauseIcon = "http://s.immusician.com/static/imgs/pause_icon.png";

        function buildHtml() {
          var baseUrl = "http://cdn.kids.immusician.com/static/mp3/";

          var html = "";

          for (var i = 0; i < that.dicArr.length; i++) {
            var item = that.dicArr[i];
            //var url = baseUrl + encodeURI(name);
            //html += "<li><p>" + (i + 1) + ". " + item.title + "</p></li>";
            html += "<li><p>" + item.title + "</p></li>";
          }
          $(".list ul").html(html);
        }
        buildHtml();

        function togglePlay(elm, songName) {
          var player = document.getElementById("player");
          resetIcons();
          //console.log(songName)
          //return
          if (!isPlaying) {
            player.play();
            elm.css("background-image", "url(" + pauseIcon + ")");
          } else {
            player.pause();
            elm.css("background-image", "url(" + playIcon + ")");
          }
          isPlaying = !isPlaying;
        }

        function resetIcons() {
          var lis = $(".list ul li a");
          lis.each(function(index, el) {
            lis.css("background-image", "url(" + playIcon + ")");
          });
        }
        var domList = $(".list li");
        $(".list li").click(function(event) {
          var index = Array.prototype.indexOf.call(domList, this);
          var curItem = that.dicArr[index];
          var title = encodeURIComponent(curItem.title);
          var url = encodeURIComponent(curItem.url);
          location.href = `normal.html?title=${title}&url=${url}&playBg=${encodeURIComponent(
            that.playBg
          )}#/play`;
          return;

          var p = $(this).find("p");
          var songName = $(this)
            .find("p")
            .text()
            .split(".")[1]
            .trim();
          var _this = $(this).find("a");
          var _url = _this.attr("data-url");
          var _currentUrl = $("#player source").attr("src");
          if (_currentUrl == _url) {
            togglePlay(_this, songName);
          } else {
            $(".playerContainer").html(
              '<audio id="player" crossorigin><source src="' +
                _url +
                '" type="audio/mpeg"></audio>'
            );
            isPlaying = false;
            setTimeout(function() {
              togglePlay(_this, songName);
            }, 50);
          }
          var _name = $(this)
            .find("p")
            .html();
        });

        var browser = {
          versions: (function() {
            var u = navigator.userAgent;
            return {
              mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
              iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
              iPad: u.indexOf("iPad") > -1, //是否iPad
              webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
              weixin: u.indexOf("MicroMessenger") > -1, //是否微信
              qq: u.match(/\sQQ/i) == " qq", //是否QQ
              iguitar: u.match("iGuitar") //IGuitar
            };
          })(),
          language: (
            navigator.browserLanguage || navigator.language
          ).toLowerCase()
        };
      });
    }
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  border: 0;
  -webkit-user-select: text;
}
a,
img {
  -webkit-touch-callout: none;
  text-decoration: none;
}
ol,
ul {
  list-style: none;
}
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  -webkit-text-size-adjust: none;
  -webkit-tap-highlight-color: transparent;
}
body,
html {
  font-family: "HanHei SC", "PingFang SC", "Helvetica Neue", "Helvetica",
    "STHeitiSC-Light", "Arial", sans-serif;
  font-size: 0.35rem;
  font-weight: 300;
  line-height: 0.5rem;
  -webkit-box-orient: vertical;
  -webkit-box-align: center;
  height: 100%;
}
body {
  width: 7.5rem;
  margin: 0 auto;
}
.backBg {
  background: #78d3ff url(http://s.immusician.com/static/imgs/bg.png) center
    center repeat;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
img {
  vertical-align: top;
}
header {
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 0.24rem;
  font-weight: 400;
  color: #333;
  text-align: center;
  height: 0.86rem;
  margin-top: 0.1rem;
  position: relative;
}
header img {
  width: 0.8rem;
  /* height: 0.8rem; */
  float: left;
  margin-left: 0.2rem;
}
header h2 {
  text-align: left;
  float: left;
  color: white;
  font-weight: 400;
  font-size: 0.32rem;
  margin-left: 0.12rem;
}
.list {
  width: 75%;
  margin: 0 0 0 0.2rem;
  float: left;
  padding-bottom: 0.1rem;
}
.list ul {
  margin: 0;
  padding: 0;
}
.list ul li {
  margin: 0.04rem 0 0;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0.04rem;
  padding: 0.01rem 0;
  position: relative;
}
.list ul li p {
  width: 90%;
  display: block;
  margin: 0;
  padding: 0;
  padding-left: 0.15rem;
  color: white;
  font-size: 0.2rem;
  line-height: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list ul li a {
  display: inline-block;
  position: absolute;
  background: url(http://s.immusician.com/static/imgs/play_icon.png) center
    center no-repeat;
  width: 0.5rem;
  height: 0.5rem;
  background-size: 60%;
  top: 0.03rem;
  right: 0.02rem;
  cursor: pointer;
}
.right {
  width: 24%;
  height: 100%;
  right: 0;
  top: 0;
  position: absolute;
  background: url(http://s.immusician.com/static/imgs/Bitmap.png) center 0.1rem
    no-repeat;
  background-size: 80%;
}
#player,
.playerContainer {
  display: none;
}
@media all and (orientation: portrait) {
  header {
    padding: 0.2rem 0;
    height: auto;
    overflow: hidden;
  }
  header img {
    width: 1.5rem;
    /* height: 1.5rem; */
    margin-left: 0.24rem;
  }
  header h2 {
    margin-top: 0.4rem;
    font-size: 0.36rem;
    margin-left: 0.1rem;
  }
  .list {
    width: 95%;
    padding-bottom: 1.4rem;
  }
  .list ul li {
    padding: 0.25rem 0;
  }
  .list ul li p {
    font-size: 0.32rem;
    line-height: 0.5rem;
    width: 90%;
  }
  .list ul li a {
    background-size: 100%;
    top: 0.23rem;
    right: 0.18rem;
  }
  .right {
    display: none;
    height: 2rem;
    width: 28%;
    background-size: 54%;
  }

  .floatLayer {
    width: 100%;
    height: 1.25rem;
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
  }
  .floatLayer .close {
    width: 1rem;
    height: 1rem;
    margin-top: 0.125rem;
    background: url(http://s.immusician.com/static/imgs/close.png) center center
      no-repeat;
    background-size: 25%;
    float: left;
    text-indent: -99rem;
  }
  .floatLayer .logo {
    width: 0.8rem;
    height: 0.8rem;
    margin-top: 0.2rem;
    margin-left: 0.2rem;
    float: left;
    border-radius: 0.15rem;
    background: url("../../../assets/img/songList/logo.png") center center
      no-repeat;
    background-size: 0.5rem;
  }
  .floatLayer .logoText {
    width: 4.2rem;
    height: 0.8rem;
    margin-top: 0.22rem;
    float: left;
    margin-left: 0.2rem;
    line-height: 0.4rem;
  }
  .floatLayer .logoText span {
    display: block;
    font-size: 0.32rem;
  }
  .floatLayer .logoText span:last-child {
    font-size: 0.27rem;
    color: #555;
    padding-top: 0.01rem;
  }
  .floatLayer .logoText span b {
    font-weight: 400;
    color: red;
  }
  .floatLayer .downCls {
    padding: 0.1rem 0.45rem;
    border: 1px solid #eee;
    border-radius: 6px;
    color: #888;
    float: right;
    text-align: center;
    margin: 0.25rem 0.25rem 0 0;
  }
  .review {
    background: #f9f9f9;
    padding-top: 0.5rem;
    margin-top: 0;
    border-bottom: 1px solid #eee;
  }
}
@media all and (orientation: landscape) {
  .download {
    display: none;
  }
  .floatLayer {
    display: none;
  }
  .right {
    position: fixed;
  }
}
.download.songlist {
  line-height: normal;
  box-sizing: border-box;
  font-size: 0.24rem;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(222, 222, 222, 0.75);
  border-radius: .1rem;
  padding: 0.2rem 0.3rem;
  position: fixed;
  z-index: 999;
  width: 93%;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  .icon_area {
    //box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.07);
    margin-right: .16rem;
    border-radius: .12rem;
    line-height: 0.8rem;
    height: 0.8rem;
    img {
      width: 0.8rem;
    }
  }
  .download_main {
    flex: 1;
    .main_title {
      font-family: PingFangSC-Regular;
      font-size: 0.24rem;
      color: #333333;
    }
    .sub_title {
      font-family: PingFangSC-Light;
      font-size: 0.2rem;
      color: #666666;
      letter-spacing: 1.1px;
    }
  }
  .down_load_btn {
    position: absolute;
    right: 0.6rem;
    top: 50%;
    margin-top: -.3rem;
    background: #ffaa06;
    border-radius: .3rem;
    width: 1.52rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 0.24rem;
    color: #ffffff;
  }
  .close_icon {
    position: absolute;
    right: 0;
    top: 0;
    padding: .06rem .1rem;
    img {
      width: .2rem;
    }
  }
}
</style>


