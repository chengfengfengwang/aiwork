<template>
  <div id="musicTest">
    <!-- <div v-show="true" class="page last swiper-slide stop-swiping">
          <div class="result_title">
            小小音乐家天赋测试
          </div>
          <div
            id="eContainer"
            class="canvas_wrapper"
          ></div>
          <div class="comment_wrapper">
            <div
              class="comment_item"
              v-for="(item,index) in gradeArr"
              :key="index"
            >
              <div class="title_row">
                <div
                  class="comment_i"
                  v-bind:class="'s'+(index+1)"
                >
                </div>
                <div class="comment_title">{{item.name}}</div>
                <div class="comment_grade">{{item.gradeText}}级</div>
              </div>
              <div class="comment_row">
                {{item.content}}
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="footer_wrapper">
              <div class="left">
                <div class="logo">
                  <img
                    src="../../assets/img/music_test/logo.png"
                    alt=""
                  >
                </div>
                <div class="slogan">音乐壳-帮助0基础小朋友轻松通过音基考试</div>
              </div>
              <div class="right">
                <img
                  src="../../assets/img/music_test/qr.png"
                  alt=""
                  class="qr"
                >
              </div>
            </div>
          </div>
    </div>-->
    <div v-show="true" class="page loading swiper-slide stop-swiping">
      <div class="middle_wrapper">
        <img src="../../assets/img/music_test/uk.png" alt class="uk">
        <div class="progress_wrapper">
          <div class="p_grey">
            <div class="p_color"></div>
          </div>
          <span id="progressStatus">加载中...</span>
        </div>
      </div>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div ref="page1" v-show="true" class="page first swiper-slide stop-swiping">
          <audio preload src="../../assets/audio/music_test/page1/page1.mp3"></audio>
          <img
            v-show="page1Icon=='playing'"
            @click="page1IconPause"
            src="../../assets/img/music_test/play_icon.png"
            alt
            class="play_icon"
          >
          <img
            v-show="page1Icon=='pause'"
            @click="page1IconPlay"
            src="../../assets/img/music_test/play_icon_pause.png"
            alt
            class="play_icon pause"
          >
          <img class="cover" src="../../assets/img/music_test/test_cover1.png" alt>
          <div class="begin_btn next_dot" @click="beginClick">
            <img src="../../assets/img/music_test/begin_btn.png" alt>
          </div>
        </div>
        <!-- 调试使用 -->
        <div ref="quest1" v-show="!testShare" class="page common swiper-slide stop-swiping">
          <audio src></audio>
          <div class="topic_card" :class="{in_app:isApp}">
            <div class="title">第1题</div>
            <div class="text">仔细听音乐，为它选择一个适合的表情吧！</div>
            <div class="note">
              <img src="../../assets/img/music_test/note.png" alt>
            </div>
            <div class="re_play">点击重听</div>
          </div>
          <div class="page_main" :class="{in_app:isApp}">
            <div class="option_card option_card1 next_dot" @click="select(1,'A',true, $event)">
              <div class="option_img">
                <img src="../../assets/img/music_test/yj_happy.png" alt>
              </div>
            </div>
            <div class="option_card option_card2 next_dot" @click="select(1,'B',false, $event)">
              <div class="option_img">
                <img src="../../assets/img/music_test/sad.png" alt>
              </div>
            </div>
          </div>
        </div>
        <div ref="quest2" v-show="!testShare" class="page common swiper-slide stop-swiping">
          <div class="topic_card" :class="{in_app:isApp}">
            <div class="title">第2题</div>
            <div class="text" style="width:80%;text-align:left">仔细感受音乐的速度，为它选择一个适合的小动物吧！</div>
            <div class="note">
              <img src="../../assets/img/music_test/note.png" alt>
            </div>
            <div class="re_play">点击重听</div>
          </div>
          <div class="page_main" :class="{in_app:isApp}">
            <div class="option_card option_card1 next_dot" @click="select(2,'A',false, $event)">
              <div class="option_img">
                <img class="q2a" src="../../assets/img/music_test/bao.png" alt>
              </div>
            </div>
            <div class="option_card option_card2 next_dot" @click="select(2,'B',true, $event)">
              <div class="option_img">
                <img class="q2b" src="../../assets/img/music_test/wugui.png" alt>
              </div>
            </div>
          </div>
        </div>
        <div ref="quest3" v-show="!testShare" class="page bird swiper-slide stop-swiping">
          <div class="topic_card">
            <div class="title">第3题</div>
            <div class="text" style="width:80%">仔细听两只小鸟的叫声，请点击音高的小鸟把它送回家</div>
            <div class="note">
              <img src="../../assets/img/music_test/note.png" alt>
            </div>
            <div class="re_play">点击重听</div>
          </div>
          <div class="bird_main">
            <div
              class="option_card option_card1 next_dot bird_click"
              @click="select(3,'A',false, $event)"
            >
              <div ref="q3Bird1" class="option_bird bird"></div>
            </div>
            <div
              class="option_card option_card2 next_dot bird_click"
              @click="select(3,'B',true, $event)"
            >
              <div ref="q3Bird2" class="option_bird bird"></div>
            </div>
            <img src="../../assets/img/music_test/tree.png" alt class="tree">
          </div>
          <div class="wave">
            <img src="../../assets/img/music_test/wave.png" alt>
          </div>
        </div>
        <div ref="quest4" v-show="!testShare" class="page bird swiper-slide stop-swiping">
          <div class="topic_card">
            <div class="title">第4题</div>
            <div class="text" style="width:80%">仔细听两只小鸟的叫声，请点击音低的小鸟把它送回家</div>
            <div class="note">
              <img src="../../assets/img/music_test/note.png" alt>
            </div>
            <div class="re_play">点击重听</div>
          </div>
          <div class="bird_main">
            <div
              class="option_card option_card1 next_dot bird_click"
              @click="select(4,'A',false, $event)"
            >
              <div ref="q4Bird1" class="option_bird bird"></div>
            </div>
            <div
              class="option_card option_card2 next_dot bird_click"
              @click="select(4,'B',true, $event)"
            >
              <div ref="q4Bird2" class="option_bird bird"></div>
            </div>
            <img src="../../assets/img/music_test/tree.png" alt class="tree">
          </div>
          <div class="wave">
            <img src="../../assets/img/music_test/wave.png" alt>
          </div>
        </div>
        <div ref="quest5" v-show="!testShare" class="page common swiper-slide stop-swiping">
          <div class="topic_card" :class="{in_app:isApp}">
            <div class="title">第5题</div>
            <div class="text">仔细听这两段节奏相同吗？</div>
            <div class="note">
              <img src="../../assets/img/music_test/note.png" alt>
            </div>
            <div class="re_play">点击重听</div>
          </div>
          <div class="page_main" :class="{in_app:isApp}">
            <div class="option_card option_card1 next_dot" @click="select(5,'A',true, $event)">
              <div class="option_img">
                <img src="../../assets/img/music_test/gou.png" alt>
              </div>
            </div>
            <div class="option_card option_card2 next_dot" @click="select(5,'B',false, $event)">
              <div class="option_img">
                <img src="../../assets/img/music_test/cha.png" alt>
              </div>
            </div>
          </div>
        </div>
        <div ref="quest6" v-show="!testShare" class="page common swiper-slide stop-swiping">
          <div class="topic_card" :class="{in_app:isApp}">
            <div class="title">第6题</div>
            <div class="text">仔细听这两段旋律相同吗？</div>
            <div class="note">
              <img src="../../assets/img/music_test/note.png" alt>
            </div>
            <div class="re_play">点击重听</div>
          </div>
          <div class="page_main" :class="{in_app:isApp}">
            <div class="option_card option_card1 next_dot" @click="select(6,'A',false, $event)">
              <div class="option_img">
                <img src="../../assets/img/music_test/gou.png" alt>
              </div>
            </div>
            <div class="option_card option_card2 next_dot" @click="select(6,'B',true, $event)">
              <div class="option_img">
                <img src="../../assets/img/music_test/cha.png" alt>
              </div>
            </div>
          </div>
        </div>
        <div ref="quest7" v-show="!testShare" class="page common qiaoji swiper-slide stop-swiping">
          <div class="topic_card">
            <div class="title">第7题</div>
            <div class="text">请跟着音乐节拍点击屏幕中的泡泡吧</div>
          </div>
          <div class="beat" v-for="n in beatsNum" :key="n">
            <img class="o" src="../../assets/img/music_test/paopao.png" alt>
            <img src="../../assets/img/music_test/paopao_b.png" alt class="b">
          </div>
        </div>
        <div ref="quest8" v-show="!testShare" class="page q8 common swiper-slide stop-swiping">
          <div class="topic_card" :class="{in_app:isApp}">
            <div class="title">第8题</div>
            <div class="text">请选出下面哪一个是钢琴？</div>
          </div>
          <div class="page_main" :class="{in_app:isApp}">
            <div class="option_card option_card1 next_dot" @click="select(8,'A',true, $event)">
              <div class="option_img">
                <img class="q8a" src="../../assets/img/music_test/piano.png" alt>
              </div>
            </div>
            <div class="option_card option_card2 next_dot" @click="select(8,'B',false, $event)">
              <div class="option_img">
                <img class="q8b" src="../../assets/img/music_test/sfq.png" alt>
              </div>
            </div>
          </div>
        </div>
        <div ref="quest9" v-show="!testShare" class="page common swiper-slide stop-swiping">
          <div class="topic_card" :class="{in_app:isApp}">
            <div class="title">第9题</div>
            <div class="text">仔细听这是哪个乐器发出的声音？</div>
            <div class="note">
              <img src="../../assets/img/music_test/note.png" alt>
            </div>
            <div class="re_play">点击重听</div>
          </div>
          <div class="page_main" :class="{in_app:isApp}">
            <div class="option_card option_card1 next_dot" @click="select(9,'A',false, $event)">
              <div class="option_img">
                <img class="q9a" src="../../assets/img/music_test/xh.png" alt>
              </div>
            </div>
            <div class="option_card option_card2 next_dot" @click="select(9,'B',true, $event)">
              <div class="option_img">
                <img class="q9b" src="../../assets/img/music_test/xtq.png" alt>
              </div>
            </div>
          </div>
        </div>
        <!-- 调试使用 -->
        <!-- <div v-show="true" class="page last swiper-slide stop-swiping">
          <img class="cover" src="../../assets/img/music_test/test_cover1.png" alt>
          <div class="result_bg_wrapper">
            <div class="content">
              <div class="core">{{score}}分</div>
              <div class="byond">超越了{{beyondRate}}%的人</div>
              <div class="comment">
                <img src="../../assets/img/music_test/comment_left.png" alt class="comment_left">
                <p v-show="grade==1">“每一个小朋友都有音乐潜能，</p>
                <p v-show="grade==1">加油，你也可以成为音乐小达人!”</p>
                <p v-show="grade==2">“不要小瞧了你的音乐潜能哦!</p>
                <p v-show="grade==2">学习音乐，会让你越来越优秀!”</p>
                <p v-show="grade==3">“哇，你非常的具有音乐天赋!</p>
                <p v-show="grade==3">未来音乐大师也许就是你哦!”</p>
                <img src="../../assets/img/music_test/comment_right.png" alt class="comment_right">
              </div>
              <div class="star_items_wrapper">
                <div class="star_items">
                  <div class="label">
                    <span>音</span>
                    <span>乐</span>
                    <span>感</span>
                    <span>受</span>
                    <span>力</span>
                  </div>

                  <span>：</span>
                  <div class="stars">
                    <div
                      :key="index"
                      v-for="(item,index) in resultItems[0].starArr"
                      v-bind:class="{ half: item=='half' }"
                      class="star_wrapper"
                    >
                      <span class="left"></span>
                      <span class="right"></span>
                      <img class="star" src="../../assets/img/music_test/star.png" alt>
                    </div>
                  </div>
                </div>
                <div class="star_items">
                  <div class="label">
                    <span>音</span>
                    <span>乐</span>
                    <span>听</span>
                    <span>觉</span>
                  </div>

                  <span>：</span>
                  <div class="stars">
                    <div
                      :key="index"
                      v-for="(item,index) in resultItems[1].starArr"
                      v-bind:class="{ half: item=='half' }"
                      class="star_wrapper"
                    >
                      <span class="left"></span>
                      <span class="right"></span>
                      <img class="star" src="../../assets/img/music_test/star.png" alt>
                    </div>
                  </div>
                </div>
                <div class="star_items">
                  <div class="label">
                    <span>音</span>
                    <span>乐</span>
                    <span>记</span>
                    <span>忆</span>
                  </div>

                  <span>：</span>
                  <div class="stars">
                    <div
                      :key="index"
                      v-for="(item,index) in resultItems[2].starArr"
                      v-bind:class="{ half: item=='half' }"
                      class="star_wrapper"
                    >
                      <span class="left"></span>
                      <span class="right"></span>
                      <img class="star" src="../../assets/img/music_test/star.png" alt>
                    </div>
                  </div>
                </div>
                <div class="star_items">
                  <div class="label">
                    <span>节</span>
                    <span>奏</span>
                    <span>感</span>
                  </div>

                  <span>：</span>
                  <div class="stars">
                    <div
                      :key="index"
                      v-for="(item,index) in resultItems[3].starArr"
                      v-bind:class="{ half: item=='half' }"
                      class="star_wrapper"
                    >
                      <span class="left"></span>
                      <span class="right"></span>
                      <img class="star" src="../../assets/img/music_test/star.png" alt>
                    </div>
                  </div>
                </div>
                <div class="star_items">
                  <div class="label">
                    <span>音</span>
                    <span>乐</span>
                    <span>常</span>
                    <span>识</span>
                  </div>

                  <span>：</span>
                  <div class="stars">
                    <div
                      :key="index"
                      v-for="(item,index) in resultItems[4].starArr"
                      v-bind:class="{ half: item=='half' }"
                      class="star_wrapper"
                    >
                      <span class="left"></span>
                      <span class="right"></span>
                      <img class="star" src="../../assets/img/music_test/star.png" alt>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <img class="result_bg" src="../../assets/img/music_test/result_bg.png" alt>
          </div>
        </div>-->
        <div v-show="true" class="page last swiper-slide stop-swiping">
          <div class="last_main">
            <div v-show="resultTitleShow" class="result_title">
              <div>你是<span class="title_num">{{resultNum}}里挑一</span>的</div>
              <div class="sec_row">{{resultName}}大师</div>
            </div>
            <div id="eContainer" class="canvas_wrapper"></div>
            <div class="comment_wrapper">
              <div class="comment_item" v-for="(item,index) in gradeArr" :key="index">
                <div class="title_row">
                  <div class="comment_i" v-bind:class="'s'+(index+1)"></div>
                  <div class="comment_title">{{item.name}}</div>
                  <div class="comment_grade">{{item.gradeText}}级</div>
                </div>
                <div class="comment_row">{{item.content}}</div>
              </div>
            </div>
          </div>
          
          <div class="btn_wrapper" v-show="isApp">
            <!-- <img @click="toShare" src="../../assets/img/music_test/share_btn.jpg" alt> -->
          </div>
          <div class="footer">
            <div class="footer_wrapper">
              <div class="left">
                <div class="logo">
                  <img src="../../assets/img/music_test/logo.png" alt>
                </div>
                <div v-show="!isApp && !isD312" class="slogan">了解更多AI智能音乐课程，请戳二维码</div>
                <div v-show="isApp && !isD312" class="slogan">了解更多AI智能音乐课程，请戳二维码</div>
                <div v-show="isD312"  class="slogan">了解更多AI智能音乐课程，请戳二维码<img src="../../assets/img/music_test/chuo.png" alt ></div>
              </div>
              <div v-show="isLangyue" class="right">
                <img  src="../../assets/img/music_test/langyue_qr.jpg" alt class="qr">
              </div>
              <div v-show="!isLangyue" class="right">
                <img v-show="!isApp && !isD312" src="../../assets/img/music_test/qr.png" alt class="qr">
                <img v-show="isApp && !isD312" src="../../assets/img/music_test/yyk_qr.jpg" alt class="qr">
                 <img v-show="isD312"  src="../../assets/img/music_test/new_qr.png" alt class="qr">
              </div>
            </div>
          </div>
          <div class="half_round half_round1"></div>
          <div class="half_round half_round2"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const comment = [
  {
    title: "音乐感受力",
    content: [
      "你的音乐感受力超强！简直是下一个贝多芬！",
      "虽说不是万里挑一，但也是千里挑一，加油！",
      "你已经能感知音乐的情绪啦，继续努力！"
    ]
  },
  {
    title: "音乐听觉",
    content: [
      "你的音乐听力超群，无人匹敌！",
      "你对旋律的音高、速度已经掌握的很棒了，再加把劲！",
      "你已经初步掌握了解旋律的音高、速度，加油！"
    ]
  },
  {
    title: "音乐记忆",
    content: [
      "你的音乐记忆力万里挑一，堪称过耳不忘的小天才！",
      "你的音乐记忆能力百里挑一，fight！",
      "你的音乐记忆力超强，继续加油！"
    ]
  },
  {
    title: "单位拍的稳定性",
    content: [
      "你的单位拍打得太好了！泰山都没你稳！",
      "你拍子打得很稳，下一个音乐天才就是你！",
      "你拍子打得不错，继续努力，别人都将为你摇旗呐喊！"
    ]
  },
  {
    title: "音乐常识",
    content: [
      "你简直是音乐界的百科全书！人称音乐百晓生！",
      "音乐常识都难不倒你，音乐常识小达人名不虚传！",
      "你的进步空间非常大，早晚能成为音乐百科全书！"
    ]
  }
];
function testPlat() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //return 'IOS';
    return 0;
  } else if (/(Android)/i.test(navigator.userAgent)) {
    //return 'Android';
    return 1;
  } else {
    return -1;
  }
}
import html2canvas from "html2canvas";
import Swiper from "swiper";
import { Promise } from "q";
const wx = require("weixin-js-sdk");
const echarts = require("echarts");
export default {
  data() {
    return {
      swiper: "",
      page1Icon: "pause",
      swiperIndex: 0,
      mySelect: [],
      //打泡泡
      beatsNum: 27, //泡泡数量
      time: "", //歌曲时长
      beats: [],
      speed: 46, //歌曲速度
      needBeats: "", //歌曲节拍数
      interval: "", //每拍的间隔，
      index: -1,
      error: 700, //误差值
      //spaceBeat: 0,
      spaceBeat: 4,
      //结果
      resultItems: [
        { name: "音乐感受力", star: 0, starArr: [] },
        { name: "音乐听觉", star: 0, starArr: [] },
        { name: "音乐记忆", star: 0, starArr: [] },
        { name: "节奏感", star: 0, starArr: [] },
        { name: "音乐常识", star: 0, starArr: [] }
      ],
      allStar: 0,
      score: 0,
      grade: 1,
      beyondRate: 0,
      q8OnOff: true,
      isIos: "",
      clickOff: false,
      canClick: true,
      isWeixin: false,
      loadingAllPromise: [],
      echartsData: [],
      //echartsData: [0,1,2,3,4],
      commentArr: comment,
      shareVersion: new Date().valueOf(),
      isApp: false,
      testShare: false,
      reportTitle: "",
      resultNum:"",
      resultName:"",
      resultTitleShow:false,
      isLangyue:'',
      isD312:false
    };
  },
  computed: {
    gradeArr() {
      return this.echartsData.map((e, index) => {
        var curItem;
        if (e == 0) {
          return {
            grade: 0,
            gradeText: "C",
            content: this.commentArr[index].content[2],
            name: this.commentArr[index].title
          };
        } else if (e >= 0 && e < 5) {
          return {
            grade: 1,
            gradeText: "B",
            content: this.commentArr[index].content[1],
            name: this.commentArr[index].title
          };
        } else if (e >= 5) {
          return {
            grade: 2,
            gradeText: "A",
            content: this.commentArr[index].content[0],
            name: this.commentArr[index].title
          };
        }
      });
    }
  },
  methods: {
    toShare(num) {
      this.myPromise
        .then(res => {
          //console.log(this.$util.testPlat);
          //PayFeedBack.shareWebImage(dataUrl);
          if (testPlat() === 0) {
            console.log("-------ios-------");
            console.log(res);
            console.log("0");
            console.log(webkit.messageHandlers.shareWebImage.postMessage);
            console.log("-------ios-------");
            console.log("1");
            console.log(webkit.messageHandlers.shareWebImage.postMessage);
            console.log("2");
            webkit.messageHandlers.shareWebImage.postMessage({
              data: res
            });
          } else {
            console.log("------android--------");
            console.log(PayFeedBack);
            PayFeedBack.shareWebImage(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    createBase64() {
      this.myPromise = new Promise((resolve, reject) => {
        var myShareUrl = `//s.immusician.com/web/h5/musicTest.html`;
        var imgWrapper = document.querySelector(".page.last");
        var width = imgWrapper.offsetWidth;
        var height = imgWrapper.offsetHeight;
        this.$nextTick(pa => {
          html2canvas(
            imgWrapper,
            {
              onclone: function(document) {
                document.querySelector(".btn_wrapper").style.display = "none";
              }
            },
            {
              backgroundColor: "transparent",
              width: width,
              height: height,
              x: 0,
              y: 0
              //allowTaint: true
            }
          ).then(canvas => {
            document.querySelector(".btn_wrapper").style.display = "block";
            var dataUrl = canvas.toDataURL("image/png");
            //console.log(dataUrl)
            resolve(dataUrl);
            // var img = new Image();
            // img.src = dataUrl;
            // img.onload = function() {
            //   document.body.appendChild(img);
            // };
          });
        });
      });
      return this.myPromise;
    },
    initCanvas() {
      var myChart = echarts.init(document.getElementById("eContainer"));
      var option = {
        tooltip: {},
        radar: {
          // shape: 'circle',
          center: ["50%", "50%"], //圆心在画布中的位置
          radius: "65%", //外半径长度
          startAngle: 90, //旋转雷达图
          nameGap: 12,
          name: {
            //雷达图每个指示器名称的配置项
            show: true, //是否展示各项名字
            //color: "#00BC73", //文字的颜色
            fontWeight: "bolder", //字重
            //fontFamily: "serif", //字体
            fontSize: "12", //字体大小
            backgroundColor: "#000", //背景色
            //borderColor: "#FF9901", //边框颜色
            borderColor: ["#00BC73", "#00BC73", "#00BC73", "#00BC73"], //边框颜色
            borderWidth: 2,
            borderRadius: 10, //边框圆角
            padding: [5, 5, 5, 5], //内边距
            splitNumber: 3,
            textStyle: {
              color: "#00BC73", //字体颜色
              backgroundColor: "#fff"
            }
          },
          axisLine: {
            show: false //是否显示坐标轴轴线
          },

          splitArea: {
            show: false //是否显示分隔区域
          },
          indicator: [
            //{ name: "音乐感受力", max: 5, color: "#333" },
            { name: "音乐感受力", max: 5 },
            { name: "音乐听觉", max: 5 },
            { name: "音乐记忆", max: 5 },
            { name: "单位拍的稳定性", max: 5 },
            { name: "音乐常识", max: 5 }
          ]
        },
        series: [
          {
            name: "",
            type: "radar",
            symbolSize: 10,
            areaStyle: {
              color: "#FF3936"
            },
            itemStyle: {
              //折线拐点标志的样式
              borderWidth: 2
            },
            data: [
              {
                value: this.echartsData,
                name: "",
                lineStyle: {
                  normal: {
                    width: 2
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      setTimeout(() => {
        if (this.isApp) {
          this.createBase64();
        }
      }, 300);
    },
    responseImgLoad() {
      this.curLoadingIndex++;
      this.loadingBar.style.width =
        (this.curLoadingIndex / this.loadingAllPromise.length) * 100 + "%";
    },
    getAudio(audio) {
      var that = this;
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              audio.src = window.URL.createObjectURL(xhr.response);
              that.responseImgLoad();
              console.log("音频都加载");
              resolve();
            } else {
              console.error(xhr.statusText);
            }
          }
        };
        xhr.open("GET", audio.src, true);
        xhr.send();
      });
    },
    shareReady(param) {
      var that = this;
      if (this.isIos) {
        wx.config({
          debug: false, //
          appId: param.appId, // 必填，公众号的唯一标识
          timestamp: param.timestamp, // 必填，生成签名的时间戳
          nonceStr: param.nonceStr, // 必填，生成签名的随机串
          signature: param.signature, // 必填，签名
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
        });
        wx.ready(function() {
          if ((that.isIos && that.isWeixin) || !that.isIos) {
            console.log("自动播放");
            that.page1Icon = "playing";
            that.page1Audio.play();
          }
          wx.updateAppMessageShareData({
            title: "60秒挑战最强音乐天赋测试，你能得几分？", // 分享标题
            desc: "据说是超准的音乐天赋测试！", // 分享描述
            imgUrl: "https://s.immusician.com/web/h5/wx_share.jpeg", // 分享图标
            link: `//s.immusician.com/web/h5/musicTest.html`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            success: function() {
              console.log("分享的success");
              // 设置成功
            }
          });
          wx.updateTimelineShareData({
            title: "60秒挑战最强音乐天赋测试，你能得几分？", // 分享标题
            desc: "据说是超准的音乐天赋测试！", // 分享描述
            imgUrl: "https://s.immusician.com/web/h5/wx_share.jpeg", // 分享图标
            link: `http://s.immusician.com/web/h5/musicTest.html`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            success: function() {
              // 设置成功
            }
          });
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });
        wx.error(function(res) {
          console.log(res);
        });
      } else {
        that.page1Icon = "playing";
        that.page1Audio.play();
      }
    },
    getSignInfo() {
      var that = this;
      return new Promise((resolve, reject) => {
        this.axios
          .post(`//api.yinji.immusician.com:55555/v1/wechat/config/`, {
            url: location.href
          })
          .then(res => {
            var res = res.data;
            let param = {
              appId: res.appId,
              timestamp: res.timestamp,
              nonceStr: res.nonceStr,
              signature: res.signature
            };
            that.wxParam = param;
            resolve(param);
          });
      });
    },
    initLoading() {
      console.log("initLoading");
      var that = this;
      this.loadingBar = document.querySelector(".p_color");
      var bgArr = [];
      this.curLoadingIndex = 0;
      var fakeTemp = 0;
      var uk = require("../../assets/img/music_test/uk.png");
      var bg2 = require("../../assets/img/music_test/bg.jpg");
      var bg1 = require("../../assets/img/music_test/test_cover1.png");
      var bg3 = require("../../assets/img/music_test/sfq.png");
      var bg4 = require("../../assets/img/music_test/topic_card.png");
      var bgArr = [bg1, bg3, bg4];
      var loadingArr = [uk, bg2];
      //先加载loading页素材
      var loadingPagePromise = [];
      loadingArr.forEach((e, index) => {
        //console.log(require(e))
        let p = new Promise((resolve, reject) => {
          var img = new Image();
          img.src = e;
          if (img.complete) {
            resolve();
          }
          img.onload = function() {
            console.log("loading页图加载完成");
            resolve();
          };
        });
        loadingPagePromise.push(p);
      });
      Promise.all(loadingPagePromise).then(res => {
        console.log("loading页所有加载完成");
        //加载背景图
        bgArr.forEach((e, index) => {
          //console.log(require(e))
          let p = new Promise((resolve, reject) => {
            var img = new Image();
            img.src = e;
            if (img.complete) {
              that.responseImgLoad();
              resolve();
            }
            img.onload = function() {
              that.responseImgLoad();
              resolve();
            };
          });
          this.loadingAllPromise.push(p);
        });
        //加载音频
        this.audioArr.forEach(e => {
          this.loadingAllPromise.push(this.getAudio(e));
        });
        //请求接口
        if(!this.isApp){
          this.loadingAllPromise.push(this.getSignInfo());
        }
        Promise.all(this.loadingAllPromise).then(res => {
          console.log("所有音频都加载完了");
          document.querySelector("#progressStatus").innerHTML = "加载完成";
          var loadingPage = document.querySelector(".page.loading");
          setTimeout(() => {
            loadingPage.classList.add("hide");
            if(!this.isApp){
              this.shareReady(this.wxParam);
            }
            
            setTimeout(() => {
              loadingPage.style.display = "none";
            }, 700);
          }, 900);
        });
      });
    },
    q3NoteClick() {
      this.$refs.q3Bird1.classList.add("bounce");
      this.Q3AAudio.play();
    },
    q4NoteClick() {
      this.$refs.q4Bird1.classList.add("bounce");
      this.Q4AAudio.play();
    },
    q5NoteClick() {
      this.Q5AAudio.play();
    },
    q6NoteClick() {
      this.Q6AAudio.play();
    },
    addNotePlaying() {
      document.querySelectorAll(".note").forEach(e => {
        e.classList.add("playing");
      });
    },
    removeNotePlaying() {
      //this.removeNoteReading();
      document.querySelectorAll(".note").forEach(e => {
        e.classList.remove("playing");
      });
    },
    addNoteReading() {
      document.querySelectorAll(".note").forEach(e => {
        e.classList.add("reading");
      });
    },
    removeNoteReading() {
      document.querySelectorAll(".note").forEach(e => {
        e.classList.remove("reading");
      });
    },
    //打泡泡
    getInterval() {
      this.interval = 60000 / this.speed;
    },
    q7PlayStart() {
      console.log("start play!");
      this.Q7BgAudio.play();
      this.needBeats = Math.floor((this.Q7BgAudio.duration / 60) * this.speed);
      // setTimeout(() => {
      //   this.bindClick();
      // }, 100);
      this.bindClick();
      //this.upBeats();
      //this.bindClick();
      setTimeout(() => {
        this.upBeats();
      }, (this.spaceBeat - 2) * this.interval); //2拍只后升起泡泡
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    bindClick() {
      document.querySelector(".qiaoji").addEventListener("touchstart", e => {
        //this.clickVoice.play();
        if (this.q8OnOff && this.isIos) {
          this.Q8TAudio.play();
          this.Q8TAudio.pause();
          this.q8OnOff = false;
        }
        var clickTime = this.Q7BgAudio.currentTime * 1000;
        var remainder = clickTime % this.interval;
        var midPoint = this.interval / 2;
        var errorPoint = this.error / 2;
        if (remainder > midPoint) {
          if (Math.abs(remainder - this.interval) > errorPoint) {
            this.handleClick("wrong");
          } else {
            this.handleClick("right");
          }
        } else {
          if (remainder > errorPoint) {
            this.handleClick("wrong");
          } else {
            this.handleClick("right");
          }
        }
        //console.log(this.Q7BgAudio.currentTime * 1000, this.index);
      });
    },
    handleClick(status) {
      this.index =
        Math.round((this.Q7BgAudio.currentTime * 1000) / this.interval) -
        this.spaceBeat; //当前在第几排减去了空拍
      console.log(this.index);
      const curBeats = this.beats[this.index];
      if (
        curBeats.classList.contains("right") ||
        curBeats.classList.contains("wrong")
      ) {
        return;
      }
      if (status === "right") {
        console.log("right");
        curBeats.classList.add("right");
      } else if (status === "wrong") {
        console.log("false");
        curBeats.classList.add("wrong");
      }
    },
    upBeats() {
      var beats = document.querySelectorAll(".beat");
      this.beats = beats;
      beats.forEach((e, i) => {
        e.style.left = Math.random() * 300 + "px";
        setTimeout(() => {
          e.classList.add("beat_up");
        }, this.interval * i);
      });
    },
    //打泡泡
    select(qIndex, value, isRight, event) {
      if (this.clickOff) {
        return;
      }
      if (qIndex === 3 || qIndex === 4 || qIndex === 5 || qIndex === 6) {
        if (!this.canClick) {
          return;
        }
      }

      var target = event.target;
      if (target.classList.contains("option_img")) {
        target.parentElement.classList.add("select");
      } else if (target.classList.contains("bird_click")) {
        target.classList.add("select");
      } else if (target.classList.contains("option_bird")) {
        target.parentElement.classList.add("select");
      } else if (target.tagName.toLocaleLowerCase() == "img") {
        target.parentElement.parentElement.classList.add("select");
      } else {
        target.classList.add("select");
      }
      // if(event.target)
      // document.querySelector('.q2a').parentElement.parentElement.classList.add('select')

      this.clickOff = true;
      //console.log(e.target.classList.add('select'))
      this.mySelect.push({
        index: qIndex,
        detail: value,
        isRight: isRight
      });
      this.callBack();
      if (qIndex === 3) {
        if (value == "A") {
          this.$refs.q3Bird1.classList.add("f1");
        } else {
          this.$refs.q3Bird2.classList.add("f2");
        }
        setTimeout(() => {
          this.swiper.slideNext();
        }, 2001);
        return;
      }
      if (qIndex === 4) {
        if (value == "A") {
          this.$refs.q4Bird1.classList.add("f1");
        } else {
          this.$refs.q4Bird2.classList.add("f2");
        }
        setTimeout(() => {
          this.swiper.slideNext();
        }, 2001);
        return;
      }
      this.swiper.slideNext();
      //console.log(this.mySelect);
    },
    Q1Enter() {
      console.log("Q1Enter");
      window.URL.revokeObjectURL(this.page1Audio.src);
      if (this.isIos || this.isApp) {
        console.log("ioss");
        this.Q1TAudio.play();
        this.Q1CAudio.play();
        this.Q1CAudio.pause();
      } else {
        console.log("安卓");
        //this.Q1TAudio.play();
        this.Q1TAudio.play();
        this.Q1CAudio.play();
        this.Q1CAudio.pause();
      }

      this.addNoteReading(); //开始读题干
      console.log("zzz");
      this.Q1TAudio.addEventListener("ended", () => {
        console.log("zzz1");
        this.Q1CAudio.play();
        this.removeNoteReading(); //题干读完
        this.addNotePlaying(); //转动音符
      });
      this.Q1CAudio.addEventListener("ended", () => {
        this.removeNotePlaying(); //取消转动音符
      });
    },
    Q2Enter() {
      console.log("Q2Enter");
      window.URL.revokeObjectURL(this.Q1TAudio.src);
      window.URL.revokeObjectURL(this.Q1CAudio.src);
      this.removeNotePlaying(); //取消转动音符
      this.Q1TAudio.pause();
      this.Q1CAudio.pause();
      if (this.isIos || this.isApp) {
        this.Q2TAudio.play();
        this.Q2CAudio.play();
        this.Q2CAudio.pause();
      } else {
        this.Q2TAudio.play();
      }

      this.addNoteReading(); //开始读题干
      this.Q2TAudio.addEventListener("ended", () => {
        this.Q2CAudio.play();
        this.removeNoteReading(); //题干读完
        this.addNotePlaying(); //转动音符
      });
      this.Q2CAudio.addEventListener("ended", () => {
        this.removeNotePlaying();
      });
    },
    Q3Enter() {
      console.log("Q3Enter");
      window.URL.revokeObjectURL(this.Q2TAudio.src);
      window.URL.revokeObjectURL(this.Q2CAudio.src);
      this.removeNotePlaying(); //取消转动音符
      this.Q2TAudio.pause();
      this.Q2CAudio.pause();
      this.Q3TAudio.play();
      //this.Q3TAudio.pause();
      //hack
      if (this.isIos || this.isApp) {
        this.Q3AAudio.play();
        this.Q3AAudio.pause();
        this.Q3BAudio.play();
        this.Q3BAudio.pause();
      } else {
        //this.Q2TAudio.play();
      }

      this.addNoteReading(); //开始读题干
      this.Q3TAudio.addEventListener("ended", () => {
        if (this.swiperIndex !== 3) {
          return;
        }
        this.Q3AAudio.play();
        this.removeNoteReading(); //题干读完
        this.addNotePlaying(); //转动音符
        this.$refs.q3Bird1.classList.add("bounce");
      });
      this.Q3AAudio.addEventListener("ended", () => {
        if (this.swiperIndex !== 3) {
          return;
        }
        setTimeout(() => {
          this.Q3BAudio.play();
          this.$refs.q3Bird2.classList.add("bounce");
        }, 500);
      });
      this.Q3BAudio.addEventListener("ended", () => {
        this.removeNotePlaying(); //取消转动音符
        this.canClick = true;
        this.$refs.q3Bird1.classList.remove("bounce");
        this.$refs.q3Bird2.classList.remove("bounce");
      });
    },
    Q4Enter() {
      console.log("Q4Enter");
      window.URL.revokeObjectURL(this.Q3TAudio.src);
      window.URL.revokeObjectURL(this.Q3AAudio.src);
      window.URL.revokeObjectURL(this.Q3BAudio.src);
      this.removeNotePlaying(); //取消转动音符
      this.Q3TAudio.pause();
      this.Q3AAudio.pause();
      this.Q3BAudio.pause();
      this.Q4TAudio.play();
      this.Q4TAudio.pause();
      setTimeout(() => {
        this.Q4TAudio.play();
        this.addNoteReading(); //开始读题干
      }, 2001);
      //hack
      if (this.isIos || this.isApp) {
        this.Q4AAudio.play();
        this.Q4AAudio.pause();
        this.Q4BAudio.play();
        this.Q4BAudio.pause();
      }

      this.Q4TAudio.addEventListener("ended", () => {
        this.removeNoteReading(); //题干读完
        this.addNotePlaying(); //转动音符
        if (this.swiperIndex !== 4) {
          return;
        }
        this.Q4AAudio.play();
        this.$refs.q4Bird1.classList.add("bounce");
      });
      this.Q4AAudio.addEventListener("ended", () => {
        if (this.swiperIndex !== 4) {
          return;
        }
        setTimeout(() => {
          this.Q4BAudio.play();
          this.$refs.q4Bird2.classList.add("bounce");
        }, 500);
      });
      this.Q4BAudio.addEventListener("ended", () => {
        this.canClick = true;
        this.removeNotePlaying(); //取消转动音符
        this.$refs.q4Bird1.classList.remove("bounce");
        this.$refs.q4Bird2.classList.remove("bounce");
      });
    },
    Q5Enter() {
      console.log("Q5Enter");
      window.URL.revokeObjectURL(this.Q4TAudio.src);
      window.URL.revokeObjectURL(this.Q4AAudio.src);
      window.URL.revokeObjectURL(this.Q4BAudio.src);
      this.removeNotePlaying(); //取消转动音符
      this.Q4TAudio.pause();
      this.Q4AAudio.pause();
      this.Q4BAudio.pause();
      if (this.isIos || this.isApp) {
        this.Q5TAudio.play();
        this.Q5TAudio.pause();
      }

      this.addNoteReading(); //开始读题干
      setTimeout(() => {
        this.Q5TAudio.play();
      }, 2001);
      //hack
      if (this.isIos || this.isApp) {
        this.Q5AAudio.play();
        this.Q5AAudio.pause();
        this.Q5BAudio.play();
        this.Q5BAudio.pause();
      }

      this.Q5TAudio.addEventListener("ended", () => {
        this.removeNoteReading(); //题干读完
        this.addNotePlaying(); //转动音符
        if (this.swiperIndex !== 5) {
          return;
        }
        this.Q5AAudio.play();
      });
      this.Q5AAudio.addEventListener("ended", () => {
        if (this.swiperIndex !== 5) {
          return;
        }
        setTimeout(() => {
          this.Q5BAudio.play();
        }, 500);
      });
      this.Q5BAudio.addEventListener("ended", () => {
        this.canClick = true;
        this.removeNotePlaying();
      });
    },
    Q6Enter() {
      console.log("Q6Enter");
      window.URL.revokeObjectURL(this.Q5TAudio.src);
      window.URL.revokeObjectURL(this.Q5AAudio.src);
      window.URL.revokeObjectURL(this.Q5BAudio.src);
      this.removeNotePlaying(); //取消转动音符
      this.Q5TAudio.pause();
      this.Q5AAudio.pause();
      this.Q5BAudio.pause();
      this.Q6TAudio.play();
      //hack
      if (this.isIos || this.isApp) {
        this.Q6AAudio.play();
        this.Q6AAudio.pause();
        this.Q6BAudio.play();
        this.Q6BAudio.pause();
      }

      this.addNoteReading(); //开始读题干
      this.Q6TAudio.addEventListener("ended", () => {
        this.removeNoteReading(); //题干读完
        this.addNotePlaying(); //转动音符
        if (this.swiperIndex !== 6) {
          return;
        }
        this.Q6AAudio.play();
      });
      this.Q6AAudio.addEventListener("ended", () => {
        if (this.swiperIndex !== 6) {
          return;
        }
        setTimeout(() => {
          this.Q6BAudio.play();
        }, 500);
      });
      this.Q6BAudio.addEventListener("ended", () => {
        this.canClick = true;
        this.removeNotePlaying();
      });
    },
    Q7Enter() {
      console.log("Q7Enter");
      window.URL.revokeObjectURL(this.Q6TAudio.src);
      window.URL.revokeObjectURL(this.Q6AAudio.src);
      window.URL.revokeObjectURL(this.Q6BAudio.src);
      this.Q6TAudio.pause();
      this.Q6AAudio.pause();
      this.Q6BAudio.pause();
      this.Q7TAudio.play();
      if (this.isIos || this.isApp) {
        this.Q7BgAudio.play();
        this.Q7BgAudio.pause();
      }

      this.Q7TAudio.addEventListener("ended", () => {
        if (this.swiperIndex !== 7) {
          return;
        }
        this.q7PlayStart();
      });
      this.Q7BgAudio.addEventListener("ended", () => {
        this.swiper.slideNext();
        this.Q8Enter();
      });
      // this.Q6AAudio.addEventListener('ended',()=>{
      //    if(this.swiperIndex!==6){
      //     return
      //   }
      //   setTimeout(() => {
      //     this.Q6BAudio.play()
      //   }, 500);
      // })
    },
    Q8Enter() {
      console.log("Q8Enter");
      window.URL.revokeObjectURL(this.Q7TAudio.src);
      window.URL.revokeObjectURL(this.Q7BgAudio.src);
      this.Q7TAudio.pause();
      this.Q7BgAudio.pause();
      this.Q8TAudio.play();
    },
    Q9Enter() {
      console.log("Q9Enter");
      window.URL.revokeObjectURL(this.Q8TAudio.src);
      this.removeNotePlaying(); //取消转动音符
      this.Q8TAudio.pause();
      this.Q9TAudio.play();
      //hack
      if (this.isIos || this.isApp) {
        this.Q9CAudio.play();
        this.Q9CAudio.pause();
      }

      this.addNoteReading(); //开始读题干
      this.Q9TAudio.addEventListener("ended", () => {
        this.removeNoteReading(); //题干读完
        this.addNotePlaying(); //转动音符
        if (this.swiperIndex !== 9) {
          return;
        }
        this.Q9CAudio.play();
      });
      this.Q9CAudio.addEventListener("ended", () => {
        this.removeNotePlaying();
      });
    },
    Q10Enter() {
      console.log("Q10Enter");
      window.URL.revokeObjectURL(this.Q9TAudio.src);
      window.URL.revokeObjectURL(this.Q9CAudio.src);
      this.Q9TAudio.pause();
      this.Q9CAudio.pause();
      if (this.isIos || this.isApp) {
        this.Q10G1Audio.play();
        this.Q10G1Audio.pause();
        this.Q10G2Audio.play();
        this.Q10G2Audio.pause();
        this.Q10G3Audio.play();
        this.Q10G3Audio.pause();
      }

      setTimeout(() => {
        //将所有答题情况归类
        this.mySelect.splice(5, 0, { detail: "B", index: 7, isRight: true });
        this.mySelect.forEach((e, idx) => {
          if (e.index == 1 || e.index == 2) {
            if (e.isRight) {
              this.resultItems[0].star += 2.5;
            }
          } else if (e.index == 3 || e.index == 4) {
            if (e.isRight) {
              this.resultItems[1].star += 2.5;
            }
          } else if (e.index == 5 || e.index == 6) {
            if (e.isRight) {
              this.resultItems[2].star += 2.5;
            }
          } else if (e.index == 7) {
            var rightNum = document.querySelectorAll(".beat.right").length;
            var rightRate = (rightNum / (this.needBeats - 4)) * 100;
            console.log("rightNum", rightNum, "this.needBeats", this.needBeats,"rightRate", rightRate);
            console.log(Boolean(rightRate<10))
            if (rightRate >= 90) {
              this.resultItems[3].star = 5;
            } else if (rightRate >= 70 && rightRate < 90) {
              this.resultItems[3].star = 4;
            } else if (rightRate >= 60 && rightRate < 70) {
              this.resultItems[3].star = 3;
            } else if (rightRate >= 40 && rightRate < 60) {
              this.resultItems[3].star = 2;
            } else if (rightRate >= 10 && rightRate < 40) {
              this.resultItems[3].star = 1;
            }else if (rightRate < 10) {
              this.resultItems[3].star = 0;
            }
          } else if (e.index == 8 || e.index == 9) {
            if (e.isRight) {
              this.resultItems[4].star += 2.5;
            }
          }
        });
        //计算出总星数和展示星星
        this.resultItems.forEach(e => {
          this.echartsData.push(e.star);
          this.allStar += e.star;
          if (e.star == 0) {
            e.starArr = ["all"];
          }
          if (e.star == 1) {
            e.starArr = ["all"];
          }
          if (e.star == 2) {
            e.starArr = ["all", "all"];
          }
          if (e.star == 3) {
            e.starArr = ["all", "all", "all"];
          }
          if (e.star == 4) {
            e.starArr = ["all", "all", "all", "all"];
          } else if (e.star == 2.5) {
            e.starArr = ["all", "all", "half"];
          } else if (e.star == 5) {
            e.starArr = ["all", "all", "all", "all", "all"];
          }
        });
        //总分
        if (this.allStar >= 20) {
          this.score = this.allStar * 4;
          this.grade = 3;
          this.Q10G3Audio.play();
        } else if (this.allStar >= 10 && this.allStar < 20) {
          //10 - 20星 60 - 80分
          this.score = 60 + this.allStar;
          this.grade = 2;
          this.Q10G2Audio.play();
        } else {
          //10星以下60分
          this.score = 6 * this.allStar;
          this.grade = 1;
          this.Q10G1Audio.play();
        }
        if (this.score >= 98) {
          this.beyondRate = this.score;
        } else if (this.score < 98 && this.score > 90) {
          this.beyondRate = this.score + 1;
        } else if (this.score <= 90 && this.score > 60) {
          this.beyondRate = this.score + Math.floor(Math.random() * 6);
        } else {
          this.beyondRate = this.score + Math.floor(Math.random() * 20);
        }
        this.initCanvas();
        console.log(this.gradeArr);
        this.getTitle();
      }, 350);
    },
    getTitle(arr) {
      var max = 0,
        resultArr = [],
        titleItem,
        resultNum;
      //取得最大值
      this.gradeArr.forEach((e, i) => {
        if (e.grade > max) {
          max = e.grade;
        }
      });
      //随机取得最大值对应项
      this.gradeArr.forEach((e, i) => {
        if (e.grade === max) {
          resultArr.push(this.gradeArr[i]);
        }
      });
      var resultIndex = Math.floor(Math.random() * resultArr.length);
      console.log(resultArr);
      var resultItem = resultArr[resultIndex];
      switch (resultItem.gradeText) {
        case "A":
          resultNum = "万";
          break;
        case "B":
          resultNum = "千";
          break;
        case "C":
          resultNum = "百";
          break;
      }
      switch (resultItem.name) {
        case "音乐感受力":
          titleItem = "音乐感知";
          break;
        case "音乐听觉":
          titleItem = "音乐听力";
          break;
        case "音乐记忆":
          titleItem = "音乐记忆";
          break;
        case "单位拍的稳定性":
          titleItem = "音乐节奏";
          break;
        case "音乐常识":
          titleItem = "音乐常识";
          break;
      }
      this.resultNum = resultNum;
      this.resultName = titleItem;
      this.resultTitleShow = true
      //this.reportTitle = `你是${resultNum}里挑一的${titleItem}大师`;
    },
    page1IconPlay() {
      this.page1Icon = "playing";
      this.page1Audio.play();
    },
    page1IconPause() {
      this.page1Icon = "pause";
      this.page1Audio.pause();
    },
    beginClick() {
      console.log('1')
      this.swiper.slideNext();
      console.log('2')
      this.page1Audio.pause();
      console.log('3')
      this.callBack();
      console.log('4')
    },
    testWeixin() {
      //判断是否是微信
      var ua = navigator.userAgent.toLowerCase();
      return ua.match(/MicroMessenger/i) == "micromessenger";
    },
    testPlat() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return "IOS";
        //return 0
      } else if (/(Android)/i.test(navigator.userAgent)) {
        return "Android";
        //return 1
      } else {
        return -1;
      }
    },
    callBack() {
      var that = this;
      var index = that.swiperIndex ? that.swiperIndex + 1 : 1;
      // 调试使用
      if (this.testShare) {
        this.Q10Enter();
        return;
      }
      // 调试使用
      switch (index) {
        case 1: {
          that.Q1Enter();
          break;
        }
        case 2: {
          that.Q2Enter();
          break;
        }
        case 3: {
          that.Q3Enter();
          break;
        }
        case 4: {
          that.Q4Enter();
          break;
        }
        case 5: {
          that.Q5Enter();
          break;
        }
        case 6: {
          that.Q6Enter();
          break;
        }
        case 7: {
          that.Q7Enter();
          break;
        }
        case 8: {
          that.Q8Enter();
          break;
        }
        case 9: {
          that.Q9Enter();
          break;
        }
        case 10: {
          that.Q10Enter();
          break;
        }
      }
    }
  },
  created() {
    this.isIos = this.testPlat() === "IOS" ? true : false;
    this.isWeixin = this.testWeixin();
    this.isApp = this.$util.getQueryVariable("from") === "app";
    this.isLangyue = this.$util.getQueryVariable('langyue') === '1';
    this.isD312 = this.$util.getQueryVariable("isD312") === "1";
    if (this.isIos) {
      this.error = 700;
    } else {
      this.error = 1100;
    }
    if (process.env.NODE_ENV === "development") {
      this.testShare = true;
    }
  },
  mounted() {
    //this.initCanvas();
    //return
    console.log(location.href);
    var that = this;
    this.Q1TAudio = new Audio();
    this.Q1TAudio.src = require("../../assets/audio/music_test/q1/topic.mp3");
    this.Q1CAudio = new Audio();
    this.Q1CAudio.src = require("../../assets/audio/music_test/q1/content.mp3");

    this.Q2TAudio = new Audio();
    this.Q2TAudio.src = require("../../assets/audio/music_test/q2/topic.mp3");
    this.Q2CAudio = new Audio();
    this.Q2CAudio.src = require("../../assets/audio/music_test/q2/content.mp3");

    this.Q3TAudio = new Audio();
    this.Q3TAudio.src = require("../../assets/audio/music_test/q3/topic.mp3");
    this.Q3AAudio = new Audio();
    this.Q3AAudio.src = require("../../assets/audio/music_test/q3/A_3_do.mp3");
    this.Q3BAudio = new Audio();
    this.Q3BAudio.src = require("../../assets/audio/music_test/q3/B_3_sol.mp3");

    this.Q4TAudio = new Audio();
    this.Q4TAudio.src = require("../../assets/audio/music_test/q4/topic.mp3");
    this.Q4AAudio = new Audio();
    this.Q4AAudio.src = require("../../assets/audio/music_test/q4/A_4_fa.mp3");
    this.Q4BAudio = new Audio();
    this.Q4BAudio.src = require("../../assets/audio/music_test/q4/b_4_re.mp3");

    this.Q5TAudio = new Audio();
    this.Q5TAudio.src = require("../../assets/audio/music_test/q5/topic.mp3");
    this.Q5AAudio = new Audio();
    this.Q5AAudio.src = require("../../assets/audio/music_test/q5/A_5.mp3");
    this.Q5BAudio = new Audio();
    this.Q5BAudio.src = require("../../assets/audio/music_test/q5/B_5.mp3");

    this.Q6TAudio = new Audio();
    this.Q6TAudio.src = require("../../assets/audio/music_test/q6/topic.mp3");
    this.Q6AAudio = new Audio();
    this.Q6AAudio.src = require("../../assets/audio/music_test/q6/A_6.mp3");
    this.Q6BAudio = new Audio();
    this.Q6BAudio.src = require("../../assets/audio/music_test/q6/b_6.mp3");

    this.Q7TAudio = new Audio();
    this.Q7TAudio.src = require("../../assets/audio/music_test/q7/topic.mp3");
    this.Q7BgAudio = new Audio();
    this.Q7BgAudio.src = require("../../assets/audio/music_test/q7/bg.mp3");

    this.Q8TAudio = new Audio();
    this.Q8TAudio.src = require("../../assets/audio/music_test/q8/topic.mp3");

    this.Q9TAudio = new Audio();
    this.Q9TAudio.src = require("../../assets/audio/music_test/q9/topic.mp3");
    this.Q9CAudio = new Audio();
    this.Q9CAudio.src = require("../../assets/audio/music_test/q9/content.mp3");

    this.Q10G1Audio = new Audio();
    this.Q10G1Audio.src = require("../../assets/audio/music_test/q10/grade1.mp3");
    this.Q10G2Audio = new Audio();
    this.Q10G2Audio.src = require("../../assets/audio/music_test/q10/grade2.mp3");
    this.Q10G3Audio = new Audio();
    this.Q10G3Audio.src = require("../../assets/audio/music_test/q10/grade3.mp3");
    this.page1Audio = this.$refs.page1.querySelector("audio");
    //音符点击事件
    document.querySelectorAll(".note").forEach(e => {
      e.addEventListener("click", ele => {
        console.log(this.swiperIndex);
        if (e.classList.contains("reading")) {
          return;
        }
        if (e.classList.contains("playing")) {
          return;
        }
        switch (this.swiperIndex) {
          case 1: {
            this.Q1CAudio.play();
            break;
          }
          case 2: {
            this.Q2CAudio.play();
            break;
          }
          case 3: {
            this.q3NoteClick();
            break;
          }
          case 4: {
            this.q4NoteClick();
            break;
          }
          case 5: {
            this.q5NoteClick();
            break;
          }
          case 6: {
            this.q6NoteClick();
            break;
          }
          case 9: {
            this.Q9CAudio.play();
            break;
          }
        }

        e.classList.add("playing");
      });
    });
    //打泡泡
    this.getInterval();
    //打泡泡

    this.audioArr = [
      this.Q1TAudio,
      this.Q1CAudio,
      this.Q2TAudio,
      this.Q2CAudio,
      this.Q3TAudio,
      this.Q3AAudio,
      this.Q3BAudio,
      this.Q4TAudio,
      this.Q4AAudio,
      this.Q4BAudio,
      this.Q5TAudio,
      this.Q5AAudio,
      this.Q5BAudio,
      this.Q6TAudio,
      this.Q6AAudio,
      this.Q6BAudio,
      this.Q7TAudio,
      this.Q8TAudio,
      this.Q9TAudio,
      this.Q9CAudio,
      this.page1Audio
    ];
    this.initLoading();
    this.swiper = new Swiper(".swiper-container", {
      direction: "vertical",
      speed: 800,
      noSwiping: true,
      noSwipingClass: "stop-swiping",
      on: {
        slideNextTransitionEnd() {
          //console.log('\\\\\\\\\\\\\\\\\\')

          that.swiperIndex = that.swiper.activeIndex;
          //console.log(that.swiperIndex)
          that.clickOff = false;
          that.canClick = false;
        }
      }
    });
  }
};
</script>
<style lang="less">
.font-size(@sizeValue:16) {
  @vw: 16 / 375 * 100;
  @result: @sizeValue / 16 * @vw;
  font-size: ~"@{result}vw";
}
html {
  .font-size(16);
}
@media screen and (min-width: 600px) {
  html {
    .font-size(12);
  }
}
// @media screen and (max-width: 500px) {
//   html {
//     font-size: 100%;
//   }
// }
// @media screen and (min-width: 500px) {
//   html {
//     font-size: 140%;
//   }
// }
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  //background: #2e5dad
}
#musicTest,
.swiper-container,
.swiper-wrapper {
  width: 100%;
  height: 100%;
}
#musicTest * {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.page {
  position: relative;
  //height: 100vh;
  height: 100%;
  //background:  no-repeat 20.5% 0.2% / 2% url('../../assets/img/music_test/cloud1.png');
  background: no-repeat 20.5% 0.2% ~"/" 68px 18px url("../../assets/img/music_test/cloud1.png"),
    no-repeat right 0% top 25.6% ~"/" 48px 22px url("../../assets/img/music_test/cloud2.png"),
    no-repeat left 11.6% top 33.2% ~"/" 69px 14px url("../../assets/img/music_test/cloud3.png"),
    no-repeat left 0% bottom 0% ~"/" 77px 70px url("../../assets/img/music_test/grass1.png");
  background-color: rgba(255, 194, 149, 1);

  .topic_card {
    position: absolute;
    top: 4.7%;
    left: 50%;
    transform: translateX(-50%);
    width: 325px;
    height: 143px;

    .title {
      position: absolute;
      width: 133px;
      height: 31px;
      line-height: 31px;
      top: 13px;
      left: 50%;
      transform: translateX(-50%);
      background: url("../../assets/img/music_test/title.png") no-repeat
        center/cover;
      text-align: center;
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    .text {
      position: absolute;
      top: 43%;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: bold;
      color: rgba(43, 43, 43, 1);
    }
  }
}
//首屏
.page.first {
  .play_icon {
    position: absolute;
    right: -5px;
    top: 0px;
    padding: 20px;
    width: 70px;
  }
  .cover {
    width: 100%;
  }
  .begin_btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 77%;
    img {
      width: 190px;
      animation: breath 1s infinite alternate;
    }
  }
  background: #2e5dad;
  //background: #2e797d;
  //background: no-repeat top 0 left 0 ~"/" cover url("../../assets/img/music_test/test_cover1.png");
  //background-color: rgba(255, 194, 149, 1);
}
//最后一屏
.page.last {
   overflow: hidden;
  //overflow-y: auto;
  box-sizing: border-box;
  background: rgba(255, 253, 247, 1);
  .last_main{
    height: 100vh;
    padding-bottom: 87px;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .result_title {
    max-width: 375px;
    margin: 0px auto 10px auto;
    padding-top: 20px;
    text-align: center;
    font-size:19px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(137,57,0,1);
    background: no-repeat 18% 11.6% ~"/" 37px 49px url("../../assets/img/music_test/title_b.png"),
    no-repeat left 0% top 50.6% ~"/" 100% 70px url("../../assets/img/music_test/title_l.png"),
    no-repeat right 18% top 11.6% ~"/" 46px 46px url("../../assets/img/music_test/title_s.png");
    @media only screen and (device-width: 375px) and (device-height: 812px) {
      padding-top: 40px;
      padding-bottom: 25px;
      background: no-repeat 18% 20.6% ~"/" 37px 49px url("../../assets/img/music_test/title_b.png"),
    no-repeat left 0% top 50.6% ~"/" 100% 70px url("../../assets/img/music_test/title_l.png"),
    no-repeat right 18% top 20.6% ~"/" 46px 46px url("../../assets/img/music_test/title_s.png");
    }
    @media (max-width: 400px) and (min-height: 700px) {
      padding-top: 40px;
      padding-bottom: 25px;
      background: no-repeat 18% 20.6% ~"/" 37px 49px url("../../assets/img/music_test/title_b.png"),
    no-repeat left 0% top 50.6% ~"/" 100% 70px url("../../assets/img/music_test/title_l.png"),
    no-repeat right 18% top 20.6% ~"/" 46px 46px url("../../assets/img/music_test/title_s.png");
    }
    .title_num{
      color: #FF5736
    }
    .sec_row{
      font-size:28px;
      font-family:PingFangSC-Semibold,PingFangSC;
      font-weight:600;
      color:rgba(137,57,0,1);
    }
  }
  #eContainer {
    width: 100%;
    height: 200px;
    //height: 29vh;
    margin-bottom: 0px;
    @media only screen and (device-width: 375px) and (device-height: 812px) {
      margin-top: 15px !important;
      margin-bottom: 35px !important;
    }
    @media (max-width: 450px) and (min-height: 800px) {
      margin-top: 40px !important;
      margin-bottom: 50px !important;
    }
    @media (max-width: 450px) and (min-height: 700px) {
      margin-top: 15px !important;
      margin-bottom: 26px !important;
    }
  }
  .comment_wrapper {
    width: 375px;
    margin: auto;
    padding: 0 20px;
    @media screen and (max-width: 375px) {
      & {
        width: 100%;
      }
    }
    @media screen and (min-width: 400px) {
      & {
        margin-top: -10px;
      }
    }
    @media screen and (min-width: 500px) {
      & {
        width: 420px;
      }
    }

    .title_row {
      position: relative;
      display: flex;
      align-items: center;
      .comment_i {
        width: 20px;
        height: 12px;
        margin-right: 5px;
      }
      .comment_i.s1 {
        background: url("../../assets/img/music_test/i1.png") no-repeat
          center/cover;
      }
      .comment_i.s2 {
        background: url("../../assets/img/music_test/i2.png") no-repeat
          center/contain;
      }
      .comment_i.s3 {
        background: url("../../assets/img/music_test/i3.png") no-repeat
          center/contain;
      }
      .comment_i.s4 {
        background: url("../../assets/img/music_test/i4.png") no-repeat
          center/contain;
      }
      .comment_i.s5 {
        background: url("../../assets/img/music_test/i5.png") no-repeat
          center/contain;
      }
      .comment_title {
        flex-grow: 1;
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(137, 57, 0, 1);
      }
      .comment_grade {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 69, 0, 1);
      }
    }
    .comment_row {
      margin: 5px 0 7px 0;
      padding-left: 26px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      @media screen and (max-width: 320px) {
        & {
          margin: 2px 0 2px 0;
          font-size: 9px;
        }
      }
    }
  }
  .btn_wrapper {
    text-align: center;
    img {
      position: relative;
      z-index: 999;
      width: 200px;
      margin-top: 15px;
      @media screen and (max-width: 370px) {
        & {
          margin-top: 5px;
        }
      }
      @media (max-width: 400px) and (min-height: 700px) {
        & {
          margin-top: 30px;
        }
      }
    }
  }
  .half_round{
    position: absolute;
    
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgb(254, 234, 171)
  }
  .half_round1{
left: -24px;
    top:10%;
  }
  .half_round2{
     width: 36px;
    height: 36px;
    top: -18px;
    right:0%;
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: url("../../assets/img/music_test/footer_bg.png") repeat
      center/cover;
    .footer_wrapper {
      width: 375px;
      @media screen and (max-width: 375px) {
        & {
          width: 100%;
        }
      }
      @media screen and (min-width: 500px) {
        & {
          width: 420px;
        }
      }
      margin: auto;
      padding: 10px 20px 7px 20px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        //flex-grow: 1;
        .logo {
          img {
            width: 80px;
          }
        }
        .slogan {
          font-size: 11px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(137, 57, 0, 1);
          display: flex;
          align-items: center;
          img{
            width: 18px;
          }
          @media screen and (max-width: 370px) {
            & {
              font-size: 9px;
            }
          }
        }
      }
      .right {
        .qr {
          width: 65px;
        }
      }
    }
  }
}
// .page.last {
//   .cover {
//     width: 100%;
//   }
//   .result_bg_wrapper {
//     width: 375px;
//     position: absolute;
//     left: 50%;
//     transform: translateX(-50%);
//     top: 12.8%;
//     padding-top: 30px;
//     .content {
//       position: relative;
//       z-index: 12;
//     }
//     .result_bg {
//       position: absolute;
//       left: 0;
//       top: 0;
//       width: 100%;
//     }
//     text-align: center;
//     font-size: 15px;
//     font-family: PingFangSC-Regular;
//     font-weight: 400;
//     color: rgba(102, 102, 102, 1);
//     .core {
//       margin-top: 30px;
//       font-size: 40px;
//       font-family: PingFangSC-Semibold;
//       font-weight: 600;
//       color: rgba(255, 106, 63, 1);
//     }
//     .comment {
//       position: relative;
//       height: 78px;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       width: 80%;
//       margin: 20px auto;
//       font-size: 15px;
//       font-family: PingFangSC-Semibold;
//       font-weight: 600;
//       color: rgba(68, 68, 68, 1);
//       & > p {
//         margin-bottom: 5px;
//       }
//       .comment_left,
//       .comment_right {
//         position: absolute;
//         width: 33px;
//         top: 50%;
//         transform: translateY(-50%);
//       }
//       .comment_left {
//         left: 0;
//       }
//       .comment_right {
//         right: 0;
//       }
//     }
//     .star_items_wrapper {
//       margin: auto;
//       .star_items {
//         display: flex;
//         margin-bottom: 10px;
//         width: 50%;
//         margin: 0 auto 10px auto;
//         position: relative;
//         left: -10px;
//         .label {
//           width: 100px;
//           display: flex;
//           flex-shrink: 0;
//           justify-content: space-between;
//           & > span {
//             display: block;
//           }
//         }
//       }
//     }
//   }
//   background: #2e5dad;
// }
//鸟
.page.bird {
  overflow: hidden;
  .topic_card {
    position: relative;
    background: url("../../assets/img/music_test/topic_card.png") no-repeat
      center/100% 100%;
    height: 210px;
  }
  .text {
    top: 23%;
    text-align: left;
  }
  .note {
    position: absolute;
    left: 50%;
    margin-left: -36px;
    bottom: 45px;
    font-size: 0;
    -webkit-tap-highlight-color: transparent;
    img {
      width: 72px;
      height: 72px;
      -webkit-tap-highlight-color: transparent;
    }
    //transition: transform 15s;
  }
  .note.playing {
    animation: rotate 18s;
    //transform: rotate(360deg);
  }
  .re_play {
    font-size: 11px;
    color: #666;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 25px;
  }
  .bird_main {
    //width: 100%;
    width: 400px;
    height: 400px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 30%;
    z-index: 22;
    //height: 61vh;
    .option_card {
      z-index: 22;
      position: absolute;
      left: 6.93%;
      // width: 130px;
      // height: 55px;
      width: 150px;
      height: 63px;
      line-height: 55px;
      background: url("../../assets/img/music_test/option_card.png") no-repeat
        center/cover;
      border-radius: 10px;
      .option_text {
        margin-left: 13%;
        font-size: 27px;
        font-family: PingFangSC-Medium;
        font-weight: bold;
        color: rgba(245, 150, 0, 1);
      }
    }
    .option_card.select {
      background: url("../../assets/img/music_test/bird_select.png") no-repeat
        center/100% 100%;
    }
    .option_card1 {
      top: 34.9%;
    }
    .option_card2 {
      top: 60.3%;
    }
    .tree {
      width: 200px;
      //width: 35.7vw;
      //height: 61vh;
      position: absolute;
      right: -20px;
      //top:401px;
      top: 30px;
    }
  }
  .wave {
    position: absolute;
    left: 0;
    z-index: 2;
    bottom: -7px;
    img {
      position: relative;
      z-index: 2;
      width: 100%;
    }
  }
  .grass {
    width: 77px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .option_bird {
    position: absolute;
    left: 46%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .flyto {
    right: -91%;
    top: -85%;
  }
  .f1 {
    left: 170%;
    top: 18%;
  }
  .f2 {
    left: 170%;
    top: -171%;
  }
  //动画部分
  .bird {
    //transition: all 3s 1s;
    transition: transform 0.5s, left 3s, right 3s, top 3s, bottom 3s;
    // width: 40px;
    // height: 40px;
    width: 50px;
    height: 50px;
    background: url("../../assets/img/music_test/bird_all.png") no-repeat;
    //background-position: 0% 0%;
    background-size: 212%;
    //animation: fly .7s steps(1) 0s infinite both;
    //animation: fly 0.5s steps(2) 0s infinite both;
  }
  .bird.bounce {
    //transform: translateY(-40px)
    animation: bounce 1s 0s both;
  }
  .bird.fly {
    animation: fly 0.5s steps(2) 0s infinite both;
  }
  .bird.f1 {
    animation: fly 0.5s steps(2) 0s infinite both;
    //left: 170%;
    left: 145%;
    top: 18%;
  }
  .bird.f2 {
    animation: fly 0.5s steps(2) 0s infinite both;
    left: 145%;
    top: -171%;
  }
  @keyframes bounce {
    60% {
      transform: translateX(-50%) translateY(-55px);
    }
    100% {
      transform: translateX(-50%) translateY(-25px);
    }
  }
  @keyframes fly {
    to {
      background-position: 185% 0;
    }
  }
}

//普通选择题
.page.common {
  background: no-repeat 20.5% 0.2% ~"/" 68px 18px url("../../assets/img/music_test/cloud1.png"),
    no-repeat right 0% top 25.6% ~"/" 48px 22px url("../../assets/img/music_test/cloud2.png"),
    no-repeat left 11.6% top 33.2% ~"/" 69px 14px url("../../assets/img/music_test/cloud3.png"),
    no-repeat left 0% bottom 0% ~"/" 77px 70px url("../../assets/img/music_test/grass1.png"),
    no-repeat right 0% bottom 0% ~"/" 77px 70px url("../../assets/img/music_test/grass2.png"),
    no-repeat right 0% bottom 0% ~"/" 100% 150px url("../../assets/img/music_test/wave.png");
  background-color: rgba(255, 194, 149, 1);
  .topic_card {
    // background: url("../../assets/img/music_test/topic_card_b.png") no-repeat
    //   center/cover;
    background: url("../../assets/img/music_test/topic_card.png") no-repeat
      center/100% 100%;
    //height: 180px;
    height: 210px;
    border-radius: 10px;
    .note {
      position: absolute;
      left: 50%;
      margin-left: -36px;
      bottom: 45px;
      font-size: 0;
      -webkit-tap-highlight-color: transparent;
      img {
        width: 72px;
        height: 72px;
        -webkit-tap-highlight-color: transparent;
      }
      //transition: transform 15s;
    }
    .note.playing {
      animation: rotate 18s;
      //transform: rotate(360deg);
    }
    .re_play {
      font-size: 11px;
      color: #666;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 25px;
    }
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    .text {
      top: 28%;
    }
  }
  .page_main {
    width: 335px;
    height: 400px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 30%;
    .option_card {
      z-index: 10;
      position: absolute;
      //left: 6.93%;
      width: 145px;
      height: 100px;
      line-height: 100px;
      background: url("../../assets/img/music_test/option_card.png") no-repeat
        center/cover;
      border-radius: 10px;
      .option_text {
        display: none;
        margin-left: 13%;
        font-size: 30px;
        font-family: PingFangSC-Medium;
        font-weight: bold;
        color: rgba(245, 150, 0, 1);
      }
      .option_img {
        position: absolute;
        //right: 25px;
        left: 50%;
        top: 50%;
        line-height: normal;
        transform: translateX(-50%) translateY(-50%);
        img {
          width: 43px;
        }
      }
    }
    .option_card.select {
      background: url("../../assets/img/music_test/option_card_select.png")
        no-repeat center/cover;
    }
    .option_card1 {
      top: 34.9%;
      left: 0;
    }
    .option_card2 {
      top: 34.9%;
      right: 0;
    }
  }
  .topic_card.in_app {
    top: 8.7%;
  }
  .page_main.in_app {
    top: 34%;
  }
}
.q2a {
  width: 120px !important;
}
.q2b {
  width: 74px !important;
}
.q8a {
  width: 84px !important;
}
.q8b {
  width: 82px !important;
}
.q9a {
  width: 82px !important;
}
.q9b {
  width: 86px !important;
}
.page.q8,
.page.qiaoji {
  .topic_card {
    background: url("../../assets/img/music_test/topic_card.png") no-repeat
      center/cover;
    height: 140px;
  }
  .text {
    top: 45% !important;
  }
}
.page.qiaoji {
  background: no-repeat 20.5% 0.2% ~"/" 68px 18px url("../../assets/img/music_test/cloud1.png"),
    no-repeat right 0% top 25.6% ~"/" 48px 22px url("../../assets/img/music_test/cloud2.png"),
    no-repeat left 11.6% top 33.2% ~"/" 69px 14px url("../../assets/img/music_test/cloud3.png"),
    no-repeat left 0% bottom 0% ~"/" 100% 150px url("../../assets/img/music_test/qj_cloud.png"),
    linear-gradient(0deg, rgba(255, 200, 136, 1) 0%, rgba(255, 140, 49, 1) 100%);
  background-color: rgba(255, 194, 149, 1);
  //background:linear-gradient(0deg,rgba(255,200,136,1) 0%,rgba(255,140,49,1) 100%);
}
//泡泡

body {
  height: 100vh;
  position: relative;
}
// .beat {
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: red;
//   position: absolute;
//   bottom: -30px;
// }
// .beat_up {
//   animation: up 7s linear forwards;
// }
// .beat.right {
//   background-color: blueviolet;
// }
// .beat.wrong {
//   background-color: gray;
// }
@keyframes up {
  0% {
    bottom: 0;
  }
  99% {
    //opacity: 1;
  }
  100% {
    bottom: 850px;
    //opacity: 0;
    display: none;
  }
}
.beat {
  position: absolute;
  bottom: -60px;
  transition: opacity 1.3s;
  img.o {
    width: 53px;
  }
  img.b {
    width: 78px;
    display: none;
  }
}
.beat_up {
  animation: up 7s linear forwards;
}
.beat.right {
  animation-play-state: paused;
  opacity: 0;
  img.o {
    display: none;
  }
  img.b {
    display: block;
  }
}
.page.loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  //position: relative;
  opacity: 1;
  visibility: visible;
  background: url("../../assets/img/music_test/bg.jpg") no-repeat center;
  background-size: cover;
  background-color: #2e797d;
  //transition: opacity .5s;
  .middle_wrapper {
    text-align: center;
    color: #fff;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
  .uk {
    width: 100px;
    position: absolute;
    top: -280px;
    //top:10%;
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

  .progress_wrapper {
    position: absolute;
    top: 39%;
    left: 50%;
    transform: translateX(-50%);
    //margin: 500px auto 0 auto;
    width: 50%;
    padding: 0 5px;
    overflow: hidden;
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
  }

  .p_grey {
    width: 154px;
    height: 4px;
    background: rgba(255, 255, 255, 1);
    opacity: 0.3;
    border-radius: 3px;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 30px;
  }

  .p_color {
    background: linear-gradient(
      90deg,
      rgba(255, 90, 25, 1) 0%,
      rgba(188, 26, 255, 1) 100%
    );
    border-radius: 2px;
    width: 0%;
    height: 4px;
    transition: width 1000ms;
  }
  #progressStatus {
    font-size: 15px;
  }
}
.page.loading.hide {
  animation: hide 0.7s forwards;
}
@keyframes hide {
  99% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
    display: none !important;
  }
}
@keyframes breath {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>

