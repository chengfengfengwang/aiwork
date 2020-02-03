<template>
  <div class="container" id="myMusicTrip">
    <audio autoplay preload loop id="myTripAudio">
      <source src="../assets/musicTrip.mp3" type="audio/mp3">
    </audio>
    <div
      class="music_icon"
      v-bind:class="{app:openInApp,hide:currentPage==6}"
      @click="playAudio"
      v-show="!loading && !isWeixin"
    >
      <img v-show="isPlay" src="../assets/img/home-fix/on@2x.png" alt>
      <img v-show="!isPlay" src="../assets/img/home-fix/off@2x.png" alt>
    </div>
    <div class="page loading">
      <div class="middle_wrapper">
        <img src="../assets/img/mytrip/loading/uk.png" alt class="uk">
        <div class="progress_wrapper">
          <div class="p_grey">
            <div class="p_color"></div>
          </div>
          <span id="progressStatus">加载中...</span>
        </div>
      </div>
      <!-- <img v-show="enterShow" src="../assets/img/mytrip/loading/btn.png" alt="" @click="enter" class="btn"> -->
    </div>
    <div
      class="page p1"
      v-show="testShow"
      v-bind:class="{fadeIn:page1.fadeIn,animationStart:page1.animationStart}"
    >
      <div v-bind:class="{weixin:isWeixin,app:openInApp}" class="logo_area">
        <span class="name px1-right">{{userInfo.nickname}}</span>
        <img class="logo" src="../assets/img/mytrip/p1/logo.png" alt>
      </div>
      <div class="text_img">
        <img src="../assets/img/mytrip/p1/text-img.png" alt>
      </div>
      <div class="person">
        <img class="realp" src="../assets/img/mytrip/p1/p.png" alt>
        <img class="yingzi" src="../assets/img/mytrip/p1/yingzi.png" alt>
        <div class="music_note note4">
          <img src="../assets/img/mytrip/p1/note4.png" alt>
        </div>
      </div>
      <div class="music_note note1">
        <img src="../assets/img/mytrip/p1/note1.png" alt>
      </div>
      <div class="music_note note2">
        <img src="../assets/img/mytrip/p1/note2.png" alt>
      </div>
      <div class="music_note note3">
        <img src="../assets/img/mytrip/p1/note3.png" alt>
      </div>
      <div class="light">
        <img src="../assets/img/mytrip/p1/light.png" alt>
      </div>
      <Bottom v-show="page1.enterShow"></Bottom>
    </div>
    <div
      class="page p2"
      v-bind:class="{fadeIn:page2.fadeIn,animationStart:page2.animationStart}"
      v-show="testShow"
    >
      <div class="text">
        <p class="t1">
          <span class="bl" style="color:#99FFED">{{joinYear}}</span>年
          <span class="bl" style="color:#99FFED">{{joinMonth}}</span>月
          <span class="bl" style="color:#99FFED">{{joinDay}}</span>日，
        </p>
        <p class="t2">
          {{author}}是第
          <span class="bl" style="color:#99FFED">{{joinIndex}}</span>个加入AI音乐学院的同学
        </p>
        <p class="t3 para">和
          <span class="bl" style="color:#99FFED">10W+</span>的同学
        </p>
        <p class="t4">一起开启了{{author}}的音乐之旅</p>
      </div>
      <div class="ss">
        <div class="p_light">
          <img src="../assets/img/mytrip/p2/p-light.png" alt>
        </div>
        <div class="person">
          <img src="../assets/img/mytrip/p2/p.png" alt>
          <img src="../assets/img/mytrip/p2/hand.png" alt class="hand">
        </div>
      </div>

      <img class="star star1" src="../assets/img/mytrip/p2/star.png" alt>
      <img class="star star2" src="../assets/img/mytrip/p2/star1.png" alt>
      <img class="star star3" src="../assets/img/mytrip/p2/star2.png" alt>
      <img class="star star4" src="../assets/img/mytrip/p2/star3.png" alt>
    </div>
    <div
      class="page p3"
      v-bind:class="{fadeIn:page3.fadeIn,animationStart:page3.animationStart}"
      v-show="testShow"
    >
      <div class="text">
        <p class="t1">千里之行，始于足下</p>
        <p class="t2">这一年，{{author}}有一个小目标</p>
        <p class="t3">
          是学会
          <span class="instru">{{instrumentTypes.join('、')}}</span>
          <!-- <span v-for="item in instrumentTypes" :key="item" class="instru">{{item}}、</span> -->
        </p>
        <p class="t4 para">
          {{author}}一共在AI音乐学院学习了
          <span class="bl">{{purchase_count}}</span>套课程
        </p>
        <div class="t5">
          <div v-show="index<5" v-for="(item, index) in purchase_course" :key="item">《{{item}}》</div>
          <p v-show="purchase_course.length>4" style="margin-left:.5em">……</p>
        </div>
        <!-- <p class="t5">
          <p v-show="index<5" v-for="(item, index) in purchase_course"  :key="item">《{{item}}》</p>
          <p>……</p>
        </p>-->
      </div>
      <div class="person">
        <img src="../assets/img/mytrip/p3/p.png" alt>
      </div>
      <img src="../assets/img/mytrip/p3/arm.png" alt class="arm">
      <img src="../assets/img/mytrip/p3/star.png" alt class="star">
    </div>
    <div
      class="page p4"
      v-bind:class="{fadeIn:page4.fadeIn,animationStart:page4.animationStart}"
      v-show="testShow"
    >
      <div class="text">
        <div class="l1">
          在线学琴时间
          <span class="num">{{play_duration}}</span> 分
        </div>
        <div class="l2">
          弹奏音符
          <span class="num">{{play_beats_count}}</span> 个
        </div>
        <div class="l3">
          超过了
          <span class="num">{{play_duration_lable}}%</span> 的学员
        </div>
        <div class="l4">
          {{author}}
          <span v-show="isWeixin">就</span>是当之无愧的
          <img
            v-show="playName==1"
            class="img-name"
            src="../assets/img/mytrip/p4/name1.png"
            alt
          >
          <img v-show="playName==2" class="img-name" src="../assets/img/mytrip/p4/name2.png" alt>
          <img v-show="playName==3" class="img-name" src="../assets/img/mytrip/p4/name3.png" alt>
        </div>
      </div>
      <div class="ss">
        <img class="person" src="../assets/img/mytrip/p4/person.png" alt>
        <img src="../assets/img/mytrip/p4/hand.png" alt class="hand">
      </div>
      <div class="desklight">
        <img src="../assets/img/mytrip/p4/deng.png" alt class="deng">
        <img src="../assets/img/mytrip/p4/light.png" alt class="light">
      </div>
      <img src="../assets/img/mytrip/p4/star.png" alt class="star">
      
      <img src="../assets/img/mytrip/p4/note1.png" alt class="note note1">
      <img src="../assets/img/mytrip/p4/note2.png" alt class="note note2">
      <img src="../assets/img/mytrip/p4/note3.png" alt class="note note3">
    </div>
    <div
      class="page p5"
      v-bind:class="{fadeIn:page5.fadeIn,animationStart:page5.animationStart}"
      v-show="testShow"
    >
      <div class="text">
        <div class="l1">勇于追求，不断超越</div>
        <div class="l2">是{{author}}的人生态度</div>
        <div class="l3">
          一共拿到
          <span class="num">{{play_a_count}}</span>次
          <span class="num">A</span>
        </div>
        <div class="l4">
          超过了
          <span class="num">{{play_duration_lable}}%</span>的同学
        </div>
      </div>
      <img src="../assets/img/mytrip/p5/star.png" alt class="star">
      <img src="../assets/img/mytrip/p5/guitar-man.png" alt class="man">
      <img src="../assets/img/mytrip/p5/light.png" alt class="light">
    </div>
    <div
      class="page p6"
      v-bind:class="{fadeIn:page6.fadeIn,animationStart:page6.animationStart}"
      v-show="true"
    >
      <div class="p6wrapper" v-bind:class="{openInApp:openInApp}">
        <div class="result_wrapper" v-bind:class="{above7:above7}">
          <div class="result">
            <img :src="avatarBase64" alt class="avatar" crossorigin="Anonymous">
            <div class="userinfo">
              <div class="nickname">{{userInfo.nickname}}</div>
              <div class="result_title">2018年学琴成绩单</div>
            </div>
            <div class="result_main">
              <div>
                <img
                  v-show="playName==1"
                  class="name_img"
                  src="../assets/img/mytrip/p6/name1.png"
                  alt
                >
                <img
                  v-show="playName==2"
                  class="name_img"
                  src="../assets/img/mytrip/p6/name2.png"
                  alt
                >
                <img
                  v-show="playName==3"
                  class="name_img"
                  src="../assets/img/mytrip/p6/name3.png"
                  alt
                >
                <div v-show="playName==1" class="name_text">年轻人，乐坛的接力棒就交给你了！</div>
                <div v-show="playName==2" class="name_text">阁下莫非就是江湖人称的“乐器王子”？</div>
                <div v-show="playName==3" class="name_text">尖叫声在哪里?</div>
              </div>
              <div class="learn_content">
                <p>
                  学会了
                  <span class="b">{{instrumentTypes.join('、')}}</span>
                  <!-- 学会了<span class="b">吉他、尤克里里</span> -->
                </p>
                <p>
                  学习了
                  <span class="b">{{purchase_count}}</span>门课程
                </p>
                <p>
                  学琴时间
                  <span class="b">{{play_duration}}</span>分钟
                </p>
                <p>
                  弹奏了
                  <span class="b">{{play_beats_count}}</span>个音符
                </p>
                <p>
                  一共获得了
                  <span class="b">{{play_a_count}}</span>次
                  <span class="w">A</span>
                </p>
                <p>
                  超过了
                  <span class="b">{{play_duration_lable}}%</span>的学员
                </p>
              </div>
            </div>
            <div class="qr_area">
              <div class="left">
                <p>扫一扫查看你的音乐成绩单</p>
                <p>领取新年礼包</p>
              </div>
              <div class="right">
                <img src="../assets/img/mytrip/p6/downloadQr.png" alt class="qrcode">
              </div>
            </div>
          </div>
        </div>

        <div v-show="openInApp" class="bottom_app" v-bind:class="{above7:above7}">
          <div class="save_tip">长按图片保存成绩单</div>
          <div class="bottom_btn">
            <div class="left" @click="reWatch">
              <img src="../assets/img/mytrip/p6/rewatch.png" alt>再看一遍
            </div>
            <div class="right" @click="showShareMenu">
              <img src="../assets/img/mytrip/p6/share.png" alt>晒一晒
            </div>
          </div>
        </div>
        <div v-show="!openInApp" class="bottom_h5" v-bind:class="{above7:above7}">
          <div class="btn" @click="getGiftInh5">
            <img src="../assets/img/mytrip/p6/gift.png" alt>领取新手礼包
          </div>
          <div class="tip">领取礼包需下载APP</div>
          <div class="re" @click="reWatch">
            <img src="../assets/img/mytrip/p6/rewatch-white.png" alt>再看一遍
          </div>
        </div>
      </div>
    </div>
    <div class="share_menu" v-bind:class="{show:shareShow}">
      <div>分享到：</div>
      <div class="menu_wrapper">
        <div class="wx" @click="share(22)">
          <img src="../assets/img/home-fix/wx.png" alt>
          <div>微信</div>
        </div>
        <div class="pyq" @click="share(23)">
          <img src="../assets/img/home-fix/pyq.png" alt>
          <div>朋友圈</div>
        </div>
        <div class="qq" @click="share(24)">
          <img src="../assets/img/home-fix/qq.png" alt>
          <div>QQ</div>
        </div>
        <div class="qqzone" @click="share(6)">
          <img src="../assets/img/home-fix/qqzone.png" alt>
          <div>QQ空间</div>
        </div>
        <div class="qqzone" @click="share(1)">
          <img src="../assets/img/home-fix/weibo.png" alt>
          <div>微博</div>
        </div>
      </div>
    </div>
    <div @click="hideShare" class="mask" v-bind:class="{show:shareShow}"></div>
  </div>
