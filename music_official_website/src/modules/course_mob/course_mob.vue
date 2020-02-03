<template>
  <div>
    <Header></Header>
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
          <div class="info_sub_title">699元考级保过</div>
        </div>-->
        <video ref="music_basis" v-show="music_basis_video" controls="controls">
          <source src="../../assets/video/index_music_base.mp4" type="video/mp4">
        </video>
      </div>
      <div class="text">
        <div class="intro_title">《中国音乐学院音基考级一级课程》</div>
        <div class="intro_item">
          <div class="intro_label">适用范围</div>
          <div class="intro_item_content">适用6岁及以上学习音乐的儿童</div>
        </div>
        <div class="intro_item">
          <div class="intro_label">学习内容</div>
          <div class="intro_item_content">16课时+8个音乐常识小动画，50个乐理视唱练耳练习</div>
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
          <span class="num">¥699</span>
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
        >美国波士顿大学音乐表演钢琴演奏专业硕士毕业，中国音乐学院音乐教育专业本科毕业，10年少儿音乐基础知识和钢琴教学经验，熟知国内外各大知名音乐考级体系。</div>
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
    <section class="introduction common_wrapper">
      <CourseCommonTitle>
        <template v-slot:title_zh>课程大纲</template>
        <template v-slot:title_en>Course Outline</template>
      </CourseCommonTitle>
      <div class="introduction_item">
        <img class="top_img" src="./../../assets/mob_assets/img/mob_intro1.png" alt>
        <div class="introduction_item_content">
          <div class="intro_list_wrapper">
            <div class="intro_li_title">乐理</div>
            <div class="intro_li_content">
              <p>学会5种常见音符.3种谱号，五线谱，四二拍；</p>
              <p>认低音do到高音do一个八度音名，唱名及音高位置。</p>
            </div>
          </div>
          <div class="intro_list_wrapper">
            <div class="intro_li_title">练耳</div>
            <div class="intro_li_content">
              <p>学会听辨一个八度音高；比较音高低及音符的长度；</p>
              <p>感知四二拍音乐律动。</p>
            </div>
          </div>
          <div class="intro_list_wrapper">
            <div class="intro_li_title">视唱</div>
            <div class="intro_li_content">
              <p>学会敲击单位拍，唱念节奏；跟四二拍旋律完整视唱。</p>
            </div>
          </div>
          <div class="intro_list_wrapper">
            <div class="intro_li_title">常识</div>
            <div class="intro_li_content">
              <p>了解3种键盘乐器，5种常见中外拉弦乐乐器，并听辨它们的音色。</p>
            </div>
          </div>
          <div class="harf_round"></div>
        </div>
      </div>
      <div class="introduction_item">
        <img class="top_img" src="./../../assets/mob_assets/img/mob_intro2.png" alt>
        <div class="introduction_item_content">
          <div class="intro_list_wrapper">
            <div class="intro_li_title">乐理</div>
            <div class="intro_li_content">
              <p>学会5种常见休止符，音符时值组合及节奏型；扩展更多高低音；学习c大调音阶，全音半音，大小二度，三度音程。</p>
              <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
            </div>
          </div>
          <div class="intro_list_wrapper">
            <div class="intro_li_title">练耳</div>
            <div class="intro_li_content">
              <p>学会听辨节奏型，全音半音，大小二度三度音程，旋律走向及更多音高的比较。</p>
              <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
            </div>
          </div>
          <div class="intro_list_wrapper">
            <div class="intro_li_title">视唱</div>
            <div class="intro_li_content">
              <p>学会视唱更多的旋律，节奏，音准，唱名，全面提升。</p>
              <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
            </div>
          </div>
          <div class="intro_list_wrapper">
            <div class="intro_li_title">常识</div>
            <div class="intro_li_content">
              <p>了解7种中外弹拨乐，十几种常见中外吹奏乐器，6种中外打击乐器，并听辨它们的音色。</p>
              <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
            </div>
          </div>
          <div class="harf_round"></div>
        </div>
      </div>
      <div class="introduction_item">
        <img class="top_img" src="./../../assets/mob_assets/img/mob_intro3.png" alt>
        <div class="introduction_item_content" style="background: #FFFAF7;">
          <div class="intro_list_wrapper">
            <div class="intro_li_title">乐理</div>
            <div class="intro_li_content">
              <p>学会四三拍，3种附点音符及附点节奏；学习跳音，同音连线及力度，速度术语，音乐情绪；综合复习所有知识点。</p>
              <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
            </div>
          </div>
          <div class="intro_list_wrapper">
            <div class="intro_li_title">练耳</div>
            <div class="intro_li_content">
              <p>学会听辨两种常见拍号，附点节奏，力度，速度及音乐情绪，巩固旋律音高听辨。</p>
              <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
            </div>
          </div>
          <div class="intro_list_wrapper">
            <div class="intro_li_title">视唱</div>
            <div class="intro_li_content">
              <p>学会视唱四三拍附点节奏旋律，巩固所有旋律音高视唱。</p>
              <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
            </div>
          </div>
          <div class="intro_list_wrapper">
            <div class="intro_li_title">常识</div>
            <div class="intro_li_content">
              <p>了解10位中外著名音乐家以及他们的代表作品。</p>
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
            <span class="title_num">16</span>课》
          </div>
          <div class="content">
            <div class="content_left">
              <p>
                <span class="index">01</span>快乐音符
              </p>
              <p>
                <span class="index">02</span>掌中五线谱
              </p>
              <p>
                <span class="index">03</span>音名与唱名
              </p>
              <p>
                <span class="index">04</span>学习四二拍
              </p>
              <p>
                <span class="index">05</span>旋律中的音高
              </p>
              <p>
                <span class="index">06</span>不发声的休止符
              </p>
              <p>
                <span class="index">07</span>音符时值与节奏
              </p>
              <p>
                <span class="index">08</span>熟练高低音
              </p>
            </div>
            <div class="content_right">
                <p>
                  <span class="index">09</span>C大调音阶
                </p>
                <p>
                  <span class="index">10</span>二度音程
                </p>
                <p>
                  <span class="index">11</span>三度音程
                </p>
                <p>
                  <span class="index">12</span>音程聚会
                </p>
                <p>
                  <span class="index">13</span>学习四三拍
                </p>
                <p>
                  <span class="index">14</span>不一样的附点
                </p>
                <p>
                  <span class="index">15</span>音符与节拍
                </p>
                <p>
                  <span class="index">16</span>音乐中的情感
                </p>
            </div>
          </div>
        </div>
        <div class="bottom_section">
          <div class="title">
            《音乐星球小动画
            <span class="title_num">8</span>课》
          </div>
          <div class="content">
            <div class="lesson">
              <p class="p_title">
                <span class="index">01</span>穿越键盘星球
              </p>
              <p class="p_sub_title">乐器之王钢琴，管风琴，手风琴</p>
            </div>
            <div class="lesson">
              <p class="p_title">
                <span class="index">02</span>弦乐星球1号
              </p>
              <p class="p_sub_title">中西方拉弦乐小提琴、中提琴，二胡等</p>
            </div>
            <div class="lesson">
              <p class="p_title">
                <span class="index">03</span>弦乐星球2号
              </p>
              <p class="p_sub_title">——中西方弹拨乐琵琶，古筝，竖琴等</p>
            </div>
            <div class="lesson">
              <p class="p_title">
                <span class="index">04</span>吹奏乐星球1号
              </p>
              <p class="p_sub_title">——中西方吹奏乐长笛、单簧管、唢呐等</p>
            </div>
            <div class="lesson">
              <p class="p_title">
                <span class="index">05</span>吹奏乐星球2号
              </p>
              <p class="p_sub_title">——西方铜管乐大管、圆号、小号等</p>
            </div>
            <div class="lesson">
              <p class="p_title">
                <span class="index">06</span>打击乐星球
              </p>
              <p class="p_sub_title">——中西方打击乐小军鼓、响板，锣等</p>
            </div>
            <div class="lesson">
              <p class="p_title">
                <span class="index">07</span>西方音乐家星球
              </p>
              <p class="p_sub_title">——巴赫，莫扎特、贝多芬等</p>
            </div>
            <div class="lesson">
              <p class="p_title">
                <span class="index">08</span>中国音乐家星球
              </p>
              <p class="p_sub_title">——冼星海、王洛宾、聂耳等</p>
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
    <Footer :aiLogoShow="false"></Footer>
    <Download></Download>
    <van-popup v-model="wxBoxShow">
      <div class="wx_box">
        <img @click="wxBoxShow=false" src="./../../assets/img/close_modal.png" alt class="close">
        <img class="wx_img" src="./../../assets/img/index_qr.jpeg" alt>
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
import Download from "../../components/mob/Download";
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
  data() {
    return {
      music_basis_video: false,
      remarkArr: remarkData,
      wxBoxShow: false,
      photoArr:[]
    };
  },
  created() {
    //document.documentElement.style.fontSize = '50px'
    this.initPhotoArr();
  },
  mounted() {
    this.initBannerSwiper();
    this.initRemarkSwiper();

    new ClipboardJS(".copy_wx", {
      text: function(trigger) {
        return trigger.getAttribute("data-clipboard-text");
      }
    });
  },
  methods: {
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
#remarkSwiper{
  .swiper-wrapper{
    padding-bottom: 20px
  }
  .swiper-slide{
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
    background: url("./../../assets/mob_assets/img/mob_banner2.png")
      no-repeat center;
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
  opacity: .5;
}
.harf_round.last {
  width: 400px;
  height: 400px;
  top: 160px;
  left: 70px;
}
</style>

