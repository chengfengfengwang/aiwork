<template>
  <div>
    <section id="indexBannerSwiper" class="swiper-container">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide slide1"></div>
        <!-- <div class="swiper-slide"></div>
        <div class="swiper-slide"></div>-->
      </div>
      <div class="swiper-pagination"></div>
    </section>
    <div class="video_model" style="margin:0;padding-bottom:110px">
      <div class="common_wrapper">
        <CourseCommonTitle>
          <template v-slot:title_zh>课程简介</template>
          <template v-slot:title_en>Course Introduction</template>
        </CourseCommonTitle>
      </div>

      <div class="video_box" @click="handleClick('music_basis','music_basis_video')">
        <img src="../../assets/mob_assets/img/course_music_basis.png" alt class="cover">
        <img src="../../assets/img/play.png" alt class="play">
        <!-- <div class="video_info">
          <div class="info_title">音乐基础理论</div>
          <div class="info_sub_title">499元考级保过</div>
        </div>-->
        <video ref="music_basis" v-show="music_basis_video" controls="controls">
          <source src="https://s.immusician.com/web/h5/video/center_intro.mp4" type="video/mp4">
        </video>
      </div>
      <div class="text">
        <div class="intro_title">《中央音乐学院音基考级一级课程》</div>
        <div class="intro_item">
          <div class="intro_label">适用范围</div>
          <div class="intro_item_content">适用5岁及以上学习音乐的儿童</div>
        </div>
        <div class="intro_item">
          <div class="intro_label">学习内容</div>
          <div class="intro_item_content">20课时+18个音乐常识小动画，近1000道测练模拟题</div>
        </div>
        <div class="intro_item">
          <div class="intro_label">学习方式</div>
          <div class="intro_item_content">在家上课，包学包过，一对一辅导。</div>
        </div>
      </div>
    </div>
    <section class="price">
      <div class="price_item">
        <div class="now_price">
          <span class="label">限时特价：</span>
          <span class="num">¥499</span>
        </div>
        <div class="middle_line"></div>
        <div class="old_price">
          <span class="label">原价：</span>
          <span class="num">1299</span>
        </div>
      </div>
      <div class="sign_btn" @click="wxBoxShow=true">
        <span>咨询报名</span>
        <img src="./../../assets/img/arrow.png" alt>
      </div>
    </section>
    <div class="teacher">
      <div class="teacher_img">
        <img src="./../../assets/mob_assets/img/mobile_teacher.png" alt>
      </div>
      <div class="teacher_info">
        <div class="teacher_title">主讲老师：田园</div>
        <div
          class="teacher_intro"
        >美国波士顿大学音乐表演钢琴演奏专业硕士毕业，中央音乐学院音乐教育专业本科毕业，10年少儿音乐基础知识和钢琴教学经验，熟知国内外各大知名音乐考级体系。</div>
      </div>
    </div>
    <div class="feature">
      <div class="feature_row">
        <div class="feature_item">
          <img src="./../../assets/img/feature1.png" alt>
          <div>名师讲授</div>
        </div>
        <div class="feature_item">
          <img src="./../../assets/img/feature2.png" alt>
          <div>游戏互动</div>
        </div>
        <div class="feature_item">
          <img src="./../../assets/img/feature3.png" alt>
          <div>模拟题库</div>
        </div>
      </div>
      <div class="feature_row">
        <div class="feature_item">
          <img src="./../../assets/img/feature4.png" alt>
          <div>实时答疑</div>
        </div>
        <div class="feature_item">
          <img src="./../../assets/img/feature5.png" alt>
          <div>动画故事</div>
        </div>
        <div class="feature_item">
          <img src="./../../assets/img/feature6.png" alt>
          <div>一对一辅导</div>
        </div>
      </div>
    </div>
    <section class="common_wrapper">
      <CourseCommonTitle>
        <template v-slot:title_zh>课程大纲</template>
        <template v-slot:title_en>Course Outline</template>
      </CourseCommonTitle>
      <div class="introduction_item">
        <div class="top_img_wrapper" v-if="this.outLineTop.length>0">
          <div class="level">LV1</div>
          <div class="font_area">
            <span class="main_title">{{this.outLineTop[0].main}}</span>
            <span class="text_title">{{this.outLineTop[0].sub}}</span>
            <span class="sub_title">——{{this.outLineTop[0].text}}</span>
          </div>
          <img class="top_img" src="../../assets/mob_assets/img/mob_intro.png" alt>
        </div>

        <div class="introduction_item_content">
          <div class="intro_list_wrapper" v-for="(item,index) in outLine[0]" :key="index">
            <div class="intro_li_title">{{item.title}}</div>
            <div class="intro_li_content">
              <p>{{item.line1}}</p>
              <p>{{item.line2}}</p>
            </div>
          </div>
          <div class="harf_round"></div>
        </div>
      </div>
      <div class="introduction_item">
        <div class="top_img_wrapper" v-if="this.outLineTop.length>0">
          <div class="level">LV2</div>
          <div class="font_area">
            <span class="main_title">{{this.outLineTop[1].main}}</span>
            <span class="text_title">{{this.outLineTop[1].sub}}</span>
            <span class="sub_title">——{{this.outLineTop[1].text}}</span>
          </div>
          <img class="top_img" src="../../assets/mob_assets/img/mob_intro.png" alt>
        </div>
        <div class="introduction_item_content">
          <div class="intro_list_wrapper" v-for="(item,index) in outLine[1]" :key="index">
            <div class="intro_li_title">{{item.title}}</div>
            <div class="intro_li_content">
              <p>{{item.line1}}</p>
              <p>{{item.line2}}</p>
            </div>
          </div>
          <div class="harf_round"></div>
        </div>
      </div>
      <div class="introduction_item">
        <div class="top_img_wrapper" v-if="this.outLineTop.length>0">
          <div class="level">LV3</div>
          <div class="font_area">
            <span class="main_title">{{this.outLineTop[2].main}}</span>
            <span class="text_title">{{this.outLineTop[2].sub}}</span>
            <span class="sub_title">——{{this.outLineTop[2].text}}</span>
          </div>
          <img class="top_img" src="../../assets/mob_assets/img/mob_intro.png" alt>
        </div>
        <div class="introduction_item_content" style="background: #FFFAF7;">
          <div class="intro_list_wrapper" v-for="(item,index) in outLine[2]" :key="index">
            <div class="intro_li_title">{{item.title}}</div>
            <div class="intro_li_content">
              <p>{{item.line1}}</p>
              <p>{{item.line2}}</p>
            </div>
          </div>
          <div class="harf_round"></div>
          <div class="harf_round last"></div>
        </div>
      </div>
    </section>
    <section class="catalogue common_wrapper">
      <CourseCommonTitle>
        <template v-slot:title_zh>课程目录</template>
        <template v-slot:title_en>Course catalogue</template>
      </CourseCommonTitle>
      <div class="catalogue_main">
        <div class="top_section">
          <div class="title">
            《乐理视唱练耳
            <span class="title_num">{{catalogueTop.length}}</span>课》
          </div>
          <div class="content">
            <div class="content_left">
              <p v-for="(item,index) in catalogueTop1" :key="index">
                <span class="index">{{formatNumber(index+1)}}</span>
                {{item}}
              </p>
            </div>
            <div class="content_right">
              <p v-for="(item,index) in catalogueTop2" :key="index">
                <span class="index">{{formatNumber(item.index+1)}}</span>
                {{item.v}}
              </p>
            </div>
          </div>
        </div>
        <div class="bottom_section" style="margin-bottom:30px">
          <div class="title">
            《音乐星球小动画
            <span class="title_num">8</span>个》
          </div>
          <div class="content">
            <div class="lesson" v-for="(item,index) in catalogueBottom" :key="index">
              <p class="p_title">
                <span class="index">{{formatNumber(index+1) + ' '}}</span>
                {{item.line1}}
              </p>
              <p class="p_sub_title">{{item.line2}}</p>
            </div>
          </div>
        </div>
        <div class="bottom_section">
          <div class="title">
            《音乐壳TV音乐会
            <span class="title_num">10</span>个》
          </div>
          <div class="content">
            <div class="lesson" v-for="(item,index) in catalogueBottom1" :key="index">
              <p class="p_title">
                <span class="index">{{formatNumber(index+1) + ' '}}</span>
                {{item.line1}}
              </p>
              <p class="p_sub_title">{{item.line2}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="remark common_wrapper">
      <CourseCommonTitle>
        <template v-slot:title_zh>用户评论</template>
        <template v-slot:title_en>User reviews</template>
      </CourseCommonTitle>
      <div class="remark_container wrapper">
        <div id="remarkSwiper" class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide slide" v-for="(remark,index) in remarkArr" :key="index">
              <div class="user_info">
                <div class="avatar">
                  <img :src="photoArr[index]" alt>
                </div>
                <div class="name">孩子家长</div>
              </div>

              <div class="remark_content">{{remark.content}}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Download></Download>
    <van-popup v-model="wxBoxShow">
      <div class="wx_box">
        <img @click="wxBoxShow=false" src="./../../assets/img/close_modal.png" alt class="close">
        <img class="wx_img" src="./../../assets/img/wechat_g.jpeg" alt>
        <div class="add_wx">添加微信号 jessieyin02</div>
        <button @click="copyWx" class="copy_wx" :data-clipboard-text="'jessieyin02'">复制微信号</button>
      </div>
    </van-popup>
    <BackTop></BackTop>
  </div>
</template>
<script>
import { remarkData } from "./../../assets/data.js";
import Header from "../../components/mob/Header";
import Footer from "../../components/mob/Footer";
import Download from "../../components/mob/NewDownload";
import CourseCommonTitle from "../../components/mob/CourseCommonTitle";
import { Popup, Toast } from "vant";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import ClipboardJS from "clipboard";
import BackTop from "./../../components/mob/BackTop";
export default {
  components: {
    Header,
    Footer,
    CourseCommonTitle,
    "van-popup": Popup,
    Toast,
    Download,
    BackTop
  },
  computed: {
    catalogueTop1() {
      var length = this.catalogueTop.length;
      return this.catalogueTop.slice(0, Math.ceil(length / 2));
    },
    catalogueTop2() {
      var length = this.catalogueTop.length;
      var arr = this.catalogueTop.slice(Math.ceil(length / 2));
      console.log(
        arr.map((e, i) => {
          return { index: i + Math.ceil(length / 2), v: e };
        })
      );
      return arr.map((e, i) => {
        return { index: i + Math.ceil(length / 2), v: e };
      });
    }
  },
  data() {
    return {
      music_basis_video: false,
      remarkArr: remarkData,
      wxBoxShow: false,
      photoArr: [],
      outLineTop: [
        {
          main: "打好基础",
          sub: "(1-8)+2常识",
          text: "从识谱和节奏开始"
        },
        {
          main: "稳固提升",
          sub: "(9-14)+4常识",
          text: "拓展音乐知识，听对唱准"
        },
        {
          main: "全面覆盖",
          sub: "(15-20)+2常识",
          text: "28个必考点，边学边测"
        }
      ],

      outLine: [
        [
          {
            title: "乐理",
            line1:
              "学会常用音符和休止符，时值计算，音阶，能够掌握反复记号、临时变音记号",
            line2: "学习四四拍、四三拍及其指挥图示"
          },
          {
            title: "练耳",
            line1: "学会打单位拍，可以听辨旋律中的节奏、单音；",
            line2: "听辩四四拍、四三拍，模唱C大调音阶"
          },
          {
            title: "视唱",
            line1: "学会四四拍、四三拍旋律完整视唱",
            line2: ""
          },
          {
            title: "常识",
            line1: "了解童声、女声、男声演唱形式，以及中央汉族民歌",
            line2: ""
          }
        ],
        [
          {
            title: "乐理",
            line1:
              "认识四二拍、四二拍的指挥图示和低音谱表的音，学会小附点节奏型及时值计算，掌握同音连线、表情连线等音乐记号；学习常用速度术语",
            line2: ""
          },
          {
            title: "练耳",
            line1: "学会听辨速度术语、力度变化，可以进行旋律音高模唱，听写节奏",
            line2: ""
          },
          {
            title: "视唱",
            line1: "学会四二拍和带有常用记号的视唱",
            line2: ""
          },
          {
            title: "常识",
            line1: "了解少数民族民歌、外国民歌，以及3种键盘乐器和9种弦乐器",
            line2: ""
          }
        ],
        [
          {
            title: "乐理",
            line1:
              "学会八六拍、八六拍的指挥图示，掌握音程并能够向上、向下构写音程，拓展音乐中的力度记号及常用记号，如重音记号、保持音记号、呼吸记号",
            line2: ""
          },
          {
            title: "练耳",
            line1:
              "学会听辨八六拍、四二拍，模唱并听辨二度、三度、五度、八度音程，听辨单音、旋律",
            line2: ""
          },
          {
            title: "视唱",
            line1: "学会八六拍、带有演奏法及常用记号的视唱",
            line2: ""
          },
          {
            title: "常识",
            line1: "了解17种中央乐器和19种西方乐器，还要认识管弦乐队",
            line2: ""
          }
        ]
      ],
      catalogueTop: [
        "走进音乐王国",
        "音符来聚会",
        "小小指挥家",
        "彩虹音阶",
        "附点音符",
        "认识更多的音",
        "快乐的三拍子",
        "不发声的休止符",
        "音符与节奏",
        "特别的小附点",
        "好玩的模进",
        "常用速度术语",
        "新的节拍",
        "低音王国",
        "有用的音乐记号",
        "旋转的八六拍",
        "节奏对对碰",
        "音程聚会",
        "不一样的三连音",
        "玩转节拍与旋律"
      ],
      catalogueBottom: [
        {
          line1: "穿越键盘星球",
          line2: "乐器之王钢琴，管风琴，手风琴"
        },
        {
          line1: "弦乐星球1号",
          line2: "中西方拉弦乐小提琴、中提琴，二胡等"
        },
        {
          line1: "弦乐星球2号",
          line2: "中西方弹拨乐琵琶，古筝，竖琴等"
        },
        {
          line1: "吹奏乐星球1号",
          line2: "中西方吹奏乐长笛、箫、唢呐等"
        },
        {
          line1: "吹奏乐星球2号",
          line2: "西方铜管乐大管、圆号、小号等"
        },
        {
          line1: "打击乐星球1号",
          line2: "中西方打击乐小军鼓、定音鼓，大堂鼓等"
        },
        {
          line1: "打击乐星球2号",
          line2: "中西方打击乐铜钹、木琴，锣等"
        },
        {
          line1: "西方管弦乐队星球",
          line2: "认识管弦乐队"
        }
      ],
      catalogueBottom1: [
        {
          line1: "童声音乐会第一场",
          line2: "童声独唱，童声齐唱《小杜鹃》"
        },
        {
          line1: "童声音乐会第二场",
          line2: "童声独唱《小燕子》，童声齐唱"
        },
        {
          line1: "女生音乐会",
          line2: "女高音独唱、女中音独唱等"
        },
        {
          line1: "男生音乐会",
          line2: "男高音独唱、男中音独唱等"
        },
        {
          line1: "中国汉族民歌音乐会",
          line2: "陕北民歌、山西民歌等"
        },
        {
          line1: "中国汉族民歌音乐会第二场",
          line2: "山东民歌、四川民歌等"
        },
        {
          line1: "中国少数民族民歌音乐会",
          line2: "蒙古族民歌、哈萨克族民歌等"
        },
        {
          line1: "中国少数民族民歌音乐会第二场",
          line2: "朝鲜族民歌、彝族民歌等"
        },
        {
          line1: "外国民歌音乐会",
          line2: "日本民歌、印尼民歌等"
        },
        {
          line1: "外国民歌音乐会第二场",
          line2: "俄罗斯民歌、苏格兰民歌等"
        }
      ]
    };
  },
  created() {
    //document.documentElement.style.fontSize = '50px'
    this.initPhotoArr();
  },
  mounted() {
    this.initBannerSwiper();
    this.initRemarkSwiper();
  console.log(location.href)
    new ClipboardJS(".copy_wx", {
      text: function(trigger) {
        return trigger.getAttribute("data-clipboard-text");
      }
    });
  },
  methods: {
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },
    initPhotoArr() {
      for (var i = 0; i < 10; i++) {
        this.photoArr.push(
          require(`./../../assets/mob_assets/img/photo${i + 1}.png`)
        );
      }
    },
    copyWx() {
      Toast.success("复制成功");
    },
    initBannerSwiper() {
      var mySwiper = new Swiper("#indexBannerSwiper", {
        direction: "horizontal"
        //loop: true
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true
        // }
      });
    },
    initRemarkSwiper() {
      this.mySwiper = new Swiper("#remarkSwiper", {
        direction: "horizontal",
        //initialSlide: 1,
        //loop: true,
        //slidesPerView: 2,
        //centeredSlides: true,
        spaceBetween: 10,
        slidesPerView: "auto"
      });
    },
    handleClick(ref, video) {
      this.$refs[ref].play();
      this[video] = true;
    }
  }
};
</script>
<style lang="less" scoped>
#remarkSwiper {
  .swiper-wrapper {
    padding-bottom: 20px;
  }
  .swiper-slide {
    box-shadow: 0 6px 10px 0 #fc901a66;
  }
}
.wx_box {
  position: relative;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  box-sizing: border-box;
  width: 300px;
  padding: 65px 0 58px 0;
  .wx_img {
    width: 120px;
  }
  .add_wx {
    font-size: 15px;
    color: #ffab0c;
    margin: 17px 40px;
  }
  .copy_wx {
    border: none;
    outline: none;
    display: inline-block;
    width: 145px;
    height: 35px;
    line-height: 35px;
    border-radius: 35px;
    font-size: 16px;
    color: #ffffff;
    background: #fd9f24;
    text-align: center;
    box-shadow: 0px 5px 4px -1px #ece3d2;
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 10px 20px 20px;
    width: 25px;
  }
}
#indexBannerSwiper.swiper-container {
  width: 100%;
  height: 150px;
  .slide1 {
    background: url("./../../assets/img/mob_499.png") no-repeat
      center;
    background-size: cover;
  }
}
.video_model {
  .common_wrapper;
  position: relative;
  border-bottom: 1px solid transparent;
  margin-bottom: 35px;
  .video_box {
    position: relative;
    .cover {
      width: 100%;
      //border-radius: 5px 5px 0 0;
    }
    .play {
      width: 39px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .video_info {
      position: absolute;
      left: 15px;
      bottom: 14px;
      display: flex;
      align-items: center;
      .info_title {
        margin-right: 18px;
        font-size: 18px;
        color: #ffffff;
      }
      .info_title::after {
        content: "";
        position: absolute;
        left: 3px;
        bottom: -2px;
        height: 3px;
        width: 18px;
        background-color: #ffaa06;
      }
      .info_sub_title {
        font-size: 13px;
        color: #ffffff;
      }
    }
    video {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      z-index: 5;
    }
  }
  .text {
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 86%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 17px 5px;
    font-size: 12px;
    color: #666666;
    letter-spacing: 1px;
    line-height: 17px;
    box-shadow: 0px 11px 21px -9px #ece3d2;
    .intro_title {
      font-size: 18px;
      color: #333333;
      text-align: center;
      margin-bottom: 12px;
    }
    .intro_item {
      display: flex;
      margin-bottom: 7px;
    }
    .intro_label,
    .intro_item_content {
      //display: inline-block;
      position: relative;
    }
    .intro_label {
      padding: 0 10px 0 10px;
      width: 60px;
      flex-shrink: 0;
      flex-grow: 0;
    }
    .intro_label:before {
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      position: absolute;
      left: 3px;
      top: 7px;
      //margin-top: -2px;
      background: #ffaa06;
    }
    .intro_label:after {
      content: "";
      width: 1px;
      height: 11px;
      position: absolute;
      right: 8px;
      top: 3px;
      background: #d9d9d9;
    }
  }
}
.teacher {
  margin-top: 25px;
  margin-bottom: 30px;
  padding: 15px;
  display: flex;
  align-items: center;
  background: #ff9400;
  .teacher_img {
    flex-shrink: 0;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .teacher_info {
    padding-left: 15px;
    .teacher_title {
      margin-bottom: 4px;
      font-size: 14px;
      color: #ffffff;
    }
    .teacher_intro {
      line-height: 20px;
      font-size: 11px;
      color: #ffffff;
    }
  }
}
.feature {
  padding: 25px 0;
  background-color: #fff9f2;
  .feature_row {
    display: flex;
    text-align: center;
    justify-content: space-around;

    .feature_item {
      width: 33.333%;
      margin-bottom: 18px;
      font-size: 12px;
      color: #333333;
      img {
        width: 40px;
        margin-bottom: 5px;
      }
    }
  }
}
.price {
  background: #ff9400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  padding: 14px 15px;
  box-sizing: border-box;
  @media screen and (max-width: 345px) {
    .price_item {
      flex-wrap: wrap;
    }
    .now_price {
      margin-right: 10px;
    }
    .middle_line {
      display: none;
    }
  }
  .price_item {
    display: flex;
    align-items: center;
    .now_price {
      display: flex;
      font-weight: 500;
      align-items: center;
      .label {
        font-size: 14px;
        color: #ffffff;
      }
      .num {
        font-size: 18px;
        color: #ffffff;
      }
    }
    .old_price {
      display: flex;
      align-items: center;
      .label {
        font-size: 13px;
        color: #ffffff;
      }
      .num {
        font-size: 18px;
        color: #ffffff;
        opacity: 0.8;
        text-decoration: line-through;
      }
    }
    .middle_line {
      margin: 0 15px;
      width: 1px;
      height: 14px;
      background-color: #fff;
    }
  }
  .sign_btn {
    margin-left: 20px;
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #ffaa06;
    background: #fff9ee;
    box-shadow: 0 6px 12px 0 #fc901a;
    border-radius: 28px;
    img {
      margin-left: 5px;
      width: 8px;
      transform: rotate(180deg);
    }
  }
}
.common_wrapper {
  margin: 0 15px;
}
.introduction_item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 25px auto;
  margin-top: -5px;
  max-width: 500px;
  .top_img {
    width: 100%;
    z-index: 30;
  }
}
.introduction_item:last-child {
  margin-bottom: 40px;
}
.introduction_item_content {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 14px 20px -9px #ffe2aa;
  width: 90%;
  background-color: #fff8f2;
  border-radius: 10px 10px 6px 6px;
  padding: 30px 18px 10px 15px;
  margin-top: -30px;
  .intro_list_wrapper {
    position: relative;
    z-index: 12;
    margin-bottom: 18px;
    .intro_li_title {
      margin-bottom: 5px;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #fea803;
    }
    .intro_li_content {
      line-height: 22px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
    }
  }
}
.catalogue {
  margin-bottom: 45px;
  .catalogue_main {
    max-width: 500px;
    margin: 0 auto;
    .top_section {
      display: flex;
      margin-bottom: 25px;
      box-shadow: 0px 5px 16px -9px #ffb366;
      .title {
        writing-mode: vertical-lr;
        line-height: 50px;
        width: 50px;
        background: #ffc058;
        background-image: linear-gradient(-179deg, #ffc058 0%, #ff982b 100%);
        box-shadow: 4px 2px 11px -3px #ffb366;
        border-radius: 8px;
        font-size: 15px;
        color: #ffffff;
        text-align: center;
        letter-spacing: 1px;
        .title_num {
          transform: rotate(270deg);
          display: inline-block;
          margin: 0px 0 3px 0;
        }
      }
      .content {
        flex-grow: 1;
        padding: 18px 0 18px 35px;
        display: flex;
        background: #fffbf9;
        font-size: 12px;
        color: #666666;
        border-radius: 0 6px 6px 0;
        .content_left,
        .content_right {
          line-height: 25px;
        }
        .content_right {
          margin-left: 45px;
        }
      }
    }
    .bottom_section {
      display: flex;
      box-shadow: 0px 5px 16px -9px #ffb366;
      .title {
        writing-mode: vertical-lr;
        line-height: 50px;
        width: 50px;
        background-image: linear-gradient(-179deg, #ffc058 0%, #ff982b 100%);
        box-shadow: 4px 2px 11px -3px #ffb366;
        border-radius: 8px;
        font-size: 15px;
        color: #ffffff;
        text-align: center;
        letter-spacing: 1px;
        .title_num {
          transform: rotate(270deg);
          display: inline-block;
          margin: 0px 0 6px 0;
        }
      }
      .content {
        flex-grow: 1;
        padding: 18px 0 18px 35px;
        background: #fffbf9;
        border-radius: 0 6px 6px 0;
        .lesson {
          margin-bottom: 12px;
          .p_title {
            margin-bottom: 3px;
            font-size: 13px;
            color: #333333;
          }
          .p_sub_title {
            font-size: 12px;
            color: #666666;
          }
        }
      }
    }
  }
}
.remark_container {
  position: relative;
  margin-bottom: 45px;
  .slide {
    width: 35%;
    height: 220px;
    padding: 15px 13px;
    background: #ffaf06;
    border-radius: 6px;
    .user_info {
      text-align: center;
      margin-bottom: 7px;
    }
    .avatar {
      margin: 0 auto;
      display: inline-block;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: 2px solid #ffc072;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .name {
      font-size: 14px;
      color: #ffffff;
    }
    .remark_content {
      font-size: 12px;
      color: #ffffff;
      line-height: 20px;
    }
  }
}
.harf_round {
  top: 0;
  left: -20px;
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff0e3;
  z-index: 10;
  opacity: 0.5;
}
.harf_round.last {
  width: 400px;
  height: 400px;
  top: 160px;
  left: 70px;
}
//修补
.introduction {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #333333;
  & > div {
    display: flex;
    align-items: center;
    line-height: 44px;
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ffad8f;
      margin-right: 16px;
    }
  }
}
.introduction_item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 25px auto;
  max-width: 500px;
  .top_img_wrapper {
    position: relative;
    width: 100%;
    z-index: 30;
    color: #fff;
    //background: url('./../assets/img/mob_intro.png') no-repeat center;
    background-size: cover;
    .level {
      position: absolute;
      left: 3.6%;
      top: 50%;
      transform: translateY(-87%);
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #ffffff;
    }
    .font_area {
      position: absolute;
      left: 15%;
      // top: -2px;
      top: 50%;
      transform: translateY(-80%);
      //transform: translateY(-50%);
      .main_title {
        font-size: 16px;
        font-family: PingFangSC-Medium;
        color: #ffffff;
      }
      .text_title {
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #ffffff;
      }
      .sub_title {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #ffffff;
      }
    }
    @media screen and (max-width: 370px) {
      .font_area {
        //width: 100%;
        //left: 80px;
        .main_title {
          font-size: 10px;
          font-family: PingFangSC-Medium;
          color: #ffffff;
        }
        .text_title {
          font-family: PingFangSC-Regular;
          font-size: 10px;
          color: #ffffff;
        }
        .sub_title {
          font-family: PingFangSC-Regular;
          font-size: 10px;
          color: #ffffff;
        }
      }
    }
    @media screen and (min-width: 372px) {
      .font_area {
        //width: 100%;
        //left: 80px;
        .main_title {
          font-size: 13px;
          //font-family: PingFangSC-Medium;
          color: #ffffff;
        }
        .text_title {
          font-family: PingFangSC-Regular;
          font-size: 10px;
          color: #ffffff;
        }
        .sub_title {
          font-family: PingFangSC-Regular;
          font-size: 11px;
          color: #ffffff;
        }
      }
    }
    @media screen and (min-width: 719px) {
      .level {
        left: 24px;
      }
      .font_area {
        left: 80px;
      }
    }
    .top_img {
      // position: absolute;
      // left: 0;
      // top:0;
      width: 100%;
      z-index: 30;
    }
  }
}
.introduction_item:last-child {
  margin-bottom: 40px;
}
</style>