</template>
<script>
import {
  getQueryVariable,
  getPosition,
  autoPlayAudio,
  baseUrl,
  platForm,
  isWeixin,
  countVisit,
  countShare
} from "./../utils/util.js";
import Bottom from "./../components/Bottom";
import html2canvas from "html2canvas";
var FontFaceObserver = require("fontfaceobserver");
export default {
  data: function() {
    return {
      testShow: true,
      page1: {
        fadeIn: false,
        animationStart: false,
        enterShow: true
      },
      page2: {
        fadeIn: false,
        animationStart: false
      },
      page3: {
        fadeIn: false,
        animationStart: false
      },
      page4: {
        fadeIn: false,
        animationStart: false
      },
      page5: {
        fadeIn: false,
        animationStart: false
      },
      page6: {
        fadeIn: false,
        animationStart: false
      },
      currentPage: "1",
      pageLock: false,
      userInfo: {
        nickname: "",
        avatar: ""
      },
      joinTime: "",
      joinIndex: "",
      instrument_types: [],
      purchase_count: "", //学习的课程数量
      purchase_course: [], //购买的课程名称
      play_duration: "", //弹奏时长，分
      play_beats_count: "", //弹奏音符
      play_duration_lable: "", //超过多少人，百分比
      play_a_count: "", //成绩A的次数
      play_a_lable: "", //成绩超越的人
      openInApp: true,
      avatarBase64: "",
      uid: "",
      shareShow: false,
      enterShow: false,
      isPlay: false,
      loading: true,
      isWeixin: false,
      above7: false
    };
  },
  components: {
    Bottom
  },
  mounted() {
    console.log("2点31打了一个包");
    console.log(location.href);
    this.isWeixin = isWeixin;
    var u = navigator.userAgent.toLowerCase();
    this.openInApp =
      u.indexOf("immusician") != -1 ||
      u.indexOf("buluobang") != -1 ||
      u.indexOf("bangtabs") != -1;
    this.uid = getQueryVariable("uid");
    this.bindTouchEvent();
    this.initLoading();
    autoPlayAudio("myTripAudio");
    this.bindCloseWindow();
    countVisit(1);
    this.above7 = window.innerHeight > 700;
    console.log("----above7---");
    console.log(this.above7);
    console.log("----above7---");
    //this.bindAudioEvent();
    //this.imgToBase64('http://img.iguitar.immusician.com/avatar/cf8fb4dc146efe58190dd1706f04be95.jpg');
  },
  computed: {
    author() {
      if (this.openInApp) {
        return "你";
      } else {
        return "我";
      }
    },
    joinYear() {
      return new Date(this.joinTime * 1000).getFullYear();
    },
    joinMonth() {
      return new Date(this.joinTime * 1000).getMonth() + 1;
    },
    joinDay() {
      return new Date(this.joinTime * 1000).getDate();
    },
    instrumentTypes() {
      return this.instrument_types.map(function(e) {
        switch (e) {
          case 0:
            return "吉他";
            break;
          case 1:
            return "尤克里里";
            break;
          case 2:
            return "卡林巴";
            break;
          case 3:
            return "非洲鼓";
            break;
        }
      });
    },
    playName() {
      if (this.play_duration_lable < 50) {
        return "1";
      } else if (this.play_duration_lable < 90) {
        return "2";
      } else {
        return "3";
      }
    }
  },
  methods: {
    playAudio() {
      console.log("playAudio");
      var audio = document.querySelector("#myTripAudio");
      if (this.isPlay) {
        this.isPlay = false;
        audio.pause();
      } else {
        this.isPlay = true;
        audio.play();
      }
    },
    bindAudioEvent() {
      var audio = document.querySelector("#myTripAudio");
      audio.play();
      document
        .querySelector("#myMusicTrip")
        .addEventListener("touchstart", function() {
          audio.play();
        });
    },
    initLoading() {
      var that = this;

      var promiseList = [];

      function getMycount() {
        return new Promise((resolve, reject) => {
          console.log("开始请求数据");
          that.axios
            .get(`${baseUrl}/v3/user_info/?uid=${that.uid}`)
            .then(res => {
              console.log("个人数据请求成功");
              var res = res.data.data;
              console.log(res);
              that.userInfo.nickname = res.nickname;
              that.userInfo.avatar = res.avatar;
              that.joinTime = res.regtime;
              that.instrument_types = res.instrument_types;
              that.joinIndex = res.index;
              that.purchase_count = res.purchase_count;
              that.purchase_course = res.purchase_course;
              that.play_duration = res.play_duration; //弹奏时间
              that.play_beats_count = res.play_beats_count; //弹奏音符
              that.play_duration_lable = res.play_duration_lable; //超过多少人
              that.play_a_count = res.play_a_count; //成绩A的次数
              that.play_a_lable = res.play_a_lable; //成绩超越的人
              document.title =
                that.userInfo.nickname + "同学2018的学琴成绩单，为我加油吧！";
              that.$nextTick(() => {
                that.createResultImg();
              });
              responseImgLoad();
              resolve();
            });
          console.log("开始请求数据111");
        });
      }
      promiseList.push(getMycount());

      var notoBold = new FontFaceObserver("noto-bold");
      promiseList.push(
        new Promise((resolve, reject) => {
          notoBold.load().then(function() {
            console.log("noto-bold has loaded.");
            responseImgLoad();
            resolve();
          });
        })
      );
      var noto = new FontFaceObserver("noto");
      promiseList.push(
        new Promise((resolve, reject) => {
          noto.load().then(function() {
            console.log("noto has loaded.");
            responseImgLoad();
            resolve();
          });
        })
      );
      var notoSmbold = new FontFaceObserver("noto-smbold");
      promiseList.push(
        new Promise((resolve, reject) => {
          notoBold.load().then(function() {
            console.log("notoSmbold has loaded.");
            responseImgLoad();
            resolve();
          });
        })
      );
      var notoRegular = new FontFaceObserver("noto-regular");
      promiseList.push(
        new Promise((resolve, reject) => {
          notoBold.load().then(function() {
            console.log("notoRegular has loaded.");
            responseImgLoad();
            resolve();
          });
        })
      );
      var p = document.querySelector(".p_color");
      var bgList = document.querySelectorAll(".page");
      var bgArr = [],
        sum = 0;
      var fakeTemp = 0;
      var minPersent = (1 / bgList.length) * 100;
      for (var i = 0; i < bgList.length; i++) {
        var style =
          bgList[i].currentStyle || window.getComputedStyle(bgList[i], false);
        //console.log(style.backgroundImage.slice(4, -1).replace(/"/g, ""))
        //console.log(style.backgroundImage.match(/url\(\"?(.*)\"\)/)[1]);
        bgArr.push(style.backgroundImage.match(/url\(\"?(.*)\"\)/)[1]);
      }
      // bgList.forEach(function(e, index) {
      //   console.log(e)
      //   var style = e.currentStyle || window.getComputedStyle(e, false);
      //   //console.log(style.backgroundImage.slice(4, -1).replace(/"/g, ""))
      //   //console.log(style.backgroundImage.match(/url\(\"?(.*)\"\)/)[1]);
      //   bgArr.push(style.backgroundImage.match(/url\(\"?(.*)\"\)/)[1]);
      // });
      var timer = setInterval(() => {
        fakeTemp += 2;
        if (fakeTemp < minPersent) {
          p.style.width = fakeTemp + "%";
        } else {
          clearInterval(timer);
        }
      }, 1000);
      // setTimeout(()=>{
      //     clearInterval(timer)
      // },3000)
      bgArr.forEach((e, index) => {
        let p = new Promise((resolve, reject) => {
          var img = new Image();
          img.src = e;
          if (img.complete) {
            responseImgLoad();
            resolve();
          }
          img.onload = function() {
            responseImgLoad();
            resolve();
          };
        });
        promiseList.push(p);
      });
      function responseImgLoad() {
        clearInterval(timer);
        sum++;
        p.style.width = (sum / promiseList.length) * 100 + "%";
      }
      Promise.all(promiseList).then(res => {
        document.querySelector("#progressStatus").innerHTML = "加载完成";
        that.loading = false;
        that.enterShow = true;
        that.$set(that.page1, "fadeIn", true);
        that.$set(that.page1, "animationStart", true);
      });
    },
    responseImgLoad() {},
    bindTouchEvent() {
      var that = this;
      var startX, startY, moveEndX, moveEndY;
      document
        .querySelector(".container")
        .addEventListener("touchstart", function(e) {
          //e.preventDefault();
          startX = e.changedTouches[0].pageX;
          startY = e.changedTouches[0].pageY;
        });
      document
        .querySelector(".container")
        .addEventListener("touchmove", function(e) {
          e.preventDefault();
          moveEndX = e.changedTouches[0].pageX;
          moveEndY = e.changedTouches[0].pageY;
          var X = moveEndX - startX;
          var Y = moveEndY - startY;
          if (Math.abs(X) > Math.abs(Y) && X > 0) {
            //alert("left 2 right");
          } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
            //alert("right 2 left");
          } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
            that.changePage("down");
          } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
            that.changePage("up");
            //alert("bottom 2 top");
          } else {
            //alert("just touch");
          }
        });
    },
    changePage(direction) {
      if (this.pageLock) {
        //防止触发多个touchmove事件
        return;
      }
      this.pageLock = true;
      if (direction == "up") {
        if (this.currentPage < 11) {
          this.currentPage++;
          this.$set(this["page" + this.currentPage], "fadeIn", true);
          this.$set(this["page" + this.currentPage], "animationStart", true);
          this.$set(
            this["page" + (this.currentPage - 1)],
            "animationStart",
            false
          );
        }
      } else if (direction == "down") {
        if (this.currentPage > 1) {
          this.$set(this["page" + this.currentPage], "fadeIn", false);
          this.$set(this["page" + this.currentPage], "animationStart", false);
          this.$set(
            this["page" + (this.currentPage - 1)],
            "animationStart",
            true
          );
          this.currentPage--;
        }
      }
      setTimeout(() => {
        this.pageLock = false;
        clearInterval(this.timer);
      }, 1000);
    },
    reWatch() {
      console.log("qweqwe");
      if (this.openInApp) {
        location.href = this.updateUrl(window.location.href);
      } else {
        location.reload();
        //this.$router.go(0);
      }
    },
    createResultImg() {
      console.log("开始画图");
      this.imgToBase64(this.userInfo.avatar).then(res => {
        console.log("base64生成完成");
        this.avatarBase64 = res;
        document.querySelector(".page.p6").classList.add("visi");
        html2canvas(document.querySelector(".result_wrapper"), {
          backgroundColor: "transparent"
          //allowTaint: true
        }).then(canvas => {
          document.querySelector(".page.p6").classList.remove("visi");
          //return
          //把画好的canvas转成base64
          document.querySelector(".result_wrapper").innerHTML = "";
          var img = new Image();
          img.classList.add("resultImg");
          img.src = canvas.toDataURL("image/png");
          img.onload = function() {
            console.log("onload");
            document.querySelector(".page.p6 .result_wrapper").appendChild(img);
          };
          //document.querySelector(".page.p6 .result").appendChild(canvas);
          //canvas.toDataURL("image/png");
        });
      });
    },
    updateUrl(url, key) {
      var key = (key || "t") + "="; //默认key是"t",可以传入key自定义
      var reg = new RegExp(key + "\\d+"); //正则：t=1472286066028
      var timestamp = +new Date();
      if (url.indexOf(key) > -1) {
        //有时间戳，直接更新
        return url.replace(reg, key + timestamp);
      } else {
        //没有时间戳，加上时间戳
        if (url.indexOf("?") > -1) {
          var urlArr = url.split("?");
          if (urlArr[1]) {
            return urlArr[0] + "?" + key + timestamp + "&" + urlArr[1];
          } else {
            return urlArr[0] + "?" + key + timestamp;
          }
        } else {
          if (url.indexOf("#") > -1) {
            return url.split("#")[0] + "?" + key + timestamp + location.hash;
          } else {
            return url + "?" + key + timestamp;
          }
        }
      }
    },
    imgToBase64(url) {
      var url = url + "?" + new Date().valueOf();
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "Anonymous");
        img.src = url;
        console.log(url);
        console.log("------");
        console.log(img.complete);
        img.onload = function() {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var base64 = canvas.toDataURL("image/png");
          console.log("------");
          //console.log(base64);
          resolve(base64);
          //document.querySelector('#test').src = base64
        };
        // console.log("qwe");
        // var img = new Image(); //创建新的图片对象
        // var base64 = ""; //base64
        // img.src =
        //   "http://img.iguitar.immusician.com/avatar/cf8fb4dc146efe58190dd1706f04be95.jpg-big?" +
        //   new Date().valueOf();
        // img.setAttribute("crossOrigin", "Anonymous");
        // img.onload = function() {
        //   console.log("图片onload");
        //   //图片加载完，再draw 和 toDataURL
        //   var canvas = document.createElement("canvas"); //获取canvas
        //   canvas.width = img.width;
        //   canvas.height = img.height;
        //   var ctx = canvas.getContext("2d"); //对应的CanvasRenderingContext2D对象(画笔)
        //   //console.log(ctx,img);
        //   //console.log(canvas.width,canvas.height)
        //   ctx.drawImage(img, 0, 0);
        //   base64 = canvas.toDataURL("image/png");
        //   //console.log(base64)
        //   resolve(base64);
        // };
      });
    },
    getGiftInh5() {
      location.href = "http://api.iguitar.immusician.com/d?c=annals";
    },
    hideShare() {
      this.shareShow = false;
    },
    showShareMenu() {
      this.shareShow = true;
    },
    share(num) {
      this.hideShare();
      var title = this.userInfo.nickname + "同学2018的学琴成绩单，为我加油吧！";
      countShare(1);
      if (platForm == "IOS") {
        webkit.messageHandlers.Share.postMessage({
          title: title,
          content: location.href,
          mode: 0,
          type: num
        });
      } else {
        WebShare.share(location.href, 0, num, title);
      }
    },
    bindCloseWindow() {
      window.onbeforeunload = function(e) {
        var audio = document.querySelector("#myTripAudio");
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./../assets/css/common.less");
.music_icon {
  z-index: 999;
  width: 44px;
  position: absolute;
  right: 60px;
  top: 60px;
  img {
    width: 44px;
  }
}
.music_icon.app {
  top: 90px;
}
.music_icon.hide {
  visibility: hidden;
}
.container {
  position: relative;
  letter-spacing: 2px;
}
.page {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  visibility: hidden;
  &.fadeIn {
    opacity: 1;
    visibility: visible;
  }
  transition: opacity 1s;
  font-family: "noto";
  font-size: 32px;
  color: rgba(255, 255, 255, 1);
  line-height: 34px;
}
.loading {
  opacity: 1;
  visibility: visible;
  background: url("../assets/img/mytrip/loading/bg.jpg") no-repeat center;
  background-size: cover;
  .middle_wrapper {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
  .uk {
    width: 100px;
    position: absolute;
    top: -340px;
    left: 50%;
    margin-left: -50px;
    animation: float 1700ms linear infinite alternate forwards;
  }
  @keyframes float {
    0% {
      //transform: translate3d(0,0px,0);
      transform: none;
    }

    100% {
      transform: translate3d(0, 50px, 0);
    }
  }
  .btn {
    width: 270px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -135px;
  }
}
.p1 {
  z-index: 10;
  background: url("../assets/img/mytrip/p1/bg.png") no-repeat center;
  background-size: cover;
  &.animationStart .music_note {
    &.note1 {
      .fly_note1;
    }
    &.note2 {
      .fly_note2;
    }
    &.note3 {
      .fly_note3;
    }
    // &.note4 {
    //   .fly_note4;
    // }
  }
  &.animationStart .light {
    animation: light_rotate 1000ms linear 1 normal forwards;
  }
  &.animationStart .yingzi {
    animation: fadeIn 2300ms linear 1 normal forwards;
  }
  //opacity: 1;
  .logo_area {
    position: absolute;
    right: 125px;
    top: 65px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(255, 255, 255, 1);
    line-height: 39px;
    .name {
      margin-right: 15px;
      padding-right: 15px;
    }
    .logo {
      width: 36px;
    }
  }
  .logo_area.app {
    right: 125px !important;
    top: 90px !important;
  }
  .logo_area.weixin {
    right: 30px !important;
    top: 30px !important;
  }
  .text_img {
    position: absolute;
    top: 150px;
    right: 120px;
    img {
      width: 200px;
    }
  }
  .person {
    position: absolute;
    top: 47%;
    left: 156px;
    .realp {
      width: 255px;
    }
    .yingzi {
      position: absolute;
      left: 120px;
      bottom: -30px;
      width: 325px;
    }
    .note4 {
      width: 34px;
      right: 20px;
      top: 17%;
    }
  }
  .music_note {
    position: absolute;
    img {
      width: 100%;
    }
    &.note1 {
      width: 25px;
      left: 367px;
      top: 419px;
      //.fly_note1;
    }
    &.note2 {
      width: 28px;
      left: 371px;
      top: 576px;
      //.fly_note2;
    }
    &.note3 {
      width: 15px;
      left: 399px;
      top: 518px;
      //.fly_note3;
    }
  }
  .light {
    width: 375px;
    transform-origin: 0 0;
    transform: rotate(0deg);
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 100%;
    }
    @keyframes light_rotate {
      0% {
        transform: rotate(-30deg);
      }

      100% {
        transform: rotate(0deg);
      }
    }
  }
}
.p2 {
  z-index: 20;
  background: url("../assets/img/mytrip/p2/bg_new.png") no-repeat center;
  background-size: cover;
  &.animationStart .text {
    .t1 {
      animation: bubble 900ms linear 1s 1 normal forwards;
    }
    .t2 {
      animation: bubble 900ms linear 2s 1 normal forwards;
    }
    .t3 {
      animation: bubble 900ms linear 3s 1 normal forwards;
    }
    .t4 {
      animation: bubble 900ms linear 4s 1 normal forwards;
    }
  }
  .text {
    position: relative;
    z-index: 29;
    margin: 157px 0 0 65px;
    line-height: 50px;
    font-family: "noto-regular";
    .t1,
    .t2,
    .t3,
    .t4 {
      opacity: 0;
    }
    .para {
      margin-top: 30px;
    }
    //animation: bubble 900ms linear 1s 1 normal forwards;
  }
  .ss {
    width: 655px;
    height: 1022px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url("../assets/img/mytrip/p2/sss.png") no-repeat center;
    background-size: cover;
  }
  .person {
    position: absolute;
    top: 31%;
    right: 70px;
    img {
      width: 206px;
    }
    .hand {
      width: 32px;
      position: absolute;
      top: 160px;
      right: 66px;
      // animation: handRotate 900ms linear 0ms infinite alternate forwards;
      // transform-origin: bottom right;
      // @keyframes handRotate {
      //   0% {
      //     transform: rotate(0deg);
      //   }

      //   100% {
      //     transform: rotate(10deg);
      //   }
      // }
    }
  }
  .star {
    position: absolute;
    width: 68px;
    &.star1 {
      top: 547px;
      left: 140px;
    }
    &.star2 {
      right: 88px;
      top: 337px;
    }
    &.star3 {
      left: 140px;
      top: 429px;
    }
    &.star4 {
      left: 413px;
      top: 435px;
    }
  }
  .p_light {
    position: absolute;
    top: 27%;
    right: -18px;
    .blink;
    img {
      width: 313px;
    }
  }
}
.p3 {
  z-index: 30;
  background: url("../assets/img/mytrip/p3/bg.png") no-repeat center;
  background-size: cover;
  &.animationStart .text {
    .t1 {
      animation: bubble 900ms linear 1s 1 normal forwards;
    }
    .t2 {
      animation: bubble 900ms linear 2s 1 normal forwards;
    }
    .t3 {
      animation: bubble 900ms linear 3s 1 normal forwards;
    }
    .t4 {
      animation: bubble 900ms linear 4s 1 normal forwards;
    }
    .t5 {
      animation: bubble 900ms linear 5s 1 normal forwards;
    }
  }
  .text {
    z-index: 39;
    font-family: "noto-regular";
    margin: 104px 0 0 68px;
    line-height: 60px;
    .para {
      margin-top: 50px;
    }
    .t1,
    .t2,
    .t3,
    .t4,
    .t5 {
      opacity: 0;
    }
    .t5 {
      font-family: PingFangSC-Regular;
      color: #99ffed;
    }
    .t3 {
      .instru {
        font-size: 36px;
        color: #99ffed;
      }
    }
  }
  .person {
    position: absolute;
    top: 60%;
    right: 153px;
    img {
      width: 125px;
    }
  }
  .arm {
    position: absolute;
    top: 60.6%;
    left: 350px;
    width: 150px;
    transform-origin: right bottom;
    .arm-rotate;
    @keyframes arm {
      0% {
        transform: rotate(-5deg);
      }
      100% {
        transform: rotate(10deg);
      }
    }
    .arm-rotate {
      animation: arm 2900ms linear infinite alternate forwards;
    }
  }
  .star {
    position: absolute;
    top: 400px;
    left: 50%;
    transform: translateX(-50%);
    width: 606px;
    .blink;
  }
}
.p4 {
  z-index: 40;
  background: url("../assets/img/mytrip/p4/bg.png") no-repeat center;
  background-size: 100% 100%;
  //background-color: #4a6f6c;
  //background-position: 0 80%;
  //background-position: left -90px;
  font-family: "noto-regular";
  font-size: 32px;
  &.animationStart .text .l1 {
    .line-bubble1;
  }
  &.animationStart .text .l2 {
    .line-bubble2;
  }
  &.animationStart .text .l3 {
    .line-bubble3;
  }
  &.animationStart .text .l4 {
    .line-bubble4;
  }
  .text {
    position: relative;
    z-index: 49;
    margin: 130px 0 0 70px;
    line-height: 50px;
    .num {
      //font-family: noto;
      font-size: 38px;
      color: #95feef;
    }
    .l3 {
      margin-top: 60px;
    }

    .l4 {
      display: flex;
      align-items: center;
      .img-name {
        width: 328px;
      }
    }
  }
  .desklight {
    position: absolute;
    right: 0;
    top: 45%;
    .deng {
      z-index: 38;
      width: 190px;
    }
    .light {
      z-index: 37;
      width: 246px;
      position: absolute;
      top: 10%;
      right: 63%;
      animation: lightFadeIn 1500ms linear 0ms infinite alternate forwards;
      @keyframes lightFadeIn {
        0% {
          opacity: 0.3;
        }

        100% {
          opacity: 1;
        }
      }
    }
  }
  .ss {
    position: absolute;
    width: 100%;
    height: 756px;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    background: url("../assets/img/mytrip/p4/ss.png") no-repeat center;
    background-size: cover;
  }
  .note {
    position: absolute;
  }
  .note1 {
    width: 28px;
    right: 300px;
    top: 760px;
    .p4fly_note1;
  }
  .note2 {
    width: 25px;
    right: 364px;
    top: 800px;
    .p4fly_note2;
  }
  .note3 {
    width: 34px;
    right: 352px;
    top: 900px;
    .p4fly_note3;
  }
  @keyframes p4fly_note1 {
    0% {
      transform: translateX(0) translateY(0);
      opacity: 1;
    }

    100% {
      transform: translateX(-50px) translateY(-600px);
      opacity: 0;
    }
  }
  .p4fly_note1 {
    animation: p4fly_note1 12700ms linear infinite normal forwards;
  }
  @keyframes p4fly_note2 {
    0% {
      transform: translateX(0) translateY(0);
      opacity: 1;
    }

    100% {
      transform: translateX(-70px) translateY(-700px);
      opacity: 0;
    }
  }
  .p4fly_note2 {
    animation: p4fly_note2 12700ms linear infinite normal forwards;
  }
  @keyframes p4fly_note3 {
    0% {
      transform: translateX(0) translateY(0);
      opacity: 1;
    }

    100% {
      transform: translateX(-70px) translateY(-600px);
      opacity: 0;
    }
  }
  .p4fly_note3 {
    animation: p4fly_note3 12700ms linear infinite normal forwards;
  }
  .person {
    position: absolute;
    top: 52%;
    left: 124px;
    width: 318px;
  }
  .star {
    width: 271px;
    position: absolute;
    bottom: 555px;
    left: 0px;
    animation: starFadeIn 1000ms linear 0ms infinite alternate forwards;
    @keyframes starFadeIn {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }
  .hand {
    position: absolute;
    width: 40px;
    left: 204px;
    top: 78.3%;
    animation: handRotate 900ms linear 0ms infinite alternate forwards;
    transform-origin: 0 0;
    @keyframes handRotate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(20deg);
      }
    }
  }
}
.p5 {
  z-index: 50;
  background: url("../assets/img/mytrip/p5/bg.png") no-repeat center;
  background-size: 100% 100%;
  font-family: "noto-regular";
  font-size: 32px;
  &.animationStart .text .l1 {
    .line-bubble1;
  }
  &.animationStart .text .l2 {
    .line-bubble2;
  }
  &.animationStart .text .l3 {
    .line-bubble3;
  }
  &.animationStart .text .l4 {
    .line-bubble4;
  }
  &.animationStart .man {
    animation: float 1500ms linear 600ms infinite alternate forwards;
  }
  .text {
    margin: 130px 0 0 70px;
    line-height: 50px;
    .num {
      //font-family: noto;
      font-size: 38px;
      color: #95feef;
    }
    .l3 {
      margin-top: 50px;
    }
  }
  .star {
    width: 610px;
    position: absolute;
    left: 0;
    top: 300px;
  }
  .man {
    width: 610px;
    position: absolute;
    left: 55px;
    top: 45.5%;
  }
  .light {
    width: 354px;
    position: absolute;
    right: 63px;
    top: 45.7%;
    animation: lightFadeIn 800ms linear 0ms infinite alternate forwards;
    @keyframes lightFadeIn {
      0% {
        opacity: 0.3;
      }

      100% {
        opacity: 1;
      }
    }
  }
}
.p6 {
  min-height: 100%;
  height: auto;
  z-index: 60;
  background: url("../assets/img/mytrip/p6/bg.png") no-repeat center;
  background-size: cover;
  .result_wrapper {
    padding-top: 10px;
    //padding-bottom: 60px;
    padding-bottom: 6%;
  }
  .result_wrapper.above7 {
    padding-top: 30px;
  }
  .result {
    position: relative;
    width: 630px;
    height: 887px;
    margin: 76px auto 0 auto;
    background: url("../assets/img/mytrip/p6/result-bg.png") no-repeat center;
    background-size: cover;
    background-color: transparent;
    text-align: center;
    .avatar {
      width: 116px;
      height: 116px;
      position: absolute;
      left: 50%;
      top: -48px;
      margin-left: -58px;
      border: 4px solid rgba(250, 105, 255, 1);
      border-radius: 50%;
    }
    .userinfo {
      position: absolute;
      left: 0;
      top: 80px;
      width: 100%;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 34px;
      color: #d08b6f;
      //box-shadow:1px 6px 8px 0px rgba(208, 111, 139, 0.35);
      .nickname {
        margin-bottom: 30px;
        font-size: 30px;
      }
      .result_title {
        font-family: "noto-bold";
      }
    }
    .result_main {
      position: absolute;
      padding: 10px 0 0 0;
      width: 100%;
      left: 0;
      top: 200px;
      .name_img {
        width: 500px;
      }
      .name_text {
        font-size: 25px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(250, 162, 49, 1);
        margin: 10px 0;
      }
      .learn_content {
        font-family: PingFangSC-Regular;
        color: #cb6f72;
        font-size: 28px;
        line-height: 50px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 13em;
        top: 180px;
        //margin-top: 30px;
        //margin-left: 180px;
        text-align: left;
        //text-align: center;
        .b {
          font-family: PingFangSC-Medium;
          color: #ff9e21;
        }
        .w {
          font-family: PingFangSC-Medium;
        }
      }
    }
    .qr_area {
      position: absolute;
      right: 40px;
      bottom: 40px;
      display: flex;
      align-items: center;
      font-size: 21px;
      font-family: PingFangSC-Regular;
      color: rgba(102, 102, 102, 1);
      line-height: 34px;
      .left {
        text-align: right;
        margin-right: 20px;
      }
      .right {
        img {
          width: 115px;
        }
      }
    }
  }
  @media only screen
  and (min-device-width : 518px){
    .result_wrapper{
      padding-top: 10px !important
    }
    .result{
      width: 500px !important;
      height: 704px !important;
      .name_img {
        width: 400px !important;
      }
      .learn_content{
        top: 150px !important;
        font-size: 22px !important;
        line-height: 30px !important;
      }
      .qr_area {
        position: absolute;
        right: 40px;
        bottom: 40px;
        display: flex;
        align-items: center;
        font-size: 17px;
        font-family: PingFangSC-Regular;
        color: rgba(102, 102, 102, 1);
        line-height: 34px;
        .left {
          text-align: right;
          margin-right: 20px;
        }
        .right {
          img {
            width: 95px;
          }
        }
      }
    }
    .result_main{
      top:160px !important
    }
    .userinfo {
      position: absolute;
      left: 0;
      top: 70px !important;
      width: 100%;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 26px !important;
      color: #d08b6f;
      //box-shadow:1px 6px 8px 0px rgba(208, 111, 139, 0.35);
      .nickname {
        margin-bottom: 10px !important;
        font-size: 24px !important;
      }
      .result_title {
        font-family: "noto-bold";
      }
    }
    .tip{
      margin-bottom: 0px !important
    }
    .re{
      img{
        width: 20px !important;
      }
      font-size: 20px
    }
    .bottom_app,
  .bottom_h5 {
    position: relative;
    top: -100px !important;
  }
  .bottom_app.above7,
  .bottom_h5.above7 {
    position: relative;
    top: -90px !important;
  }
  }
  .bottom_app,
  .bottom_h5 {
    position: relative;
    top: -100px;
  }
  .bottom_app.above7,
  .bottom_h5.above7 {
    position: relative;
    top: -70px;
  }
  .bottom_app {
    .save_tip {
      font-size: 22px;
      font-family: PingFangSC-Regular;
      text-align: center;
    }
    .bottom_btn {
      display: flex;
      justify-content: space-between;
      margin: 27px 60px 0 60px;
      font-size: 34px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(203, 111, 114, 1);
      img {
        width: 35px;
        margin-right: 10px;
      }
      .left,
      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 8px;
        width: 240px;
        height: 80px;
        background: url("../assets/img/mytrip/p6/btn_bg.png") no-repeat center;
        background-size: cover;
      }
      .left {
        width: 250px;
        height: 80px;
        img {
          margin-right: 6px;
        }
      }
    }
  }
  .bottom_h5 {
    text-align: center;
    .btn {
      margin-top: 10px;
      margin: 10px auto 10px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      //padding-bottom: 8px;
      width: 360px;
      height: 80px;
      //background: url("../assets/img/mytrip/p6/btn_bg.png") no-repeat center;
      //background-size: cover;
      background-color: #fff;
      border-radius: 80px;
      color: #cb6f72;
      img {
        width: 35px;
        margin-right: 10px;
      }
    }
    .tip {
      margin: 10px 0 10px 0;
      font-size: 20px;
      font-family: PingFangSC-Regular;
    }
    .re {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 30px;
      }
    }
  }
}
@keyframes enterFloat {
  0% {
    transform: none;
  }

  100% {
    transform: translate3d(0, -20px, 0);
  }
}
.enter_float {
  animation: enterFloat 800ms linear infinite alternate;
}

