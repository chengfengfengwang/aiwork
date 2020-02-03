<template>
  <div>
    <div class="backBg"></div>
    <header>
      <img src="http://s.immusician.com/static/imgs/shanshan.png">
      <h2>{{topText}}</h2>
    </header>
    <div class="list">
      <ul></ul>
    </div>
    <div class="right"></div>
    <div class="playerContainer"></div>
    <div class="floatLayer" v-show="!openInApp">
      <div class="logo"></div>
      <div class="logoText">
        <span>下载APP</span>
        <span>零基础学音乐，限时题库免费领！</span>
      </div>
      <!-- <a class="downCls" id="downloadButton" href="javascript:;">下载</a> -->
      <a
        v-if="from == 'hb'"
        class="downCls"
        href="http://cdn.kids.immusician.com/channel/static/html/channel_page_auto.html?channel=huiben"
      >下载</a>
      <a
        v-if="from == 'common'"
        class="downCls"
        href="http://cdn.kids.immusician.com/channel/static/html/channel_page_auto.html?channel=gzhhb"
      >下载</a>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../common/util.js";
import $ from "jquery";
import initShareInstall from "./../../common/shareInstall";
import { close } from "fs";
export default {
  data() {
    return {
      topText: "器乐王国之旅绘本歌单",
      from: "",
      //host:'http://192.168.1.91:55555',
      host: "http://api.yinji.immusician.com:55555",
      openInApp:false
    };
  },
  mounted() {
    var that = this;
    if (getQueryVariable("from") === "common") {
      this.topText = "姗姗老师推荐歌单";
      document.title = "【音乐壳】姗姗老师启蒙歌单";
      this.from = "common";
    } else if (getQueryVariable("from") === "hb") {
      this.topText = "器乐王国之旅绘本歌单";
      this.from = "hb";
      document.title = "【音乐壳】器乐王国绘本歌单";
    }
    this.openInApp = window.navigator.userAgent.indexOf('com.immusician') != -1;

    (function(doc, win) {
      that.enterCount();
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
      // setTimeout(() => {
      //     initShareInstall('index_mob')
      // }, 2000);
      initShareInstall("");
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
        if (that.from == "hb") {
          var mp3Array = [
            "小星星.mp3",
            "卡农-尤克里里.mp3",
            "生日歌-单簧管双簧管大管.mp3",
            "萨克斯.mp3",
            "彼得与狼-长笛.mp3",
            "凯旋进行曲-小号.mp3",
            "非洲鼓.mp3",
            "木琴钟琴.mp3",
            "小狗圆舞曲-钢琴.mp3",
            "小步舞曲-乐器合奏.mp3"
          ];
          var baseUrl = "http://cdn.kids.immusician.com/static/mp3/";
        } else {
          var mp3Array = [
            "Moon River钢琴版.mp3",
            "小野リサ - Moon River.mp3",
            "德彪西 - 月光.mp3",
            "青岛爱乐少年合唱团 - 鳟鱼.mp3",
            "乔治·格什温 - 蓝色狂想曲.mp3",
            "爱德华·艾尔加 - 爱的致意.mp3",
            "门德尔松 - 春之歌.mp3",
            "施特劳斯父子 - 圆舞曲.mp3",
            "舒曼 - 梦幻曲.mp3",
            "长恨歌 - 山在虚无缥缈间.mp3",
            "《春夜喜雨》小吉他弹唱.mp3",
            "《咏鹅》小吉他弹唱.mp3",
            "中国音乐：牧童短笛.mp3",
            "中国音乐：春江花月夜.mp3",
            "中国音乐：茉莉花.mp3",
            "德彪西：小牧童.mp3",
            "德彪西：小黑人.mp3",
            "德彪西：月光.mp3",
            "鳟鱼五重奏：小行板(主题变奏曲).mp3",
            "鳟鱼五重奏：活泼的快板.mp3",
            "鳟鱼五重奏：终曲：适度的快板.mp3",
            "鳟鱼五重奏：行板.mp3",
            "鳟鱼五重奏：诙谐曲：急板.mp3",
            "动物狂欢节：乌龟-庄严的行板.mp3",
            "动物狂欢节：大象-壮丽的快板.mp3",
            "动物狂欢节：天鹅-高雅的行板.mp3",
            "动物狂欢节：母鸡和公鸡-中庸的快板.mp3",
            "动物狂欢节：袋鼠-跳跃的节奏.mp3",
            "动物狂欢节：野驴-急迫的急板.mp3",
            "图画展览会：两个犹太人.mp3",
            "图画展览会：侏儒.mp3",
            "图画展览会：利莫杰斯集市.mp3",
            "图画展览会：古城堡.mp3",
            "图画展览会：孩子们在游戏后的争吵.mp3",
            "图画展览会：漫步.mp3",
            "图画展览会：牛车.mp3",
            "图画展览会：雏鸡在蛋壳中的芭蕾.mp3",
            "图画展览会：鸡脚上的小屋.mp3",
            "维瓦尔第 - 冬天：不很快的快板.mp3",
            "维瓦尔第 - 冬天：广板.mp3",
            "维瓦尔第 - 冬天：快板，慢板，快板.mp3",
            "维瓦尔第 - 夏天：不十分快的快板，快板.mp3",
            "维瓦尔第 - 夏天：急板.mp3",
            "维瓦尔第 - 夏天：柔板.mp3",
            "维瓦尔第 - 春天：广板.mp3",
            "维瓦尔第 - 春天：快板.mp3",
            "维瓦尔第 - 秋天：十分的柔板.mp3",
            "维瓦尔第 - 秋天：快板，十分快的快板.mp3",
            "维瓦尔第 - 秋天：快板.mp3",
            "小星星.mp3",
            "卡农-尤克里里.mp3",
            "生日歌-单簧管双簧管大管.mp3",
            "萨克斯.mp3",
            "彼得与狼-长笛.mp3",
            "凯旋进行曲-小号.mp3",
            "非洲鼓.mp3",
            "木琴钟琴.mp3",
            "小狗圆舞曲-钢琴.mp3",
            "小步舞曲-乐器合奏.mp3",
            "Beauty and the Beast.mp3",
            "D大调云雀弦乐四重奏.mp3",
            "let it go- 冰雪奇缘-打击乐版本.mp3",
            "彼得与狼-单簧管.mp3",
            "彼得与狼-双簧管.mp3",
            "彼得与狼-大管.mp3",
            "音乐之声-Do Re Mi.mp3"
          ];
          var baseUrl = "http://s.immusician.com/static/mp3/";
        }
        
        
        var html = "";

        for (var i = 0; i < mp3Array.length; i++) {
          var name = mp3Array[i];
          var url = baseUrl + encodeURI(name);
          html +=
            "<li><p>" +
            (i + 1) +
            ". " +
            name.replace(/.mp3|.wma/, "") +
            '</p><a href="javascript:;" data-url="' +
            url +
            '"></a></li>';
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
          that.countData(songName);
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

      $(".list li").click(function(event) {
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
      //   if (
      //     (browser.versions.ios && browser.versions.qq) ||
      //     browser.versions.weixin
      //   ) {
      //     $(".downCls").attr(
      //       "href",
      //       "http://a.app.qq.com/o/simple.jsp?pkgname=com.immusician.music"
      //     );
      //   }

      //   if (browser.versions.ios && browser.versions.iguitar) {
      //     $(".downCls").attr(
      //       "href",
      //       "https://itunes.apple.com/cn/app/id1246637618"
      //     );
      //   }

      var channel = getParam("channel");
    });
  },
  methods: {
    enterCount() {
      if (this.from === "hb") {
        var event_id = "5d5a5edac938cda633d5a215";
      } else if (this.from === "common") {
        var event_id = "5d5a5edac938cda633d5a217";
      }
      var param = {
        event_id: event_id,
        uid: 0,
        create_time: parseInt(new Date().valueOf() / 1000),
        item_id: location.href,
        item_type: 6
        //"duration": ''
      };
      // this.axios.post(`${this.host}/v1/abtesting/upload_event_data/`,param).then(res=>{
      //   console.log(res)
      // })
    },
    countData(songName) {
      if (this.from === "hb") {
        var event_id = "5d5a5edac938cda633d5a216";
      } else if (this.from === "common") {
        var event_id = "5d5a5edac938cda633d5a218";
      }
      var param = {
        event_id: event_id,
        uid: 0,
        create_time: parseInt(new Date().valueOf() / 1000),
        item_id: songName,
        item_type: 4
        //"duration": ''
      };
      //console.log(param)
      //return
      // this.axios.post(`${this.host}/v1/abtesting/upload_event_data/`,param).then(res=>{
      //     console.log(res)
      // })
    }
  }
};
</script>
<style>
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
  height: 0.8rem;
  float: left;
  margin-left: 0.2rem;
}
header h2 {
  float: left;
  color: white;
  font-weight: 400;
  font-size: 0.32rem;
  line-height: 0.8rem;
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
    height: 1.5rem;
    margin-left: 0.24rem;
  }
  header h2 {
    font-size: 0.36rem;
    line-height: 1.5rem;
    margin-left: 0.2rem;
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
    /* border: 0.01rem solid #ede6f4; */
    /* background: url(http://s.immusician.com/static/imgs/Icon-180.png) center
      center no-repeat; */
      background: url('./../../assets/img/songList/logo.png') center
      center no-repeat;
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
</style>


