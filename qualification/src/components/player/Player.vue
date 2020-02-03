<template>
  <div>
    <div class="myplayer">
      <div class="lyrics">
        <p v-for="lyric in song.lyric">{{lyric}}</p>
      </div>
      
      <div class="panel">
        <div class="img-box">
        <img class="albumcover" :src="song.cover" alt>
      </div>
        <p class="song">{{song.title}}</p>
        <p class="singer">{{song.singer.name}}</p>
        <div class="time">
          <span class="time goingtime">0:00</span>
          <span>/</span>
          <span class="time duration">03:02</span>

          <div class="volumwrap">
            <span>
              <i class="iconfontyyy volumico">&#xe60a;</i>
            </span>
            <div class="volumbox">
              <div class="select"></div>
            </div>
          </div>
        </div>
        <div class="progresswrap">
          <div class="progress">
            <div class="cur-progress"></div>
          </div>
        </div>
        <div class="control">
          <i class="iconfontyyy">&#xe603;</i>
          <i class="iconfontyyy delete">&#xe607;</i>
          <i class="iconfontyyy pause">&#xe60f;</i>
          <i class="iconfontyyy play">&#xe61d;</i>
          <!-- <i class="iconfontyyy next">&#xe620;</i> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lyrics: `
            兄弟一起闯 - 孙浩然
      作词：孙浩然/贺丰\n
      作曲：易欣
      来自不同的土壤
      为了梦想闯四方
      人前风风光光
      背后黯然神伤
      背后黯然神伤
      背后黯然神伤
      背后黯然神伤
      背后黯然神伤
      背后黯然神伤
      背后黯然神伤
      背后黯然神伤
      背后黯然神伤
      背后黯然神伤背后黯然神`
    };
  },
  props: {
    song: {
      type: Object
    }
  },
  mounted() {
    var that = this;
    var arr = [
      {
        song: "骄傲的少年",
        songsrc: "music1.mp3",
        singer: "南征北战",
        imgsrc: "image/1.jpg"
      },
      {
        song: "You",
        songsrc: "music2.mp3",
        singer: "Approaching Nirvana",
        imgsrc: "image/2.png"
      },
      {
        song: "Canon In D (Guitar)",
        songsrc: "music3.mp3",
        singer: "The O'Neill Brothers",
        imgsrc: "image/3.jpg"
      },
      {
        song: "不为谁而作的歌",
        songsrc: "music4.mp3",
        singer: "林俊杰 徐佳莹",
        imgsrc: "image/4.png"
      },
      {
        song: "Always With Me",
        songsrc: "music5.mp3",
        singer: "《千与千寻》ED / アニメ",
        imgsrc: "image/5.jpg"
      },
      {
        song: "寻人启事",
        songsrc: "music6.mp3",
        singer: "徐佳莹",
        imgsrc: "image/6.jpg"
      }
    ];

    var play = document.getElementsByClassName("play")[0],
      pause = document.getElementsByClassName("pause")[0],
      goingtime = document.getElementsByClassName("goingtime")[0],
      duration = document.getElementsByClassName("duration")[0],
      control = document.getElementsByClassName("control")[0],
      onOff = true;
    var runningtime = 0;
    var myaudio = new Audio();
    var duranum;

    //play.style.display = 'none';
    var minuts = 0;
    var seconds = 0;
    var progresstimer = null; //定时器号码

    function counttime() {
      if (myaudio.currentTime < 10) {
        seconds = "0" + parseInt(myaudio.currentTime);
      } else {
        seconds = parseInt(myaudio.currentTime);
        if (myaudio.currentTime > 60) {
          minuts = parseInt(myaudio.currentTime / 60);
          seconds = parseInt(myaudio.currentTime) - minuts * 60;
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
        }
      }
      runningtime = minuts + ":" + seconds;
      goingtime.innerText = runningtime;
    }

    function toplay() {
      myaudio.src = that.song.scr_file;
      myaudio.volume = 0.5;
      myaudio.play();
    }
    play.addEventListener("click", function() {
      if (onOff) {
        toplay();
        onOff = false;
      }
      myaudio.play();
      pause.style.display = "block";
      play.style.display = "none";
      clearInterval(progresstimer);
      progresstimer = setInterval(getprogress, 1000); //按下播放键时，启动定时器
    });
    pause.addEventListener("click", function() {
      myaudio.pause();
      play.style.display = "block";
      pause.style.display = "none";
      clearInterval(progresstimer); //按下暂停键时，停止计时器
    });
    myaudio.addEventListener("canplay", function() {
      //音乐准备就绪后
      duranum =
        parseInt(myaudio.duration / 60) + ":" + parseInt(myaudio.duration % 60);
      duration.innerText = duranum;
      setInterval(counttime, 1000);
      clearInterval(progresstimer);
      progresstimer = setInterval(getprogress, 1000); //音乐准备就绪后，启动进度条定时器
    });
    myaudio.addEventListener("waiting", function() {
      clearInterval(progresstimer);
    });
    myaudio.addEventListener("ended", function() {
      // 结束后自动播放下一首
      toplay(num);
      curprogress.style.width = 0;
      stepdistance = 0;
    });

    var volumbox = document.getElementsByClassName("volumbox")[0]; /*音量部分*/
    var volumwrap = document.getElementsByClassName("volumwrap")[0];
    var select = document.getElementsByClassName("select")[0];
    var conwidth = volumbox.offsetLeft;
    volumwrap.addEventListener("click", function(e) {
      select.style.width = e.clientX - conwidth - 20 - 30 + "px";
      myaudio.volume = (e.clientX - conwidth - 20 - 30) / 50; /*音量部分*/
    });
    var progresswidth = document.getElementsByClassName("progress")[0]
      .scrollWidth; //获取包裹进度条元素总宽度
    var curprogress = document.getElementsByClassName("cur-progress")[0]; //获取进度条元素
    var stepdistance = 0; //当前进度条元素宽度初始化
    function getprogress() {
      stepdistance += progresswidth / myaudio.duration; //每一秒要走的距离
      curprogress.style.width = stepdistance + "px";
    }
  }
};
</script>
<style lang="less" scoped>
@font-face {
  font-family: "iconfont";
  /* project id 325910 */
  src: url("iconfonts/iconfont.eot");
  src: url("iconfonts/iconfont.eot?#iefix") format("embedded-opentype"),
    url("iconfonts/iconfont.woff") format("woff"),
    url("iconfonts/iconfont.ttf") format("truetype"),
    url("iconfonts/iconfont.svg#iconfont") format("svg");
}

.iconfontyyy {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
}
body {
  background: #fafafa;
}
.myplayer {
  display: flex;
  justify-content: space-around;
  margin: 200px auto;
  color: #4a4a4a;
  font-size: 15px;
  //width: 586px;
  //height: 190px;
  /*border: 1px solid black;*/
  cursor: default;
  padding: 20px;
}

.panel {
  position: relative;
  width: 321px;
  height: 190px;
  /*border: 1px solid black;*/
}

.song {
  font-size: 24px;
  font-weight: 400;
  color: #030303;
  margin-bottom: 5px;
}

.singer {
  margin: 15px 0;
}
.time {
  font-size: 11px;
  color: rgb(155, 155, 155);
}

.volumwrap {
  /*音量部分*/
  display: inline-block;
  height: 21px;
}
.volumwrap:hover .volumbox {
  width: 40px;
}
.volumico {
  margin-left: 6px;
  font-size: 13px;
}
.volumbox {
  /*display: none; */
  display: inline-block;
  transition: all 0.5s;
  overflow: hidden;
  width: 0;
  height: 2px;
  margin-bottom: 3px;
  background: #f1f1f1;
}
.select {
  /*音量部分*/
  background: red;
  width: 25px;
  height: 2px;
}
.progress {
  /* 进度条*/
  width: 321px;
  height: 2px;
  background: #9999993b;
}
.cur-progress {
  background: red;
  height: 2px;
  width: 0;
} /* 进度条*/

.control {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}

.control .iconfontyyy {
  width: 30px;
  font-size: 30px;
  color: #4a4a4a;
}

.control .play {
  position: absolute;

  top: 0px;
  right: 70px;
  font-size: 32px;
}

.control .pause {
  position: absolute;
  display: none;
  right: 70px;
  top: 3px;
}

.control .next {
  position: absolute;
  top: 0;
  right: 0;
}
.control .delete {
  margin-left: 40px;
}
.img-box {
  position: absolute;
  left: -260px;
  top:0;
  overflow: hidden;
  width: 200px;
  height: 200px;
  margin-top: -5px;
  border-radius: 50%;
  animation: myfirst 40s infinite linear;
}
.img-box img {
  width: 200px;
  height: 200px;
}
@keyframes myfirst {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