@keyframes fly_note1 {
  0% {
    left: 367px;
    top: 419px;
    opacity: 1;
  }

  100% {
    left: 300px;
    top: 100px;
    opacity: 0;
  }
}
.fly_note1 {
  animation: fly_note1 12700ms linear infinite normal forwards;
}
@keyframes fly_note2 {
  0% {
    left: 371px;
    top: 576px;
    opacity: 1;
  }

  100% {
    left: 430px;
    top: 100px;
    opacity: 0;
  }
}
.fly_note2 {
  animation: fly_note2 12700ms linear infinite normal forwards;
}
@keyframes fly_note3 {
  0% {
    left: 399px;
    top: 518px;
    opacity: 1;
  }

  100% {
    left: 200px;
    top: 100px;
    opacity: 0;
  }
}
.fly_note3 {
  animation: fly_note3 12700ms linear infinite normal forwards;
}
@keyframes blink {
  0% {
    opacity: 0.2;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
.blink {
  animation: blink 900ms linear infinite alternate forwards;
}
@keyframes star1 {
  0% {
    top: 547px;
    left: 140px;
  }
  100% {
    top: 947px;
    left: -240px;
  }
}
.star1 {
  animation: star1 1900ms linear infinite normal forwards;
}
@keyframes star2 {
  0% {
    right: 88px;
    top: 337px;
    opacity: 0.3;
  }
  100% {
    right: 688px;
    top: 937px;
    opacity: 1;
  }
}
.star2 {
  animation: star2 1900ms linear infinite normal forwards;
}
@keyframes star3 {
  0% {
    left: 140px;
    top: 429px;
  }
  100% {
    left: -340px;
    top: 829px;
  }
}
.star3 {
  animation: star3 1900ms linear infinite normal forwards;
}
@keyframes star4 {
  0% {
    left: 413px;
    top: 435px;
    opacity: 0.3;
  }
  100% {
    left: 13px;
    top: 835px;
    opacity: 1;
  }
}
.star4 {
  animation: star4 2300ms 1s linear infinite normal forwards;
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 300px;
  width: 100%;
  text-align: center;
  img {
    position: absolute;
    bottom: 56px;
    left: 50%;
    margin-left: -26px;
    width: 52px;
  }
}
.bl {
  font-size: 38px;
  color: #99ffed !important;
}
.p6wrapper {
  padding-top: 2%;
}
.p6wrapper.openInApp {
  padding-top: 40px;
}
</style>
